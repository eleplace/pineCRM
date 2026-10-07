import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity, BriefcaseBusiness, CalendarDays, Check, CircleDollarSign,
  Clock3, RefreshCw, Send, TrendingUp, Users,
} from "lucide-react";
import { BASE_URL, BASE_URL2 } from "../api/config";
import { useTheme } from "../context/ThemeContext";

const API = BASE_URL2.replace(/\/$/, "");
const PERIODS = [
  { id: "all", label: "All time" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "year", label: "This year" },
];

function listFrom(payload, keys = []) {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

function createdAtOf(record, nested = false) {
  const raw = nested
    ? record?.partner?.created_at ?? record?.created_at
    : record?.created_at ?? record?.createdAt;
  if (!raw) return null;
  const parsed = new Date(String(raw).replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function startOfWeek(date) {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  day.setDate(day.getDate() - ((day.getDay() + 6) % 7));
  return day;
}

function statusOf(bid) {
  return String(bid.status ?? bid.bid_status ?? bid.bidStatus ?? "pending").toLowerCase();
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value || 0);
}

function Card({ title, value, note, icon: Icon, accent, colors }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
      <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: accent, opacity: 0.75 }} />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: colors.accentIconBg, color: accent }}><Icon size={18} /></div>
      <div className="text-3xl font-bold" style={{ color: colors.textPrimary }}>{formatNumber(value)}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textMono }}>{title}</div>
      <div className="mt-3 text-xs" style={{ color: colors.textMuted }}>{note}</div>
    </div>
  );
}

function TrendChart({ jobs, bids, colors }) {
  const width = 720;
  const height = 245;
  const pad = { top: 18, right: 18, bottom: 34, left: 38 };
  const max = Math.max(1, ...jobs.map((x) => x.value), ...bids.map((x) => x.value));
  const x = (i) => pad.left + (i * (width - pad.left - pad.right)) / Math.max(1, jobs.length - 1);
  const y = (value) => height - pad.bottom - (value / max) * (height - pad.top - pad.bottom);
  const points = (series) => series.map((point, i) => `${x(i)},${y(point.value)}`).join(" ");
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[540px] w-full" role="img" aria-label="Monthly jobs and bids trend">
        {[0, 1, 2, 3].map((step) => {
          const value = Math.round((max * step) / 3);
          const yy = y(value);
          return <g key={step}><line x1={pad.left} x2={width - pad.right} y1={yy} y2={yy} stroke={colors.borderSubtle} strokeDasharray="4 5" /><text x={pad.left - 8} y={yy + 4} fill={colors.textFaint} textAnchor="end" fontSize="10">{value}</text></g>;
        })}
        <polyline points={points(jobs)} fill="none" stroke={colors.accentPrimary} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={points(bids)} fill="none" stroke={colors.accentSecondary} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {jobs.map((point, i) => <g key={point.label}><circle cx={x(i)} cy={y(point.value)} r="4" fill={colors.accentPrimary} /><circle cx={x(i)} cy={y(bids[i]?.value || 0)} r="4" fill={colors.accentSecondary} /><text x={x(i)} y={height - 10} fill={colors.textFaint} textAnchor="middle" fontSize="10">{point.label}</text></g>)}
      </svg>
      <div className="mt-2 flex gap-5 text-xs" style={{ color: colors.textMuted }}>
        <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{ background: colors.accentPrimary }} />Jobs</span>
        <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{ background: colors.accentSecondary }} />Bids</span>
      </div>
    </div>
  );
}

function AcceptanceRing({ accepted, total, colors }) {
  const percent = total ? Math.round((accepted / total) * 100) : 0;
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-label={`${percent}% of bids accepted`}>
          <circle cx="80" cy="80" r={radius} fill="none" stroke={colors.borderSubtle} strokeWidth="13" />
          <circle cx="80" cy="80" r={radius} fill="none" stroke={colors.accentPrimary} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${(percent / 100) * circumference} ${circumference}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <strong className="text-3xl" style={{ color: colors.textPrimary }}>{percent}%</strong>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: colors.textMuted }}>accepted</span>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2" style={{ color: colors.textPrimary }}><Check size={15} color={colors.accentPrimary} />{formatNumber(accepted)} accepted</div>
        <div className="flex items-center gap-2" style={{ color: colors.textMuted }}><Clock3 size={15} />{formatNumber(Math.max(0, total - accepted))} other bids</div>
        <div className="text-xs" style={{ color: colors.textFaint }}>Acceptance rate = accepted bids ÷ all bids</div>
      </div>
    </div>
  );
}

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState("all");
  const [data, setData] = useState({ vendors: [], jobs: [], bids: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState([]);

  const load = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true); else setLoading(true);
    setErrors([]);
    const requests = await Promise.allSettled([
      getJson(`${BASE_URL}getuser.php`),
      getJson(`${API}/getLocations`),
      getJson(`${API}/getAllBids`),
    ]);
    const next = { vendors: [], jobs: [], bids: [] };
    const nextErrors = [];
    const keys = ["vendors", "jobs", "bids"];
    requests.forEach((result, index) => {
      if (result.status === "rejected") {
        nextErrors.push(`${keys[index]}: ${result.reason?.message || "could not load"}`);
        return;
      }
      const payload = result.value;
      const rows = index === 0
        ? listFrom(payload, ["users", "data"])
        : index === 1
          ? listFrom(payload, ["locations", "jobs", "data"])
          : listFrom(payload, ["bids", "data"]);
      next[keys[index]] = index === 0
        ? rows.filter((row) => row.partner?.user_role === "Vendor")
        : rows;
    });
    setData(next);
    setErrors(nextErrors);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const summary = useMemo(() => {
    const now = new Date();
    let from = null;
    if (period === "week") from = startOfWeek(now);
    if (period === "month") from = new Date(now.getFullYear(), now.getMonth(), 1);
    if (period === "year") from = new Date(now.getFullYear(), 0, 1);
    const inPeriod = (record, nested = false) => {
      if (!from) return true;
      const date = createdAtOf(record, nested);
      return Boolean(date && date >= from && date <= now);
    };
    const vendors = data.vendors.filter((v) => inPeriod(v, true));
    const jobs = data.jobs.filter((job) => inPeriod(job));
    const bids = data.bids.filter((bid) => inPeriod(bid));
    const accepted = bids.filter((bid) => ["accepted", "approved"].includes(statusOf(bid)));
    const pending = bids.filter((bid) => ["pending", "submitted", ""].includes(statusOf(bid)));
    const rejected = bids.filter((bid) => ["rejected", "declined"].includes(statusOf(bid)));
    const activeJobs = jobs.filter((job) => /progress|active/i.test(String(job.jobDetails?.status ?? job.status ?? ""))).length;
    const completedJobs = jobs.filter((job) => /complete|closed|done/i.test(String(job.jobDetails?.status ?? job.status ?? ""))).length;
    return { vendors, jobs, bids, accepted, pending, rejected, activeJobs, completedJobs };
  }, [data, period]);

  const trend = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, offset) => new Date(now.getFullYear(), now.getMonth() - 5 + offset, 1));
    const count = (items, nested) => months.map((month) => ({
      label: month.toLocaleDateString("en-IN", { month: "short" }),
      value: items.filter((item) => {
        const date = createdAtOf(item, nested);
        return date && date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
      }).length,
    }));
    return { jobs: count(data.jobs, false), bids: count(data.bids, false) };
  }, [data]);

  const cards = [
    { title: "New vendors", value: summary.vendors.length, note: "Vendor registrations in selected period", icon: Users, accent: colors.accentPrimary },
    { title: "Jobs posted", value: summary.jobs.length, note: `${formatNumber(summary.activeJobs)} active · ${formatNumber(summary.completedJobs)} completed`, icon: BriefcaseBusiness, accent: colors.accentSecondary },
    { title: "Bids received", value: summary.bids.length, note: `${formatNumber(summary.pending.length)} pending · ${formatNumber(summary.rejected.length)} declined`, icon: Send, accent: colors.accentTertiary },
    { title: "Bids accepted", value: summary.accepted.length, note: `${formatNumber(summary.jobs.length ? (summary.accepted.length / summary.bids.length) * 100 : 0)}% acceptance rate`, icon: Check, accent: colors.chipPaidColor },
  ];

  return (
    <div className="min-h-screen px-5 py-7 sm:px-8" style={{ background: colors.pageBg }}>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: colors.accentPrimary }}><Activity size={14} /> Business overview</div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: colors.textPrimary }}>Analytics</h1>
          <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>Vendor growth, jobs, bids and acceptance performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
            {PERIODS.map((option) => <button key={option.id} onClick={() => setPeriod(option.id)} className="rounded-lg px-3 py-2 text-xs font-semibold" style={{ background: period === option.id ? colors.accentNavActive : "transparent", color: period === option.id ? colors.accentPrimary : colors.textMuted }}>{option.label}</button>)}
          </div>
          <button onClick={() => load(true)} disabled={refreshing} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold" style={{ color: colors.textPrimary, background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}><RefreshCw size={14} className={refreshing ? "animate-spin" : ""} /> Refresh</button>
        </div>
      </div>

      {errors.length > 0 && <div className="mb-5 rounded-xl px-4 py-3 text-sm" style={{ color: colors.chipPendingColor, background: colors.chipPendingBg, border: colors.chipPendingBorder }}>Some analytics data could not be loaded: {errors.join(" · ")}. Totals may be incomplete.</div>}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <Card key={card.title} {...card} colors={colors} />)}
      </div>
      {loading ? <div className="rounded-2xl p-12 text-center" style={{ background: colors.cardBg, color: colors.textMuted }}>Loading analytics…</div> : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
            <section className="rounded-2xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
              <div className="mb-4 flex items-start justify-between"><div><h2 className="font-bold" style={{ color: colors.textPrimary }}>Jobs and bids trend</h2><p className="mt-1 text-xs" style={{ color: colors.textMuted }}>Created per month · last 6 months</p></div><TrendingUp size={18} color={colors.accentPrimary} /></div>
              <TrendChart jobs={trend.jobs} bids={trend.bids} colors={colors} />
            </section>
            <section className="rounded-2xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
              <div className="mb-4"><h2 className="font-bold" style={{ color: colors.textPrimary }}>Bid acceptance</h2><p className="mt-1 text-xs" style={{ color: colors.textMuted }}>Accepted bids out of all bids in selected period</p></div>
              <AcceptanceRing accepted={summary.accepted.length} total={summary.bids.length} colors={colors} />
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <section className="rounded-2xl p-5 lg:col-span-2" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
              <div className="mb-5 flex items-center gap-2"><CalendarDays size={16} color={colors.accentPrimary} /><h2 className="font-bold" style={{ color: colors.textPrimary }}>Operational snapshot</h2></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[{ label: "Active jobs", value: summary.activeJobs, color: colors.accentPrimary }, { label: "Completed jobs", value: summary.completedJobs, color: colors.accentSecondary }, { label: "Pending bids", value: summary.pending.length, color: colors.chipPendingColor }].map((row) => <div key={row.label} className="rounded-xl p-4" style={{ background: colors.inputBg, border: `1px solid ${colors.borderFaint}` }}><div className="text-2xl font-bold" style={{ color: row.color }}>{formatNumber(row.value)}</div><div className="mt-1 text-xs" style={{ color: colors.textMuted }}>{row.label}</div></div>)}
              </div>
              <div className="mt-5 space-y-3">
                {[{ label: "Accepted", value: summary.accepted.length, color: colors.accentPrimary }, { label: "Pending", value: summary.pending.length, color: colors.chipPendingColor }, { label: "Declined", value: summary.rejected.length, color: colors.chipRejectedColor }].map((row) => {
                  const percent = summary.bids.length ? (row.value / summary.bids.length) * 100 : 0;
                  return <div key={row.label}><div className="mb-1 flex justify-between text-xs"><span style={{ color: colors.textMuted }}>{row.label}</span><span style={{ color: colors.textPrimary }}>{formatNumber(row.value)} · {Math.round(percent)}%</span></div><div className="h-2 overflow-hidden rounded-full" style={{ background: colors.borderSubtle }}><div className="h-full rounded-full" style={{ width: `${percent}%`, background: row.color }} /></div></div>;
                })}
              </div>
            </section>
            <section className="rounded-2xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}` }}>
              <div className="mb-5 flex items-center gap-2"><CircleDollarSign size={16} color={colors.accentSecondary} /><h2 className="font-bold" style={{ color: colors.textPrimary }}>At a glance</h2></div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span style={{ color: colors.textMuted }}>Vendors in period</span><b style={{ color: colors.textPrimary }}>{formatNumber(summary.vendors.length)}</b></div>
                <div className="flex justify-between"><span style={{ color: colors.textMuted }}>Jobs in period</span><b style={{ color: colors.textPrimary }}>{formatNumber(summary.jobs.length)}</b></div>
                <div className="flex justify-between"><span style={{ color: colors.textMuted }}>Bids per job</span><b style={{ color: colors.textPrimary }}>{summary.jobs.length ? (summary.bids.length / summary.jobs.length).toFixed(1) : "0.0"}</b></div>
                <div className="flex justify-between"><span style={{ color: colors.textMuted }}>Jobs with accepted bids</span><b style={{ color: colors.textPrimary }}>{formatNumber(new Set(summary.accepted.map((bid) => bid.job_id ?? bid.jobId ?? bid.location_id ?? bid.locationId).filter(Boolean)).size)}</b></div>
                <div className="mt-2 rounded-xl p-3 text-xs" style={{ background: colors.accentIconBg, color: colors.textMuted }}>Period metrics use each record’s <code>created_at</code>. “All time” includes records without a timestamp.</div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

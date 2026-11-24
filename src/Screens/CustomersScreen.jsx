import { BASE_URL as API_BASE_URL, BASE_URL2 } from "../api/config";
// optmize screen
// src/Screens/CustomersScreen.jsx
// Optimizations:
//   1. localStorage cache (5-min TTL) — instant repeat visits
//   2. useMemo for stats + filtered list — no recompute on every keystroke
//   3. AbortController — cleans up fetch on unmount
//   4. Alphabetical sort baked in
// src/Screens/CustomersScreen.jsx

// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users, Briefcase, Gavel, TrendingUp, Search, ChevronRight,
// } from "lucide-react";


// // ─── Cache helpers (5-min TTL) ────────────────────────────────────────────────
// const CACHE_KEY = "customers_list";
// // const CACHE_TTL = 5 * 60 * 1000;
// const CACHE_TTL = 2 * 60 * 1000; // 2 min
// function readCache() {
//   try {
//     const raw = localStorage.getItem(CACHE_KEY);
//     if (!raw) return null;
//     const { ts, data } = JSON.parse(raw);
//     if (Date.now() - ts > CACHE_TTL) return null;
//     return data;
//   } catch { return null; }
// }

// function writeCache(data) {
//   try {
//     localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
//   } catch { /* storage full — skip */ }
// }

// // ─── Concurrency limiter ──────────────────────────────────────────────────────
// async function limitConcurrency(tasks, limit = 8) {
//   const results = new Array(tasks.length);
//   let index = 0;
//   async function worker() {
//     while (index < tasks.length) {
//       const i = index++;
//       try { results[i] = await tasks[i](); }
//       catch { results[i] = { jobs: 0, bids: 0 }; }
//     }
//   }
//   await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
//   return results;
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({ title, count, growth, icon: Icon, accentColor = "#5CFF67", loading }) {
//   return (
//     <div
//       className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200"
//       style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)", cursor: "default" }}
//       onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(92,255,103,0.28)")}
//       onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(92,255,103,0.1)")}
//     >
//       <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
//         style={{ background: accentColor, opacity: 0.7 }} />

//       <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
//         style={{ background: "rgba(92,255,103,0.1)", color: accentColor }}>
//         <Icon size={17} />
//       </div>

//       {loading ? (
//         <div className="h-10 w-14 rounded-lg mb-1"
//           style={{ background: "rgba(92,255,103,0.07)", animation: "pulse 1.2s ease-in-out infinite" }} />
//       ) : (
//         <p className="text-4xl font-bold tracking-tight leading-none" style={{ color: "#FEFDFA" }}>
//           {count ?? "—"}
//         </p>
//       )}

//       <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider"
//         style={{ color: "rgba(254,253,250,0.38)", fontFamily: "monospace" }}>
//         {title}
//       </p>

//       <div className="mt-4 flex items-center gap-1 text-[11px]"
//         style={{ color: accentColor, fontFamily: "monospace" }}>
//         <TrendingUp size={12} /> {growth}
//       </div>

//       <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.85} }`}</style>
//     </div>
//   );
// }

// // ─── Avatar ───────────────────────────────────────────────────────────────────
// function Avatar({ name }) {
//   const initials = name
//     ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
//     : "??";
//   return (
//     <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
//       style={{ background: "#3C5B30", color: "#5CFF67", border: "1.5px solid rgba(92,255,103,0.22)" }}>
//       {initials}
//     </div>
//   );
// }

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// export default function CustomersScreen() {
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [totalJobs, setTotalJobs] = useState(null);
//   const [totalBids, setTotalBids] = useState(null);
//   const [jobsLoading, setJobsLoading] = useState(false);
//   const [search, setSearch]       = useState("");
//   const [filter, setFilter]       = useState("all");

//   // ── Fetch customers ───────────────────────────────────────────────────────
//   useEffect(() => {
//     const cached = readCache();
//     if (cached) {
//       setCustomers(cached);
//       setLoading(false);
//       return;
//     }

//     const controller = new AbortController();

//     fetch(`${API_BASE_URL}getuser.php`, { signal: controller.signal })
//       .then((res) => res.json())
//       .then((data) => {
//         const all = data.data || data || [];
//         const onlyCustomers = all.filter((item) => item.partner?.user_role === "Customer");
//         writeCache(onlyCustomers);
//         setCustomers(onlyCustomers);
//       })
//       .catch((err) => { if (err.name !== "AbortError") console.error(err); })
//       .finally(() => setLoading(false));

//     return () => controller.abort();
//   }, []);

//   // ── Fetch jobs + bids per customer (concurrency-limited) ─────────────────
//   useEffect(() => {
//     if (loading || customers.length === 0) return;

//     let cancelled = false;
//     setJobsLoading(true);

//     async function fetchActivity() {
//       const tasks = customers.map((item) => async () => {
//         const uid = item.partner?.user_id;
//         if (!uid) return { jobs: 0, bids: 0 };
//         const [jobRes, bidRes] = await Promise.allSettled([
//           fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocation/${uid}`).then((r) => r.json()),
//           fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${uid}`).then((r) => r.json()),
//         ]);
//         const jobCount =
//           jobRes.status === "fulfilled"
//             ? (Array.isArray(jobRes.value) ? jobRes.value.length : jobRes.value?.data?.length ?? 0)
//             : 0;
//         const bidCount =
//           bidRes.status === "fulfilled"
//             ? (bidRes.value?.totalBids ?? bidRes.value?.count ?? (Array.isArray(bidRes.value?.bids) ? bidRes.value.bids.length : 0))
//             : 0;
//         return { jobs: jobCount, bids: bidCount };
//       });

//       const results = await limitConcurrency(tasks, 8);

//       if (cancelled) return;

//       let jobs = 0, bids = 0;
//       results.forEach((r) => { jobs += r?.jobs ?? 0; bids += r?.bids ?? 0; });

//       // Attach per-customer counts back onto each customer
//       setCustomers((prev) =>
//         prev.map((item, i) => ({
//           ...item,
//           _jobs: results[i]?.jobs ?? 0,
//           _bids: results[i]?.bids ?? 0,
//         }))
//       );

//       setTotalJobs(jobs);
//       setTotalBids(bids);
//       setJobsLoading(false);
//     }

//     fetchActivity();
//     return () => { cancelled = true; };
//   }, [loading]);
// useEffect(() => {
//   async function fetchJobs() {
//     try {
//       const res = await fetch(
//         `${BASE_URL2.replace(/\/$/, "")}/getLocations?page=1&limit=1`
//       );

//       const data = await res.json();

//       setTotalJobs(data.total || 0);
//       console.log("total jobs ",data.total)
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   fetchJobs();
// }, []);
//   // ── Stats ─────────────────────────────────────────────────────────────────
//   const stats = useMemo(() => [
//     { title: "Total Customers", count: customers.length, growth: "+6 this month", icon: Users,     accentColor: "#5CFF67"  },
//     { title: "All Jobs",        count: totalJobs,        growth: "+7 this month", icon: Briefcase, accentColor: "#9EFD38", jobsLoading },
//     { title: "All Bids",        count: totalBids,        growth: "+9 this month", icon: Gavel,     accentColor: "#9EFD38", jobsLoading },
//   ], [customers, totalJobs, totalBids, jobsLoading]);

//   // ── Filtered + sorted list ────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();

//     return customers
//       .filter((item) => {
//         const p = item.partner || {};
//         return (
//           !q ||
//           (p.fullname     || "").toLowerCase().includes(q) ||
//           (p.email        || "").toLowerCase().includes(q) ||
//           (p.city         || "").toLowerCase().includes(q) ||
//           (p.phone_number || "").toLowerCase().includes(q)
//         );
//       })
//       .sort((a, b) =>
//         (a.partner?.fullname || "").toLowerCase()
//           .localeCompare((b.partner?.fullname || "").toLowerCase())
//       );
//   }, [customers, search]);

//   const filterButtons = [
//     { key: "all",        label: "All" },
//     { key: "has_jobs",   label: "Has Jobs" },
//     { key: "has_bids",   label: "Has Bids" },
//   ];

//   const filteredWithFilter = useMemo(() => {
//     if (filter === "has_jobs")  return filtered.filter((c) => (c._jobs ?? 0) > 0);
//     if (filter === "has_bids")  return filtered.filter((c) => (c._bids ?? 0) > 0);
//     return filtered;
//   }, [filtered, filter]);

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div className="flex min-h-screen" style={{ background: "#021616" }}>
//       <main className="flex-1 overflow-y-auto px-8 py-7">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold tracking-tight"
//             style={{ color: "#FEFDFA", letterSpacing: "-1px" }}>
//             Customers
//           </h1>
//           <p className="mt-1 text-sm" style={{ color: "rgba(254,253,250,0.4)", fontFamily: "monospace" }}>
//             {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//           </p>
//         </div>

//         {/* Stat Cards — only 3 */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//           {stats.map((s) => (
//             <StatCard key={s.title} {...s} loading={loading || s.jobsLoading} />
//           ))}
//         </div>

//         {/* Table */}
//         <div className="rounded-2xl overflow-hidden"
//           style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)" }}>

//           {/* Table Header */}
//           <div className="flex items-center justify-between px-6 py-4"
//             style={{ borderBottom: "1px solid rgba(92,255,103,0.08)" }}>
//             <div>
//               <h2 className="text-base font-bold"
//                 style={{ color: "#FEFDFA", letterSpacing: "-0.3px" }}>
//                 Customer Directory
//               </h2>
//               <p className="text-xs mt-0.5"
//                 style={{ color: "rgba(254,253,250,0.35)", fontFamily: "monospace" }}>
//                 {loading
//                   ? "Loading…"
//                   : `${filteredWithFilter.length} customer${filteredWithFilter.length !== 1 ? "s" : ""}${jobsLoading ? " · loading activity…" : ""}`}
//               </p>
//             </div>

//             {/* Search */}
//             <div className="flex items-center gap-2 rounded-xl px-3 py-2"
//               style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(92,255,103,0.12)" }}>
//               <Search size={13} style={{ color: "rgba(254,253,250,0.3)" }} />
//               <input
//                 type="text"
//                 placeholder="Search customers…"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="bg-transparent border-none outline-none text-xs w-44"
//                 style={{ color: "#FEFDFA", fontFamily: "monospace" }}
//               />
//             </div>
//           </div>

//           {/* Filter Pills */}
//           <div className="flex items-center gap-2 px-6 py-3"
//             style={{ borderBottom: "1px solid rgba(92,255,103,0.06)" }}>
//             {filterButtons.map((f) => (
//               <button key={f.key} onClick={() => setFilter(f.key)}
//                 className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150"
//                 style={filter === f.key
//                   ? { background: "rgba(92,255,103,0.12)", color: "#5CFF67", border: "1px solid rgba(92,255,103,0.28)", fontFamily: "monospace" }
//                   : { background: "transparent", color: "rgba(254,253,250,0.4)", border: "1px solid rgba(92,255,103,0.1)", fontFamily: "monospace", cursor: "pointer" }
//                 }>
//                 {f.label}
//               </button>
//             ))}
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   {["Customer", "Location", "Phone", "Jobs", "Bids", ""].map((h) => (
//                     <th key={h}
//                       className="text-left px-6 py-3 text-[10px] font-semibold uppercase tracking-widest"
//                       style={{ color: "rgba(254,253,250,0.28)", fontFamily: "monospace",
//                         borderBottom: "1px solid rgba(92,255,103,0.07)" }}>
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   Array.from({ length: 6 }).map((_, i) => (
//                     <tr key={i}>
//                       {Array.from({ length: 6 }).map((_, j) => (
//                         <td key={j} className="px-6 py-4">
//                           <div className="h-6 rounded-lg"
//                             style={{
//                               background: "rgba(92,255,103,0.05)",
//                               width: j === 0 ? "140px" : j === 5 ? "20px" : "60px",
//                               animation: `pulse 1.2s ease-in-out ${i * 0.08}s infinite`,
//                             }} />
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : filteredWithFilter.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="py-16 text-center">
//                       <p style={{ color: "rgba(254,253,250,0.25)", fontFamily: "monospace", fontSize: 13 }}>
//                         No customers found
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredWithFilter.map((item, index) => {
//                     const p = item.partner || {};

//                     return (
//                       <tr
//                         key={p.user_id || index}
//                         onClick={() => navigate(`/customer/${p.user_id}`)}
//                         className="transition-colors duration-100"
//                         style={{ borderBottom: "1px solid rgba(92,255,103,0.05)", cursor: "pointer" }}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(92,255,103,0.03)")}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                       >
//                         {/* Customer */}
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <Avatar name={p.fullname} />
//                             <div>
//                               <p className="text-sm font-semibold" style={{ color: "#FEFDFA" }}>
//                                 {p.fullname || "—"}
//                               </p>
//                               <p className="text-xs mt-0.5"
//                                 style={{ color: "rgba(254,253,250,0.38)", fontFamily: "monospace" }}>
//                                 {p.email || "—"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         {/* Location */}
//                         <td className="px-6 py-4">
//                           <span className="text-sm" style={{ color: "rgba(254,253,250,0.55)" }}>
//                             {[p.city, p.state].filter(Boolean).join(", ") || "—"}
//                           </span>
//                         </td>

//                         {/* Phone */}
//                         <td className="px-6 py-4">
//                           <span className="text-xs"
//                             style={{ color: "rgba(254,253,250,0.65)", fontFamily: "monospace" }}>
//                             {p.phone_number || "—"}
//                           </span>
//                         </td>

//                         {/* Jobs */}
//                         <td className="px-6 py-4">
//                           {jobsLoading ? (
//                             <div className="h-5 w-8 rounded"
//                               style={{ background: "rgba(92,255,103,0.05)", animation: "pulse 1.2s ease-in-out infinite" }} />
//                           ) : (
//                             <span className="text-sm font-semibold"
//                               style={{ color: (item._jobs ?? 0) > 0 ? "#9EFD38" : "rgba(254,253,250,0.25)", fontFamily: "monospace" }}>
//                               {item._jobs ?? "—"}
//                             </span>
//                           )}
//                         </td>

//                         {/* Bids */}
//                         <td className="px-6 py-4">
//                           {jobsLoading ? (
//                             <div className="h-5 w-8 rounded"
//                               style={{ background: "rgba(92,255,103,0.05)", animation: "pulse 1.2s ease-in-out infinite" }} />
//                           ) : (
//                             <span className="text-sm font-semibold"
//                               style={{ color: (item._bids ?? 0) > 0 ? "#5CDFDF" : "rgba(254,253,250,0.25)", fontFamily: "monospace" }}>
//                               {item._bids ?? "—"}
//                             </span>
//                           )}
//                         </td>

//                         {/* Arrow */}
//                         <td className="px-4 py-4">
//                           <ChevronRight size={15} style={{ color: "rgba(254,253,250,0.2)" }} />
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// them
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  Gavel,
  TrendingUp,
  Search,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";


// ─── Cache helpers (2-min TTL) ────────────────────────────────────────────────
const CACHE_KEY = "customers_list";
const CACHE_TTL = 2 * 60 * 1000;
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}
function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* storage full — skip */
  }
}

// ─── Concurrency limiter ──────────────────────────────────────────────────────
async function limitConcurrency(tasks, limit = 8) {
  const results = new Array(tasks.length);
  let index = 0;
  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      try {
        results[i] = await tasks[i]();
      } catch {
        results[i] = { jobs: 0, bids: 0 };
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, worker),
  );
  return results;
}

function getCustomerCreatedAt(item) {
  const value = item?.partner?.create_date  ?? item?.create_date ;
  if (!value) return null;
  const date = new Date(String(value).replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, count, growth, icon: Icon, accentColor, loading }) {
  const { colors } = useTheme();
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200"
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderSubtle}`,
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = colors.borderHover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = colors.borderSubtle)
      }
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: accentColor, opacity: 0.7 }}
      />

      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: colors.accentIconBg, color: accentColor }}
      >
        <Icon size={17} />
      </div>

      {loading ? (
        <div
          className="h-10 w-14 rounded-lg mb-1"
          style={{
            background: colors.accentSkeletonBg2,
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
      ) : (
        <p
          className="text-4xl font-bold tracking-tight leading-none"
          style={{ color: colors.textPrimary }}
        >
          {count ?? "—"}
        </p>
      )}

      <p
        className="mt-1 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: colors.textMono, fontFamily: "monospace" }}
      >
        {title}
      </p>

      <div
        className="mt-4 flex items-center gap-1 text-[11px]"
        style={{ color: accentColor, fontFamily: "monospace" }}
      >
        <TrendingUp size={12} /> {growth}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.85} }`}</style>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name }) {
  const { colors } = useTheme();
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{
        background: colors.avatarBg,
        color: colors.avatarColor,
        border: `1.5px solid ${colors.borderAvatar}`,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CustomersScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(null);
  const [totalBids, setTotalBids] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // ── Fetch customers ───────────────────────────────────────────────────────
  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setCustomers(cached);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    fetch(`${API_BASE_URL}getuser.php`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const all = data.data || data || [];
        const onlyCustomers = all.filter(
          (item) => item.partner?.user_role === "Customer",
        );
        writeCache(onlyCustomers);
        setCustomers(onlyCustomers);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // ── Fetch jobs + bids per customer (concurrency-limited) ─────────────────
  useEffect(() => {
    if (loading || customers.length === 0) return;
    let cancelled = false;
    setJobsLoading(true);

    async function fetchActivity() {
      const tasks = customers.map((item) => async () => {
        const uid = item.partner?.user_id;
        if (!uid) return { jobs: 0, bids: 0 };
        const [jobRes, bidRes] = await Promise.allSettled([
          fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocation/${uid}`).then((r) => r.json()),
          fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${uid}`).then(
            (r) => r.json(),
          ),
        ]);
        const jobCount =
          jobRes.status === "fulfilled"
            ? Array.isArray(jobRes.value)
              ? jobRes.value.length
              : (jobRes.value?.data?.length ?? 0)
            : 0;
        const bidCount =
          bidRes.status === "fulfilled"
            ? (bidRes.value?.totalBids ??
              bidRes.value?.count ??
              (Array.isArray(bidRes.value?.bids)
                ? bidRes.value.bids.length
                : 0))
            : 0;
        return { jobs: jobCount, bids: bidCount };
      });

      const results = await limitConcurrency(tasks, 8);
      if (cancelled) return;

      let jobs = 0,
        bids = 0;
      results.forEach((r) => {
        jobs += r?.jobs ?? 0;
        bids += r?.bids ?? 0;
      });

      setCustomers((prev) =>
        prev.map((item, i) => ({
          ...item,
          _jobs: results[i]?.jobs ?? 0,
          _bids: results[i]?.bids ?? 0,
        })),
      );
      setTotalJobs(jobs);
      setTotalBids(bids);
      setJobsLoading(false);
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, [loading]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocations?page=1&limit=1`);
        const data = await res.json();
        setTotalJobs(data.total || 0);
        console.log("total jobs", data.total);
      } catch (err) {
        console.log(err);
      }
    }
    fetchJobs();
  }, []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => [
      {
        title: "Total Customers",
        count: customers.length,
        growth: "+6 this month",
        icon: Users,
        accentColor: colors.accentPrimary,
      },
      {
        title: "All Jobs",
        count: totalJobs,
        growth: "+7 this month",
        icon: Briefcase,
        accentColor: colors.accentQuaternary,
        jobsLoading,
      },
      {
        title: "All Bids",
        count: totalBids,
        growth: "+9 this month",
        icon: Gavel,
        accentColor: colors.accentQuaternary,
        jobsLoading,
      },
    ],
    [customers, totalJobs, totalBids, jobsLoading, colors],
  );

  // ── Filtered + sorted list ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers
      .filter((item) => {
        const p = item.partner || {};
        const matchesSearch =
          !q ||
          (p.fullname || "").toLowerCase().includes(q) ||
          (p.email || "").toLowerCase().includes(q) ||
          (p.city || "").toLowerCase().includes(q) ||
          (p.phone_number || "").toLowerCase().includes(q);
        if (!matchesSearch || dateFilter === "all") return matchesSearch;

        const createdAt = getCustomerCreatedAt(item);
        if (!createdAt) return false;
        const today = startOfLocalDay(new Date());
        const createdDay = startOfLocalDay(createdAt);
        if (dateFilter === "today") return createdDay.getTime() === today.getTime();
        if (dateFilter === "week") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - ((today.getDay() + 6) % 7));
          return createdDay >= weekStart && createdDay <= today;
        }
        if (dateFilter === "month") {
          return createdAt.getFullYear() === today.getFullYear() && createdAt.getMonth() === today.getMonth();
        }
        if (dateFilter === "custom") {
          const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
          const to = dateTo ? new Date(`${dateTo}T23:59:59.999`) : null;
          return (!from || createdAt >= from) && (!to || createdAt <= to);
        }
        return true;
      })
      .sort((a, b) =>
        (a.partner?.fullname || "")
          .toLowerCase()
          .localeCompare((b.partner?.fullname || "").toLowerCase()),
      );
  }, [customers, search, dateFilter, dateFrom, dateTo]);

  const filterButtons = [
    { key: "all", label: "All" },
    { key: "has_jobs", label: "Has Jobs" },
    { key: "has_bids", label: "Has Bids" },
  ];

  const filteredWithFilter = useMemo(() => {
    if (filter === "has_jobs")
      return filtered.filter((c) => (c._jobs ?? 0) > 0);
    if (filter === "has_bids")
      return filtered.filter((c) => (c._bids ?? 0) > 0);
    return filtered;
  }, [filtered, filter]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen" style={{ background: colors.pageBg }}>
      <main className="flex-1 overflow-y-auto px-8 py-7">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: colors.textPrimary, letterSpacing: "-1px" }}
          >
            Customers
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: colors.textMuted, fontFamily: "monospace" }}
          >
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} loading={loading || s.jobsLoading} />
          ))}
        </div>

        {/* Table container */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.borderSubtle}`,
          }}
        >
          {/* Table Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `1px solid ${colors.borderMid}` }}
          >
            <div>
              <h2
                className="text-base font-bold"
                style={{ color: colors.textPrimary, letterSpacing: "-0.3px" }}
              >
                Customer Directory
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: colors.textMuted, fontFamily: "monospace" }}
              >
                {loading
                  ? "Loading…"
                  : `${filteredWithFilter.length} customer${filteredWithFilter.length !== 1 ? "s" : ""}${jobsLoading ? " · loading activity…" : ""}`}
              </p>
            </div>

            {/* Search */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.borderInput}`,
              }}
            >
              <Search size={13} style={{ color: colors.textMuted }} />
              <input
                type="text"
                placeholder="Search customers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-44"
                style={{ color: colors.textPrimary, fontFamily: "monospace" }}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div
            className="flex items-center gap-2 px-6 py-3"
            style={{ borderBottom: `1px solid ${colors.borderFaint}` }}
          >
            {filterButtons.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150"
                style={
                  filter === f.key
                    ? {
                        background: colors.accentNavActive,
                        color: colors.accentPrimary,
                        border: `1px solid ${colors.borderHover}`,
                        fontFamily: "monospace",
                      }
                    : {
                        background: "transparent",
                        color: colors.textMuted,
                        border: `1px solid ${colors.borderSubtle}`,
                        fontFamily: "monospace",
                        cursor: "pointer",
                      }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Registration date filters */}
          <div className="flex flex-wrap items-center gap-2 px-6 py-3" style={{ borderBottom: `1px solid ${colors.borderFaint}` }}>
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.textFaint, fontFamily: "monospace" }}>Joined</span>
            {[
              { key: "all", label: "Any time" },
              { key: "today", label: "Today" },
              { key: "week", label: "This week" },
              { key: "month", label: "This month" },
              { key: "custom", label: "From / to" },
            ].map((option) => (
              <button key={option.key} type="button" onClick={() => setDateFilter(option.key)} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: dateFilter === option.key ? colors.accentNavActive : "transparent", color: dateFilter === option.key ? colors.accentPrimary : colors.textMuted, border: `1px solid ${dateFilter === option.key ? colors.borderHover : colors.borderSubtle}`, fontFamily: "monospace", cursor: "pointer" }}>
                {option.label}
              </button>
            ))}
            {dateFilter === "custom" && (
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-[10px]" style={{ color: colors.textMuted }}>From <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg px-2 py-1 text-xs" style={{ background: colors.inputBg, color: colors.textPrimary, border: `1px solid ${colors.borderInput}` }} /></label>
                <label className="text-[10px]" style={{ color: colors.textMuted }}>To <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg px-2 py-1 text-xs" style={{ background: colors.inputBg, color: colors.textPrimary, border: `1px solid ${colors.borderInput}` }} /></label>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Customer", "Created At", "Location", "Phone", "Jobs", "Bids", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-[10px] font-semibold uppercase tracking-widest"
                        style={{
                          color: colors.textFaint,
                          fontFamily: "monospace",
                          borderBottom: `1px solid ${colors.borderFaint}`,
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div
                            className="h-6 rounded-lg"
                            style={{
                              background: colors.accentSkeletonBg,
                              width:
                                j === 0 ? "140px" : j === 5 ? "20px" : "60px",
                              animation: `pulse 1.2s ease-in-out ${i * 0.08}s infinite`,
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredWithFilter.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <p
                        style={{
                          color: colors.textVeryFaint,
                          fontFamily: "monospace",
                          fontSize: 13,
                        }}
                      >
                        No customers found
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredWithFilter.map((item, index) => {
                    const p = item.partner || {};
                    const createdAt = getCustomerCreatedAt(item);
                    const isNewCustomer = (() => {
                      if (!createdAt) return false;
                      const today = startOfLocalDay(new Date());
                      const cutoff = new Date(today);
                      cutoff.setDate(today.getDate() - 6);
                      return createdAt >= cutoff && createdAt <= new Date();
                    })();
                    return (
                      <tr
                        key={p.user_id || index}
                        onClick={() => navigate(`/customer/${p.user_id}`)}
                        className="transition-colors duration-100"
                        style={{
                          borderBottom: `1px solid ${colors.borderRow}`,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = colors.rowHoverBg)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={p.fullname} />
                            <div>
                              <p
                                className="text-sm font-semibold"
                                style={{ color: colors.textPrimary }}
                              >
                                {p.fullname || "—"}
                              </p>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                                <p className="text-xs" style={{ color: colors.textMono, fontFamily: "monospace" }}>{p.email || "—"}</p>
                                {isNewCustomer && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: colors.accentBadgeBg, color: colors.accentPrimary, border: `1px solid ${colors.borderHover}`, fontFamily: "monospace" }}>New</span>}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-xs" style={{ color: colors.textMono, fontFamily: "monospace" }}>
                            {createdAt ? createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4">
                          <span
                            className="text-sm"
                            style={{ color: colors.textSecondary }}
                          >
                            {[p.city, p.state].filter(Boolean).join(", ") ||
                              "—"}
                          </span>
                        </td>

                        {/* Phone */}
                        <td className="px-6 py-4">
                          <span
                            className="text-xs"
                            style={{
                              color: colors.textPhone,
                              fontFamily: "monospace",
                            }}
                          >
                            {p.phone_number || "—"}
                          </span>
                        </td>

                        {/* Jobs */}
                        <td className="px-6 py-4">
                          {jobsLoading ? (
                            <div
                              className="h-5 w-8 rounded"
                              style={{
                                background: colors.accentSkeletonBg,
                                animation: "pulse 1.2s ease-in-out infinite",
                              }}
                            />
                          ) : (
                            <span
                              className="text-sm font-semibold"
                              style={{
                                color:
                                  (item._jobs ?? 0) > 0
                                    ? colors.accentQuaternary
                                    : colors.textVeryFaint,
                                fontFamily: "monospace",
                              }}
                            >
                              {item._jobs ?? "—"}
                            </span>
                          )}
                        </td>

                        {/* Bids */}
                        <td className="px-6 py-4">
                          {jobsLoading ? (
                            <div
                              className="h-5 w-8 rounded"
                              style={{
                                background: colors.accentSkeletonBg,
                                animation: "pulse 1.2s ease-in-out infinite",
                              }}
                            />
                          ) : (
                            <span
                              className="text-sm font-semibold"
                              style={{
                                color:
                                  (item._bids ?? 0) > 0
                                    ? "#5CDFDF"
                                    : colors.textVeryFaint,
                                fontFamily: "monospace",
                              }}
                            >
                              {item._bids ?? "—"}
                            </span>
                          )}
                        </td>

                        {/* Arrow */}
                        <td className="px-4 py-4">
                          <ChevronRight
                            size={15}
                            style={{ color: colors.textFaint }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
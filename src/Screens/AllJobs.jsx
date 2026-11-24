import { BASE_URL2 } from "../api/config";
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  Calendar,
  Truck,
  CircleDot,
  Gavel,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function fmt(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function currentMonthInputValue() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function matchesDateFilter(value, filter, customMonth) {
  if (filter === "all") return true;
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();

  if (filter === "today") {
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
  }
  if (filter === "yesterday") {
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    return date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate();
  }
  if (filter === "thisMonth") {
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }
  if (filter === "thisYear") return date.getFullYear() === now.getFullYear();
  if (filter === "customMonth") {
    const [year, month] = (customMonth || "").split("-").map(Number);
    return Boolean(year && month) && date.getFullYear() === year && date.getMonth() === month - 1;
  }
  return true;
}

function getMoveType(job) {
  const raw = String(job.moveType || job.jobDetails?.goodsType || job.jobDetails?.transportDescription || "").trim();
  const normalized = raw.toLowerCase().replace(/[_-]+/g, " ");
  if (normalized.includes("intercity") || normalized.includes("inter city")) return "Intercity";
  if (normalized.includes("complex")) return "Within Complex";
  if (normalized.includes("within") || normalized.includes("with in") || normalized.includes("city")) return "Within City";
  return raw || "Not specified";
}

function getServiceLabels(job) {
  const labels = [];
  const serviceDetails = job.serviceDetails || {};
  const jobDetails = job.jobDetails || {};
  const additional = serviceDetails.additionalServices || jobDetails.additionalServices || [];
  if (Array.isArray(additional)) {
    additional.forEach((item) => {
      const label = typeof item === "string" ? item : item?.label || item?.name || item?.title;
      if (label) labels.push(label);
    });
  }
  const flags = [
    ["Packing", serviceDetails.packingRequired || jobDetails.packingRequired],
    ["Insurance", serviceDetails.insuranceRequired || jobDetails.insuranceRequired],
    ["Storage", serviceDetails.storageRequired || jobDetails.storageRequired],
    ["Dismantling", serviceDetails.dismantlingRequired || jobDetails.dismantlingRequired],
  ];
  flags.forEach(([label, value]) => {
    if (String(value || "").toLowerCase() === "yes" && !labels.includes(label)) labels.push(label);
  });
  const custom = serviceDetails.customServiceDescription || jobDetails.customServiceDescription;
  if (custom && !labels.includes(custom)) labels.push(custom);
  return labels;
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    if (!value.length) return "None";
    return value.map((item) => typeof item === "object" ? item?.label || item?.name || item?.title || JSON.stringify(item) : String(item)).join(", ");
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function prettyLabel(value) {
  return String(value).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());
}

function StatusBadge({ status }) {
  const { colors } = useTheme();
  const isProgress = status === "In Progress";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, background: isProgress ? colors.chipVerifiedBg : colors.chipPendingBg, color: isProgress ? colors.chipVerifiedColor : colors.chipPendingColor, border: `1px solid ${isProgress ? colors.chipVerifiedBorder : colors.chipPendingBorder}`, fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>
      <CircleDot size={9} />{status || "Job Posted"}
    </span>
  );
}

function MoveBadge({ moveType }) {
  const { colors } = useTheme();
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: colors.accentIconBg, color: colors.textSecondary, border: `1px solid ${colors.borderSubtle}`, fontSize: 10, fontWeight: 700, fontFamily: "monospace" }}>
      <Truck size={10} />{moveType}
    </span>
  );
}

function Skeleton({ width = "100%", height = 16, radius = 6 }) {
  const { colors } = useTheme();
  return <div style={{ width, height, borderRadius: radius, background: colors.accentSkeletonBg, animation: "skPulse 1.4s ease-in-out infinite" }} />;
}

function JobCardSkeleton() {
  const { colors } = useTheme();
  return (
    <div style={{ background: colors.cardBg, border: `1px solid ${colors.borderMid}`, borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Skeleton width={40} height={40} radius={40} /><div style={{ display: "grid", gap: 6 }}><Skeleton width={140} height={14} /><Skeleton width={90} height={11} /></div></div>
        <Skeleton width={90} height={30} radius={10} />
      </div>
      <Skeleton width="100%" height={52} radius={10} />
    </div>
  );
}

function ModalField({ label, value, colors }) {
  return (
    <div style={{ minWidth: 0, padding: "11px 12px", borderRadius: 11, background: colors.inputBg, border: `1px solid ${colors.borderSubtle}` }}>
      <div style={{ marginBottom: 5, color: colors.textFaint, fontSize: 10, fontFamily: "monospace", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ color: colors.textPrimary, fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>{displayValue(value)}</div>
    </div>
  );
}

function firstAvailable(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "") ?? "Not available";
}

function placeAddress(place = {}) {
  const street = [place.addressLine1, place.addressLine2]
    .filter((value) => value !== undefined && value !== null && String(value).trim());
  const location = String(place.location || "").trim();
  const area = location || [place.city, place.state, place.pincode]
    .filter((value) => value !== undefined && value !== null && String(value).trim())
    .join(", ");
  return [...street, area].filter(Boolean).join(", ") || "Not available";
}

function formatQuote(value) {
  if (value === undefined || value === null || value === "") return null;
  const amount = Number(value);
  return Number.isFinite(amount) ? `₹${amount.toLocaleString("en-IN")}` : String(value);
}

function InventoryItem({ item, index }) {
  const title = item.title || `Item ${index + 1}`;
  const quantity = item.qty ?? 1;
  const subtitle = item.subtitle && item.subtitle !== "0" ? item.subtitle : null;

  return (
    <div style={{ minWidth: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#f6f9f7", border: "1px solid #d8e4de", fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: "#17251f", fontSize: 13, fontWeight: 650, lineHeight: 1.4, overflowWrap: "anywhere" }}>{title}</div>
        {subtitle && <div style={{ marginTop: 3, color: "#52645b", fontSize: 11, lineHeight: 1.4 }}>{subtitle}</div>}
      </div>
      <span style={{ flexShrink: 0, minWidth: 48, padding: "5px 9px", textAlign: "center", borderRadius: 999, background: "#dcefe5", color: "#12613f", fontSize: 11, fontWeight: 750 }}>× {quantity}</span>
    </div>
  );
}

function JobDetailsModal({ job, onClose }) {
  const { colors } = useTheme();
  const [detailJob, setDetailJob] = useState(job);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState("");
  const activeJob = detailJob;
  const details = activeJob.jobDetails || {};
  const service = activeJob.serviceDetails || {};
  const contact = activeJob.customer || activeJob.user || {};
  const name = firstAvailable(activeJob.name, activeJob.customerName, contact.name, activeJob.userName);
  const phone = firstAvailable(activeJob.customerPhone, activeJob.phone, activeJob.phoneNumber, activeJob.mobile, activeJob.mobileNumber, activeJob.contactNumber, contact.phone, contact.mobile, activeJob.userPhone);
  const email = firstAvailable(activeJob.customerEmail, activeJob.email, activeJob.emailAddress, contact.email, activeJob.userEmail);
  const directQuote = activeJob.quotation ?? activeJob.quotationPrice ?? activeJob.quotedPrice ?? activeJob.finalQuotation;
  const quoteRecords = activeJob.quotationList?.length ? activeJob.quotationList : (activeJob.bids || []);
  const bidQuotes = quoteRecords.map((bid, index) => {
    const amount = formatQuote(bid?.quotation ?? bid?.amount);
    return amount ? `Quote ${index + 1}: ${amount}${bid?.status ? ` (${bid.status})` : ""}` : null;
  }).filter(Boolean);
  const quotation = formatQuote(directQuote) || (bidQuotes.length ? bidQuotes.join(" · ") : "No quotation yet");
  const packingFields = [
    ["Packing required", service.packingRequired ?? details.packingRequired],
    ["Packing days", details.packingDays],
    ["Packing layers", service.packingLayers?.length ? service.packingLayers : details.selectedPackingLayers],
    ["Packing packages", details.selectedPackingPackages],
    ["Returnable packing", details.selectedReturnable],
  ].filter(([, value]) => value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length));
  const serviceFields = [
    ["Additional services", service.additionalServices],
    ["Insurance", service.insuranceRequired],
    ["Storage", service.storageRequired],
    ["Dismantling", service.dismantlingRequired],
    ["Estimated value", service.estimatedValue],
    ["Custom service", service.customServiceDescription || details.customServiceDescription],
    ["Additional notes", details.additionalCustomNotes],
  ].filter(([, value]) => value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length));

  useEffect(() => {
    const controller = new AbortController();
    const loadJobDetails = async () => {
      setDetailLoading(true);
      setDetailError("");
      try {
        const url = `${BASE_URL2.replace(/\/$/, "")}/getLocation/${encodeURIComponent(job._id)}`;
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || `Could not load this job (HTTP ${response.status}).`);
        }
        setDetailJob((current) => ({
          ...current,
          ...result.data,
          customerPhone: result.data.customerPhone || result.data.phone || current.customerPhone || "",
          customerEmail: result.data.customerEmail || result.data.email || current.customerEmail || "",
        }));
      } catch (error) {
        if (error.name !== "AbortError") setDetailError(error.message || "Could not load the latest job details.");
      } finally {
        if (!controller.signal.aborted) setDetailLoading(false);
      }
    };
    if (job._id) loadJobDetails();
    else setDetailLoading(false);
    return () => controller.abort();
  }, [job._id]);

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", padding: 18, background: "rgba(0,0,0,.58)", backdropFilter: "blur(5px)" }}>
      <div role="dialog" aria-modal="true" aria-label="Job details" onClick={(event) => event.stopPropagation()} style={{ width: "min(850px, 100%)", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", background: colors.cardBg, color: colors.textPrimary, border: `1px solid ${colors.borderMid}`, borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,.28)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", borderBottom: `1px solid ${colors.borderRow}` }}>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ color: colors.textFaint, fontSize: 10, fontFamily: "monospace", letterSpacing: ".08em", textTransform: "uppercase" }}>Customer & job details</div><h2 style={{ margin: "4px 0 0", fontSize: 19, color: colors.textPrimary }}>{name}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close job details" style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 10, border: `1px solid ${colors.borderInput}`, background: colors.inputBg, color: colors.textSecondary, cursor: "pointer" }}><X size={17} /></button>
        </div>
        <div style={{ padding: "18px 22px", overflowY: "auto" }}>
          {detailLoading && <p role="status" style={{ margin: "0 0 12px", color: colors.textMuted, fontSize: 12 }}>Loading latest customer and job details…</p>}
          {detailError && <p role="alert" style={{ margin: "0 0 12px", padding: 10, borderRadius: 9, background: colors.chipRejectedBg, color: colors.chipRejectedColor, fontSize: 12 }}>Could not refresh from getLocation: {detailError}. Showing available list data.</p>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 18 }}>
            <ModalField label="Customer name" value={name} colors={colors} />
            <ModalField label="Number" value={phone} colors={colors} />
            <ModalField label="Email" value={email} colors={colors} />
            <ModalField label="Quotation price" value={quotation} colors={colors} />
            <ModalField label="Publish type" value={activeJob.publishType} colors={colors} />
            <ModalField label="Good type" value={details.goodsType || details.transportDescription || activeJob.moveType} colors={colors} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 18 }}>
            <section style={{ padding: 14, borderRadius: 13, background: colors.inputBg, border: `1px solid ${colors.borderSubtle}` }}><h3 style={{ margin: "0 0 8px", color: colors.textPrimary, fontSize: 13 }}>Pickup address</h3><p style={{ margin: 0, color: colors.textSecondary, fontSize: 12, lineHeight: 1.6 }}>{placeAddress(activeJob.pickup)}</p></section>
            <section style={{ padding: 14, borderRadius: 13, background: colors.inputBg, border: `1px solid ${colors.borderSubtle}` }}><h3 style={{ margin: "0 0 8px", color: colors.textPrimary, fontSize: 13 }}>Drop address</h3><p style={{ margin: 0, color: colors.textSecondary, fontSize: 12, lineHeight: 1.6 }}>{placeAddress(activeJob.drop)}</p></section>
          </div>

          {packingFields.length > 0 && <section style={{ marginBottom: 18 }}><h3 style={{ margin: "0 0 10px", color: colors.textPrimary, fontSize: 13 }}>Packing details</h3><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>{packingFields.map(([label, value]) => <ModalField key={label} label={label} value={value} colors={colors} />)}</div></section>}
          {serviceFields.length > 0 && <section style={{ marginBottom: 18 }}><h3 style={{ margin: "0 0 10px", color: colors.textPrimary, fontSize: 13 }}>Service details</h3><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>{serviceFields.map(([label, value]) => <ModalField key={label} label={label} value={value} colors={colors} />)}</div></section>}

          <section>
            <h3 style={{ margin: "0 0 10px", color: colors.textPrimary, fontSize: 13 }}>Inventory ({(activeJob.inventory || []).length})</h3>
            {(activeJob.inventory || []).length ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>{activeJob.inventory.map((item, index) => <InventoryItem key={item._id || `${item.title}-${index}`} item={item} index={index} />)}</div> : <p style={{ margin: 0, color: colors.textMuted, fontSize: 12 }}>No inventory listed.</p>}
          </section>
        </div>
        <div style={{ padding: "12px 22px", textAlign: "right", borderTop: `1px solid ${colors.borderRow}` }}><button type="button" onClick={onClose} style={{ padding: "9px 16px", borderRadius: 10, border: 0, background: colors.accentPrimary, color: colors.pageBg, fontWeight: 700, cursor: "pointer" }}>Close</button></div>
      </div>
    </div>
  );
}

function JobCard({ job, index }) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const initials = (job.name || "Customer").split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  const services = getServiceLabels(job);
  const pickup = job.pickup?.city || job.pickup?.location || job.pickup?.addressLine1 || "Pickup not provided";
  const drop = job.drop?.city || job.drop?.location || job.drop?.addressLine1 || "Drop location not provided";

  return (
    <>
      <article role="button" tabIndex={0} onClick={() => setIsOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setIsOpen(true); } }} style={{ background: colors.cardBg, border: `1px solid ${colors.borderMid}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color .2s, box-shadow .2s, transform .2s", boxShadow: "0 4px 18px rgba(0,0,0,.05)", animation: "fadeUp .3s ease both", animationDelay: `${index * 35}ms` }} onMouseEnter={(event) => { event.currentTarget.style.borderColor = colors.borderHover; event.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(event) => { event.currentTarget.style.borderColor = colors.borderMid; event.currentTarget.style.transform = "none"; }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${colors.accentPrimary}, ${colors.accentQuaternary}, transparent)` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "16px 18px" }}>
          {job.image ? <img src={job.image} alt="" style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", objectFit: "cover", border: `1px solid ${colors.borderAvatar}` }} onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div style={{ width: 44, height: 44, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", background: colors.avatarBg, border: `1px solid ${colors.borderAvatar}`, color: colors.avatarColor, fontSize: 13, fontWeight: 800 }}>{initials}</div>}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><span style={{ color: colors.textPrimary, fontSize: 15, fontWeight: 750 }}>{job.name || "Customer"}</span><StatusBadge status={job.jobDetails?.status} /><MoveBadge moveType={getMoveType(job)} /></div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "5px 14px", marginTop: 7, color: colors.textMuted, fontSize: 12 }}><span><MapPin size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{pickup} → {drop}</span><span><Calendar size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{fmt(job.createdAt)}</span></div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 9 }}>{(services.length ? services : ["Moving service"]).map((service) => <span key={service} style={{ padding: "3px 9px", borderRadius: 20, background: colors.accentIconBg, border: `1px solid ${colors.borderSubtle}`, color: colors.textSecondary, fontSize: 10 }}>{service}</span>)}</div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right", color: colors.accentPrimary }}><div style={{ fontSize: 17, fontWeight: 800 }}>{job.bidCount || 0}</div><div style={{ color: colors.textFaint, fontSize: 10 }}>bids</div><div style={{ marginTop: 5, color: colors.textMuted, fontSize: 10 }}>View details →</div></div>
        </div>
      </article>
      {isOpen && <JobDetailsModal job={job} onClose={() => setIsOpen(false)} />}
    </>
  );
}

// ── Summary Bar ───────────────────────────────────────────────────────────────
function SummaryBar({ jobs, activeStat, onSelect }) {
  const { colors } = useTheme();
  const total = jobs.length;
  const inProgress = jobs.filter(
    (j) => j.jobDetails?.status === "In Progress",
  ).length;
  const posted = jobs.filter(
    (j) => j.jobDetails?.status === "Job Posted",
  ).length;
  const totalBids = jobs.reduce((a, j) => a + (j.bidCount || 0), 0);
  const intercity = jobs.filter((job) => getMoveType(job) === "Intercity").length;
  const withinCity = jobs.filter((job) => getMoveType(job) === "Within City").length;
  const withinComplex = jobs.filter((job) => getMoveType(job) === "Within Complex").length;

  const cells = [
    { key: "all", label: "Total Jobs", value: total, color: colors.accentPrimary },
    { key: "inProgress", label: "In Progress", value: inProgress, color: colors.accentQuaternary },
    { key: "posted", label: "Job Posted", value: posted, color: colors.accentSecondary },
    { key: "withBids", label: "Total Bids", value: totalBids, color: colors.chipPaidColor },
    { key: "intercity", label: "Intercity", value: intercity, color: colors.accentSecondary },
    { key: "withinCity", label: "Within City", value: withinCity, color: colors.accentPrimary },
    { key: "withinComplex", label: "Within Complex", value: withinComplex, color: colors.accentQuaternary },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {cells.map(({ key, label, value, color }) => {
        const selected = activeStat === key;
        return (
        <button
          type="button"
          key={key}
          aria-pressed={selected}
          onClick={() => onSelect(key)}
          style={{
            appearance: "none",
            textAlign: "left",
            cursor: "pointer",
            background: selected ? colors.accentIconBg : colors.cardBg,
            border: `1px solid ${selected ? color : colors.borderMid}`,
            borderRadius: 14,
            padding: "14px 16px",
            transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
            boxShadow: selected ? `0 0 0 2px ${color}20` : "none",
          }}
          onMouseEnter={(event) => { event.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(event) => { event.currentTarget.style.transform = "none"; }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color,
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            {value}
          </p>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "monospace",
              color: colors.textFaint,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "4px 0 0",
            }}
          >
            {label}
          </p>
        </button>
        );
      })}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JobsScreen() {
  const { colors, isDark } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeStat, setActiveStat] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [customMonth, setCustomMonth] = useState(currentMonthInputValue);

  const loadJobs = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    const pageSize = 100;
    const endpoint = `${BASE_URL2.replace(/\/$/, "")}/getLocations`;
    const fetchPage = async (page) => {
      const response = await fetch(`${endpoint}?page=${page}&limit=${pageSize}`);
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || `Could not load jobs (HTTP ${response.status}).`);
      }
      if (!Array.isArray(result.data)) {
        throw new Error("The jobs API returned an invalid data list.");
      }
      return result;
    };

    try {
      const firstPage = await fetchPage(1);
      const totalPages = Math.max(1, Number(firstPage.totalPages) || 1);
      const remainingPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) => fetchPage(index + 2)),
      );
      setJobs([
        ...firstPage.data,
        ...remainingPages.flatMap((page) => page.data),
      ]);
    } catch (e) {
      setError(e.message || "Could not load jobs.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filtered = jobs.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (job.pickup?.city || "").toLowerCase().includes(q) ||
      (job.drop?.city || "").toLowerCase().includes(q) ||
      (job.pickup?.state || "").toLowerCase().includes(q) ||
      (job.drop?.state || "").toLowerCase().includes(q) ||
      (job.pickup?.location || "").toLowerCase().includes(q) ||
      (job.drop?.location || "").toLowerCase().includes(q) ||
      (job.name || "").toLowerCase().includes(q);
    const matchFilter =
      activeFilter === "all" || job.jobDetails?.status === activeFilter;
    const moveType = getMoveType(job);
    const matchDate = matchesDateFilter(job.createdAt, dateFilter, customMonth);
    const matchStat =
      activeStat === "all" ||
      (activeStat === "inProgress" && job.jobDetails?.status === "In Progress") ||
      (activeStat === "posted" && job.jobDetails?.status === "Job Posted") ||
      (activeStat === "withBids" && Number(job.bidCount || 0) > 0) ||
      (activeStat === "intercity" && moveType === "Intercity") ||
      (activeStat === "withinCity" && moveType === "Within City") ||
      (activeStat === "withinComplex" && moveType === "Within Complex");
    return matchSearch && matchFilter && matchStat && matchDate;
  });

  const filters = [
    { key: "all", label: "All", color: colors.accentPrimary },
    {
      key: "In Progress",
      label: "In Progress",
      color: colors.accentQuaternary,
    },
    { key: "Job Posted", label: "Job Posted", color: colors.accentSecondary },
  ];

  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
        transition: "background 0.25s ease",
      }}
    >
      <style>{`
        @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes spin    { to{transform:rotate(360deg)} }
      `}</style>

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: colors.accentIconBg,
              border: `1px solid ${colors.borderInput}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gavel size={22} color={colors.accentPrimary} />
          </div>
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: colors.textPrimary,
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              All Jobs
            </h1>
            <p
              style={{
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "monospace",
                marginTop: 2,
              }}
            >
              Showing {filtered.length} of {jobs.length} jobs
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: colors.inputBg,
              border: `1px solid ${colors.borderInput}`,
              borderRadius: 10,
              padding: "7px 12px",
            }}
          >
            <Search size={13} color={colors.textMuted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city, name…"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: colors.textPrimary,
                fontSize: 13,
                width: 200,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Posted date filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 38, padding: "5px 10px", border: `1px solid ${dateFilter !== "all" ? colors.accentPrimary : colors.borderInput}`, borderRadius: 10, background: colors.inputBg, boxShadow: dateFilter !== "all" ? `0 0 0 2px ${colors.accentPrimary}18` : "none" }}>
            <Calendar size={14} color={dateFilter !== "all" ? colors.accentPrimary : colors.textMuted} />
            <span style={{ color: colors.textMuted, fontSize: 11, fontWeight: 650 }}>Posted</span>
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              aria-label="Filter jobs by posted date"
              style={{ minWidth: 105, border: 0, outline: "none", background: "transparent", color: colors.textPrimary, colorScheme: isDark ? "dark" : "light", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              <option value="all" style={{ background: colors.cardBg, color: colors.textPrimary }}>All dates</option>
              <option value="today" style={{ background: colors.cardBg, color: colors.textPrimary }}>Today</option>
              <option value="yesterday" style={{ background: colors.cardBg, color: colors.textPrimary }}>Yesterday</option>
              <option value="thisMonth" style={{ background: colors.cardBg, color: colors.textPrimary }}>This month</option>
              <option value="thisYear" style={{ background: colors.cardBg, color: colors.textPrimary }}>This year</option>
              <option value="customMonth" style={{ background: colors.cardBg, color: colors.textPrimary }}>Choose month…</option>
            </select>
            {dateFilter === "customMonth" && <input
              type="month"
              value={customMonth}
              onChange={(event) => setCustomMonth(event.target.value)}
              aria-label="Choose a month"
              style={{ width: 142, border: `1px solid ${colors.borderInput}`, borderRadius: 8, padding: "6px 8px", background: colors.cardBg, color: colors.textPrimary, colorScheme: isDark ? "dark" : "light", fontSize: 12, cursor: "pointer" }}
            />}
          </div>

          {/* Filter pills */}
          {filters.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "monospace",
                border:
                  activeFilter === key
                    ? `1px solid ${color}`
                    : `1px solid ${colors.borderSubtle}`,
                background:
                  activeFilter === key ? `${color}18` : colors.accentIconBg,
                color: activeFilter === key ? color : colors.textMuted,
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}

          {/* Refresh */}
          <button
            onClick={() => loadJobs(true)}
            disabled={loading || refreshing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: colors.accentIconBg,
              color: colors.accentPrimary,
              border: `1px solid ${colors.borderInput}`,
              borderRadius: 10,
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 12,
              opacity: loading || refreshing ? 0.5 : 1,
            }}
          >
            <RefreshCw
              size={13}
              style={{
                animation: refreshing ? "spin 0.8s linear infinite" : "none",
              }}
            />{" "}
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      {!loading && <SummaryBar
        jobs={jobs}
        activeStat={activeStat}
        onSelect={(key) => setActiveStat((current) => current === key && key !== "all" ? "all" : key)}
      />}

      {/* Error */}
      {error && !loading && (
        <div
          style={{
            background: colors.chipRejectedBg,
            border: `1px solid ${colors.chipRejectedBorder}`,
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: colors.chipRejectedColor,
              fontWeight: 600,
            }}
          >
            Failed to load jobs — {error}
          </span>
          <button
            onClick={() => loadJobs()}
            style={{
              marginLeft: "auto",
              background: colors.chipRejectedBg,
              color: colors.chipRejectedColor,
              border: `1px solid ${colors.chipRejectedBorder}`,
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.borderMid}`,
              borderRadius: 16,
              padding: "64px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderInput}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Gavel
                size={24}
                color={colors.accentPrimary}
                style={{ opacity: 0.4 }}
              />
            </div>
            <p
              style={{ fontSize: 15, fontWeight: 600, color: colors.textMuted }}
            >
              No jobs found
            </p>
            <p
              style={{
                fontSize: 12,
                color: colors.textFaint,
                fontFamily: "monospace",
              }}
            >
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          filtered.map((job, i) => (
            <JobCard key={job._id} job={job} index={i} />
          ))
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11,
            fontFamily: "monospace",
            color: colors.textFaint,
          }}
        >
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} · sorted by
          latest first
        </p>
      )}
    </div>
  );
}
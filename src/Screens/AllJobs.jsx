import { BASE_URL2 } from "../api/config";
// import { useEffect, useState } from "react";
// import {
//   Search, RefreshCw, MapPin, Flag, Calendar, Clock,
//   Home, Shield, Package, Truck, Users, CircleDot,
//   ChevronDown, ChevronUp, Gavel,
// } from "lucide-react";


// function fmt(d) {
//   if (!d) return "—";
//   return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
// }
// function fmtTime(d) {
//   if (!d) return "—";
//   return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
// }
// function moveLabel(m) {
//   if (m === "intercity") return "Intercity";
//   if (m === "within_complex") return "Within Complex";
//   return m || "—";
// }

// function Skeleton({ width = "100%", height = 16, radius = 6 }) {
//   return (
//     <div
//       style={{
//         width, height, borderRadius: radius,
//         background: "rgba(255,255,255,0.06)",
//         animation: "skPulse 1.4s ease-in-out infinite",
//       }}
//     />
//   );
// }

// function JobCardSkeleton() {
//   return (
//     <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <Skeleton width={40} height={40} radius={40} />
//           <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//             <Skeleton width={140} height={14} />
//             <Skeleton width={90} height={11} />
//           </div>
//         </div>
//         <Skeleton width={90} height={30} radius={10} />
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//         <Skeleton width="100%" height={80} radius={10} />
//         <Skeleton width="100%" height={80} radius={10} />
//       </div>
//       <Skeleton width="100%" height={40} radius={10} />
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const isProgress = status === "In Progress";
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 4,
//       fontSize: 10, fontWeight: 700, fontFamily: "monospace",
//       padding: "3px 10px", borderRadius: 20,
//       background: isProgress ? "rgba(92,255,103,0.12)" : "rgba(183,246,110,0.08)",
//       color: isProgress ? "#5CFF67" : "#B7F66E",
//       border: `1px solid ${isProgress ? "rgba(92,255,103,0.3)" : "rgba(183,246,110,0.2)"}`,
//     }}>
//       <CircleDot size={9} />{status}
//     </span>
//   );
// }

// function MoveBadge({ moveType }) {
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 4,
//       fontSize: 10, fontWeight: 700, fontFamily: "monospace",
//       padding: "3px 10px", borderRadius: 20,
//       background: "rgba(92,255,103,0.06)",
//       color: "rgba(254,253,250,0.5)",
//       border: "1px solid rgba(92,255,103,0.12)",
//     }}>
//       <Truck size={9} />{moveLabel(moveType)}
//     </span>
//   );
// }

// function DetailRow({ icon: Icon, label, value }) {
//   return (
//     <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
//       <Icon size={13} color="rgba(92,255,103,0.5)" style={{ marginTop: 2, flexShrink: 0 }} />
//       <div>
//         <div style={{ fontSize: 10, color: "rgba(254,253,250,0.3)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#FEFDFA", marginTop: 1 }}>{value}</div>
//       </div>
//     </div>
//   );
// }

// function JobCard({ job, index, onViewBids }) {
//   const [expanded, setExpanded] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const services = [];
//   if (job.serviceDetails?.insuranceRequired === "Yes") services.push("Insurance");
//   if (job.serviceDetails?.storageRequired === "Yes") services.push("Storage");
//   if (job.serviceDetails?.dismantlingRequired === "Yes") services.push("Dismantling");
//   if (job.serviceDetails?.packingRequired === "Yes") services.push("Packing");

//   const inv = (job.inventory || []).slice(0, 5);
//   const extra = (job.inventory || []).length - 5;

//   const initials = (job.name || "??").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#1A2421",
//         border: `1px solid ${hovered ? "rgba(92,255,103,0.25)" : "rgba(92,255,103,0.08)"}`,
//         borderRadius: 16,
//         overflow: "hidden",
//         transition: "border-color 0.2s, box-shadow 0.2s",
//         boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.4)" : "none",
//         animation: "fadeUp 0.3s ease both",
//         animationDelay: `${index * 50}ms`,
//       }}
//     >
//       {/* Green accent line */}
//       <div style={{ height: 2, background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)" }} />

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(92,255,103,0.07)" }}>
//         {job.image ? (
//           <img src={job.image} alt={job.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1.5px solid rgba(92,255,103,0.22)" }} onError={(e) => { e.target.style.display = "none"; }} />
//         ) : (
//           <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#3C5B30", border: "1.5px solid rgba(92,255,103,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#5CFF67", flexShrink: 0 }}>
//             {initials}
//           </div>
//         )}
//         <div style={{ flex: 1 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//             <span style={{ fontSize: 15, fontWeight: 700, color: "#FEFDFA" }}>{job.name}</span>
//             <StatusBadge status={job.jobDetails?.status} />
//             <MoveBadge moveType={job.moveType} />
//           </div>
//           <div style={{ fontSize: 11, color: "rgba(254,253,250,0.3)", fontFamily: "monospace", marginTop: 3 }}>
//             <Calendar size={10} style={{ verticalAlign: -1, marginRight: 3 }} />
//             Posted {fmt(job.createdAt)}&nbsp;·&nbsp;
//             ID: <span style={{ color: "rgba(254,253,250,0.18)" }}>{job._id.slice(-8)}</span>
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <div style={{ textAlign: "right" }}>
//             <div style={{ fontSize: 16, fontWeight: 800, color: "#5CFF67", letterSpacing: "-0.3px" }}>{job.bidCount}</div>
//             <div style={{ fontSize: 10, color: "rgba(254,253,250,0.3)", fontFamily: "monospace" }}>bid{job.bidCount !== 1 ? "s" : ""}</div>
//           </div>
//           {job.bidCount > 0 && onViewBids && (
//             <button
//               onClick={() => onViewBids(job)}
//               style={{
//                 display: "inline-flex", alignItems: "center", gap: 5,
//                 background: "rgba(92,255,103,0.08)", color: "#5CFF67",
//                 border: "1px solid rgba(92,255,103,0.25)", borderRadius: 10,
//                 padding: "6px 14px", cursor: "pointer", fontSize: 11,
//                 fontWeight: 700, fontFamily: "monospace",
//               }}
//             >
//               <Gavel size={11} /> View Bids
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Body: Route + Details */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
//         {/* Route */}
//         <div style={{ padding: "16px 20px", borderRight: "1px solid rgba(92,255,103,0.07)" }}>
//           <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: "rgba(92,255,103,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
//             <MapPin size={11} /> Pickup
//           </div>
//           <div style={{ fontSize: 15, fontWeight: 700, color: "#FEFDFA" }}>{job.pickup?.city || "—"}</div>
//           <div style={{ fontSize: 12, color: "rgba(254,253,250,0.4)" }}>{job.pickup?.state || "—"}</div>
//           <div style={{ fontSize: 11, color: "rgba(254,253,250,0.25)", marginTop: 2, lineHeight: 1.4 }}>{job.pickup?.addressLine1}</div>

//           <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "10px 0" }}>
//             <div style={{ flex: 1, height: 1, background: "rgba(92,255,103,0.12)" }} />
//             <span style={{ fontSize: 12, color: "rgba(92,255,103,0.4)" }}>↓</span>
//             <div style={{ flex: 1, height: 1, background: "rgba(92,255,103,0.12)" }} />
//           </div>

//           <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: "rgba(92,255,103,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
//             <Flag size={11} /> Drop
//           </div>
//           <div style={{ fontSize: 15, fontWeight: 700, color: "#FEFDFA" }}>{job.drop?.city || "—"}</div>
//           <div style={{ fontSize: 12, color: "rgba(254,253,250,0.4)" }}>{job.drop?.state || "—"}</div>
//           <div style={{ fontSize: 11, color: "rgba(254,253,250,0.25)", marginTop: 2, lineHeight: 1.4 }}>{job.drop?.addressLine1}</div>
//         </div>

//         {/* Details */}
//         <div style={{ padding: "16px 20px" }}>
//           <DetailRow icon={Calendar} label="Packing date" value={fmt(job.jobDetails?.dateOfPacking)} />
//           <DetailRow icon={Clock} label="Contact time" value={fmtTime(job.jobDetails?.preferredContactTime)} />
//           <DetailRow icon={Home} label="Property size" value={job.jobDetails?.propertySize ? `${job.jobDetails.propertySize} BHK` : "—"} />
//           <DetailRow icon={Shield} label="Add-ons" value={services.length ? services.join(", ") : "None"} />
//           <DetailRow icon={Package} label="Packing" value={job.serviceDetails?.packingRequired || "No"} />
//         </div>
//       </div>

//       {/* Footer: Inventory */}
//       <div style={{ borderTop: "1px solid rgba(92,255,103,0.07)", padding: "10px 20px", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
//           <span style={{ fontSize: 10, color: "rgba(254,253,250,0.25)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.04em", marginRight: 2 }}>Inventory:</span>
//           {(expanded ? job.inventory || [] : inv).map((item) => (
//             <span key={item._id || item.title} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(92,255,103,0.05)", border: "1px solid rgba(92,255,103,0.12)", color: "rgba(254,253,250,0.45)", fontFamily: "monospace" }}>
//               {item.title} ×{item.qty}
//             </span>
//           ))}
//           {!expanded && extra > 0 && (
//             <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(92,255,103,0.05)", border: "1px solid rgba(92,255,103,0.12)", color: "rgba(254,253,250,0.45)", fontFamily: "monospace" }}>+{extra} more</span>
//           )}
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           {job.bidCount > 0 && (
//             <span style={{ fontSize: 11, color: "rgba(254,253,250,0.3)", display: "flex", alignItems: "center", gap: 4 }}>
//               <Users size={11} /> {job.bidCount} bidder{job.bidCount !== 1 ? "s" : ""}
//             </span>
//           )}
//           {extra > 0 && (
//             <button onClick={() => setExpanded((p) => !p)} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "#5CFF67", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "monospace" }}>
//               {expanded ? <><ChevronUp size={10} />Less</> : <><ChevronDown size={10} />More</>}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function SummaryBar({ jobs }) {
//   const total = jobs.length;
//   const inProgress = jobs.filter((j) => j.jobDetails?.status === "In Progress").length;
//   const posted = jobs.filter((j) => j.jobDetails?.status === "Job Posted").length;
//   const totalBids = jobs.reduce((a, j) => a + (j.bidCount || 0), 0);
//   const intercity = jobs.filter((j) => j.moveType === "intercity").length;
//   const withinComplex = jobs.filter((j) => j.moveType === "within_complex").length;

//   const cells = [
//     { label: "Total Jobs",     value: total,         color: "#5CFF67" },
//     { label: "In Progress",    value: inProgress,    color: "#9EFD38" },
//     { label: "Job Posted",     value: posted,        color: "#B7F66E" },
//     { label: "Total Bids",     value: totalBids,     color: "#5CDFDF" },
//     { label: "Intercity",      value: intercity,     color: "#B7F66E" },
//     { label: "Within Complex", value: withinComplex, color: "#5CFF67" },
//   ];

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
//       {cells.map(({ label, value, color }) => (
//         <div key={label} style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 14, padding: "14px 16px" }}>
//           <p style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: "-0.5px", margin: 0 }}>{value}</p>
//           <p style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "rgba(254,253,250,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "4px 0 0" }}>{label}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function JobsScreen() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");

//   const loadJobs = (silent = false) => {
//     if (!silent) setLoading(true);
//     else setRefreshing(true);
//     setError(null);

//     fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocations`)
//       .then((res) => res.json())
//       .then((data) => setJobs(data.data || []))
//       .catch((e) => setError(e.message))
//       .finally(() => { setLoading(false); setRefreshing(false); });
//   };

//   useEffect(() => { loadJobs(); }, []);

//   const filtered = jobs.filter((job) => {
//     const q = search.toLowerCase();
//     const matchSearch = !q ||
//       (job.pickup?.city || "").toLowerCase().includes(q) ||
//       (job.drop?.city || "").toLowerCase().includes(q) ||
//       (job.pickup?.state || "").toLowerCase().includes(q) ||
//       (job.drop?.state || "").toLowerCase().includes(q) ||
//       (job.name || "").toLowerCase().includes(q);
//     const matchFilter =
//       activeFilter === "all" || job.jobDetails?.status === activeFilter;
//     return matchSearch && matchFilter;
//   });

//   const filters = [
//     { key: "all",         label: "All",         color: "#5CFF67" },
//     { key: "In Progress", label: "In Progress", color: "#9EFD38" },
//     { key: "Job Posted",  label: "Job Posted",  color: "#B7F66E" },
//   ];

//   return (
//     <div style={{ background: "#021616", minHeight: "100vh", padding: "28px 32px" }}>
//       <style>{`
//         @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//       `}</style>

//       {/* Page Header */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(92,255,103,0.1)", border: "1px solid rgba(92,255,103,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <Gavel size={22} color="#5CFF67" />
//           </div>
//           <div>
//             <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FEFDFA", letterSpacing: "-0.5px", margin: 0 }}>All Jobs</h1>
//             <p style={{ fontSize: 12, color: "rgba(254,253,250,0.35)", fontFamily: "monospace", marginTop: 2 }}>
//               Showing {filtered.length} of {jobs.length} jobs
//             </p>
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//           {/* Search */}
//           <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10, padding: "7px 12px" }}>
//             <Search size={13} color="rgba(254,253,250,0.3)" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search city, name…"
//               style={{ background: "none", border: "none", outline: "none", color: "#FEFDFA", fontSize: 13, width: 200, fontFamily: "inherit" }}
//             />
//           </div>
//           {/* Filter buttons */}
//           {filters.map(({ key, label, color }) => (
//             <button
//               key={key}
//               onClick={() => setActiveFilter(key)}
//               style={{
//                 padding: "7px 16px", borderRadius: 20, cursor: "pointer",
//                 fontSize: 11, fontWeight: 700, fontFamily: "monospace",
//                 border: activeFilter === key ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
//                 background: activeFilter === key ? `${color}18` : "rgba(255,255,255,0.03)",
//                 color: activeFilter === key ? color : "rgba(254,253,250,0.4)",
//                 transition: "all 0.15s",
//               }}
//             >{label}</button>
//           ))}
//           {/* Refresh */}
//           <button
//             onClick={() => loadJobs(true)}
//             disabled={loading || refreshing}
//             style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(92,255,103,0.06)", color: "#5CFF67", border: "1px solid rgba(92,255,103,0.2)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 12, opacity: loading || refreshing ? 0.5 : 1 }}
//           >
//             <RefreshCw size={13} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} /> Refresh
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       {!loading && <SummaryBar jobs={jobs} />}

//       {/* Error */}
//       {error && !loading && (
//         <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
//           <span style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600 }}>Failed to load jobs — {error}</span>
//           <button onClick={() => loadJobs()} style={{ marginLeft: "auto", background: "rgba(255,80,80,0.1)", color: "#FF6B6B", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Retry</button>
//         </div>
//       )}

//       {/* Cards */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//         {loading
//           ? Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
//           : filtered.length === 0
//           ? (
//             <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 16, padding: "64px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//               <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(92,255,103,0.06)", border: "1px solid rgba(92,255,103,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Gavel size={24} color="rgba(92,255,103,0.4)" />
//               </div>
//               <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(254,253,250,0.5)" }}>No jobs found</p>
//               <p style={{ fontSize: 12, color: "rgba(254,253,250,0.25)", fontFamily: "monospace" }}>Try adjusting your search or filter</p>
//             </div>
//           )
//           : filtered.map((job, i) => (
//             <JobCard key={job._id} job={job} index={i} />
//           ))
//         }
//       </div>

//       {!loading && filtered.length > 0 && (
//         <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, fontFamily: "monospace", color: "rgba(254,253,250,0.2)" }}>
//           {filtered.length} job{filtered.length !== 1 ? "s" : ""} · sorted by latest first
//         </p>
//       )}
//     </div>
//   );
// }

// use theam
// src/Screens/JobsScreen.jsx
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  Flag,
  Calendar,
  Clock,
  Home,
  Shield,
  Package,
  Truck,
  Users,
  CircleDot,
  ChevronDown,
  ChevronUp,
  Gavel,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";


function fmt(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function fmtTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
function moveLabel(m) {
  if (m === "intercity") return "Intercity";
  if (m === "within_complex") return "Within Complex";
  return m || "—";
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ width = "100%", height = 16, radius = 6 }) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: colors.accentSkeletonBg,
        animation: "skPulse 1.4s ease-in-out infinite",
      }}
    />
  );
}

function JobCardSkeleton() {
  const { colors } = useTheme();
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderMid}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Skeleton width={40} height={40} radius={40} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Skeleton width={140} height={14} />
            <Skeleton width={90} height={11} />
          </div>
        </div>
        <Skeleton width={90} height={30} radius={10} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Skeleton width="100%" height={80} radius={10} />
        <Skeleton width="100%" height={80} radius={10} />
      </div>
      <Skeleton width="100%" height={40} radius={10} />
    </div>
  );
}

// ── Badges ────────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const { colors } = useTheme();
  const isProgress = status === "In Progress";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "monospace",
        padding: "3px 10px",
        borderRadius: 20,
        background: isProgress ? colors.chipVerifiedBg : colors.chipPendingBg,
        color: isProgress ? colors.chipVerifiedColor : colors.chipPendingColor,
        border: `1px solid ${isProgress ? colors.chipVerifiedBorder : colors.chipPendingBorder}`,
      }}
    >
      <CircleDot size={9} />
      {status}
    </span>
  );
}

function MoveBadge({ moveType }) {
  const { colors } = useTheme();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "monospace",
        padding: "3px 10px",
        borderRadius: 20,
        background: colors.accentIconBg,
        color: colors.textSecondary,
        border: `1px solid ${colors.borderSubtle}`,
      }}
    >
      <Truck size={9} />
      {moveLabel(moveType)}
    </span>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <Icon
        size={13}
        color={colors.accentPrimary}
        style={{ marginTop: 2, flexShrink: 0, opacity: 0.5 }}
      />
      <div>
        <div
          style={{
            fontSize: 10,
            color: colors.textFaint,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: colors.textPrimary,
            marginTop: 1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, index, onViewBids }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const services = [];
  if (job.serviceDetails?.insuranceRequired === "Yes")
    services.push("Insurance");
  if (job.serviceDetails?.storageRequired === "Yes") services.push("Storage");
  if (job.serviceDetails?.dismantlingRequired === "Yes")
    services.push("Dismantling");
  if (job.serviceDetails?.packingRequired === "Yes") services.push("Packing");

  const inv = (job.inventory || []).slice(0, 5);
  const extra = (job.inventory || []).length - 5;
  const initials = (job.name || "??")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${hovered ? colors.borderHover : colors.borderFaint}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s, background 0.25s ease",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.15)" : "none",
        animation: "fadeUp 0.3s ease both",
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Accent line */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg,${colors.accentPrimary},${colors.accentQuaternary},transparent)`,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          borderBottom: `1px solid ${colors.borderRow}`,
        }}
      >
        {job.image ? (
          <img
            src={job.image}
            alt={job.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              border: `1.5px solid ${colors.borderAvatar}`,
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: colors.avatarBg,
              border: `1.5px solid ${colors.borderAvatar}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: colors.avatarColor,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {job.name}
            </span>
            <StatusBadge status={job.jobDetails?.status} />
            <MoveBadge moveType={job.moveType} />
          </div>
          <div
            style={{
              fontSize: 11,
              color: colors.textMuted,
              fontFamily: "monospace",
              marginTop: 3,
            }}
          >
            <Calendar size={10} style={{ verticalAlign: -1, marginRight: 3 }} />
            Posted {fmt(job.createdAt)}&nbsp;·&nbsp; ID:{" "}
            <span style={{ color: colors.textFaint }}>{job._id.slice(-8)}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: colors.accentPrimary,
                letterSpacing: "-0.3px",
              }}
            >
              {job.bidCount}
            </div>
            <div
              style={{
                fontSize: 10,
                color: colors.textFaint,
                fontFamily: "monospace",
              }}
            >
              bid{job.bidCount !== 1 ? "s" : ""}
            </div>
          </div>
          {job.bidCount > 0 && onViewBids && (
            <button
              onClick={() => onViewBids(job)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: colors.accentIconBg,
                color: colors.accentPrimary,
                border: `1px solid ${colors.borderInput}`,
                borderRadius: 10,
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              <Gavel size={11} /> View Bids
            </button>
          )}
        </div>
      </div>

      {/* Body: Route + Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Route */}
        <div
          style={{
            padding: "16px 20px",
            borderRight: `1px solid ${colors.borderRow}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "monospace",
              color: colors.accentPrimary,
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <MapPin size={11} /> Pickup
          </div>
          <div
            style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary }}
          >
            {job.pickup?.city || "—"}
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary }}>
            {job.pickup?.state || "—"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: colors.textFaint,
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            {job.pickup?.addressLine1}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              margin: "10px 0",
            }}
          >
            <div
              style={{ flex: 1, height: 1, background: colors.borderSubtle }}
            />
            <span
              style={{
                fontSize: 12,
                color: colors.accentPrimary,
                opacity: 0.4,
              }}
            >
              ↓
            </span>
            <div
              style={{ flex: 1, height: 1, background: colors.borderSubtle }}
            />
          </div>

          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "monospace",
              color: colors.accentPrimary,
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Flag size={11} /> Drop
          </div>
          <div
            style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary }}
          >
            {job.drop?.city || "—"}
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary }}>
            {job.drop?.state || "—"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: colors.textFaint,
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            {job.drop?.addressLine1}
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "16px 20px" }}>
          <DetailRow
            icon={Calendar}
            label="Packing date"
            value={fmt(job.jobDetails?.dateOfPacking)}
          />
          <DetailRow
            icon={Clock}
            label="Contact time"
            value={fmtTime(job.jobDetails?.preferredContactTime)}
          />
          <DetailRow
            icon={Home}
            label="Property size"
            value={
              job.jobDetails?.propertySize
                ? `${job.jobDetails.propertySize} BHK`
                : "—"
            }
          />
          <DetailRow
            icon={Shield}
            label="Add-ons"
            value={services.length ? services.join(", ") : "None"}
          />
          <DetailRow
            icon={Package}
            label="Packing"
            value={job.serviceDetails?.packingRequired || "No"}
          />
        </div>
      </div>

      {/* Footer: Inventory */}
      <div
        style={{
          borderTop: `1px solid ${colors.borderRow}`,
          padding: "10px 20px",
          background: colors.inputBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: colors.textFaint,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginRight: 2,
            }}
          >
            Inventory:
          </span>
          {(expanded ? job.inventory || [] : inv).map((item) => (
            <span
              key={item._id || item.title}
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 20,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textSecondary,
                fontFamily: "monospace",
              }}
            >
              {item.title} ×{item.qty}
            </span>
          ))}
          {!expanded && extra > 0 && (
            <span
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 20,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textSecondary,
                fontFamily: "monospace",
              }}
            >
              +{extra} more
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {job.bidCount > 0 && (
            <span
              style={{
                fontSize: 11,
                color: colors.textMuted,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Users size={11} /> {job.bidCount} bidder
              {job.bidCount !== 1 ? "s" : ""}
            </span>
          )}
          {extra > 0 && (
            <button
              onClick={() => setExpanded((p) => !p)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                color: colors.accentPrimary,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "monospace",
              }}
            >
              {expanded ? (
                <>
                  <ChevronUp size={10} />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown size={10} />
                  More
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Summary Bar ───────────────────────────────────────────────────────────────
function SummaryBar({ jobs }) {
  const { colors } = useTheme();
  const total = jobs.length;
  const inProgress = jobs.filter(
    (j) => j.jobDetails?.status === "In Progress",
  ).length;
  const posted = jobs.filter(
    (j) => j.jobDetails?.status === "Job Posted",
  ).length;
  const totalBids = jobs.reduce((a, j) => a + (j.bidCount || 0), 0);
  const intercity = jobs.filter((j) => j.moveType === "intercity").length;
  const withinComplex = jobs.filter(
    (j) => j.moveType === "within_complex",
  ).length;

  const cells = [
    { label: "Total Jobs", value: total, color: colors.accentPrimary },
    { label: "In Progress", value: inProgress, color: colors.accentQuaternary },
    { label: "Job Posted", value: posted, color: colors.accentSecondary },
    { label: "Total Bids", value: totalBids, color: colors.chipPaidColor },
    { label: "Intercity", value: intercity, color: colors.accentSecondary },
    {
      label: "Within Complex",
      value: withinComplex,
      color: colors.accentPrimary,
    },
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
      {cells.map(({ label, value, color }) => (
        <div
          key={label}
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.borderMid}`,
            borderRadius: 14,
            padding: "14px 16px",
            transition: "background 0.25s ease",
          }}
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
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JobsScreen() {
  const { colors } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const loadJobs = (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocations`)
      .then((res) => res.json())
      .then((data) => setJobs(data.data || []))
      .catch((e) => setError(e.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
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
      (job.name || "").toLowerCase().includes(q);
    const matchFilter =
      activeFilter === "all" || job.jobDetails?.status === activeFilter;
    return matchSearch && matchFilter;
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
      {!loading && <SummaryBar jobs={jobs} />}

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
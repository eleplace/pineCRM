import { BASE_URL2 } from "../api/config";
// src/Screens/JobBidsScreen.jsx
// Shows all vendor bids for a specific job
// Route: /job-bids/:jobId  (state: { job, userId })

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft, RefreshCw, AlertCircle, Gavel,
//   User, DollarSign, Clock, Calendar, CheckCircle2,
//   XCircle, Timer, Star, ChevronDown, ChevronUp, Search,
// } from "lucide-react";


// // ── Helpers ────────────────────────────────────────────────────────────────────
// function formatDate(d) {
//   if (!d) return null;
//   try {
//     return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
//   } catch { return d; }
// }

// function formatCurrency(val) {
//   if (val == null || val === "") return null;
//   const num = parseFloat(val);
//   if (isNaN(num)) return val;
//   return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
// }

// function getBidStatusMeta(status) {
//   const s = (status ?? "").toLowerCase();
//   if (s === "accepted" || s === "approved")
//     return { label: "Accepted", color: "#5CFF67", bg: "rgba(92,255,103,0.1)",   border: "rgba(92,255,103,0.25)",   Icon: CheckCircle2 };
//   if (s === "rejected" || s === "declined")
//     return { label: "Rejected", color: "#FF6B6B", bg: "rgba(255,80,80,0.08)",   border: "rgba(255,80,80,0.2)",     Icon: XCircle };
//   if (s === "pending" || s === "submitted" || s === "")
//     return { label: "Pending",  color: "#B7F66E", bg: "rgba(183,246,110,0.08)", border: "rgba(183,246,110,0.2)",   Icon: Timer };
//   if (s === "withdrawn" || s === "cancelled")
//     return { label: "Withdrawn",color: "rgba(254,253,250,0.35)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", Icon: XCircle };
//   return    { label: status || "Unknown", color: "rgba(254,253,250,0.4)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", Icon: AlertCircle };
// }

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton({ width = "100%", height = 16, radius = 6, style = {} }) {
//   return <div style={{ width, height, borderRadius: radius, background: "rgba(255,255,255,0.06)", animation: "skPulse 1.4s ease-in-out infinite", ...style }} />;
// }

// function BidCardSkeleton() {
//   return (
//     <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <Skeleton width={40} height={40} radius={40} />
//           <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//             <Skeleton width={120} height={14} />
//             <Skeleton width={80} height={11} />
//           </div>
//         </div>
//         <Skeleton width={80} height={32} radius={10} />
//       </div>
//       <div style={{ display: "flex", gap: 12 }}>
//         <Skeleton width="30%" height={13} />
//         <Skeleton width="25%" height={13} />
//       </div>
//       <Skeleton width="90%" height={13} />
//     </div>
//   );
// }

// // ── Bid Card ───────────────────────────────────────────────────────────────────
// function BidCard({ bid, index, rank }) {
//   const [expanded, setExpanded] = useState(false);
//   const [hovered, setHovered]   = useState(false);

//   const meta = getBidStatusMeta(bid.status ?? bid.bid_status ?? bid.bidStatus);
//   const { Icon: StatusIcon } = meta;

//   // Normalize fields — adjust to match your actual API keys
//   const vendorName   = bid.vendor_name ?? bid.vendorName ?? bid.bidder_name ?? bid.name ?? bid.vendor?.fullname ?? `Vendor #${index + 1}`;
//   const vendorEmail  = bid.vendor_email ?? bid.email ?? bid.vendor?.email;
//   const vendorPhone  = bid.vendor_phone ?? bid.phone ?? bid.vendor?.phone_number;
//   const amount       = bid.amount ?? bid.bid_amount ?? bid.price ?? bid.quotation ?? bid.quote;
//   const note         = bid.note ?? bid.message ?? bid.description ?? bid.remarks ?? bid.comment;
//   const createdAt    = formatDate(bid.created_at ?? bid.createdAt ?? bid.bid_date ?? bid.date);
//   const bidId        = bid.id ?? bid.bid_id ?? bid._id;

//   // Initials avatar
//   const initials = vendorName
//     ? vendorName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
//     : "??";

//   const isTop = rank === 1 && meta.label !== "Rejected" && meta.label !== "Withdrawn";

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#1A2421",
//         border: `1px solid ${hovered ? "rgba(92,255,103,0.25)" : isTop ? "rgba(92,255,103,0.18)" : "rgba(92,255,103,0.08)"}`,
//         borderRadius: 16, overflow: "hidden",
//         transition: "border-color 0.2s, box-shadow 0.2s",
//         boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.3)" : isTop ? "0 0 0 1px rgba(92,255,103,0.06)" : "none",
//         animation: "fadeUp 0.3s ease both",
//         animationDelay: `${index * 50}ms`,
//       }}
//     >
//       {/* top-bid crown bar */}
//       {isTop && (
//         <div style={{ height: 2, background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)" }} />
//       )}

//       <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>

//         {/* Row 1: vendor + status */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {/* Avatar */}
//             <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#3C5B30", border: "1.5px solid rgba(92,255,103,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#5CFF67", flexShrink: 0 }}>
//               {initials}
//             </div>
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <p style={{ fontSize: 14, fontWeight: 700, color: "#FEFDFA" }}>{vendorName}</p>
//                 {isTop && <span style={{ fontSize: 9, fontWeight: 700, fontFamily: "monospace", background: "rgba(92,255,103,0.15)", color: "#5CFF67", border: "1px solid rgba(92,255,103,0.3)", padding: "1px 7px", borderRadius: 10 }}>TOP BID</span>}
//               </div>
//               {vendorEmail && <p style={{ fontSize: 11, color: "rgba(254,253,250,0.35)", fontFamily: "monospace", marginTop: 2 }}>{vendorEmail}</p>}
//             </div>
//           </div>

//           {/* Status chip */}
//           <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: "monospace", background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`, flexShrink: 0 }}>
//             <StatusIcon size={9} />{meta.label}
//           </span>
//         </div>

//         {/* Row 2: amount pill + date */}
//         <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
//           {amount != null && (
//             <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(92,255,103,0.08)", border: "1px solid rgba(92,255,103,0.18)", borderRadius: 10, padding: "6px 14px" }}>
//               <DollarSign size={13} color="#5CFF67" />
//               <span style={{ fontSize: 16, fontWeight: 800, color: "#5CFF67", letterSpacing: "-0.4px" }}>
//                 {formatCurrency(amount) ?? amount}
//               </span>
//             </div>
//           )}
//           {createdAt && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(254,253,250,0.35)" }}>
//               <Calendar size={11} color="rgba(254,253,250,0.3)" />{createdAt}
//             </span>
//           )}
//           {vendorPhone && (
//             <span style={{ fontSize: 11, color: "rgba(254,253,250,0.35)", fontFamily: "monospace" }}>
//               📞 {vendorPhone}
//             </span>
//           )}
//           {bidId && <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "monospace", color: "rgba(254,253,250,0.18)" }}>#{String(bidId).slice(0, 8)}</span>}
//         </div>

//         {/* Note preview / expand */}
//         {note && (
//           <div>
//             <p style={{
//               fontSize: 12, color: "rgba(254,253,250,0.45)", lineHeight: 1.6,
//               display: expanded ? "block" : "-webkit-box",
//               WebkitLineClamp: expanded ? "unset" : 2,
//               WebkitBoxOrient: "vertical",
//               overflow: expanded ? "visible" : "hidden",
//               background: "rgba(92,255,103,0.03)",
//               border: "1px solid rgba(92,255,103,0.07)",
//               borderRadius: 8, padding: "10px 12px",
//             }}>
//               {note}
//             </p>
//             {note.length > 120 && (
//               <button onClick={() => setExpanded((p) => !p)} style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#5CFF67", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "monospace" }}>
//                 {expanded ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Read more</>}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Summary bar ────────────────────────────────────────────────────────────────
// function SummaryBar({ bids }) {
//   if (!bids.length) return null;

//   const amounts = bids
//     .map((b) => parseFloat(b.amount ?? b.bid_amount ?? b.price ?? b.quotation ?? b.quote))
//     .filter((n) => !isNaN(n));

//   const lowest  = amounts.length ? Math.min(...amounts) : null;
//   const highest = amounts.length ? Math.max(...amounts) : null;
//   const avg     = amounts.length ? amounts.reduce((a, b) => a + b, 0) / amounts.length : null;

//   const fmt = (n) => n != null ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n) : "—";

//   const accepted  = bids.filter((b) => ["accepted","approved"].includes((b.status ?? b.bid_status ?? "").toLowerCase())).length;
//   const pending   = bids.filter((b) => ["pending","submitted",""].includes((b.status ?? b.bid_status ?? "").toLowerCase())).length;
//   const rejected  = bids.filter((b) => ["rejected","declined"].includes((b.status ?? b.bid_status ?? "").toLowerCase())).length;

//   const cells = [
//     { label: "Total Bids",   value: bids.length,    color: "#5CFF67" },
//     { label: "Lowest Quote", value: fmt(lowest),    color: "#9EFD38" },
//     { label: "Highest Quote",value: fmt(highest),   color: "#B7F66E" },
//     { label: "Avg. Quote",   value: fmt(avg),        color: "#5CDFDF" },
//     { label: "Accepted",     value: accepted,        color: "#5CFF67" },
//     { label: "Pending",      value: pending,         color: "#B7F66E" },
//     { label: "Rejected",     value: rejected,        color: "#FF6B6B" },
//   ];

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
//       {cells.map(({ label, value, color }) => (
//         <div key={label} style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 14, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
//           <p style={{ fontSize: 18, fontWeight: 800, color, letterSpacing: "-0.4px" }}>{value}</p>
//           <p style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "rgba(254,253,250,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function JobBidsScreen() {
//   const { jobId }      = useParams();
//   const { state }      = useLocation();
//   const navigate       = useNavigate();
//   const job            = state?.job  ?? null;
//   const userId         = state?.userId ?? null;

//   const [bids,       setBids]       = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [error,      setError]      = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search,     setSearch]     = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const abortRef = useRef(null);

//   const loadBids = useCallback(async (silent = false) => {
//     if (abortRef.current) abortRef.current.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;

//     if (!silent) setLoading(true); else setRefreshing(true);
//     setError(null);

//     try {
//       // Try job-specific endpoint first, fall back to recipient-scoped
//       let list = [];

//       // Attempt 1: bids by job ID
//       try {
//         const r1 = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByJob/${jobId}`, { signal: controller.signal });
//         if (r1.ok) {
//           const d = await r1.json();
//           list = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
//         }
//       } catch { /* try next */ }

//       // Attempt 2: bids by job ID (query param variant)
//       if (!list.length) {
//         try {
//           const r2 = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getBids?jobId=${jobId}`, { signal: controller.signal });
//           if (r2.ok) {
//             const d = await r2.json();
//             list = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
//           }
//         } catch { /* try next */ }
//       }

//       // Attempt 3: all bids for recipient, filter client-side by job ID
//       if (!list.length && userId) {
//         const r3 = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${userId}`, { signal: controller.signal });
//         if (r3.ok) {
//           const d = await r3.json();
//           const all = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
//           // Keep bids that reference this jobId
//           list = all.filter((b) => {
//             const jid = String(b.job_id ?? b.jobId ?? b.location_id ?? b.locationId ?? "");
//             return jid === String(jobId);
//           });
//           // If no match found by job_id, return all (API may return per-job already)
//           if (!list.length) list = all;
//         }
//       }

//       if (!controller.signal.aborted) setBids(list);
//     } catch (err) {
//       if (err.name !== "AbortError") setError(err.message);
//     } finally {
//       if (!controller.signal.aborted) { setLoading(false); setRefreshing(false); }
//     }
//   }, [jobId, userId]);

//   useEffect(() => { loadBids(); return () => abortRef.current?.abort(); }, [loadBids]);

//   // Derived
//   const filtered = bids.filter((bid) => {
//     const s = (bid.status ?? bid.bid_status ?? "").toLowerCase();
//     const matchStatus =
//       statusFilter === "all" ||
//       (statusFilter === "accepted"  && ["accepted","approved"].includes(s)) ||
//       (statusFilter === "pending"   && ["pending","submitted",""].includes(s)) ||
//       (statusFilter === "rejected"  && ["rejected","declined"].includes(s));

//     if (!matchStatus) return false;
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       const name  = (bid.vendor_name ?? bid.vendorName ?? bid.name ?? bid.vendor?.fullname ?? "").toLowerCase();
//       const email = (bid.vendor_email ?? bid.email ?? bid.vendor?.email ?? "").toLowerCase();
//       const note  = (bid.note ?? bid.message ?? bid.description ?? "").toLowerCase();
//       return name.includes(q) || email.includes(q) || note.includes(q);
//     }
//     return true;
//   });

//   // Sort by amount ascending (lowest bid first = rank 1)
//   const sorted = [...filtered].sort((a, b) => {
//     const aAmt = parseFloat(a.amount ?? a.bid_amount ?? a.price ?? a.quotation ?? a.quote ?? Infinity);
//     const bAmt = parseFloat(b.amount ?? b.bid_amount ?? b.price ?? b.quotation ?? b.quote ?? Infinity);
//     return aAmt - bAmt;
//   });

//   const jobTitle = job?.title ?? job?.job_title ?? job?.name ?? `Job #${String(jobId).slice(0, 8)}`;

//   return (
//     <div style={{ background: "#021616", minHeight: "100vh", padding: "28px 32px" }}>
//       <style>{`
//         @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//       `}</style>

//       {/* Back */}
//       <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(92,255,103,0.06)", color: "rgba(254,253,250,0.7)", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, marginBottom: 24, fontWeight: 500 }}
//         onMouseEnter={(e) => { e.currentTarget.style.color = "#5CFF67"; e.currentTarget.style.borderColor = "rgba(92,255,103,0.3)"; }}
//         onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(254,253,250,0.7)"; e.currentTarget.style.borderColor = "rgba(92,255,103,0.12)"; }}>
//         <ArrowLeft size={15} /> Back to Jobs
//       </button>

//       {/* Header — Job summary */}
//       <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 20, padding: "24px 28px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)" }} />

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(92,255,103,0.1)", border: "1px solid rgba(92,255,103,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Gavel size={22} color="#5CFF67" />
//             </div>
//             <div>
//               <h1 style={{ fontSize: 20, fontWeight: 800, color: "#FEFDFA", letterSpacing: "-0.5px", maxWidth: 460 }}>{jobTitle}</h1>
//               <p style={{ fontSize: 12, color: "rgba(254,253,250,0.35)", fontFamily: "monospace", marginTop: 3 }}>
//                 Job ID: {String(jobId).slice(0, 16)}… · Vendor bids received
//               </p>
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {!loading && <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(92,255,103,0.08)", border: "1px solid rgba(92,255,103,0.2)", fontSize: 12, fontWeight: 700, color: "#5CFF67", fontFamily: "monospace" }}>{bids.length} bids</div>}
//             <button onClick={() => loadBids(true)} disabled={loading || refreshing} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(92,255,103,0.06)", color: "#5CFF67", border: "1px solid rgba(92,255,103,0.2)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 12, opacity: loading || refreshing ? 0.5 : 1 }}>
//               <RefreshCw size={13} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} /> Refresh
//             </button>
//           </div>
//         </div>

//         {/* Job quick-details from state */}
//         {job && (
//           <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(92,255,103,0.07)", display: "flex", gap: 16, flexWrap: "wrap" }}>
//             {[job.address ?? job.location, job.city, job.state].filter(Boolean).join(", ") && (
//               <span style={{ fontSize: 12, color: "rgba(254,253,250,0.4)" }}>📍 {[job.address ?? job.location, job.city, job.state].filter(Boolean).join(", ")}</span>
//             )}
//             {(job.created_at ?? job.createdAt) && (
//               <span style={{ fontSize: 12, color: "rgba(254,253,250,0.4)" }}>📅 Posted {formatDate(job.created_at ?? job.createdAt)}</span>
//             )}
//             {(job.description ?? job.details) && (
//               <p style={{ width: "100%", fontSize: 12, color: "rgba(254,253,250,0.35)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                 {job.description ?? job.details}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Summary stats */}
//       {!loading && <SummaryBar bids={bids} />}

//       {/* Search + filter */}
//       <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10, padding: "7px 12px", flex: "1 1 200px" }}>
//           <Search size={13} color="rgba(254,253,250,0.3)" />
//           <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by vendor name, note…" style={{ background: "none", border: "none", outline: "none", color: "#FEFDFA", fontSize: 13, flex: 1, fontFamily: "inherit" }} />
//         </div>
//         <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//           {[
//             { key: "all",      label: "All",      color: "#5CFF67" },
//             { key: "accepted", label: "Accepted", color: "#5CFF67" },
//             { key: "pending",  label: "Pending",  color: "#B7F66E" },
//             { key: "rejected", label: "Rejected", color: "#FF6B6B" },
//           ].map(({ key, label, color }) => (
//             <button key={key} onClick={() => setStatusFilter(key)} style={{
//               padding: "5px 14px", borderRadius: 20, cursor: "pointer",
//               fontSize: 11, fontWeight: 600, fontFamily: "monospace",
//               border: statusFilter === key ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
//               background: statusFilter === key ? `${color}18` : "rgba(255,255,255,0.03)",
//               color: statusFilter === key ? color : "rgba(254,253,250,0.4)", transition: "all 0.15s",
//             }}>{label}</button>
//           ))}
//         </div>
//       </div>

//       {/* Error */}
//       {error && !loading && (
//         <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
//           <AlertCircle size={18} color="#FF6B6B" />
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600 }}>Failed to load bids</p>
//             <p style={{ fontSize: 11, color: "rgba(255,107,107,0.7)", fontFamily: "monospace" }}>{error}</p>
//           </div>
//           <button onClick={() => loadBids()} style={{ background: "rgba(255,80,80,0.1)", color: "#FF6B6B", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Retry</button>
//         </div>
//       )}

//       {/* Bid list */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {loading ? (
//           Array.from({ length: 4 }).map((_, i) => <BidCardSkeleton key={i} />)
//         ) : sorted.length === 0 ? (
//           <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 16, padding: "64px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//             <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(92,255,103,0.06)", border: "1px solid rgba(92,255,103,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Gavel size={24} color="rgba(92,255,103,0.4)" />
//             </div>
//             <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(254,253,250,0.5)", textAlign: "center" }}>
//               {statusFilter !== "all" || search.trim() ? "No bids match your filter" : "No bids received for this job yet"}
//             </p>
//             <p style={{ fontSize: 12, color: "rgba(254,253,250,0.25)", fontFamily: "monospace" }}>
//               Bids will appear here once vendors respond
//             </p>
//           </div>
//         ) : (
//           sorted.map((bid, i) => (
//             <BidCard key={bid.id ?? bid.bid_id ?? bid._id ?? i} bid={bid} index={i} rank={i + 1} />
//           ))
//         )}
//       </div>

//       {!loading && sorted.length > 0 && (
//         <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, fontFamily: "monospace", color: "rgba(254,253,250,0.2)" }}>
//           {sorted.length} bid{sorted.length !== 1 ? "s" : ""} · sorted by lowest quote first
//         </p>
//       )}
//     </div>
//   );
// }

// theme

// src/Screens/JobBidsScreen.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Gavel,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Timer,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";


// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return null;
  try {
    return new Date(d).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

function formatCurrency(val) {
  if (val == null || val === "") return null;
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

// Status meta keeps semantic colors intentionally
function getBidStatusMeta(status) {
  const s = (status ?? "").toLowerCase();
  if (s === "accepted" || s === "approved")
    return {
      label: "Accepted",
      color: "#5CFF67",
      bg: "rgba(92,255,103,0.1)",
      border: "rgba(92,255,103,0.25)",
      Icon: CheckCircle2,
    };
  if (s === "rejected" || s === "declined")
    return {
      label: "Rejected",
      color: "#FF6B6B",
      bg: "rgba(255,80,80,0.08)",
      border: "rgba(255,80,80,0.2)",
      Icon: XCircle,
    };
  if (s === "pending" || s === "submitted" || s === "")
    return {
      label: "Pending",
      color: "#B7F66E",
      bg: "rgba(183,246,110,0.08)",
      border: "rgba(183,246,110,0.2)",
      Icon: Timer,
    };
  if (s === "withdrawn" || s === "cancelled")
    return {
      label: "Withdrawn",
      color: "rgba(254,253,250,0.35)",
      bg: "rgba(255,255,255,0.04)",
      border: "rgba(255,255,255,0.1)",
      Icon: XCircle,
    };
  return {
    label: status || "Unknown",
    color: "rgba(254,253,250,0.4)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    Icon: AlertCircle,
  };
}

// ── Skeleton ───────────────────────────────────────────────────────────────────
function Skeleton({ width = "100%", height = 16, radius = 6, style = {} }) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: colors.accentSkeletonBg2,
        animation: "skPulse 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function BidCardSkeleton() {
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
            <Skeleton width={120} height={14} />
            <Skeleton width={80} height={11} />
          </div>
        </div>
        <Skeleton width={80} height={32} radius={10} />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Skeleton width="30%" height={13} />
        <Skeleton width="25%" height={13} />
      </div>
      <Skeleton width="90%" height={13} />
    </div>
  );
}

// ── Bid Card ───────────────────────────────────────────────────────────────────
function BidCard({ bid, index, rank }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const meta = getBidStatusMeta(bid.status ?? bid.bid_status ?? bid.bidStatus);
  const { Icon: StatusIcon } = meta;

  const vendorName =
    bid.vendor_name ??
    bid.vendorName ??
    bid.bidder_name ??
    bid.name ??
    bid.vendor?.fullname ??
    `Vendor #${index + 1}`;
  const vendorEmail = bid.vendor_email ?? bid.email ?? bid.vendor?.email;
  const vendorPhone = bid.vendor_phone ?? bid.phone ?? bid.vendor?.phone_number;
  const amount =
    bid.amount ?? bid.bid_amount ?? bid.price ?? bid.quotation ?? bid.quote;
  const note =
    bid.note ?? bid.message ?? bid.description ?? bid.remarks ?? bid.comment;
  const createdAt = formatDate(
    bid.created_at ?? bid.createdAt ?? bid.bid_date ?? bid.date,
  );
  const bidId = bid.id ?? bid.bid_id ?? bid._id;

  const initials = vendorName
    ? vendorName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const isTop =
    rank === 1 && meta.label !== "Rejected" && meta.label !== "Withdrawn";

  const borderColor = hovered
    ? colors.borderHover
    : isTop
      ? colors.borderSubtle
      : colors.borderMid;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered
          ? "0 6px 20px rgba(0,0,0,0.3)"
          : isTop
            ? `0 0 0 1px ${colors.borderFaint}`
            : "none",
        animation: "fadeUp 0.3s ease both",
        animationDelay: `${index * 50}ms`,
      }}
    >
      {isTop && (
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, ${colors.accentPrimary}, ${colors.accentQuaternary}, transparent)`,
          }}
        />
      )}

      <div
        style={{
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Row 1: vendor + status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                fontSize: 12,
                fontWeight: 700,
                color: colors.avatarColor,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: colors.textPrimary,
                  }}
                >
                  {vendorName}
                </p>
                {isTop && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      fontFamily: "monospace",
                      background: colors.accentBadgeBg,
                      color: colors.accentPrimary,
                      border: `1px solid ${colors.borderHover}`,
                      padding: "1px 7px",
                      borderRadius: 10,
                    }}
                  >
                    TOP BID
                  </span>
                )}
              </div>
              {vendorEmail && (
                <p
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    fontFamily: "monospace",
                    marginTop: 2,
                  }}
                >
                  {vendorEmail}
                </p>
              )}
            </div>
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "monospace",
              background: meta.bg,
              color: meta.color,
              border: `1px solid ${meta.border}`,
              flexShrink: 0,
            }}
          >
            <StatusIcon size={9} />
            {meta.label}
          </span>
        </div>

        {/* Row 2: amount + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {amount != null && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: 10,
                padding: "6px 14px",
              }}
            >
              <DollarSign size={13} color={colors.accentPrimary} />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: colors.accentPrimary,
                  letterSpacing: "-0.4px",
                }}
              >
                {formatCurrency(amount) ?? amount}
              </span>
            </div>
          )}
          {createdAt && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color: colors.textMuted,
              }}
            >
              <Calendar size={11} color={colors.textFaint} />
              {createdAt}
            </span>
          )}
          {vendorPhone && (
            <span
              style={{
                fontSize: 11,
                color: colors.textMuted,
                fontFamily: "monospace",
              }}
            >
              📞 {vendorPhone}
            </span>
          )}
          {bidId && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textVeryFaint,
              }}
            >
              #{String(bidId).slice(0, 8)}
            </span>
          )}
        </div>

        {/* Note */}
        {note && (
          <div>
            <p
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                lineHeight: 1.6,
                display: expanded ? "block" : "-webkit-box",
                WebkitLineClamp: expanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                overflow: expanded ? "visible" : "hidden",
                background: colors.accentSkeletonBg,
                border: `1px solid ${colors.borderFaint}`,
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              {note}
            </p>
            {note.length > 120 && (
              <button
                onClick={() => setExpanded((p) => !p)}
                style={{
                  marginTop: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
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
                    <ChevronUp size={11} />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown size={11} />
                    Read more
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Summary bar ────────────────────────────────────────────────────────────────
function SummaryBar({ bids }) {
  const { colors } = useTheme();
  if (!bids.length) return null;

  const amounts = bids
    .map((b) =>
      parseFloat(b.amount ?? b.bid_amount ?? b.price ?? b.quotation ?? b.quote),
    )
    .filter((n) => !isNaN(n));

  const lowest = amounts.length ? Math.min(...amounts) : null;
  const highest = amounts.length ? Math.max(...amounts) : null;
  const avg = amounts.length
    ? amounts.reduce((a, b) => a + b, 0) / amounts.length
    : null;
  const fmt = (n) =>
    n != null
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(n)
      : "—";

  const accepted = bids.filter((b) =>
    ["accepted", "approved"].includes(
      (b.status ?? b.bid_status ?? "").toLowerCase(),
    ),
  ).length;
  const pending = bids.filter((b) =>
    ["pending", "submitted", ""].includes(
      (b.status ?? b.bid_status ?? "").toLowerCase(),
    ),
  ).length;
  const rejected = bids.filter((b) =>
    ["rejected", "declined"].includes(
      (b.status ?? b.bid_status ?? "").toLowerCase(),
    ),
  ).length;

  const cells = [
    { label: "Total Bids", value: bids.length, color: colors.accentPrimary },
    {
      label: "Lowest Quote",
      value: fmt(lowest),
      color: colors.accentQuaternary,
    },
    {
      label: "Highest Quote",
      value: fmt(highest),
      color: colors.accentSecondary,
    },
    { label: "Avg. Quote", value: fmt(avg), color: "#5CDFDF" },
    { label: "Accepted", value: accepted, color: colors.accentPrimary },
    { label: "Pending", value: pending, color: colors.accentSecondary },
    { label: "Rejected", value: rejected, color: "#FF6B6B" },
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
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <p
            style={{
              fontSize: 18,
              fontWeight: 800,
              color,
              letterSpacing: "-0.4px",
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
            }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function JobBidsScreen() {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const job = state?.job ?? null;
  const userId = state?.userId ?? null;

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const abortRef = useRef(null);

  const loadBids = useCallback(
    async (silent = false) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (!silent) setLoading(true);
      else setRefreshing(true);
      setError(null);

      try {
        let list = [];

        try {
          const r1 = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByJob/${jobId}`, {
            signal: controller.signal,
          });
          if (r1.ok) {
            const d = await r1.json();
            list = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
          }
        } catch {
          /* try next */
        }

        if (!list.length) {
          try {
            const r2 = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getBids?jobId=${jobId}`, {
              signal: controller.signal,
            });
            if (r2.ok) {
              const d = await r2.json();
              list = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
            }
          } catch {
            /* try next */
          }
        }

        if (!list.length && userId) {
          const r3 = await fetch(
            `${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${userId}`,
            { signal: controller.signal },
          );
          if (r3.ok) {
            const d = await r3.json();
            const all = Array.isArray(d) ? d : (d.bids ?? d.data ?? []);
            list = all.filter((b) => {
              const jid = String(
                b.job_id ?? b.jobId ?? b.location_id ?? b.locationId ?? "",
              );
              return jid === String(jobId);
            });
            if (!list.length) list = all;
          }
        }

        if (!controller.signal.aborted) setBids(list);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [jobId, userId],
  );

  useEffect(() => {
    loadBids();
    return () => abortRef.current?.abort();
  }, [loadBids]);

  const filtered = bids.filter((bid) => {
    const s = (bid.status ?? bid.bid_status ?? "").toLowerCase();
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "accepted" && ["accepted", "approved"].includes(s)) ||
      (statusFilter === "pending" &&
        ["pending", "submitted", ""].includes(s)) ||
      (statusFilter === "rejected" && ["rejected", "declined"].includes(s));
    if (!matchStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const name = (
        bid.vendor_name ??
        bid.vendorName ??
        bid.name ??
        bid.vendor?.fullname ??
        ""
      ).toLowerCase();
      const email = (
        bid.vendor_email ??
        bid.email ??
        bid.vendor?.email ??
        ""
      ).toLowerCase();
      const note = (
        bid.note ??
        bid.message ??
        bid.description ??
        ""
      ).toLowerCase();
      return name.includes(q) || email.includes(q) || note.includes(q);
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aAmt = parseFloat(
      a.amount ?? a.bid_amount ?? a.price ?? a.quotation ?? a.quote ?? Infinity,
    );
    const bAmt = parseFloat(
      b.amount ?? b.bid_amount ?? b.price ?? b.quotation ?? b.quote ?? Infinity,
    );
    return aAmt - bAmt;
  });

  const jobTitle =
    job?.title ??
    job?.job_title ??
    job?.name ??
    `Job #${String(jobId).slice(0, 8)}`;

  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
      }}
    >
      <style>{`
        @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes spin    { to{transform:rotate(360deg)} }
      `}</style>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: colors.accentSkeletonBg,
          color: colors.textSecondary,
          border: `1px solid ${colors.borderInput}`,
          borderRadius: 10,
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: 13,
          marginBottom: 24,
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.accentPrimary;
          e.currentTarget.style.borderColor = colors.borderHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colors.textSecondary;
          e.currentTarget.style.borderColor = colors.borderInput;
        }}
      >
        <ArrowLeft size={15} /> Back to Jobs
      </button>

      {/* Header */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${colors.accentPrimary}, ${colors.accentQuaternary}, transparent)`,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderSubtle}`,
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
                  fontSize: 20,
                  fontWeight: 800,
                  color: colors.textPrimary,
                  letterSpacing: "-0.5px",
                  maxWidth: 460,
                }}
              >
                {jobTitle}
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  fontFamily: "monospace",
                  marginTop: 3,
                }}
              >
                Job ID: {String(jobId).slice(0, 16)}… · Vendor bids received
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!loading && (
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: colors.accentIconBg,
                  border: `1px solid ${colors.borderSubtle}`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.accentPrimary,
                  fontFamily: "monospace",
                }}
              >
                {bids.length} bids
              </div>
            )}
            <button
              onClick={() => loadBids(true)}
              disabled={loading || refreshing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: colors.accentSkeletonBg,
                color: colors.accentPrimary,
                border: `1px solid ${colors.borderSubtle}`,
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

        {job && (
          <div
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: `1px solid ${colors.borderFaint}`,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {[job.address ?? job.location, job.city, job.state]
              .filter(Boolean)
              .join(", ") && (
              <span style={{ fontSize: 12, color: colors.textMuted }}>
                📍{" "}
                {[job.address ?? job.location, job.city, job.state]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
            {(job.created_at ?? job.createdAt) && (
              <span style={{ fontSize: 12, color: colors.textMuted }}>
                📅 Posted {formatDate(job.created_at ?? job.createdAt)}
              </span>
            )}
            {(job.description ?? job.details) && (
              <p
                style={{
                  width: "100%",
                  fontSize: 12,
                  color: colors.textMuted,
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {job.description ?? job.details}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Summary stats */}
      {!loading && <SummaryBar bids={bids} />}

      {/* Search + filter */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderMid}`,
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 16,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: colors.inputBg,
            border: `1px solid ${colors.borderInput}`,
            borderRadius: 10,
            padding: "7px 12px",
            flex: "1 1 200px",
          }}
        >
          <Search size={13} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vendor name, note…"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: colors.textPrimary,
              fontSize: 13,
              flex: 1,
              fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All", color: "#5CFF67" },
            { key: "accepted", label: "Accepted", color: "#5CFF67" },
            { key: "pending", label: "Pending", color: "#B7F66E" },
            { key: "rejected", label: "Rejected", color: "#FF6B6B" },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "monospace",
                border:
                  statusFilter === key
                    ? `1px solid ${color}`
                    : `1px solid ${colors.borderMid}`,
                background:
                  statusFilter === key ? `${color}18` : colors.accentSkeletonBg,
                color: statusFilter === key ? color : colors.textMuted,
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && !loading && (
        <div
          style={{
            background: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,80,80,0.2)",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <AlertCircle size={18} color="#FF6B6B" />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600 }}>
              Failed to load bids
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,107,107,0.7)",
                fontFamily: "monospace",
              }}
            >
              {error}
            </p>
          </div>
          <button
            onClick={() => loadBids()}
            style={{
              background: "rgba(255,80,80,0.1)",
              color: "#FF6B6B",
              border: "1px solid rgba(255,80,80,0.25)",
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

      {/* Bid list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <BidCardSkeleton key={i} />)
        ) : sorted.length === 0 ? (
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
                background: colors.accentSkeletonBg,
                border: `1px solid ${colors.borderSubtle}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Gavel size={24} color={colors.accentPrimary} />
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.textMuted,
                textAlign: "center",
              }}
            >
              {statusFilter !== "all" || search.trim()
                ? "No bids match your filter"
                : "No bids received for this job yet"}
            </p>
            <p
              style={{
                fontSize: 12,
                color: colors.textVeryFaint,
                fontFamily: "monospace",
              }}
            >
              Bids will appear here once vendors respond
            </p>
          </div>
        ) : (
          sorted.map((bid, i) => (
            <BidCard
              key={bid.id ?? bid.bid_id ?? bid._id ?? i}
              bid={bid}
              index={i}
              rank={i + 1}
            />
          ))
        )}
      </div>

      {!loading && sorted.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11,
            fontFamily: "monospace",
            color: colors.textVeryFaint,
          }}
        >
          {sorted.length} bid{sorted.length !== 1 ? "s" : ""} · sorted by lowest
          quote first
        </p>
      )}
    </div>
  );
}
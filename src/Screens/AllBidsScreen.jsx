import { BASE_URL2 } from "../api/config";
// // src/Screens/AllBidsScreen.jsx
// // Shows all bids across all jobs
// // Route: /all-bids

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft, RefreshCw, AlertCircle, Gavel,
//   DollarSign, Calendar, Clock, CheckCircle2,
//   XCircle, Timer, ChevronDown, ChevronUp, Search,
//   MapPin, Users, TrendingDown, TrendingUp, Activity,
// } from "lucide-react";

// // ── Helpers ────────────────────────────────────────────────────────────────────
// function formatDate(d) {
//   if (!d) return null;
//   try {
//     return new Date(d).toLocaleString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric",
//       hour: "2-digit", minute: "2-digit",
//     });
//   } catch { return d; }
// }

// function formatCurrency(val) {
//   if (val == null || val === "") return null;
//   const num = parseFloat(val);
//   if (isNaN(num)) return String(val);
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency", currency: "INR", maximumFractionDigits: 0,
//   }).format(num);
// }

// function getBidStatusMeta(status) {
//   const s = (status ?? "").toLowerCase();
//   if (["accepted", "approved"].includes(s))
//     return { label: "Accepted",  color: "#5CFF67", bg: "rgba(92,255,103,0.10)",  border: "rgba(92,255,103,0.25)",  Icon: CheckCircle2 };
//   if (["rejected", "declined"].includes(s))
//     return { label: "Rejected",  color: "#FF6B6B", bg: "rgba(255,80,80,0.08)",   border: "rgba(255,80,80,0.20)",   Icon: XCircle };
//   if (["withdrawn", "cancelled"].includes(s))
//     return { label: "Withdrawn", color: "rgba(254,253,250,0.35)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)", Icon: XCircle };
//   return { label: "Pending",   color: "#B7F66E", bg: "rgba(183,246,110,0.08)", border: "rgba(183,246,110,0.20)", Icon: Timer };
// }

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton({ width = "100%", height = 16, radius = 6 }) {
//   return (
//     <div style={{
//       width, height, borderRadius: radius,
//       background: "rgba(255,255,255,0.06)",
//       animation: "skPulse 1.4s ease-in-out infinite",
//     }} />
//   );
// }

// function BidRowSkeleton() {
//   return (
//     <div style={{
//       background: "#1A2421", border: "1px solid rgba(92,255,103,0.06)",
//       borderRadius: 14, padding: "16px 20px",
//       display: "flex", alignItems: "center", gap: 16,
//     }}>
//       <Skeleton width={40} height={40} radius={40} />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
//         <Skeleton width="35%" height={13} />
//         <Skeleton width="55%" height={11} />
//       </div>
//       <Skeleton width={90} height={30} radius={10} />
//       <Skeleton width={80} height={28} radius={20} />
//     </div>
//   );
// }

// // ── Summary Bar ────────────────────────────────────────────────────────────────
// function SummaryBar({ bids }) {
//   const amounts = bids
//     .map((b) => parseFloat(b.amount ?? b.bid_amount ?? b.price ?? b.quotation ?? b.quote))
//     .filter((n) => !isNaN(n));

//   const lowest  = amounts.length ? Math.min(...amounts) : null;
//   const highest = amounts.length ? Math.max(...amounts) : null;
//   const avg     = amounts.length ? amounts.reduce((a, b) => a + b, 0) / amounts.length : null;

//   const f = (n) => n != null ? formatCurrency(n) : "—";

//   const accepted = bids.filter((b) => ["accepted","approved"].includes((b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase())).length;
//   const pending  = bids.filter((b) => ["pending","submitted",""].includes((b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase())).length;
//   const rejected = bids.filter((b) => ["rejected","declined"].includes((b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase())).length;

//   const cells = [
//     { label: "Total Bids",    value: bids.length,  color: "#5CFF67",  Icon: Activity },
//     { label: "Lowest Quote",  value: f(lowest),    color: "#9EFD38",  Icon: TrendingDown },
//     { label: "Highest Quote", value: f(highest),   color: "#5CDFDF",  Icon: TrendingUp },
//     { label: "Avg. Quote",    value: f(avg),        color: "#B7F66E",  Icon: DollarSign },
//     { label: "Accepted",      value: accepted,      color: "#5CFF67",  Icon: CheckCircle2 },
//     { label: "Pending",       value: pending,       color: "#B7F66E",  Icon: Timer },
//     { label: "Rejected",      value: rejected,      color: "#FF6B6B",  Icon: XCircle },
//   ];

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginBottom: 16 }}>
//       {cells.map(({ label, value, color, Icon }) => (
//         <div key={label} style={{
//           background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)",
//           borderRadius: 14, padding: "14px 16px",
//         }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
//             <Icon size={14} color={color} style={{ opacity: 0.7 }} />
//           </div>
//           <p style={{ fontSize: 20, fontWeight: 800, color, letterSpacing: "-0.4px", margin: 0 }}>{value}</p>
//           <p style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "rgba(254,253,250,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "4px 0 0" }}>{label}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── Bid Card ───────────────────────────────────────────────────────────────────
// function BidCard({ bid, index }) {
//   const [expanded, setExpanded] = useState(false);
//   const [hovered, setHovered]   = useState(false);

//   const rawStatus = bid.status ?? bid.bid_status ?? bid.bidStatus ?? "";
//   const meta = getBidStatusMeta(rawStatus);
//   const { Icon: StatusIcon } = meta;

//   const vendorName  = bid.vendor_name ?? bid.vendorName ?? bid.bidder_name ?? bid.name ?? bid.vendor?.fullname ?? bid.bidderName ?? `Vendor #${index + 1}`;
//   const vendorEmail = bid.vendor_email ?? bid.email ?? bid.vendor?.email ?? bid.vendorEmail;
//   const vendorPhone = bid.vendor_phone ?? bid.phone ?? bid.vendor?.phone_number ?? bid.vendorPhone;
//   const amount      = bid.amount ?? bid.bid_amount ?? bid.price ?? bid.quotation ?? bid.quote;
//   const note        = bid.note ?? bid.message ?? bid.description ?? bid.remarks ?? bid.comment;
//   const createdAt   = formatDate(bid.created_at ?? bid.createdAt ?? bid.bid_date ?? bid.date);
//   const bidId       = bid.id ?? bid.bid_id ?? bid._id;

//   // Job info (if nested)
//   const jobId       = bid.job_id ?? bid.jobId ?? bid.location_id ?? bid.locationId;
//   const jobCity     = bid.job?.pickup?.city ?? bid.pickup_city ?? bid.jobCity;
//   const jobDrop     = bid.job?.drop?.city ?? bid.drop_city ?? bid.jobDropCity;

//   const initials = vendorName
//     ? vendorName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
//     : "??";

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#1A2421",
//         border: `1px solid ${hovered ? "rgba(92,255,103,0.25)" : "rgba(92,255,103,0.08)"}`,
//         borderRadius: 16, overflow: "hidden",
//         transition: "border-color 0.2s, box-shadow 0.2s",
//         boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.35)" : "none",
//         animation: "fadeUp 0.3s ease both",
//         animationDelay: `${Math.min(index * 40, 400)}ms`,
//       }}
//     >
//       <div style={{ height: 2, background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)" }} />

//       <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

//         {/* Row 1: vendor info + status */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 42, height: 42, borderRadius: "50%",
//               background: "#3C5B30", border: "1.5px solid rgba(92,255,103,0.22)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 13, fontWeight: 700, color: "#5CFF67", flexShrink: 0,
//             }}>
//               {initials}
//             </div>
//             <div>
//               <p style={{ fontSize: 15, fontWeight: 700, color: "#FEFDFA", margin: 0 }}>{vendorName}</p>
//               {vendorEmail && (
//                 <p style={{ fontSize: 11, color: "rgba(254,253,250,0.3)", fontFamily: "monospace", margin: "2px 0 0" }}>{vendorEmail}</p>
//               )}
//               {vendorPhone && (
//                 <p style={{ fontSize: 11, color: "rgba(254,253,250,0.3)", fontFamily: "monospace", margin: "1px 0 0" }}>{vendorPhone}</p>
//               )}
//             </div>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
//             <span style={{
//               display: "inline-flex", alignItems: "center", gap: 5,
//               padding: "4px 12px", borderRadius: 20,
//               fontSize: 10, fontWeight: 700, fontFamily: "monospace",
//               background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
//             }}>
//               <StatusIcon size={9} />{meta.label}
//             </span>
//             {bidId && (
//               <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(254,253,250,0.18)" }}>
//                 #{String(bidId).slice(0, 10)}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Row 2: amount + date + job route */}
//         <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//           {amount != null && (
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 6,
//               background: "rgba(92,255,103,0.08)", border: "1px solid rgba(92,255,103,0.18)",
//               borderRadius: 10, padding: "6px 14px",
//             }}>
//               <DollarSign size={13} color="#5CFF67" />
//               <span style={{ fontSize: 17, fontWeight: 800, color: "#5CFF67", letterSpacing: "-0.4px" }}>
//                 {formatCurrency(amount) ?? amount}
//               </span>
//             </div>
//           )}
//           {createdAt && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(254,253,250,0.35)" }}>
//               <Calendar size={11} color="rgba(254,253,250,0.3)" />{createdAt}
//             </span>
//           )}
//           {(jobCity || jobDrop) && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(254,253,250,0.35)", fontFamily: "monospace" }}>
//               <MapPin size={11} color="rgba(92,255,103,0.4)" />
//               {[jobCity, jobDrop].filter(Boolean).join(" → ")}
//             </span>
//           )}
//           {jobId && !jobCity && (
//             <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(254,253,250,0.2)" }}>
//               Job: {String(jobId).slice(0, 10)}…
//             </span>
//           )}
//         </div>

//         {/* Note */}
//         {note && (
//           <div>
//             <p style={{
//               fontSize: 12, color: "rgba(254,253,250,0.45)", lineHeight: 1.6, margin: 0,
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
//               <button
//                 onClick={() => setExpanded((p) => !p)}
//                 style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#5CFF67", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "monospace" }}
//               >
//                 {expanded ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Read more</>}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function AllBidsScreen() {
//   const navigate     = useNavigate();
//   const [bids,       setBids]       = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [error,      setError]      = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search,     setSearch]     = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy,     setSortBy]     = useState("newest");
//   const abortRef = useRef(null);

//   const loadBids = useCallback(async (silent = false) => {
//     if (abortRef.current) abortRef.current.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;

//     if (!silent) setLoading(true); else setRefreshing(true);
//     setError(null);

//     try {
//       const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getAllBids`, { signal: controller.signal });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       const list = Array.isArray(data) ? data : (data.bids ?? data.data ?? []);
//       if (!controller.signal.aborted) setBids(list);
//     } catch (err) {
//       if (err.name !== "AbortError") setError(err.message);
//     } finally {
//       if (!controller.signal.aborted) { setLoading(false); setRefreshing(false); }
//     }
//   }, []);

//   useEffect(() => { loadBids(); return () => abortRef.current?.abort(); }, [loadBids]);

//   // Filter
//   const filtered = bids.filter((bid) => {
//     const s = (bid.status ?? bid.bid_status ?? bid.bidStatus ?? "").toLowerCase();
//     const matchStatus =
//       statusFilter === "all" ||
//       (statusFilter === "accepted"  && ["accepted","approved"].includes(s)) ||
//       (statusFilter === "pending"   && ["pending","submitted",""].includes(s)) ||
//       (statusFilter === "rejected"  && ["rejected","declined"].includes(s));

//     if (!matchStatus) return false;

//     if (search.trim()) {
//       const q = search.toLowerCase();
//       const name  = (bid.vendor_name ?? bid.vendorName ?? bid.name ?? bid.vendor?.fullname ?? bid.bidderName ?? "").toLowerCase();
//       const email = (bid.vendor_email ?? bid.email ?? bid.vendor?.email ?? "").toLowerCase();
//       const note  = (bid.note ?? bid.message ?? bid.description ?? "").toLowerCase();
//       const city  = (bid.job?.pickup?.city ?? bid.pickup_city ?? bid.jobCity ?? "").toLowerCase();
//       return name.includes(q) || email.includes(q) || note.includes(q) || city.includes(q);
//     }
//     return true;
//   });

//   // Sort
//   const sorted = [...filtered].sort((a, b) => {
//     if (sortBy === "lowest") {
//       const aA = parseFloat(a.amount ?? a.bid_amount ?? a.price ?? Infinity);
//       const bA = parseFloat(b.amount ?? b.bid_amount ?? b.price ?? Infinity);
//       return aA - bA;
//     }
//     if (sortBy === "highest") {
//       const aA = parseFloat(a.amount ?? a.bid_amount ?? a.price ?? 0);
//       const bA = parseFloat(b.amount ?? b.bid_amount ?? b.price ?? 0);
//       return bA - aA;
//     }
//     // newest (default)
//     const aD = new Date(a.created_at ?? a.createdAt ?? 0).getTime();
//     const bD = new Date(b.created_at ?? b.createdAt ?? 0).getTime();
//     return bD - aD;
//   });

//   const statusFilters = [
//     { key: "all",       label: "All",       color: "#5CFF67" },
//     { key: "accepted",  label: "Accepted",  color: "#5CFF67" },
//     { key: "pending",   label: "Pending",   color: "#B7F66E" },
//     { key: "rejected",  label: "Rejected",  color: "#FF6B6B" },
//   ];

//   const sortOptions = [
//     { key: "newest",  label: "Newest first" },
//     { key: "lowest",  label: "Lowest quote" },
//     { key: "highest", label: "Highest quote" },
//   ];

//   return (
//     <div style={{ background: "#021616", minHeight: "100vh", padding: "28px 32px" }}>
//       <style>{`
//         @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//       `}</style>

//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(92,255,103,0.06)", color: "rgba(254,253,250,0.7)", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, marginBottom: 24, fontWeight: 500 }}
//         onMouseEnter={(e) => { e.currentTarget.style.color = "#5CFF67"; e.currentTarget.style.borderColor = "rgba(92,255,103,0.3)"; }}
//         onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(254,253,250,0.7)"; e.currentTarget.style.borderColor = "rgba(92,255,103,0.12)"; }}
//       >
//         <ArrowLeft size={15} /> Back
//       </button>

//       {/* Page header */}
//       <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 20, padding: "24px 28px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)" }} />
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(92,255,103,0.1)", border: "1px solid rgba(92,255,103,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Gavel size={22} color="#5CFF67" />
//             </div>
//             <div>
//               <h1 style={{ fontSize: 22, fontWeight: 800, color: "#FEFDFA", letterSpacing: "-0.5px", margin: 0 }}>All Bids</h1>
//               <p style={{ fontSize: 12, color: "rgba(254,253,250,0.35)", fontFamily: "monospace", marginTop: 3 }}>
//                 Every vendor bid across all jobs · {filtered.length} of {bids.length} shown
//               </p>
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {!loading && (
//               <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(92,255,103,0.08)", border: "1px solid rgba(92,255,103,0.2)", fontSize: 12, fontWeight: 700, color: "#5CFF67", fontFamily: "monospace" }}>
//                 {bids.length} total
//               </div>
//             )}
//             <button
//               onClick={() => loadBids(true)}
//               disabled={loading || refreshing}
//               style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(92,255,103,0.06)", color: "#5CFF67", border: "1px solid rgba(92,255,103,0.2)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 12, opacity: loading || refreshing ? 0.5 : 1 }}
//             >
//               <RefreshCw size={13} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} /> Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Summary stats */}
//       {!loading && bids.length > 0 && <SummaryBar bids={bids} />}

//       {/* Filters + search + sort */}
//       <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
//         {/* Search */}
//         <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10, padding: "7px 12px", flex: "1 1 200px" }}>
//           <Search size={13} color="rgba(254,253,250,0.3)" />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search vendor, city, note…"
//             style={{ background: "none", border: "none", outline: "none", color: "#FEFDFA", fontSize: 13, flex: 1, fontFamily: "inherit" }}
//           />
//         </div>

//         {/* Status filters */}
//         <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//           {statusFilters.map(({ key, label, color }) => (
//             <button
//               key={key}
//               onClick={() => setStatusFilter(key)}
//               style={{
//                 padding: "5px 14px", borderRadius: 20, cursor: "pointer",
//                 fontSize: 11, fontWeight: 600, fontFamily: "monospace",
//                 border: statusFilter === key ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.08)",
//                 background: statusFilter === key ? `${color}18` : "rgba(255,255,255,0.03)",
//                 color: statusFilter === key ? color : "rgba(254,253,250,0.4)",
//                 transition: "all 0.15s",
//               }}
//             >{label}</button>
//           ))}
//         </div>

//         {/* Sort */}
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           style={{
//             background: "rgba(0,0,0,0.3)", border: "1px solid rgba(92,255,103,0.15)",
//             borderRadius: 10, padding: "6px 12px", color: "rgba(254,253,250,0.6)",
//             fontSize: 11, fontFamily: "monospace", outline: "none", cursor: "pointer",
//           }}
//         >
//           {sortOptions.map((o) => (
//             <option key={o.key} value={o.key} style={{ background: "#1A2421" }}>{o.label}</option>
//           ))}
//         </select>
//       </div>

//       {/* Error */}
//       {error && !loading && (
//         <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
//           <AlertCircle size={18} color="#FF6B6B" />
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600, margin: 0 }}>Failed to load bids</p>
//             <p style={{ fontSize: 11, color: "rgba(255,107,107,0.7)", fontFamily: "monospace", margin: "3px 0 0" }}>{error}</p>
//           </div>
//           <button onClick={() => loadBids()} style={{ background: "rgba(255,80,80,0.1)", color: "#FF6B6B", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Retry</button>
//         </div>
//       )}

//       {/* Bid list */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {loading ? (
//           Array.from({ length: 5 }).map((_, i) => <BidRowSkeleton key={i} />)
//         ) : sorted.length === 0 ? (
//           <div style={{ background: "#1A2421", border: "1px solid rgba(92,255,103,0.08)", borderRadius: 16, padding: "64px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//             <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(92,255,103,0.06)", border: "1px solid rgba(92,255,103,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Gavel size={24} color="rgba(92,255,103,0.4)" />
//             </div>
//             <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(254,253,250,0.5)", textAlign: "center", margin: 0 }}>
//               {statusFilter !== "all" || search.trim() ? "No bids match your filter" : "No bids found"}
//             </p>
//             <p style={{ fontSize: 12, color: "rgba(254,253,250,0.25)", fontFamily: "monospace", margin: 0 }}>
//               Bids will appear here once vendors respond to jobs
//             </p>
//           </div>
//         ) : (
//           sorted.map((bid, i) => (
//             <BidCard key={bid.id ?? bid.bid_id ?? bid._id ?? i} bid={bid} index={i} />
//           ))
//         )}
//       </div>

//       {!loading && sorted.length > 0 && (
//         <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, fontFamily: "monospace", color: "rgba(254,253,250,0.2)" }}>
//           {sorted.length} bid{sorted.length !== 1 ? "s" : ""} · {sortBy === "newest" ? "sorted by newest first" : sortBy === "lowest" ? "sorted by lowest quote" : "sorted by highest quote"}
//         </p>
//       )}
//     </div>
//   );
// }

// theam
// src/Screens/AllBidsScreen.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Gavel,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  MapPin,
  TrendingDown,
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  Timer,
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
  if (isNaN(num)) return String(val);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

function getBidStatusMeta(status, colors) {
  const s = (status ?? "").toLowerCase();
  if (["accepted", "approved"].includes(s))
    return {
      label: "Accepted",
      color: colors.chipVerifiedColor,
      bg: colors.chipVerifiedBg,
      border: colors.chipVerifiedBorder,
      Icon: CheckCircle2,
    };
  if (["rejected", "declined"].includes(s))
    return {
      label: "Rejected",
      color: colors.chipRejectedColor,
      bg: colors.chipRejectedBg,
      border: colors.chipRejectedBorder,
      Icon: XCircle,
    };
  if (["withdrawn", "cancelled"].includes(s))
    return {
      label: "Withdrawn",
      color: colors.textMuted,
      bg: colors.userCardBg,
      border: colors.borderSubtle,
      Icon: XCircle,
    };
  return {
    label: "Pending",
    color: colors.chipPendingColor,
    bg: colors.chipPendingBg,
    border: colors.chipPendingBorder,
    Icon: Timer,
  };
}

// ── Skeleton ───────────────────────────────────────────────────────────────────
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

function BidRowSkeleton() {
  const { colors } = useTheme();
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderFaint}`,
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Skeleton width={40} height={40} radius={40} />
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
      >
        <Skeleton width="35%" height={13} />
        <Skeleton width="55%" height={11} />
      </div>
      <Skeleton width={90} height={30} radius={10} />
      <Skeleton width={80} height={28} radius={20} />
    </div>
  );
}

// ── Summary Bar ────────────────────────────────────────────────────────────────
function SummaryBar({ bids }) {
  const { colors } = useTheme();

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
  const f = (n) => (n != null ? formatCurrency(n) : "—");

  const accepted = bids.filter((b) =>
    ["accepted", "approved"].includes(
      (b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase(),
    ),
  ).length;
  const pending = bids.filter((b) =>
    ["pending", "submitted", ""].includes(
      (b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase(),
    ),
  ).length;
  const rejected = bids.filter((b) =>
    ["rejected", "declined"].includes(
      (b.status ?? b.bid_status ?? b.bidStatus ?? "").toLowerCase(),
    ),
  ).length;

  const cells = [
    {
      label: "Total Bids",
      value: bids.length,
      color: colors.accentPrimary,
      Icon: Activity,
    },
    {
      label: "Lowest Quote",
      value: f(lowest),
      color: colors.accentQuaternary,
      Icon: TrendingDown,
    },
    {
      label: "Highest Quote",
      value: f(highest),
      color: colors.chipPaidColor,
      Icon: TrendingUp,
    },
    {
      label: "Avg. Quote",
      value: f(avg),
      color: colors.accentSecondary,
      Icon: DollarSign,
    },
    {
      label: "Accepted",
      value: accepted,
      color: colors.chipVerifiedColor,
      Icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: pending,
      color: colors.chipPendingColor,
      Icon: Timer,
    },
    {
      label: "Rejected",
      value: rejected,
      color: colors.chipRejectedColor,
      Icon: XCircle,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {cells.map(({ label, value, color, Icon }) => (
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Icon size={14} color={color} style={{ opacity: 0.7 }} />
          </div>
          <p
            style={{
              fontSize: 20,
              fontWeight: 800,
              color,
              letterSpacing: "-0.4px",
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

// ── Bid Card ───────────────────────────────────────────────────────────────────
function BidCard({ bid, index }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rawStatus = bid.status ?? bid.bid_status ?? bid.bidStatus ?? "";
  const meta = getBidStatusMeta(rawStatus, colors);
  const { Icon: StatusIcon } = meta;

  const vendorName =
    bid.vendor_name ??
    bid.vendorName ??
    bid.bidder_name ??
    bid.name ??
    bid.vendor?.fullname ??
    bid.bidderName ??
    `Vendor #${index + 1}`;
  const vendorEmail =
    bid.vendor_email ?? bid.email ?? bid.vendor?.email ?? bid.vendorEmail;
  const vendorPhone =
    bid.vendor_phone ??
    bid.phone ??
    bid.vendor?.phone_number ??
    bid.vendorPhone;
  const amount =
    bid.amount ?? bid.bid_amount ?? bid.price ?? bid.quotation ?? bid.quote;
  const note =
    bid.note ?? bid.message ?? bid.description ?? bid.remarks ?? bid.comment;
  const createdAt = formatDate(
    bid.created_at ?? bid.createdAt ?? bid.bid_date ?? bid.date,
  );
  const bidId = bid.id ?? bid.bid_id ?? bid._id;
  const jobId = bid.job_id ?? bid.jobId ?? bid.location_id ?? bid.locationId;
  const jobCity = bid.job?.pickup?.city ?? bid.pickup_city ?? bid.jobCity;
  const jobDrop = bid.job?.drop?.city ?? bid.drop_city ?? bid.jobDropCity;

  const initials = vendorName
    ? vendorName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

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
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.15)" : "none",
        animation: "fadeUp 0.3s ease both",
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
    >
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg,${colors.accentPrimary},${colors.accentQuaternary},transparent)`,
        }}
      />

      <div
        style={{
          padding: "18px 20px",
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
                width: 42,
                height: 42,
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
            <div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                {vendorName}
              </p>
              {vendorEmail && (
                <p
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    fontFamily: "monospace",
                    margin: "2px 0 0",
                  }}
                >
                  {vendorEmail}
                </p>
              )}
              {vendorPhone && (
                <p
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    fontFamily: "monospace",
                    margin: "1px 0 0",
                  }}
                >
                  {vendorPhone}
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
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
              }}
            >
              <StatusIcon size={9} />
              {meta.label}
            </span>
            {bidId && (
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: colors.textFaint,
                }}
              >
                #{String(bidId).slice(0, 10)}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: amount + date + route */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
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
                border: `1px solid ${colors.borderInput}`,
                borderRadius: 10,
                padding: "6px 14px",
              }}
            >
              <DollarSign size={13} color={colors.accentPrimary} />
              <span
                style={{
                  fontSize: 17,
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
          {(jobCity || jobDrop) && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color: colors.textMuted,
                fontFamily: "monospace",
              }}
            >
              <MapPin size={11} color={colors.accentPrimary} />
              {[jobCity, jobDrop].filter(Boolean).join(" → ")}
            </span>
          )}
          {jobId && !jobCity && (
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textFaint,
              }}
            >
              Job: {String(jobId).slice(0, 10)}…
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
                margin: 0,
                display: expanded ? "block" : "-webkit-box",
                WebkitLineClamp: expanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                overflow: expanded ? "visible" : "hidden",
                background: colors.accentIconBg,
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

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AllBidsScreen() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const abortRef = useRef(null);

  // 👇 YAHI ADD KARNA HAI
  const [expandedJobs, setExpandedJobs] = useState({});

  const toggleJob = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const loadBids = useCallback(async (silent = false) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getAllBids`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.bids ?? data.data ?? []);
      if (!controller.signal.aborted) setBids(list);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    loadBids();
    return () => abortRef.current?.abort();
  }, [loadBids]);

  const filtered = bids.filter((bid) => {
    const s = (
      bid.status ??
      bid.bid_status ??
      bid.bidStatus ??
      ""
    ).toLowerCase();
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
        bid.bidderName ??
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
      const city = (
        bid.job?.pickup?.city ??
        bid.pickup_city ??
        bid.jobCity ??
        ""
      ).toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        note.includes(q) ||
        city.includes(q)
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "lowest") {
      return (
        parseFloat(a.amount ?? a.bid_amount ?? a.price ?? Infinity) -
        parseFloat(b.amount ?? b.bid_amount ?? b.price ?? Infinity)
      );
    }
    if (sortBy === "highest") {
      return (
        parseFloat(b.amount ?? b.bid_amount ?? b.price ?? 0) -
        parseFloat(a.amount ?? a.bid_amount ?? a.price ?? 0)
      );
    }
    return (
      new Date(b.created_at ?? b.createdAt ?? 0).getTime() -
      new Date(a.created_at ?? a.createdAt ?? 0).getTime()
    );
  });

  const groupedBids = sorted.reduce((acc, bid) => {
    const jobId =
      bid.job_id ?? bid.jobId ?? bid.location_id ?? bid.locationId ?? "Unknown";

    if (!acc[jobId]) {
      acc[jobId] = [];
    }

    acc[jobId].push(bid);

    return acc;
  }, {});

  const statusFilters = [
    { key: "all", label: "All", color: colors.accentPrimary },
    { key: "accepted", label: "Accepted", color: colors.chipVerifiedColor },
    { key: "pending", label: "Pending", color: colors.chipPendingColor },
    { key: "rejected", label: "Rejected", color: colors.chipRejectedColor },
  ];

  const sortOptions = [
    { key: "newest", label: "Newest first" },
    { key: "lowest", label: "Lowest quote" },
    { key: "highest", label: "Highest quote" },
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

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: colors.accentIconBg,
          color: colors.textMuted,
          border: `1px solid ${colors.borderSubtle}`,
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
          e.currentTarget.style.color = colors.textMuted;
          e.currentTarget.style.borderColor = colors.borderSubtle;
        }}
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Page header */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
          transition: "background 0.25s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,${colors.accentPrimary},${colors.accentQuaternary},transparent)`,
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
                  fontSize: 22,
                  fontWeight: 800,
                  color: colors.textPrimary,
                  letterSpacing: "-0.5px",
                  margin: 0,
                }}
              >
                All Bids
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  fontFamily: "monospace",
                  marginTop: 3,
                }}
              >
                Every vendor bid across all jobs · {filtered.length} of{" "}
                {bids.length} shown
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
                  border: `1px solid ${colors.borderInput}`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.accentPrimary,
                  fontFamily: "monospace",
                }}
              >
                {bids.length} total
              </div>
            )}
            <button
              onClick={() => loadBids(true)}
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
      </div>

      {/* Summary */}
      {!loading && bids.length > 0 && <SummaryBar bids={bids} />}

      {/* Filters */}
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
          transition: "background 0.25s ease",
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
            flex: "1 1 200px",
          }}
        >
          <Search size={13} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendor, city, note…"
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

        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statusFilters.map(({ key, label, color }) => (
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
                    : `1px solid ${colors.borderSubtle}`,
                background:
                  statusFilter === key ? `${color}18` : colors.accentIconBg,
                color: statusFilter === key ? color : colors.textMuted,
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.borderInput}`,
            borderRadius: 10,
            padding: "6px 12px",
            color: colors.textSecondary,
            fontSize: 11,
            fontFamily: "monospace",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {sortOptions.map((o) => (
            <option
              key={o.key}
              value={o.key}
              style={{ background: colors.cardBg }}
            >
              {o.label}
            </option>
          ))}
        </select>
      </div>

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
          <AlertCircle size={18} color={colors.chipRejectedColor} />
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 13,
                color: colors.chipRejectedColor,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Failed to load bids
            </p>
            <p
              style={{
                fontSize: 11,
                color: colors.chipRejectedColor,
                opacity: 0.7,
                fontFamily: "monospace",
                margin: "3px 0 0",
              }}
            >
              {error}
            </p>
          </div>
          <button
            onClick={() => loadBids()}
            style={{
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

      {/* Bid list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <BidRowSkeleton key={i} />)
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
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.textMuted,
                textAlign: "center",
                margin: 0,
              }}
            >
              {statusFilter !== "all" || search.trim()
                ? "No bids match your filter"
                : "No bids found"}
            </p>
            <p
              style={{
                fontSize: 12,
                color: colors.textFaint,
                fontFamily: "monospace",
                margin: 0,
              }}
            >
              Bids will appear here once vendors respond to jobs
            </p>
          </div>
        ) : (
          Object.entries(groupedBids).map(([jobId, bids]) => {
            const firstBid = bids[0];

            const lowest = Math.min(
              ...bids.map((b) =>
                parseFloat(b.amount ?? b.bid_amount ?? b.price ?? 0),
              ),
            );

            return (
              <div
                key={jobId}
                style={{
                  border: `1px solid ${colors.borderMid}`,
                  borderRadius: 16,
                  marginBottom: 18,
                  overflow: "hidden",
                  background: colors.cardBg,
                }}
              >
                {/* Header */}
                <div
                  onClick={() => toggleJob(jobId)}
                  style={{
                    cursor: "pointer",
                    padding: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: colors.accentIconBg,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: colors.textPrimary,
                      }}
                    >
                      Job #{jobId}
                    </h3>

                    <div
                      style={{
                        marginTop: 5,
                        color: colors.textMuted,
                        fontSize: 12,
                      }}
                    >
                      {firstBid.pickup_city ||
                        firstBid.job?.pickup?.city ||
                        "-"}
                      {" → "}
                      {firstBid.drop_city || firstBid.job?.drop?.city || "-"}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        color: colors.accentPrimary,
                        fontWeight: 700,
                      }}
                    >
                      Lowest Quote : {formatCurrency(lowest)}
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: 5,
                      }}
                    >
                      {bids.length} Bids
                    </div>

                    {expandedJobs[jobId] ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>

                {/* Bids */}
                {expandedJobs[jobId] && (
                  <div
                    style={{
                      padding: 15,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {bids.map((bid, i) => (
                      <BidCard
                        key={bid.id ?? bid.bid_id ?? bid._id ?? i}
                        bid={bid}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {!loading && sorted.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11,
            fontFamily: "monospace",
            color: colors.textFaint,
          }}
        >
          {sorted.length} bid{sorted.length !== 1 ? "s" : ""} ·{" "}
          {sortBy === "newest"
            ? "sorted by newest first"
            : sortBy === "lowest"
              ? "sorted by lowest quote"
              : "sorted by highest quote"}
        </p>
      )}
    </div>
  );
}

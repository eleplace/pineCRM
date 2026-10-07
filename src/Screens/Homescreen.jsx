import { BASE_URL as API_BASE_URL, BASE_URL2 } from "../api/config";
// src/pages/Dashboard.jsx
// Optimizations:
//   1. localStorage cache (5-min TTL) — instant repeat visits
//   2. Concurrency-limited subscription checks (max 8 in-flight)
//   3. Removed per-vendor jobs/bids fetching (was 2×N calls)

// import { useEffect, useState, useMemo } from "react";
// import Sidebar from "../components/layout/Sidebar";
// import {
//   Users,
//   ShieldCheck,
//   ShieldOff,
//   CreditCard,
//   XCircle,
//   Briefcase,
//   Gavel,
//   TrendingUp,
//   Search,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "https://pineapplebyele.com/";

// // ─── Cache helpers (2-min TTL) ────────────────────────────────────────────────
// const CACHE_KEY = "dashboard_vendors";
// const CACHE_TTL = 2 * 60 * 1000; // 2  minutes

// function readCache() {
//   try {
//     const raw = localStorage.getItem(CACHE_KEY);
//     if (!raw) return null;
//     const { ts, data } = JSON.parse(raw);
//     if (Date.now() - ts > CACHE_TTL) return null;
//     return data;
//   } catch {
//     return null;
//   }
// }

// function writeCache(data) {
//   try {
//     localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
//   } catch {
//     // storage full or unavailable — skip silently
//   }
// }

// // ─── Concurrency limiter ──────────────────────────────────────────────────────
// // Runs `tasks` (array of () => Promise) with at most `limit` in-flight at once.
// async function limitConcurrency(tasks, limit = 8) {
//   const results = new Array(tasks.length);
//   let index = 0;

//   async function worker() {
//     while (index < tasks.length) {
//       const i = index++;
//       try {
//         results[i] = await tasks[i]();
//       } catch {
//         results[i] = null;
//       }
//     }
//   }

//   await Promise.all(
//     Array.from({ length: Math.min(limit, tasks.length) }, worker),
//   );
//   return results;
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({
//   title,
//   count,
//   growth,
//   icon: Icon,
//   accentColor = "#5CFF67",
//   loading,
// }) {
//   return (
//     <div
//       className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200"
//       style={{
//         background: "#1A2421",
//         border: "1px solid rgba(92,255,103,0.1)",
//         cursor: "default",
//       }}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.borderColor = "rgba(92,255,103,0.28)")
//       }
//       onMouseLeave={(e) =>
//         (e.currentTarget.style.borderColor = "rgba(92,255,103,0.1)")
//       }
//     >
//       <div
//         className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
//         style={{ background: accentColor, opacity: 0.7 }}
//       />

//       <div
//         className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
//         style={{ background: "rgba(92,255,103,0.1)", color: accentColor }}
//       >
//         <Icon size={17} />
//       </div>

//       {loading ? (
//         <div
//           className="h-10 w-14 rounded-lg mb-1"
//           style={{
//             background: "rgba(92,255,103,0.07)",
//             animation: "pulse 1.2s ease-in-out infinite",
//           }}
//         />
//       ) : (
//         <p
//           className="text-4xl font-bold tracking-tight leading-none"
//           style={{ color: "#FEFDFA" }}
//         >
//           {count ?? "—"}
//         </p>
//       )}

//       <p
//         className="mt-1 text-[11px] font-semibold uppercase tracking-wider"
//         style={{ color: "rgba(254,253,250,0.38)", fontFamily: "monospace" }}
//       >
//         {title}
//       </p>

//       <div
//         className="mt-4 flex items-center gap-1 text-[11px]"
//         style={{ color: accentColor, fontFamily: "monospace" }}
//       >
//         <TrendingUp size={12} />
//         {growth}
//       </div>

//       <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.85} }`}</style>
//     </div>
//   );
// }

// // ─── Status Chip ──────────────────────────────────────────────────────────────
// function Chip({ type }) {
//   const styles = {
//     verified: {
//       background: "rgba(92,255,103,0.12)",
//       color: "#5CFF67",
//       border: "1px solid rgba(92,255,103,0.22)",
//       label: "Verified",
//     },
//     pending: {
//       background: "rgba(183,246,110,0.08)",
//       color: "#B7F66E",
//       border: "1px solid rgba(183,246,110,0.18)",
//       label: "Pending",
//     },
//     rejected: {
//       background: "rgba(255,80,80,0.1)",
//       color: "#FF6B6B",
//       border: "1px solid rgba(255,80,80,0.2)",
//       label: "Rejected",
//     },
//     paid: {
//       background: "rgba(28,88,88,0.35)",
//       color: "#5CDFDF",
//       border: "1px solid rgba(92,223,223,0.2)",
//       label: "Paid",
//     },
//     unpaid: {
//       background: "rgba(60,90,46,0.25)",
//       color: "rgba(254,253,250,0.4)",
//       border: "1px solid rgba(94,255,103,0.08)",
//       label: "Unpaid",
//     },
//   };
//   const s = styles[type] || styles.pending;
//   return (
//     <span
//       className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold"
//       style={{ fontFamily: "monospace", ...s }}
//     >
//       {s.label}
//     </span>
//   );
// }

// // ─── Avatar ───────────────────────────────────────────────────────────────────
// function Avatar({ name, pic }) {
//   const [imgError, setImgError] = useState(false);
//   const initials = name
//     ? name
//         .split(" ")
//         .map((w) => w[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
//     : "??";

//   if (pic && !imgError) {
//     return (
//       <img
//         src={BASE_URL + pic}
//         alt={name}
//         onError={() => setImgError(true)}
//         className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
//         style={{ border: "1.5px solid rgba(92,255,103,0.22)" }}
//       />
//     );
//   }
//   return (
//     <div
//       className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
//       style={{
//         background: "#3C5B30",
//         color: "#5CFF67",
//         border: "1.5px solid rgba(92,255,103,0.22)",
//       }}
//     >
//       {initials}
//     </div>
//   );
// }

// // Vendor registration timestamps vary between API versions.
function getVendorCreatedAt(item) {
  // getuser.php returns vendor details under `partner`; some responses also
  // expose create_date  on the outer record. Use only the API's create_date  field.
  const value = item?.partner?.create_date  ?? item?.create_date ;
  if (!value) return null;
  const date = new Date(String(value).replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
// export default function Dashboard() {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subsDone, setSubsDone] = useState(false); // subscription checks finished?
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();
//   const [totalJobs, setTotalJobs] = useState(0);
//   useEffect(() => {
//     let cancelled = false;

//     async function fetchVendors() {
//       // ── 1. Try cache first ────────────────────────────────────────────────
//       const cached = readCache();
//       if (cached) {
//         setVendors(cached);
//         setLoading(false);
//         setSubsDone(true);
//         return;
//       }

//       // ── 2. Fetch vendor list ──────────────────────────────────────────────
//       let vendorsOnly = [];
//       try {
//         const res = await fetch(
//           `${API_BASE_URL}getuser.php`,
//         );
//         const data = await res.json();
//         const all = data.data || data || [];
//         vendorsOnly = all.filter(
//           (item) => item.partner?.user_role === "Vendor",
//         );
//       } catch (err) {
//         console.error("Vendor fetch failed:", err);
//         setLoading(false);
//         return;
//       }

//       // Show the table immediately (without subscription status) so the user
//       // isn't staring at a spinner while we do N more fetches.
//       if (!cancelled) {
//         setVendors(
//           vendorsOnly.map((v) => ({ ...v, subscription_status: "loading" })),
//         );
//         setLoading(false);
//       }

//       // ── 3. Subscription checks — max 8 in-flight ─────────────────────────
//       const tasks = vendorsOnly.map((item) => async () => {
//         const userId = item.partner?.user_id;
//         if (!userId) return { ...item, subscription_status: "unpaid" };

//         try {
//           const subRes = await fetch(
//             `${BASE_URL2.replace(/\/$/, "")}/checkActiveSubscription/${userId}`,
//           );
//           const subData = await subRes.json();
//           return {
//             ...item,
//             subscription_status: subData?.hasActiveSubscription
//               ? "paid"
//               : "unpaid",
//             subscription_data: subData,
//           };
//         } catch {
//           return { ...item, subscription_status: "unpaid" };
//         }
//       });

//       const withSubs = await limitConcurrency(tasks, 8);

//       if (!cancelled) {
//         setVendors(withSubs);
//         setSubsDone(true);
//         writeCache(withSubs); // persist for next visit
//       }
//     }
//     fetchVendors();
//     return () => {
//       cancelled = true;
//     };
//   }, []);
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
//   // useEffect(() => {
//   //   async function fetchJobs() {
//   //     try {
//   //       const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocation?page=1&limit=1`);

//   //       const data = await res.json();

//   //       setTotalJobs(data.total || 0);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   }

//   //   fetchJobs();
//   // }, []);
//   // ── Computed stats ────────────────────────────────────────────────────────
//   const stats = useMemo(() => {
//     const kycVerified = vendors.filter(
//       (v) => v.partner?.kycstatus === 1,
//     ).length;
//     const kycPending = vendors.filter((v) => v.partner?.kycstatus === 0).length;
//     const kycRejected = vendors.filter(
//       (v) => v.partner?.kycstatus === 2,
//     ).length;
//     const paid = vendors.filter((v) => v.subscription_status === "paid").length;
//     const unpaid = vendors.filter(
//       (v) => v.subscription_status === "unpaid",
//     ).length;

//     return [
//       {
//         title: "Total Vendors",
//         count: vendors.length,
//         growth: "+6 this month",
//         icon: Users,
//         accentColor: "#5CFF67",
//       },
//       {
//         title: "KYC Verified",
//         count: kycVerified,
//         growth: "+7 this month",
//         icon: ShieldCheck,
//         accentColor: "#5CFF67",
//       },
//       {
//         title: "Pending KYC",
//         count: kycPending,
//         growth: "+5 this month",
//         icon: ShieldOff,
//         accentColor: "#B7F66E",
//       },
//       {
//         title: "KYC Rejected",
//         count: kycRejected,
//         growth: "—",
//         icon: ShieldOff,
//         accentColor: "#FF6B6B",
//       },
//       {
//         title: "Paid Subscriptions",
//         count: paid,
//         growth: "+3 this month",
//         icon: CreditCard,
//         accentColor: "#C7FD98",
//         subsLoading: !subsDone,
//       },
//       {
//         title: "Unpaid Subscriptions",
//         count: unpaid,
//         growth: "+9 this month",
//         icon: XCircle,
//         accentColor: "rgba(254,253,250,0.35)",
//         subsLoading: !subsDone,
//       },
//       // ── Wire these to a single aggregate endpoint when available ──────────
//       // e.g. GET /api/stats  →  { totalJobs, totalBids }
//       {
//         title: "All Jobs",
//         count: totalJobs,
//         growth: "—",
//         icon: Briefcase,
//         accentColor: "#9EFD38",
//       },
//       {
//         title: "All Bids",
//         count: null,
//         growth: "—",
//         icon: Gavel,
//         accentColor: "#9EFD38",
//       },
//     ];
//   }, [vendors, subsDone,totalJobs]);

//   // ── Filtered + sorted vendors ─────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();

//     return vendors
//       .filter((item) => {
//         const p = item.partner || {};
//         const matchSearch =
//           !q ||
//           (p.fullname || "").toLowerCase().includes(q) ||
//           (p.email || "").toLowerCase().includes(q) ||
//           (p.city || "").toLowerCase().includes(q) ||
//           (p.phone_number || "").toLowerCase().includes(q);

//         let matchFilter = true;
//         switch (filter) {
//           case "kyc":
//             matchFilter = p.kycstatus === 1;
//             break;
//           case "nokyc":
//             matchFilter = p.kycstatus === 0 || p.kycstatus === 2;
//             break;
//           case "paid":
//             matchFilter = item.subscription_status === "paid";
//             break;
//           case "unpaid":
//             matchFilter = item.subscription_status === "unpaid";
//             break;
//           default:
//             matchFilter = true;
//         }
//         return matchSearch && matchFilter;
//       })
//       .sort((a, b) =>
//         (a.partner?.fullname || "")
//           .toLowerCase()
//           .localeCompare((b.partner?.fullname || "").toLowerCase()),
//       );
//   }, [vendors, search, filter, dateFilter, dateFrom, dateTo]);

//   const filterButtons = [
//     { key: "all", label: "All" },
//     { key: "kyc", label: "KYC Done" },
//     { key: "nokyc", label: "Pending KYC" },
//     { key: "paid", label: "Paid" },
//     { key: "unpaid", label: "Unpaid" },
//   ];

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div className="flex min-h-screen" style={{ background: "#021616" }}>
//       <main className="flex-1 overflow-y-auto px-8 py-7">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1
//             className="text-3xl font-bold tracking-tight"
//             style={{ color: "#FEFDFA", letterSpacing: "-1px" }}
//           >
//             Dashboard
//           </h1>
//           <p
//             className="mt-1 text-sm"
//             style={{ color: "rgba(254,253,250,0.4)", fontFamily: "monospace" }}
//           >
//             {new Date().toLocaleDateString("en-IN", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
//           {stats.map((s) => (
//             <StatCard key={s.title} {...s} loading={loading || s.subsLoading} />
//           ))}
//         </div>

//         {/* Vendor Table */}
//         <div
//           className="rounded-2xl overflow-hidden"
//           style={{
//             background: "#1A2421",
//             border: "1px solid rgba(92,255,103,0.1)",
//           }}
//         >
//           {/* Table Header */}
//           <div
//             className="flex items-center justify-between px-6 py-4"
//             style={{ borderBottom: "1px solid rgba(92,255,103,0.08)" }}
//           >
//             <div>
//               <h2
//                 className="text-base font-bold"
//                 style={{ color: "#FEFDFA", letterSpacing: "-0.3px" }}
//               >
//                 Vendor Directory
//               </h2>
//               <p
//                 className="text-xs mt-0.5"
//                 style={{
//                   color: "rgba(254,253,250,0.35)",
//                   fontFamily: "monospace",
//                 }}
//               >
//                 {loading
//                   ? "Loading…"
//                   : `${filtered.length} vendor${filtered.length !== 1 ? "s" : ""}${!subsDone ? " · checking subscriptions…" : ""}`}
//               </p>
//             </div>
//             <div
//               className="flex items-center gap-2 rounded-xl px-3 py-2"
//               style={{
//                 background: "rgba(0,0,0,0.25)",
//                 border: "1px solid rgba(92,255,103,0.12)",
//               }}
//             >
//               <Search size={13} style={{ color: "rgba(254,253,250,0.3)" }} />
//               <input
//                 type="text"
//                 placeholder="Search vendors…"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="bg-transparent border-none outline-none text-xs w-44"
//                 style={{ color: "#FEFDFA", fontFamily: "monospace" }}
//               />
//             </div>
//           </div>

//           {/* Filter Pills */}
//           <div
//             className="flex items-center gap-2 px-6 py-3"
//             style={{ borderBottom: "1px solid rgba(92,255,103,0.06)" }}
//           >
//             {filterButtons.map((f) => (
//               <button
//                 key={f.key}
//                 onClick={() => setFilter(f.key)}
//                 className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-150"
//                 style={
//                   filter === f.key
//                     ? {
//                         background: "rgba(92,255,103,0.12)",
//                         color: "#5CFF67",
//                         border: "1px solid rgba(92,255,103,0.28)",
//                         fontFamily: "monospace",
//                       }
//                     : {
//                         background: "transparent",
//                         color: "rgba(254,253,250,0.4)",
//                         border: "1px solid rgba(92,255,103,0.1)",
//                         fontFamily: "monospace",
//                         cursor: "pointer",
//                       }
//                 }
//               >
//                 {f.label}
//               </button>
//             ))}
//           </div>

          {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   {[
//                     "Vendor",
//                     "Business name",
//                     "Location",
//                     "Phone",
//                     "KYC Status",
//                     "Subscription",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className="text-left px-6 py-3 text-[10px] font-semibold uppercase tracking-widest"
//                       style={{
//                         color: "rgba(254,253,250,0.28)",
//                         fontFamily: "monospace",
//                         borderBottom: "1px solid rgba(92,255,103,0.07)",
//                       }}
//                     >
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
//                           <div
//                             className="h-6 rounded-lg"
//                             style={{
//                               background: "rgba(92,255,103,0.05)",
//                               width:
//                                 j === 0 ? "140px" : j === 5 ? "60px" : "80px",
//                               animation: `pulse 1.2s ease-in-out ${i * 0.08}s infinite`,
//                             }}
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="py-16 text-center">
//                       <p
//                         style={{
//                           color: "rgba(254,253,250,0.25)",
//                           fontFamily: "monospace",
//                           fontSize: 13,
//                         }}
//                       >
//                         No vendors found
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map((item, index) => {
//                     const p = item.partner || {};
//                     const kycType =
//                       p.kycstatus === 1
//                         ? "verified"
//                         : p.kycstatus === 2
//                           ? "rejected"
//                           : "pending";

//                     return (
//                       <tr
//                         key={p.user_id || index}
//                         onClick={() => navigate(`/Vendor/${p.user_id}`)}
//                         className="transition-colors duration-100"
//                         style={{
//                           borderBottom: "1px solid rgba(92,255,103,0.05)",
//                           cursor: "pointer",
//                         }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.background =
//                             "rgba(92,255,103,0.03)")
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.background = "transparent")
//                         }
//                       >
//                         {/* Vendor */}
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <Avatar name={p.fullname} pic={p.profilepic} />
//                             <div>
//                               <p
//                                 className="text-sm font-semibold"
//                                 style={{ color: "#FEFDFA" }}
//                               >
//                                 {p.fullname || "—"}
//                               </p>
//                               <p
//                                 className="text-xs mt-0.5"
//                                 style={{
//                                   color: "rgba(254,253,250,0.38)",
//                                   fontFamily: "monospace",
//                                 }}
//                               >
//                                 {p.email || "—"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         {/* Business Name */}
//                         <td className="px-6 py-4">
//                           <span
//                             className="text-sm"
//                             style={{ color: "rgba(254,253,250,0.55)" }}
//                           >
//                             {p.businessname || "—"}
//                           </span>
//                         </td>
//                         {/* Location */}
//                         <td className="px-6 py-4">
//                           <span
//                             className="text-sm"
//                             style={{ color: "rgba(254,253,250,0.55)" }}
//                           >
//                             {[p.city, p.state].filter(Boolean).join(", ") ||
//                               "—"}
//                           </span>
//                         </td>
//                         {/* Phone */}
//                         <td className="px-6 py-4">
//                           <span
//                             className="text-xs"
//                             style={{
//                               color: "rgba(254,253,250,0.65)",
//                               fontFamily: "monospace",
//                             }}
//                           >
//                             {p.phone_number || "—"}
//                           </span>
//                         </td>
//                         {/* KYC */}
//                         <td className="px-6 py-4">
//                           <Chip type={kycType} />
//                         </td>
//                         {/* Subscription */}
//                         <td className="px-6 py-4">
//                           {item.subscription_status === "loading" ? (
//                             <div
//                               className="h-6 w-14 rounded-full"
//                               style={{
//                                 background: "rgba(92,255,103,0.05)",
//                                 animation: "pulse 1.2s ease-in-out infinite",
//                               }}
//                             />
//                           ) : (
//                             <Chip
//                               type={
//                                 item.subscription_status === "paid"
//                                   ? "paid"
//                                   : "unpaid"
//                               }
//                             />
//                           )}
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

// src/pages/Dashboard.jsx
// Optimizations:
//   1. localStorage cache (2-min TTL) — instant repeat visits
//   2. Concurrency-limited subscription checks (max 8 in-flight)
//   3. Theme-aware: all colors pulled from useTheme()

import { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import {
  Users,
  ShieldCheck,
  ShieldOff,
  CreditCard,
  XCircle,
  Briefcase,
  Gavel,
  TrendingUp,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const BASE_URL = "https://pineapplebyele.com/";

// ─── Cache helpers (2-min TTL) ────────────────────────────────────────────────
const CACHE_KEY = "dashboard_vendors";
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
  } catch {}
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
        results[i] = null;
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, worker),
  );
  return results;
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
        transition: "background 0.25s ease, border-color 0.25s ease",
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
        <TrendingUp size={12} />
        {growth}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.85} }`}</style>
    </div>
  );
}

// ─── Status Chip ──────────────────────────────────────────────────────────────
function Chip({ type }) {
  const { colors } = useTheme();

  const styles = {
    verified: {
      background: colors.chipVerifiedBg,
      color: colors.chipVerifiedColor,
      border: colors.chipVerifiedBorder,
      label: "Verified",
    },
    pending: {
      background: colors.chipPendingBg,
      color: colors.chipPendingColor,
      border: colors.chipPendingBorder,
      label: "Pending",
    },
    rejected: {
      background: colors.chipRejectedBg,
      color: colors.chipRejectedColor,
      border: colors.chipRejectedBorder,
      label: "Rejected",
    },
    paid: {
      background: colors.chipPaidBg,
      color: colors.chipPaidColor,
      border: colors.chipPaidBorder,
      label: "Paid",
    },
    unpaid: {
      background: colors.chipUnpaidBg,
      color: colors.chipUnpaidColor,
      border: colors.chipUnpaidBorder,
      label: "Unpaid",
    },
  };

  const s = styles[type] || styles.pending;
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold"
      style={{ fontFamily: "monospace", ...s }}
    >
      {s.label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, pic }) {
  const { colors } = useTheme();
  const [imgError, setImgError] = useState(false);
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  if (pic && !imgError) {
    return (
      <img
        src={BASE_URL + pic}
        alt={name}
        onError={() => setImgError(true)}
        className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
        style={{ border: colors.borderAvatar }}
      />
    );
  }
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{
        background: colors.avatarBg,
        color: colors.avatarColor,
        border: colors.borderAvatar,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { colors } = useTheme();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subsDone, setSubsDone] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);
  const navigate = useNavigate();

  // ── Fetch vendors + subscription status ───────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchVendors() {
      const cached = readCache();
      if (cached) {
        setVendors(cached);
        setLoading(false);
        setSubsDone(true);
        return;
      }

      let vendorsOnly = [];
      try {
        const res = await fetch(
          `${API_BASE_URL}getuser.php`,
        );
        const data = await res.json();
        const all = data.data || data || [];
        vendorsOnly = all.filter(
          (item) => item.partner?.user_role === "Vendor",
        );
      } catch (err) {
        console.error("Vendor fetch failed:", err);
        setLoading(false);
        return;
      }

      if (!cancelled) {
        setVendors(
          vendorsOnly.map((v) => ({ ...v, subscription_status: "loading" })),
        );
        setLoading(false);
      }

      const tasks = vendorsOnly.map((item) => async () => {
        const userId = item.partner?.user_id;
        if (!userId) return { ...item, subscription_status: "unpaid" };
        try {
          const subRes = await fetch(
            `${BASE_URL2.replace(/\/$/, "")}/checkActiveSubscription/${userId}`,
          );
          const subData = await subRes.json();
          return {
            ...item,
            subscription_status: subData?.hasActiveSubscription
              ? "paid"
              : "unpaid",
            subscription_data: subData,
          };
        } catch {
          return { ...item, subscription_status: "unpaid" };
        }
      });

      const withSubs = await limitConcurrency(tasks, 8);
      if (!cancelled) {
        setVendors(withSubs);
        setSubsDone(true);
        writeCache(withSubs);
      }
    }

    fetchVendors();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Fetch total jobs ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocations?page=1&limit=1`);
        const data = await res.json();
        setTotalJobs(data.total || 0);
      } catch (err) {
        console.log(err);
      }
    }
    fetchJobs();
  }, []);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const kycVerified = vendors.filter(
      (v) => v.partner?.kycstatus === 1,
    ).length;
    const kycPending = vendors.filter((v) => v.partner?.kycstatus === 0).length;
    const kycRejected = vendors.filter(
      (v) => v.partner?.kycstatus === 2,
    ).length;
    const paid = vendors.filter((v) => v.subscription_status === "paid").length;
    const unpaid = vendors.filter(
      (v) => v.subscription_status === "unpaid",
    ).length;

    return [
      {
        title: "Total Vendors",
        count: vendors.length,
        growth: "+6 this month",
        icon: Users,
        accentColor: colors.accentPrimary,
      },
      {
        title: "KYC Verified",
        count: kycVerified,
        growth: "+7 this month",
        icon: ShieldCheck,
        accentColor: colors.accentPrimary,
      },
      {
        title: "Pending KYC",
        count: kycPending,
        growth: "+5 this month",
        icon: ShieldOff,
        accentColor: colors.accentSecondary,
      },
      {
        title: "KYC Rejected",
        count: kycRejected,
        growth: "—",
        icon: ShieldOff,
        accentColor: colors.chipRejectedColor,
      },
      {
        title: "Paid Subscriptions",
        count: paid,
        growth: "+3 this month",
        icon: CreditCard,
        accentColor: colors.accentTertiary,
        subsLoading: !subsDone,
      },
      {
        title: "Unpaid Subscriptions",
        count: unpaid,
        growth: "+9 this month",
        icon: XCircle,
        accentColor: colors.textMuted,
        subsLoading: !subsDone,
      },
      {
        title: "All Jobs",
        count: totalJobs || 0,
        growth: "—",
        icon: Briefcase,
        accentColor: colors.accentQuaternary,
      },
      {
        title: "All Bids",
        count: 0,
        growth: "—",
        icon: Gavel,
        accentColor: colors.accentQuaternary,
      },
    ];
  }, [vendors, subsDone, totalJobs, colors]);

  // ── Filtered + sorted vendors ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vendors
      .filter((item) => {
        const p = item.partner || {};
        const matchSearch =
          !q ||
          (p.fullname || "").toLowerCase().includes(q) ||
          (p.email || "").toLowerCase().includes(q) ||
          (p.city || "").toLowerCase().includes(q) ||
          (p.phone_number || "").toLowerCase().includes(q);

        let matchFilter = true;
        switch (filter) {
          case "kyc":
            matchFilter = p.kycstatus === 1;
            break;
          case "nokyc":
            matchFilter = p.kycstatus === 0 || p.kycstatus === 2;
            break;
          case "paid":
            matchFilter = item.subscription_status === "paid";
            break;
          case "unpaid":
            matchFilter = item.subscription_status === "unpaid";
            break;
          default:
            matchFilter = true;
        }
        const createdAt = getVendorCreatedAt(item);
        let matchDate = true;
        if (dateFilter !== "all") {
          if (!createdAt) {
            matchDate = false;
          } else {
            const today = startOfLocalDay(new Date());
            const createdDay = startOfLocalDay(createdAt);
            if (dateFilter === "today") {
              matchDate = createdDay.getTime() === today.getTime();
            } else if (dateFilter === "week") {
              const weekStart = new Date(today);
              weekStart.setDate(today.getDate() - ((today.getDay() + 6) % 7));
              matchDate = createdDay >= weekStart && createdDay <= today;
            } else if (dateFilter === "month") {
              matchDate =
                createdAt.getFullYear() === today.getFullYear() &&
                createdAt.getMonth() === today.getMonth();
            } else if (dateFilter === "custom") {
              const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
              const to = dateTo ? new Date(`${dateTo}T23:59:59.999`) : null;
              matchDate = (!from || createdAt >= from) && (!to || createdAt <= to);
            }
          }
        }
        return matchSearch && matchFilter && matchDate;
      })
      .sort((a, b) =>
        (a.partner?.fullname || "")
          .toLowerCase()
          .localeCompare((b.partner?.fullname || "").toLowerCase()),
      );
  }, [vendors, search, filter, dateFilter, dateFrom, dateTo]);

  const filterButtons = [
    { key: "all", label: "All" },
    { key: "kyc", label: "KYC Done" },
    { key: "nokyc", label: "Pending KYC" },
    { key: "paid", label: "Paid" },
    { key: "unpaid", label: "Unpaid" },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: colors.pageBg,
        transition: "background 0.25s ease",
      }}
    >
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto px-8 py-7">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: colors.textPrimary, letterSpacing: "-1px" }}
          >
            Dashboard
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
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} loading={loading || s.subsLoading} />
          ))}
        </div>
  
        {/* Vendor Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.borderSubtle}`,
            transition: "background 0.25s ease",
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
                Vendor Directory
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: colors.textFaint, fontFamily: "monospace" }}
              >
                {loading
                  ? "Loading…"
                  : `${filtered.length} vendor${filtered.length !== 1 ? "s" : ""}${!subsDone ? " · checking subscriptions…" : ""}`}
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
                placeholder="Search vendors…"
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
                  {[
                    "Vendor",
                    "Created At",
                    "Business name",
                    "Location",
                    "Phone",
                    "KYC Status",
                    "Subscription",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-[10px] font-semibold uppercase tracking-widest"
                      style={{
                        color: colors.textFaint,
                        fontFamily: "monospace",
                        borderBottom: `1px solid ${colors.borderRow}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
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
                                j === 0 ? "140px" : j === 5 ? "60px" : "80px",
                              animation: `pulse 1.2s ease-in-out ${i * 0.08}s infinite`,
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <p
                        style={{
                          color: colors.textVeryFaint,
                          fontFamily: "monospace",
                          fontSize: 13,
                        }}
                      >
                        No vendors found
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => {
                    const p = item.partner || {};
                    const createdAt = getVendorCreatedAt(item);
                    const isNewVendor = (() => {
                      if (!createdAt) return false;
                      const today = startOfLocalDay(new Date());
                      const cutoff = new Date(today);
                      cutoff.setDate(today.getDate() - 6);
                      return createdAt >= cutoff && createdAt <= new Date();
                    })();
                    const kycType =
                      p.kycstatus === 1
                        ? "verified"
                        : p.kycstatus === 2
                          ? "rejected"
                          : "pending";

                    return (
                      <tr
                        key={p.user_id || index}
                        onClick={() => navigate(`/Vendor/${p.user_id}`)}
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
                        {/* Vendor */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={p.fullname} pic={p.profilepic} />
                            <div>
                              <p
                                className="text-sm font-semibold"
                                style={{ color: colors.textPrimary }}
                              >
                                {p.fullname || "—"}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                <p
                                  className="text-xs"
                                  style={{ color: colors.textMono, fontFamily: "monospace" }}
                                >
                                  {p.email || "—"}
                                </p>
                                {isNewVendor && (
                                  <span
                                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                    style={{ background: colors.accentBadgeBg, color: colors.accentPrimary, border: `1px solid ${colors.borderHover}`, fontFamily: "monospace" }}
                                  >
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="text-xs"
                            style={{ color: colors.textMono, fontFamily: "monospace" }}
                          >
                            {createdAt
                              ? createdAt.toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "—"}
                          </span>
                        </td>

                        {/* Business Name */}
                        <td className="px-6 py-4">
                          <span
                            className="text-sm"
                            style={{ color: colors.textSecondary }}
                          >
                            {p.businessname || "—"}
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

                        {/* KYC */}
                        <td className="px-6 py-4">
                          <Chip type={kycType} />
                        </td>

                        {/* Subscription */}
                        <td className="px-6 py-4">
                          {item.subscription_status === "loading" ? (
                            <div
                              className="h-6 w-14 rounded-full"
                              style={{
                                background: colors.accentSkeletonBg,
                                animation: "pulse 1.2s ease-in-out infinite",
                              }}
                            />
                          ) : (
                            <Chip
                              type={
                                item.subscription_status === "paid"
                                  ? "paid"
                                  : "unpaid"
                              }
                            />
                          )}
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
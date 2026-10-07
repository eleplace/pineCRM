import { BASE_URL2 } from "../api/config";
// // src/Screens/CustomerJobsScreen.jsx

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   MapPin,
//   Calendar,
//   Clock,
//   Briefcase,
//   Search,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle2,
//   Timer,
//   XCircle,
//   Filter,
//   ChevronRight,
//   ChevronDown,
//   ArrowRight,
//   Box,
//   Package,
//   Truck,
//   Home,
//   Phone,
// } from "lucide-react";


// // ── Helpers ────────────────────────────────────────────────────────────────────
// function formatDate(dateStr) {
//   if (!dateStr) return null;
//   try {
//     return new Date(dateStr).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   } catch {
//     return dateStr;
//   }
// }

// function formatDateShort(dateStr) {
//   if (!dateStr) return null;
//   try {
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return dateStr;
//   }
// }

// function formatMoveType(type) {
//   const map = {
//     intercity: "Intercity",
//     within_complex: "Within Complex",
//     same_building: "Same Building",
//     local: "Local",
//   };
//   return map[type] ?? type ?? "—";
// }

// function getStatusMeta(status) {
//   const s = (status ?? "").toLowerCase();
//   if (s === "open" || s === "active")
//     return {
//       label: "Open",
//       color: "#5CFF67",
//       bg: "rgba(92,255,103,0.1)",
//       border: "rgba(92,255,103,0.25)",
//       Icon: CheckCircle2,
//     };
//   if (s === "job posted")
//     return {
//       label: "Job Posted",
//       color: "#5CFF67",
//       bg: "rgba(92,255,103,0.1)",
//       border: "rgba(92,255,103,0.25)",
//       Icon: CheckCircle2,
//     };
//   if (s === "pending")
//     return {
//       label: "Pending",
//       color: "#B7F66E",
//       bg: "rgba(183,246,110,0.08)",
//       border: "rgba(183,246,110,0.2)",
//       Icon: Timer,
//     };
//   if (s === "in progress")
//     return {
//       label: "In Progress",
//       color: "#FFD166",
//       bg: "rgba(255,209,102,0.1)",
//       border: "rgba(255,209,102,0.25)",
//       Icon: Timer,
//     };
//   if (s === "closed" || s === "completed" || s === "done")
//     return {
//       label: "Completed",
//       color: "#5CDFDF",
//       bg: "rgba(92,223,223,0.08)",
//       border: "rgba(92,223,223,0.2)",
//       Icon: CheckCircle2,
//     };
//   if (s === "cancelled" || s === "canceled")
//     return {
//       label: "Cancelled",
//       color: "#FF6B6B",
//       bg: "rgba(255,80,80,0.08)",
//       border: "rgba(255,80,80,0.2)",
//       Icon: XCircle,
//     };
//   return {
//     label: status || "Unknown",
//     color: "rgba(254,253,250,0.4)",
//     bg: "rgba(255,255,255,0.04)",
//     border: "rgba(255,255,255,0.08)",
//     Icon: AlertCircle,
//   };
// }

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton({ width = "100%", height = 20, radius = 6, style = {} }) {
//   return (
//     <div
//       style={{
//         width,
//         height,
//         borderRadius: radius,
//         background: "rgba(255,255,255,0.06)",
//         animation: "skPulse 1.4s ease-in-out infinite",
//         ...style,
//       }}
//     />
//   );
// }

// function JobCardSkeleton() {
//   return (
//     <div
//       style={{
//         background: "#1A2421",
//         border: "1px solid rgba(92,255,103,0.08)",
//         borderRadius: 16,
//         padding: "20px 22px",
//         display: "flex",
//         flexDirection: "column",
//         gap: 12,
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <Skeleton width="55%" height={18} />
//         <Skeleton width={72} height={22} radius={20} />
//       </div>
//       <Skeleton width="35%" height={13} />
//       <div style={{ display: "flex", gap: 10 }}>
//         <Skeleton width="40%" height={13} />
//         <Skeleton width="30%" height={13} />
//       </div>
//     </div>
//   );
// }

// // ── Detail helper row ──────────────────────────────────────────────────────────
// function DetailRow({ label, value, icon: Icon }) {
//   if (!value) return null;
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 8,
//         marginBottom: 5,
//       }}
//     >
//       {Icon && (
//         <Icon
//           size={11}
//           color="rgba(254,253,250,0.25)"
//           style={{ marginTop: 1, flexShrink: 0 }}
//         />
//       )}
//       <span
//         style={{
//           fontSize: 11,
//           color: "rgba(254,253,250,0.3)",
//           minWidth: 110,
//           flexShrink: 0,
//         }}
//       >
//         {label}
//       </span>
//       <span
//         style={{
//           fontSize: 11,
//           color: "rgba(254,253,250,0.7)",
//           fontWeight: 500,
//         }}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// // ── Inline Detail Panel ────────────────────────────────────────────────────────
// function JobDetailPanel({ job }) {
//   const {
//     pickup,
//     drop,
//     jobDetails,
//     serviceDetails,
//     inventory,
//     moveType,
//     bids,
//   } = job;

//   const subBox = {
//     flex: 1,
//     background: "rgba(0,0,0,0.2)",
//     border: "1px solid rgba(92,255,103,0.06)",
//     borderRadius: 10,
//     padding: "12px 14px",
//   };

//   const secLabel = {
//     fontSize: 10,
//     fontWeight: 700,
//     fontFamily: "monospace",
//     letterSpacing: "0.08em",
//     color: "rgba(254,253,250,0.2)",
//     textTransform: "uppercase",
//     marginBottom: 8,
//   };

//   return (
//     <div
//       style={{
//         borderTop: "1px solid rgba(92,255,103,0.08)",
//         paddingTop: 16,
//         display: "flex",
//         flexDirection: "column",
//         gap: 14,
//         animation: "expandIn 0.2s ease both",
//       }}
//     >
//       {/* Route */}
//       <div>
//         <p style={secLabel}>Route</p>
//         <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
//           <div style={{ ...subBox, borderLeft: "2px solid #5CFF67" }}>
//             <p
//               style={{
//                 fontSize: 9,
//                 color: "#5CFF67",
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 marginBottom: 5,
//                 letterSpacing: "0.06em",
//               }}
//             >
//               PICKUP
//             </p>
//             <p
//               style={{
//                 fontSize: 12,
//                 fontWeight: 700,
//                 color: "#FEFDFA",
//                 marginBottom: 3,
//               }}
//             >
//               {pickup?.city}
//               {pickup?.state ? `, ${pickup.state}` : ""}
//             </p>
//             <p
//               style={{
//                 fontSize: 11,
//                 color: "rgba(254,253,250,0.4)",
//                 lineHeight: 1.5,
//               }}
//             >
//               {[pickup?.addressLine1, pickup?.addressLine2 ?? pickup?.location]
//                 .filter(Boolean)
//                 .join(" — ")}
//             </p>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 3,
//               }}
//             >
//               <ArrowRight size={14} color="rgba(183,246,110,0.5)" />
//               <span
//                 style={{
//                   fontSize: 9,
//                   fontFamily: "monospace",
//                   color: "rgba(254,253,250,0.2)",
//                 }}
//               >
//                 {formatMoveType(moveType)}
//               </span>
//             </div>
//           </div>

//           <div style={{ ...subBox, borderLeft: "2px solid #5CDFDF" }}>
//             <p
//               style={{
//                 fontSize: 9,
//                 color: "#5CDFDF",
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 marginBottom: 5,
//                 letterSpacing: "0.06em",
//               }}
//             >
//               DROP
//             </p>
//             <p
//               style={{
//                 fontSize: 12,
//                 fontWeight: 700,
//                 color: "#FEFDFA",
//                 marginBottom: 3,
//               }}
//             >
//               {drop?.city}
//               {drop?.state ? `, ${drop.state}` : ""}
//             </p>
//             <p
//               style={{
//                 fontSize: 11,
//                 color: "rgba(254,253,250,0.4)",
//                 lineHeight: 1.5,
//               }}
//             >
//               {[drop?.addressLine1, drop?.addressLine2 ?? drop?.location]
//                 .filter(Boolean)
//                 .join(" — ")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Job Details + Service Details side by side */}
//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//         <div style={{ ...subBox, minWidth: 180 }}>
//           <p style={secLabel}>Job Details</p>
//           <DetailRow
//             label="Moving date"
//             value={formatDateShort(jobDetails?.dateOfPacking)}
//             icon={Calendar}
//           />
//           <DetailRow
//             label="Property size"
//             value={
//               jobDetails?.propertySize ? `${jobDetails.propertySize} BHK` : null
//             }
//             icon={Home}
//           />
//           <DetailRow
//             label="Truck size"
//             value={jobDetails?.truckSize || null}
//             icon={Truck}
//           />
//           <DetailRow
//             label="Packing"
//             value={jobDetails?.packingRequired}
//             icon={Package}
//           />
//           <DetailRow
//             label="Labour count"
//             value={
//               jobDetails?.labourCount > 0
//                 ? String(jobDetails.labourCount)
//                 : null
//             }
//           />
//           <DetailRow label="Distance" value={jobDetails?.distance || null} />
//           <DetailRow label="Goods type" value={jobDetails?.goodsType || null} />
//           <DetailRow
//             label="Contact time"
//             value={formatDate(jobDetails?.preferredContactTime)}
//             icon={Phone}
//           />
//         </div>

//         <div style={{ ...subBox, minWidth: 180 }}>
//           <p style={secLabel}>Service Details</p>
//           <DetailRow
//             label="Insurance"
//             value={serviceDetails?.insuranceRequired}
//           />
//           <DetailRow label="Storage" value={serviceDetails?.storageRequired} />
//           <DetailRow
//             label="Dismantling"
//             value={serviceDetails?.dismantlingRequired}
//           />
//           <DetailRow
//             label="Est. value"
//             value={serviceDetails?.estimatedValue || null}
//           />
//           {serviceDetails?.additionalServices?.length > 0 && (
//             <DetailRow
//               label="Extra services"
//               value={serviceDetails.additionalServices.join(", ")}
//             />
//           )}

//           <p style={{ ...secLabel, marginTop: 12 }}>Bids</p>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <span
//               style={{
//                 fontSize: 22,
//                 fontWeight: 800,
//                 fontFamily: "monospace",
//                 color: bids?.length > 0 ? "#5CFF67" : "rgba(254,253,250,0.15)",
//               }}
//             >
//               {bids?.length ?? 0}
//             </span>
//             <span style={{ fontSize: 11, color: "rgba(254,253,250,0.3)" }}>
//               {bids?.length === 1 ? "bid received" : "bids received"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Inventory */}
//       {inventory?.length > 0 && (
//         <div>
//           <p style={secLabel}>Inventory — {inventory.length} items</p>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {inventory.map((item) => (
//               <span
//                 key={item._id}
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 5,
//                   background: "rgba(0,0,0,0.25)",
//                   border: "1px solid rgba(92,255,103,0.1)",
//                   borderRadius: 20,
//                   padding: "3px 10px",
//                   fontSize: 11,
//                   color: "rgba(254,253,250,0.5)",
//                 }}
//               >
//                 <Box size={9} color="rgba(92,255,103,0.35)" />
//                 {item.title}
//                 {item.qty > 1 && (
//                   <span
//                     style={{
//                       fontSize: 10,
//                       fontFamily: "monospace",
//                       color: "#5CFF67",
//                     }}
//                   >
//                     ×{item.qty}
//                   </span>
//                 )}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* View Bids CTA */}
//       <div style={{ paddingTop: 2 }}>
//         <button
//           id="view-bids-btn"
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 6,
//             background: "rgba(92,255,103,0.08)",
//             color: "#5CFF67",
//             border: "1px solid rgba(92,255,103,0.25)",
//             borderRadius: 10,
//             padding: "7px 16px",
//             cursor: "pointer",
//             fontSize: 12,
//             fontWeight: 600,
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.background = "rgba(92,255,103,0.14)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "rgba(92,255,103,0.08)")
//           }
//         >
//           <ChevronRight size={13} /> View Bids for this Job
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── JobCard ────────────────────────────────────────────────────────────────────
// function JobCard({ job, index, onViewBids }) {
//   const [hovered, setHovered] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   // Status comes from jobDetails.status in this API shape
//   const status =
//     job.jobDetails?.status ?? job.status ?? job.job_status ?? job.jobStatus;
//   const meta = getStatusMeta(status);

//   const title =
//     job.jobName ??
//     job.title ??
//     job.job_title ??
//     job.name ??
//     `Job #${index + 1}`;
//   const jobId = job._id ?? job.id ?? job.job_id;
//   const created = formatDate(job.createdAt ?? job.created_at);
//   const scheduled = formatDate(
//     job.scheduled_at ?? job.schedule_date ?? job.scheduledAt,
//   );
//   const pickupCity = [job.pickup?.city, job.pickup?.state]
//     .filter(Boolean)
//     .join(", ");
//   const dropCity = [job.drop?.city, job.drop?.state].filter(Boolean).join(", ");
//   const movingDate = formatDateShort(job.jobDetails?.dateOfPacking);
//   const { Icon: StatusIcon } = meta;

//   function handleClick(e) {
//     // If "View Bids" button inside panel was clicked, navigate instead of toggling
//     if (e.target.closest("#view-bids-btn")) {
//       e.stopPropagation();
//       onViewBids(jobId);
//       return;
//     }
//     setExpanded((v) => !v);
//   }

//   return (
//     <div
//       onClick={handleClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#1A2421",
//         border: `1px solid ${expanded ? "rgba(92,255,103,0.22)" : hovered ? "rgba(92,255,103,0.28)" : "rgba(92,255,103,0.08)"}`,
//         borderRadius: 16,
//         padding: "20px 22px",
//         display: "flex",
//         flexDirection: "column",
//         gap: 12,
//         position: "relative",
//         overflow: "hidden",
//         cursor: "pointer",
//         transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
//         transform: !expanded && hovered ? "translateY(-2px)" : "none",
//         boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.35)" : "none",
//         animation: "fadeUp 0.3s ease both",
//         animationDelay: `${index * 40}ms`,
//       }}
//     >
//       {/* left accent bar — unchanged */}
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           width: 3,
//           background: `linear-gradient(180deg, ${meta.color}, transparent)`,
//           borderRadius: "16px 0 0 16px",
//         }}
//       />

//       {/* Header row — same layout as original */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           gap: 12,
//           paddingLeft: 8,
//         }}
//       >
//         <p
//           style={{
//             fontSize: 15,
//             fontWeight: 700,
//             color: "#FEFDFA",
//             letterSpacing: "-0.3px",
//             flex: 1,
//           }}
//         >
//           {title}
//         </p>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             flexShrink: 0,
//           }}
//         >
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 5,
//               padding: "3px 10px",
//               borderRadius: 20,
//               fontSize: 10,
//               fontWeight: 700,
//               fontFamily: "monospace",
//               background: meta.bg,
//               color: meta.color,
//               border: `1px solid ${meta.border}`,
//             }}
//           >
//             <StatusIcon size={9} />
//             {meta.label}
//           </span>
//           {/* Chevron replaces original ChevronRight — rotates on expand */}
//           <div
//             style={{
//               transition: "transform 0.2s",
//               transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
//               display: "flex",
//             }}
//           >
//             <ChevronDown
//               size={15}
//               color={
//                 expanded
//                   ? "#5CFF67"
//                   : hovered
//                     ? "#5CFF67"
//                     : "rgba(254,253,250,0.2)"
//               }
//               style={{ transition: "color 0.2s" }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Route summary pill — replaces description row */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           paddingLeft: 8,
//           background: "rgba(0,0,0,0.15)",
//           borderRadius: 8,
//           padding: "7px 12px",
//         }}
//       >
//         <MapPin size={11} color="#5CFF67" />
//         <span
//           style={{
//             fontSize: 12,
//             color: "rgba(254,253,250,0.6)",
//             fontWeight: 500,
//             flex: 1,
//             minWidth: 0,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {pickupCity}
//         </span>
//         <ArrowRight
//           size={11}
//           color="rgba(254,253,250,0.2)"
//           style={{ flexShrink: 0 }}
//         />
//         <MapPin size={11} color="#5CDFDF" />
//         <span
//           style={{
//             fontSize: 12,
//             color: "rgba(254,253,250,0.6)",
//             fontWeight: 500,
//             flex: 1,
//             minWidth: 0,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {dropCity}
//         </span>
//       </div>

//       {/* Meta row — same structure as original */}
//       <div
//         style={{
//           display: "flex",
//           gap: 16,
//           flexWrap: "wrap",
//           paddingLeft: 8,
//           borderTop: "1px solid rgba(92,255,103,0.06)",
//           paddingTop: 10,
//         }}
//       >
//         {movingDate && (
//           <span
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 5,
//               fontSize: 11,
//               color: "rgba(254,253,250,0.4)",
//             }}
//           >
//             <Calendar size={11} color="#5CFF67" /> Move: {movingDate}
//           </span>
//         )}
//         {created && (
//           <span
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 5,
//               fontSize: 11,
//               color: "rgba(254,253,250,0.4)",
//             }}
//           >
//             <Clock size={11} color="#B7F66E" /> {created}
//           </span>
//         )}
//         {scheduled && (
//           <span
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 5,
//               fontSize: 11,
//               color: "rgba(254,253,250,0.4)",
//             }}
//           >
//             <Clock size={11} color="#B7F66E" /> {scheduled}
//           </span>
//         )}
//         {jobId && (
//           <span
//             style={{
//               marginLeft: "auto",
//               fontSize: 10,
//               fontFamily: "monospace",
//               color: "rgba(254,253,250,0.2)",
//             }}
//           >
//             #{String(jobId).slice(0, 8)}
//           </span>
//         )}
//       </div>

//       {/* "View bids" hint — same as original hover hint, hidden when expanded */}
//       {hovered && !expanded && (
//         <div
//           style={{
//             paddingLeft: 8,
//             display: "flex",
//             alignItems: "center",
//             gap: 5,
//             fontSize: 11,
//             color: "#5CFF67",
//             fontFamily: "monospace",
//           }}
//         >
//           <ChevronDown size={11} /> Expand to see full details &amp; bids
//         </div>
//       )}

//       {/* Expanded detail panel */}
//       {expanded && <JobDetailPanel job={job} />}
//     </div>
//   );
// }

// // ── Filter Pill — UNCHANGED ────────────────────────────────────────────────────
// function FilterPill({ label, active, count, color, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         padding: "5px 14px",
//         borderRadius: 20,
//         cursor: "pointer",
//         fontSize: 11,
//         fontWeight: 600,
//         fontFamily: "monospace",
//         border: active
//           ? `1px solid ${color}`
//           : "1px solid rgba(255,255,255,0.08)",
//         background: active ? `${color}18` : "rgba(255,255,255,0.03)",
//         color: active ? color : "rgba(254,253,250,0.4)",
//         transition: "all 0.15s",
//       }}
//     >
//       {label}
//       {count !== undefined && (
//         <span
//           style={{
//             background: active ? `${color}30` : "rgba(255,255,255,0.06)",
//             color: active ? color : "rgba(254,253,250,0.3)",
//             borderRadius: 10,
//             padding: "0px 6px",
//             fontSize: 10,
//           }}
//         >
//           {count}
//         </span>
//       )}
//     </button>
//   );
// }

// // ── Main Screen — structure UNCHANGED ─────────────────────────────────────────
// export default function CustomerJobsScreen() {
//   const { userId } = useParams();
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [refreshing, setRefreshing] = useState(false);
//   const abortRef = useRef(null);

//   const loadJobs = useCallback(
//     async (silent = false) => {
//       if (abortRef.current) abortRef.current.abort();
//       const controller = new AbortController();
//       abortRef.current = controller;

//       if (!silent) setLoading(true);
//       else setRefreshing(true);
//       setError(null);

//       try {
//         const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocationsByUser/${userId}`, {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         const list = Array.isArray(data)
//           ? data
//           : (data.data ?? data.locations ?? data.jobs ?? []);
//         setJobs(list);
//       } catch (err) {
//         if (err.name !== "AbortError") setError(err.message);
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//           setRefreshing(false);
//         }
//       }
//     },
//     [userId],
//   );

//   useEffect(() => {
//     loadJobs();
//     return () => abortRef.current?.abort();
//   }, [loadJobs]);

//   // Status counts — reads jobDetails.status (new API shape)
//   const statusCounts = jobs.reduce((acc, job) => {
//     const s = (
//       job.jobDetails?.status ??
//       job.status ??
//       job.job_status ??
//       "unknown"
//     ).toLowerCase();
//     acc[s] = (acc[s] ?? 0) + 1;
//     return acc;
//   }, {});

//   const filtered = jobs.filter((job) => {
//     const s = (
//       job.jobDetails?.status ??
//       job.status ??
//       job.job_status ??
//       ""
//     ).toLowerCase();
//     const matchStatus =
//       statusFilter === "all" ||
//       (statusFilter === "open" &&
//         (s === "open" || s === "active" || s === "job posted")) ||
//       (statusFilter === "in_progress" && s === "in progress") ||
//       (statusFilter === "pending" && s === "pending") ||
//       (statusFilter === "completed" &&
//         (s === "closed" || s === "completed" || s === "done")) ||
//       (statusFilter === "cancelled" && (s === "cancelled" || s === "canceled"));
//     if (!matchStatus) return false;
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       return (
//         (job.jobName ?? job.title ?? job.name ?? "")
//           .toLowerCase()
//           .includes(q) ||
//         [job.pickup?.city, job.pickup?.state, job.pickup?.location]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase()
//           .includes(q) ||
//         [job.drop?.city, job.drop?.state, job.drop?.location]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase()
//           .includes(q) ||
//         (job.inventory ?? [])
//           .map((i) => i.title)
//           .join(" ")
//           .toLowerCase()
//           .includes(q)
//       );
//     }
//     return true;
//   });

//   return (
//     <div
//       style={{
//         background: "#021616",
//         minHeight: "100vh",
//         padding: "28px 32px",
//       }}
//     >
//       <style>{`
//         @keyframes skPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
//         @keyframes expandIn{ from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//       `}</style>

//       {/* Back — UNCHANGED */}
//       <button
//         onClick={() => navigate(-1)}
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: 8,
//           background: "rgba(92,255,103,0.06)",
//           color: "rgba(254,253,250,0.7)",
//           border: "1px solid rgba(92,255,103,0.12)",
//           borderRadius: 10,
//           padding: "8px 16px",
//           cursor: "pointer",
//           fontSize: 13,
//           marginBottom: 24,
//           fontWeight: 500,
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.color = "#5CFF67";
//           e.currentTarget.style.borderColor = "rgba(92,255,103,0.3)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.color = "rgba(254,253,250,0.7)";
//           e.currentTarget.style.borderColor = "rgba(92,255,103,0.12)";
//         }}
//       >
//         <ArrowLeft size={15} /> Back to Customer
//       </button>

//       {/* Header — UNCHANGED */}
//       <div
//         style={{
//           background: "#1A2421",
//           border: "1px solid rgba(92,255,103,0.12)",
//           borderRadius: 20,
//           padding: "24px 28px",
//           marginBottom: 16,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: 2,
//             background: "linear-gradient(90deg,#5CFF67,#9EFD38,transparent)",
//           }}
//         />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 12,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//             <div
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: 12,
//                 background: "rgba(92,255,103,0.1)",
//                 border: "1px solid rgba(92,255,103,0.2)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Briefcase size={20} color="#5CFF67" />
//             </div>
//             <div>
//               <h1
//                 style={{
//                   fontSize: 22,
//                   fontWeight: 800,
//                   color: "#FEFDFA",
//                   letterSpacing: "-0.5px",
//                 }}
//               >
//                 Customer Jobs
//               </h1>
//               <p
//                 style={{
//                   fontSize: 12,
//                   color: "rgba(254,253,250,0.35)",
//                   fontFamily: "monospace",
//                 }}
//               >
//                 Click any job to see its bids
//               </p>
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {!loading && (
//               <div
//                 style={{
//                   padding: "6px 14px",
//                   borderRadius: 20,
//                   background: "rgba(92,255,103,0.08)",
//                   border: "1px solid rgba(92,255,103,0.2)",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   color: "#5CFF67",
//                   fontFamily: "monospace",
//                 }}
//               >
//                 {jobs.length} total
//               </div>
//             )}
//             <button
//               onClick={() => loadJobs(true)}
//               disabled={loading || refreshing}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//                 background: "rgba(92,255,103,0.06)",
//                 color: "#5CFF67",
//                 border: "1px solid rgba(92,255,103,0.2)",
//                 borderRadius: 10,
//                 padding: "8px 14px",
//                 cursor: "pointer",
//                 fontSize: 12,
//                 opacity: loading || refreshing ? 0.5 : 1,
//               }}
//             >
//               <RefreshCw
//                 size={13}
//                 style={{
//                   animation: refreshing ? "spin 0.8s linear infinite" : "none",
//                 }}
//               />{" "}
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search + Filters — UNCHANGED structure, added In Progress pill */}
//       <div
//         style={{
//           background: "#1A2421",
//           border: "1px solid rgba(92,255,103,0.08)",
//           borderRadius: 14,
//           padding: "14px 18px",
//           marginBottom: 16,
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             background: "rgba(0,0,0,0.25)",
//             border: "1px solid rgba(92,255,103,0.12)",
//             borderRadius: 10,
//             padding: "7px 12px",
//             flex: "1 1 200px",
//           }}
//         >
//           <Search size={13} color="rgba(254,253,250,0.3)" />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search jobs..."
//             style={{
//               background: "none",
//               border: "none",
//               outline: "none",
//               color: "#FEFDFA",
//               fontSize: 13,
//               flex: 1,
//               fontFamily: "inherit",
//             }}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: 6,
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           <Filter size={12} color="rgba(254,253,250,0.3)" />
//           {[
//             { key: "all", label: "All", color: "#5CFF67", count: jobs.length },
//             {
//               key: "open",
//               label: "Job Posted",
//               color: "#5CFF67",
//               count:
//                 (statusCounts["job posted"] ?? 0) +
//                 (statusCounts.open ?? 0) +
//                 (statusCounts.active ?? 0),
//             },
//             {
//               key: "in_progress",
//               label: "In Progress",
//               color: "#FFD166",
//               count: statusCounts["in progress"] ?? 0,
//             },
//             {
//               key: "pending",
//               label: "Pending",
//               color: "#B7F66E",
//               count: statusCounts.pending ?? 0,
//             },
//             {
//               key: "completed",
//               label: "Completed",
//               color: "#5CDFDF",
//               count:
//                 (statusCounts.closed ?? 0) +
//                 (statusCounts.completed ?? 0) +
//                 (statusCounts.done ?? 0),
//             },
//             {
//               key: "cancelled",
//               label: "Cancelled",
//               color: "#FF6B6B",
//               count:
//                 (statusCounts.cancelled ?? 0) + (statusCounts.canceled ?? 0),
//             },
//           ].map(({ key, label, color, count }) => (
//             <FilterPill
//               key={key}
//               label={label}
//               active={statusFilter === key}
//               count={count}
//               color={color}
//               onClick={() => setStatusFilter(key)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Error — UNCHANGED */}
//       {error && !loading && (
//         <div
//           style={{
//             background: "rgba(255,80,80,0.08)",
//             border: "1px solid rgba(255,80,80,0.2)",
//             borderRadius: 12,
//             padding: "16px 20px",
//             marginBottom: 16,
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <AlertCircle size={18} color="#FF6B6B" />
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600 }}>
//               Failed to load jobs
//             </p>
//             <p
//               style={{
//                 fontSize: 11,
//                 color: "rgba(255,107,107,0.7)",
//                 fontFamily: "monospace",
//               }}
//             >
//               {error}
//             </p>
//           </div>
//           <button
//             onClick={() => loadJobs()}
//             style={{
//               background: "rgba(255,80,80,0.1)",
//               color: "#FF6B6B",
//               border: "1px solid rgba(255,80,80,0.25)",
//               borderRadius: 8,
//               padding: "6px 14px",
//               cursor: "pointer",
//               fontSize: 12,
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Job list — UNCHANGED structure */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {loading ? (
//           Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)
//         ) : filtered.length === 0 ? (
//           <div
//             style={{
//               background: "#1A2421",
//               border: "1px solid rgba(92,255,103,0.08)",
//               borderRadius: 16,
//               padding: "64px 32px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >
//             <div
//               style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: 16,
//                 background: "rgba(92,255,103,0.06)",
//                 border: "1px solid rgba(92,255,103,0.12)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Briefcase size={24} color="rgba(92,255,103,0.4)" />
//             </div>
//             <p
//               style={{
//                 fontSize: 15,
//                 fontWeight: 600,
//                 color: "rgba(254,253,250,0.5)",
//               }}
//             >
//               {statusFilter !== "all" || search.trim()
//                 ? "No jobs match your filter"
//                 : "No jobs found"}
//             </p>
//           </div>
//         ) : (
//           filtered.map((job, i) => {
//             const jobId = job._id ?? job.id ?? job.job_id;
//             return (
//               <JobCard
//                 key={jobId ?? i}
//                 job={job}
//                 index={i}
//                 onViewBids={(id) =>
//                   navigate(`/job-bids/${id}`, { state: { job, userId } })
//                 }
//               />
//             );
//           })
//         )}
//       </div>

//       {/* Footer count — UNCHANGED */}
//       {!loading && filtered.length > 0 && (
//         <p
//           style={{
//             textAlign: "center",
//             marginTop: 20,
//             fontSize: 11,
//             fontFamily: "monospace",
//             color: "rgba(254,253,250,0.2)",
//           }}
//         >
//           Showing {filtered.length} of {jobs.length} jobs
//         </p>
//       )}
//     </div>
//   );
// }

// change theam
// src/Screens/CustomerJobsScreen.jsx

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Timer,
  XCircle,
  Filter,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Box,
  Package,
  Truck,
  Home,
  Phone,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";


// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function formatDateShort(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatMoveType(type) {
  const map = {
    intercity: "Intercity",
    within_complex: "Within Complex",
    same_building: "Same Building",
    local: "Local",
  };
  return map[type] ?? type ?? "—";
}

// Status meta keeps its own semantic colors (same as before — these are
// intentional status-specific colors, not theme tokens)
function getStatusMeta(status) {
  const s = (status ?? "").toLowerCase();
  if (s === "open" || s === "active")
    return {
      label: "Open",
      color: "#5CFF67",
      bg: "rgba(92,255,103,0.1)",
      border: "rgba(92,255,103,0.25)",
      Icon: CheckCircle2,
    };
  if (s === "job posted")
    return {
      label: "Job Posted",
      color: "#5CFF67",
      bg: "rgba(92,255,103,0.1)",
      border: "rgba(92,255,103,0.25)",
      Icon: CheckCircle2,
    };
  if (s === "pending")
    return {
      label: "Pending",
      color: "#B7F66E",
      bg: "rgba(183,246,110,0.08)",
      border: "rgba(183,246,110,0.2)",
      Icon: Timer,
    };
  if (s === "in progress")
    return {
      label: "In Progress",
      color: "#FFD166",
      bg: "rgba(255,209,102,0.1)",
      border: "rgba(255,209,102,0.25)",
      Icon: Timer,
    };
  if (s === "closed" || s === "completed" || s === "done")
    return {
      label: "Completed",
      color: "#5CDFDF",
      bg: "rgba(92,223,223,0.08)",
      border: "rgba(92,223,223,0.2)",
      Icon: CheckCircle2,
    };
  if (s === "cancelled" || s === "canceled")
    return {
      label: "Cancelled",
      color: "#FF6B6B",
      bg: "rgba(255,80,80,0.08)",
      border: "rgba(255,80,80,0.2)",
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
function Skeleton({ width = "100%", height = 20, radius = 6, style = {} }) {
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
        gap: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton width="55%" height={18} />
        <Skeleton width={72} height={22} radius={20} />
      </div>
      <Skeleton width="35%" height={13} />
      <div style={{ display: "flex", gap: 10 }}>
        <Skeleton width="40%" height={13} />
        <Skeleton width="30%" height={13} />
      </div>
    </div>
  );
}

// ── Detail helper row ──────────────────────────────────────────────────────────
function DetailRow({ label, value, icon: Icon }) {
  const { colors } = useTheme();
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 5,
      }}
    >
      {Icon && (
        <Icon
          size={11}
          color={colors.textFaint}
          style={{ marginTop: 1, flexShrink: 0 }}
        />
      )}
      <span
        style={{
          fontSize: 11,
          color: colors.textFaint,
          minWidth: 110,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{ fontSize: 11, color: colors.textSecondary, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Inline Detail Panel ────────────────────────────────────────────────────────
function JobDetailPanel({ job }) {
  const { colors } = useTheme();
  const {
    pickup,
    drop,
    jobDetails,
    serviceDetails,
    inventory,
    moveType,
    bids,
  } = job;

  const subBox = {
    flex: 1,
    background: colors.inputBg,
    border: `1px solid ${colors.borderFaint}`,
    borderRadius: 10,
    padding: "12px 14px",
  };

  const secLabel = {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "monospace",
    letterSpacing: "0.08em",
    color: colors.textVeryFaint,
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.borderMid}`,
        paddingTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "expandIn 0.2s ease both",
      }}
    >
      {/* Route */}
      <div>
        <p style={secLabel}>Route</p>
        <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
          <div
            style={{
              ...subBox,
              borderLeft: `2px solid ${colors.accentPrimary}`,
            }}
          >
            <p
              style={{
                fontSize: 9,
                color: colors.accentPrimary,
                fontFamily: "monospace",
                fontWeight: 700,
                marginBottom: 5,
                letterSpacing: "0.06em",
              }}
            >
              PICKUP
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.textPrimary,
                marginBottom: 3,
              }}
            >
              {pickup?.city}
              {pickup?.state ? `, ${pickup.state}` : ""}
            </p>
            <p
              style={{ fontSize: 11, color: colors.textMuted, lineHeight: 1.5 }}
            >
              {[pickup?.addressLine1, pickup?.addressLine2 ?? pickup?.location]
                .filter(Boolean)
                .join(" — ")}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <ArrowRight size={14} color={colors.accentSecondary} />
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  color: colors.textVeryFaint,
                }}
              >
                {formatMoveType(moveType)}
              </span>
            </div>
          </div>

          <div style={{ ...subBox, borderLeft: "2px solid #5CDFDF" }}>
            <p
              style={{
                fontSize: 9,
                color: "#5CDFDF",
                fontFamily: "monospace",
                fontWeight: 700,
                marginBottom: 5,
                letterSpacing: "0.06em",
              }}
            >
              DROP
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.textPrimary,
                marginBottom: 3,
              }}
            >
              {drop?.city}
              {drop?.state ? `, ${drop.state}` : ""}
            </p>
            <p
              style={{ fontSize: 11, color: colors.textMuted, lineHeight: 1.5 }}
            >
              {[drop?.addressLine1, drop?.addressLine2 ?? drop?.location]
                .filter(Boolean)
                .join(" — ")}
            </p>
          </div>
        </div>
      </div>

      {/* Job Details + Service Details */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ ...subBox, minWidth: 180 }}>
          <p style={secLabel}>Job Details</p>
          <DetailRow
            label="Moving date"
            value={formatDateShort(jobDetails?.dateOfPacking)}
            icon={Calendar}
          />
          <DetailRow
            label="Property size"
            value={
              jobDetails?.propertySize ? `${jobDetails.propertySize} BHK` : null
            }
            icon={Home}
          />
          <DetailRow
            label="Truck size"
            value={jobDetails?.truckSize || null}
            icon={Truck}
          />
          <DetailRow
            label="Packing"
            value={jobDetails?.packingRequired}
            icon={Package}
          />
          <DetailRow
            label="Labour count"
            value={
              jobDetails?.labourCount > 0
                ? String(jobDetails.labourCount)
                : null
            }
          />
          <DetailRow label="Distance" value={jobDetails?.distance || null} />
          <DetailRow label="Goods type" value={jobDetails?.goodsType || null} />
          <DetailRow
            label="Contact time"
            value={formatDate(jobDetails?.preferredContactTime)}
            icon={Phone}
          />
        </div>

        <div style={{ ...subBox, minWidth: 180 }}>
          <p style={secLabel}>Service Details</p>
          <DetailRow
            label="Insurance"
            value={serviceDetails?.insuranceRequired}
          />
          <DetailRow label="Storage" value={serviceDetails?.storageRequired} />
          <DetailRow
            label="Dismantling"
            value={serviceDetails?.dismantlingRequired}
          />
          <DetailRow
            label="Est. value"
            value={serviceDetails?.estimatedValue || null}
          />
          {serviceDetails?.additionalServices?.length > 0 && (
            <DetailRow
              label="Extra services"
              value={serviceDetails.additionalServices.join(", ")}
            />
          )}

          <p style={{ ...secLabel, marginTop: 12 }}>Bids</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "monospace",
                color:
                  bids?.length > 0
                    ? colors.accentPrimary
                    : colors.textVeryFaint,
              }}
            >
              {bids?.length ?? 0}
            </span>
            <span style={{ fontSize: 11, color: colors.textMuted }}>
              {bids?.length === 1 ? "bid received" : "bids received"}
            </span>
          </div>
        </div>
      </div>

      {/* Inventory */}
      {inventory?.length > 0 && (
        <div>
          <p style={secLabel}>Inventory — {inventory.length} items</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {inventory.map((item) => (
              <span
                key={item._id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: colors.inputBg,
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  color: colors.textSecondary,
                }}
              >
                <Box size={9} color={colors.accentPrimary} />
                {item.title}
                {item.qty > 1 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: colors.accentPrimary,
                    }}
                  >
                    ×{item.qty}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* View Bids CTA */}
      <div style={{ paddingTop: 2 }}>
        <button
          id="view-bids-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: colors.accentIconBg,
            color: colors.accentPrimary,
            border: `1px solid ${colors.borderHover}`,
            borderRadius: 10,
            padding: "7px 16px",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = colors.accentNavActive)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = colors.accentIconBg)
          }
        >
          <ChevronRight size={13} /> View Bids for this Job
        </button>
      </div>
    </div>
  );
}

// ── JobCard ────────────────────────────────────────────────────────────────────
function JobCard({ job, index, onViewBids }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const status =
    job.jobDetails?.status ?? job.status ?? job.job_status ?? job.jobStatus;
  const meta = getStatusMeta(status);

  const title =
    job.jobName ??
    job.title ??
    job.job_title ??
    job.name ??
    `Job #${index + 1}`;
  const jobId = job._id ?? job.id ?? job.job_id;
  const created = formatDate(job.createdAt ?? job.created_at);
  const scheduled = formatDate(
    job.scheduled_at ?? job.schedule_date ?? job.scheduledAt,
  );
  const pickupCity = [job.pickup?.city, job.pickup?.state]
    .filter(Boolean)
    .join(", ");
  const dropCity = [job.drop?.city, job.drop?.state].filter(Boolean).join(", ");
  const movingDate = formatDateShort(job.jobDetails?.dateOfPacking);
  const { Icon: StatusIcon } = meta;

  function handleClick(e) {
    if (e.target.closest("#view-bids-btn")) {
      e.stopPropagation();
      onViewBids(jobId);
      return;
    }
    setExpanded((v) => !v);
  }

  const borderColor = expanded
    ? colors.borderHover
    : hovered
      ? colors.borderHover
      : colors.borderMid;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
        transform: !expanded && hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.35)" : "none",
        animation: "fadeUp 0.3s ease both",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, ${meta.color}, transparent)`,
          borderRadius: "16px 0 0 16px",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          paddingLeft: 8,
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.textPrimary,
            letterSpacing: "-0.3px",
            flex: 1,
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 10px",
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
          <div
            style={{
              transition: "transform 0.2s",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
            }}
          >
            <ChevronDown
              size={15}
              color={
                expanded || hovered ? colors.accentPrimary : colors.textFaint
              }
              style={{ transition: "color 0.2s" }}
            />
          </div>
        </div>
      </div>

      {/* Route summary pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingLeft: 8,
          background: colors.inputBg,
          borderRadius: 8,
          padding: "7px 12px",
        }}
      >
        <MapPin size={11} color={colors.accentPrimary} />
        <span
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: 500,
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {pickupCity}
        </span>
        <ArrowRight
          size={11}
          color={colors.textFaint}
          style={{ flexShrink: 0 }}
        />
        <MapPin size={11} color="#5CDFDF" />
        <span
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: 500,
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {dropCity}
        </span>
      </div>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          paddingLeft: 8,
          borderTop: `1px solid ${colors.borderFaint}`,
          paddingTop: 10,
        }}
      >
        {movingDate && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            <Calendar size={11} color={colors.accentPrimary} /> Move:{" "}
            {movingDate}
          </span>
        )}
        {created && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            <Clock size={11} color={colors.accentSecondary} /> {created}
          </span>
        )}
        {scheduled && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            <Clock size={11} color={colors.accentSecondary} /> {scheduled}
          </span>
        )}
        {jobId && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: 10,
              fontFamily: "monospace",
              color: colors.textVeryFaint,
            }}
          >
            #{String(jobId).slice(0, 8)}
          </span>
        )}
      </div>

      {/* Expand hint */}
      {hovered && !expanded && (
        <div
          style={{
            paddingLeft: 8,
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: colors.accentPrimary,
            fontFamily: "monospace",
          }}
        >
          <ChevronDown size={11} /> Expand to see full details &amp; bids
        </div>
      )}

      {expanded && <JobDetailPanel job={job} />}
    </div>
  );
}

// ── Filter Pill ────────────────────────────────────────────────────────────────
function FilterPill({ label, active, count, color, onClick }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 14px",
        borderRadius: 20,
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "monospace",
        border: active ? `1px solid ${color}` : `1px solid ${colors.borderMid}`,
        background: active ? `${color}18` : colors.accentSkeletonBg,
        color: active ? color : colors.textMuted,
        transition: "all 0.15s",
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            background: active ? `${color}30` : colors.accentSkeletonBg2,
            color: active ? color : colors.textFaint,
            borderRadius: 10,
            padding: "0px 6px",
            fontSize: 10,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────────
export default function CustomerJobsScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const abortRef = useRef(null);

  const loadJobs = useCallback(
    async (silent = false) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (!silent) setLoading(true);
      else setRefreshing(true);
      setError(null);

      try {
        const res = await fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocationsByUser/${userId}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : (data.data ?? data.locations ?? data.jobs ?? []);
        setJobs(list);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [userId],
  );

  useEffect(() => {
    loadJobs();
    return () => abortRef.current?.abort();
  }, [loadJobs]);

  const statusCounts = jobs.reduce((acc, job) => {
    const s = (
      job.jobDetails?.status ??
      job.status ??
      job.job_status ??
      "unknown"
    ).toLowerCase();
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  const filtered = jobs.filter((job) => {
    const s = (
      job.jobDetails?.status ??
      job.status ??
      job.job_status ??
      ""
    ).toLowerCase();
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "open" &&
        (s === "open" || s === "active" || s === "job posted")) ||
      (statusFilter === "in_progress" && s === "in progress") ||
      (statusFilter === "pending" && s === "pending") ||
      (statusFilter === "completed" &&
        (s === "closed" || s === "completed" || s === "done")) ||
      (statusFilter === "cancelled" && (s === "cancelled" || s === "canceled"));
    if (!matchStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        (job.jobName ?? job.title ?? job.name ?? "")
          .toLowerCase()
          .includes(q) ||
        [job.pickup?.city, job.pickup?.state, job.pickup?.location]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q) ||
        [job.drop?.city, job.drop?.state, job.drop?.location]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q) ||
        (job.inventory ?? [])
          .map((i) => i.title)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return true;
  });

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
        @keyframes expandIn{ from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
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
        <ArrowLeft size={15} /> Back to Customer
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
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: colors.accentIconBg,
                border: `1px solid ${colors.borderSubtle}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Briefcase size={20} color={colors.accentPrimary} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: colors.textPrimary,
                  letterSpacing: "-0.5px",
                }}
              >
                Customer Jobs
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  fontFamily: "monospace",
                }}
              >
                Click any job to see its bids
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
                {jobs.length} total
              </div>
            )}
            <button
              onClick={() => loadJobs(true)}
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
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
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
            placeholder="Search jobs..."
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
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Filter size={12} color={colors.textMuted} />
          {[
            { key: "all", label: "All", color: "#5CFF67", count: jobs.length },
            {
              key: "open",
              label: "Job Posted",
              color: "#5CFF67",
              count:
                (statusCounts["job posted"] ?? 0) +
                (statusCounts.open ?? 0) +
                (statusCounts.active ?? 0),
            },
            {
              key: "in_progress",
              label: "In Progress",
              color: "#FFD166",
              count: statusCounts["in progress"] ?? 0,
            },
            {
              key: "pending",
              label: "Pending",
              color: "#B7F66E",
              count: statusCounts.pending ?? 0,
            },
            {
              key: "completed",
              label: "Completed",
              color: "#5CDFDF",
              count:
                (statusCounts.closed ?? 0) +
                (statusCounts.completed ?? 0) +
                (statusCounts.done ?? 0),
            },
            {
              key: "cancelled",
              label: "Cancelled",
              color: "#FF6B6B",
              count:
                (statusCounts.cancelled ?? 0) + (statusCounts.canceled ?? 0),
            },
          ].map(({ key, label, color, count }) => (
            <FilterPill
              key={key}
              label={label}
              active={statusFilter === key}
              count={count}
              color={color}
              onClick={() => setStatusFilter(key)}
            />
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
              Failed to load jobs
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
            onClick={() => loadJobs()}
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

      {/* Job list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)
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
                background: colors.accentSkeletonBg,
                border: `1px solid ${colors.borderSubtle}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Briefcase size={24} color={colors.accentPrimary} />
            </div>
            <p
              style={{ fontSize: 15, fontWeight: 600, color: colors.textMuted }}
            >
              {statusFilter !== "all" || search.trim()
                ? "No jobs match your filter"
                : "No jobs found"}
            </p>
          </div>
        ) : (
          filtered.map((job, i) => {
            const jobId = job._id ?? job.id ?? job.job_id;
            return (
              <JobCard
                key={jobId ?? i}
                job={job}
                index={i}
                onViewBids={(id) =>
                  navigate(`/job-bids/${id}`, { state: { job, userId } })
                }
              />
            );
          })
        )}
      </div>

      {/* Footer count */}
      {!loading && filtered.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 11,
            fontFamily: "monospace",
            color: colors.textVeryFaint,
          }}
        >
          Showing {filtered.length} of {jobs.length} jobs
        </p>
      )}
    </div>
  );
}
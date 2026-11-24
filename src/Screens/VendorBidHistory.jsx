import { BASE_URL2 } from "../api/config";
// // theme: dark
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Briefcase,
//   IndianRupee,
//   Clock,
//   User,
//   Phone,
//   TrendingUp,
//   CheckCircle2,
//   MessageSquare,
//   Calendar,
//   Layers,
//   AlertCircle,
//   X,
//   ChevronRight,
//   Percent,
//   FileText,
//   ArrowUpRight,
//   ArrowDownLeft,
//   RefreshCw,
//   DollarSign,
//   Hash,
//   BarChart2,
//   Activity,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";

// const BID_API = `${BASE_URL2}vendor-bid-history`;
// const AMOUNT_HISTORY_API = `${BASE_URL2.replace(/api\/$/, "")}getAmountHistory`;
// const TRANSACTION_HISTORY_API = `${BASE_URL2.replace(/api\/$/, "")}getTransactionHistory`;

// function formatCurrency(val) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(val);
// }

// function formatDate(iso) {
//   return new Date(iso).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// // ── ThemeToggle ────────────────────────────────────────────────────────────────
// function ThemeToggle() {
//   const { toggle, isDark, colors } = useTheme();
//   return (
//     <button
//       onClick={toggle}
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         background: colors.accentNavHover,
//         color: colors.textSecondary,
//         border: `1px solid ${colors.borderSubtle}`,
//         borderRadius: 10,
//         padding: "8px 14px",
//         cursor: "pointer",
//         fontSize: 12,
//         fontWeight: 600,
//         transition: "all 0.2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.color = colors.accentPrimary;
//         e.currentTarget.style.borderColor = colors.borderHover;
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.color = colors.textSecondary;
//         e.currentTarget.style.borderColor = colors.borderSubtle;
//       }}
//     >
//       {isDark ? <Sun size={14} /> : <Moon size={14} />}
//       {isDark ? "Light" : "Dark"}
//     </button>
//   );
// }

// // ── StatusPill ─────────────────────────────────────────────────────────────────
// function StatusPill({ status, colors }) {
//   const map = {
//     Negotiable: {
//       bg: colors.chipPendingBg,
//       color: colors.chipPendingColor,
//       border: colors.chipPendingBorder,
//       dot: colors.chipPendingColor,
//     },
//     Accepted: {
//       bg: colors.chipVerifiedBg,
//       color: colors.chipVerifiedColor,
//       border: colors.chipVerifiedBorder,
//       dot: colors.chipVerifiedColor,
//     },
//     Rejected: {
//       bg: colors.chipRejectedBg,
//       color: colors.chipRejectedColor,
//       border: colors.chipRejectedBorder,
//       dot: colors.chipRejectedColor,
//     },
//     Pending: {
//       bg: colors.chipPendingBg,
//       color: colors.chipPendingColor,
//       border: colors.chipPendingBorder,
//       dot: colors.chipPendingColor,
//     },
//   };
//   const s = map[status] || map.Pending;
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 5,
//         padding: "3px 10px",
//         borderRadius: 20,
//         fontSize: 10,
//         fontWeight: 700,
//         fontFamily: "monospace",
//         background: s.bg,
//         color: s.color,
//         border: s.border,
//       }}
//     >
//       <span
//         style={{
//           width: 5,
//           height: 5,
//           borderRadius: "50%",
//           background: s.dot,
//           display: "inline-block",
//         }}
//       />
//       {status}
//     </span>
//   );
// }

// // ── StatCard ───────────────────────────────────────────────────────────────────
// function StatCard({ icon: Icon, label, value, accent, colors }) {
//   return (
//     <div
//       style={{
//         background: colors.cardBg,
//         border: `1px solid ${accent}22`,
//         borderRadius: 14,
//         padding: "16px 20px",
//         display: "flex",
//         alignItems: "center",
//         gap: 14,
//         position: "relative",
//         overflow: "hidden",
//         transition: "background 0.3s",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: 2,
//           background: `linear-gradient(90deg, ${accent}, transparent)`,
//         }}
//       />
//       <div
//         style={{
//           width: 42,
//           height: 42,
//           borderRadius: 10,
//           flexShrink: 0,
//           background: `${accent}18`,
//           color: accent,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Icon size={18} />
//       </div>
//       <div>
//         <p
//           style={{
//             fontSize: 10,
//             fontFamily: "monospace",
//             color: colors.textFaint,
//             textTransform: "uppercase",
//             letterSpacing: 1,
//             marginBottom: 2,
//           }}
//         >
//           {label}
//         </p>
//         <p
//           style={{
//             fontSize: 20,
//             fontWeight: 800,
//             color: accent,
//             letterSpacing: "-0.5px",
//           }}
//         >
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── JobCard ────────────────────────────────────────────────────────────────────
// function JobCard({ bid, index, onClick, colors }) {
//   const accentColor =
//     bid.status === "Accepted"
//       ? colors.chipVerifiedColor
//       : bid.status === "Rejected"
//         ? colors.chipRejectedColor
//         : colors.chipPendingColor;

//   const finalAmt = bid.finalAmount ?? bid.negotiateAmount ?? null;
//   const hasNego = finalAmt && Number(finalAmt) !== Number(bid.quotation);

//   return (
//     <div
//       onClick={() => onClick(bid)}
//       style={{
//         background: colors.cardBg,
//         border: `1px solid ${colors.borderRow}`,
//         borderRadius: 16,
//         padding: "18px 20px",
//         position: "relative",
//         overflow: "hidden",
//         cursor: "pointer",
//         animation: `slideUp 0.35s ease both`,
//         animationDelay: `${index * 55}ms`,
//         transition: "border-color 0.2s, background 0.2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = `${accentColor}30`;
//         e.currentTarget.style.background = colors.rowHoverBg;
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = colors.borderRow;
//         e.currentTarget.style.background = colors.cardBg;
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           width: 3,
//           background: accentColor,
//           borderRadius: "3px 0 0 3px",
//         }}
//       />

//       <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//         <div
//           style={{
//             width: 44,
//             height: 44,
//             borderRadius: "50%",
//             flexShrink: 0,
//             background: colors.chipPaidBg,
//             color: colors.chipPaidColor,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 16,
//             fontWeight: 700,
//             border: `1.5px solid ${colors.chipPaidBorder}`,
//           }}
//         >
//           {bid.customerName
//             ?.split(" ")
//             .map((w) => w[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase() || "?"}
//         </div>

//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               marginBottom: 5,
//               flexWrap: "wrap",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 13,
//                 fontWeight: 700,
//                 color: colors.textPrimary,
//               }}
//             >
//               {bid.customerName}
//             </span>
//             <StatusPill status={bid.status} colors={colors} />
//           </div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               flexWrap: "wrap",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 color: colors.textFaint,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//               }}
//             >
//               <Phone size={9} /> {bid.customerPhone}
//             </span>
//             <span
//               style={{
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 color: colors.textMuted,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//               }}
//             >
//               <Calendar size={9} /> {formatDate(bid.createdAt)}
//             </span>
//           </div>
//         </div>

//         <div style={{ textAlign: "right", flexShrink: 0 }}>
//           <p
//             style={{
//               fontSize: 10,
//               fontFamily: "monospace",
//               color: colors.textMuted,
//               textTransform: "uppercase",
//               letterSpacing: 0.8,
//               marginBottom: 3,
//             }}
//           >
//             {hasNego ? "Nego Price" : "Bid Amount"}
//           </p>

//           <p
//             style={{
//               fontSize: hasNego ? 12 : 20,
//               fontWeight: hasNego ? 600 : 900,
//               color: hasNego ? colors.textVeryFaint : accentColor,
//               letterSpacing: "-0.3px",
//               textDecoration: hasNego ? "line-through" : "none",
//               marginBottom: hasNego ? 2 : 0,
//             }}
//           >
//             {formatCurrency(bid.quotation)}
//           </p>

//           {hasNego && (
//             <p
//               style={{
//                 fontSize: 20,
//                 fontWeight: 900,
//                 color: colors.accentPrimary,
//                 letterSpacing: "-0.5px",
//               }}
//             >
//               {formatCurrency(finalAmt)}
//             </p>
//           )}
//         </div>
//         <ChevronRight
//           size={16}
//           color={colors.textFaint}
//           style={{ flexShrink: 0, marginLeft: 4 }}
//         />
//       </div>
//     </div>
//   );
// }

// // ── PopChip ────────────────────────────────────────────────────────────────────
// function PopChip({ icon: Icon, label, value, colors }) {
//   return (
//     <div
//       style={{
//         padding: "10px 12px",
//         borderRadius: 10,
//         background: colors.userCardBg,
//         border: `1px solid ${colors.borderFaint}`,
//         textAlign: "center",
//       }}
//     >
//       <Icon size={12} color={colors.textMuted} style={{ marginBottom: 4 }} />
//       <p
//         style={{
//           fontSize: 9,
//           fontFamily: "monospace",
//           color: colors.textMuted,
//           textTransform: "uppercase",
//           letterSpacing: 0.8,
//           marginBottom: 3,
//         }}
//       >
//         {label}
//       </p>
//       <p style={{ fontSize: 12, fontWeight: 700, color: colors.textPrimary }}>
//         {value}
//       </p>
//     </div>
//   );
// }

// // ── SectionLabel ───────────────────────────────────────────────────────────────
// function SectionLabel({ icon: Icon, label, color, colors }) {
//   const c = color || colors.chipPaidColor;
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 7,
//         marginBottom: 10,
//       }}
//     >
//       <Icon size={12} color={c} />
//       <span
//         style={{
//           fontSize: 10,
//           fontFamily: "monospace",
//           fontWeight: 700,
//           color: c,
//           textTransform: "uppercase",
//           letterSpacing: 1.2,
//         }}
//       >
//         {label}
//       </span>
//       <div style={{ flex: 1, height: "1px", background: `${c}20` }} />
//     </div>
//   );
// }

// // ── NegoRow ────────────────────────────────────────────────────────────────────
// function NegoRow({ item, index, isLast, colors }) {
//   const isVendor = item.proposedBy?.toLowerCase() === "vendor";
//   const rowColor = isVendor ? colors.chipPaidColor : colors.accentSecondary;

//   return (
//     <div style={{ display: "flex", gap: 10, position: "relative" }}>
//       {!isLast && (
//         <div
//           style={{
//             position: "absolute",
//             left: 14,
//             top: 28,
//             bottom: -8,
//             width: "1px",
//             background: colors.borderFaint,
//           }}
//         />
//       )}
//       <div
//         style={{
//           width: 28,
//           height: 28,
//           borderRadius: "50%",
//           flexShrink: 0,
//           marginTop: 2,
//           background: `${rowColor}18`,
//           border: `1.5px solid ${rowColor}40`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {isVendor ? (
//           <ArrowUpRight size={12} color={rowColor} />
//         ) : (
//           <ArrowDownLeft size={12} color={rowColor} />
//         )}
//       </div>

//       <div
//         style={{
//           flex: 1,
//           background: colors.userCardBg,
//           border: `1px solid ${rowColor}18`,
//           borderRadius: 10,
//           padding: "10px 12px",
//           marginBottom: isLast ? 0 : 8,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: 4,
//           }}
//         >
//           <span
//             style={{
//               fontSize: 9,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               color: rowColor,
//               textTransform: "uppercase",
//               letterSpacing: 0.8,
//               background: `${rowColor}15`,
//               padding: "2px 8px",
//               borderRadius: 6,
//             }}
//           >
//             {item.proposedBy || (isVendor ? "Vendor" : "Customer")}
//           </span>
//           <span
//             style={{
//               fontSize: 10,
//               fontFamily: "monospace",
//               color: colors.textMuted,
//             }}
//           >
//             {item.createdAt ? formatDate(item.createdAt) : `Round ${index + 1}`}
//           </span>
//         </div>
//         <p
//           style={{
//             fontSize: 16,
//             fontWeight: 800,
//             color: rowColor,
//             letterSpacing: "-0.3px",
//           }}
//         >
//           {formatCurrency(item.amount ?? item.proposedAmount ?? item.quotation)}
//         </p>
//         {item.note && (
//           <p
//             style={{
//               fontSize: 10,
//               color: colors.textMuted,
//               marginTop: 4,
//               fontStyle: "italic",
//               lineHeight: 1.5,
//             }}
//           >
//             {item.note}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── TxnRow ─────────────────────────────────────────────────────────────────────
// function TxnRow({ txn, isLast, colors }) {
//   const isPaid =
//     txn.type?.toLowerCase() === "credit" ||
//     txn.direction?.toLowerCase() === "in";
//   const accent = isPaid ? colors.accentPrimary : colors.chipRejectedColor;

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "10px 12px",
//         borderRadius: 10,
//         background: colors.userCardBg,
//         border: `1px solid ${accent}18`,
//         marginBottom: isLast ? 0 : 6,
//       }}
//     >
//       <div
//         style={{
//           width: 30,
//           height: 30,
//           borderRadius: "50%",
//           flexShrink: 0,
//           background: `${accent}12`,
//           border: `1.5px solid ${accent}35`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <DollarSign size={13} color={accent} />
//       </div>

//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             marginBottom: 3,
//           }}
//         >
//           <span
//             style={{ fontSize: 11, fontWeight: 700, color: colors.textPrimary }}
//           >
//             {txn.description || txn.remark || txn.type || "Payment"}
//           </span>
//           {txn.status && (
//             <span
//               style={{
//                 fontSize: 9,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 color: accent,
//                 background: `${accent}15`,
//                 padding: "2px 7px",
//                 borderRadius: 6,
//                 textTransform: "uppercase",
//               }}
//             >
//               {txn.status}
//             </span>
//           )}
//         </div>
//         {txn.createdAt && (
//           <span
//             style={{
//               fontSize: 10,
//               fontFamily: "monospace",
//               color: colors.textMuted,
//             }}
//           >
//             {formatDate(txn.createdAt)}
//           </span>
//         )}
//         {txn.transactionId && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 4,
//               marginTop: 2,
//             }}
//           >
//             <Hash size={9} color={colors.textFaint} />
//             <span
//               style={{
//                 fontSize: 9,
//                 fontFamily: "monospace",
//                 color: colors.textFaint,
//               }}
//             >
//               {txn.transactionId}
//             </span>
//           </div>
//         )}
//       </div>

//       <div style={{ textAlign: "right", flexShrink: 0 }}>
//         <p
//           style={{
//             fontSize: 15,
//             fontWeight: 800,
//             color: accent,
//             letterSpacing: "-0.3px",
//           }}
//         >
//           {isPaid ? "+" : "-"}
//           {formatCurrency(txn.amount ?? txn.amountPaid ?? 0)}
//         </p>
//         {txn.paymentMode && (
//           <p
//             style={{
//               fontSize: 9,
//               fontFamily: "monospace",
//               color: colors.textMuted,
//               textTransform: "uppercase",
//               marginTop: 2,
//             }}
//           >
//             {txn.paymentMode}
//           </p>
//         )}
//         {(() => {
//           if (txn.activeStatus === "accept")
//             return (
//               <span
//                 style={{
//                   fontSize: 9,
//                   fontFamily: "monospace",
//                   fontWeight: 700,
//                   color: colors.chipVerifiedColor,
//                   background: colors.chipVerifiedBg,
//                   padding: "2px 7px",
//                   borderRadius: 6,
//                   textTransform: "uppercase",
//                   display: "block",
//                   marginTop: 3,
//                 }}
//               >
//                 ✓ Accepted
//               </span>
//             );
//           if (txn.activeStatus === "negotiate")
//             return (
//               <span
//                 style={{
//                   fontSize: 9,
//                   fontFamily: "monospace",
//                   fontWeight: 700,
//                   color: colors.chipPendingColor,
//                   background: colors.chipPendingBg,
//                   padding: "2px 7px",
//                   borderRadius: 6,
//                   textTransform: "uppercase",
//                   display: "block",
//                   marginTop: 3,
//                 }}
//               >
//                 Negotiate
//               </span>
//             );
//           return null;
//         })()}
//       </div>
//     </div>
//   );
// }

// // ── Loader (inline) ────────────────────────────────────────────────────────────
// function InlineLoader({ label, colors }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//         padding: "14px 0",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: 16,
//           height: 16,
//           borderRadius: "50%",
//           border: `2px solid ${colors.chipPaidBg}`,
//           borderTop: `2px solid ${colors.chipPaidColor}`,
//           animation: "spin 0.7s linear infinite",
//         }}
//       />
//       <span
//         style={{
//           fontSize: 11,
//           fontFamily: "monospace",
//           color: colors.textFaint,
//         }}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }

// // ── EmptyState (inline) ────────────────────────────────────────────────────────
// function EmptyState({ label, colors }) {
//   return (
//     <div style={{ padding: "16px 0", textAlign: "center" }}>
//       <p
//         style={{
//           fontSize: 11,
//           fontFamily: "monospace",
//           color: colors.textFaint,
//         }}
//       >
//         {label}
//       </p>
//     </div>
//   );
// }

// // ── BidDetailPopup ─────────────────────────────────────────────────────────────
// function BidDetailPopup({ bid, onClose, colors }) {
//   const [activeTab, setActiveTab] = useState("details");
//   const [negoHistory, setNegoHistory] = useState(null);
//   const [txnHistory, setTxnHistory] = useState(null);
//   const [negoLoading, setNegoLoading] = useState(false);
//   const [txnLoading, setTxnLoading] = useState(false);
//   const [negoError, setNegoError] = useState(null);
//   const [txnError, setTxnError] = useState(null);

//   useEffect(() => {
//     if (!bid) return;
//     setActiveTab("details");
//     setNegoHistory(null);
//     setTxnHistory(null);
//     setNegoError(null);
//     setTxnError(null);
//   }, [bid?._id]);

//   useEffect(() => {
//     if (activeTab !== "nego" || !bid || negoHistory !== null) return;
//     setNegoLoading(true);
//     setNegoError(null);
//     fetch(
//       `${AMOUNT_HISTORY_API}?senderId=${bid.senderId}&receiverId=${bid.receiverId}&bidId=${bid._id}`,
//     )
//       .then((r) => r.json())
//       .then((json) => {
//         setNegoHistory(Array.isArray(json) ? json : (json.amountHistory ?? []));
//       })
//       .catch((e) => setNegoError(e.message))
//       .finally(() => setNegoLoading(false));
//   }, [activeTab, bid?._id]);

//   useEffect(() => {
//     if (activeTab !== "txn" || !bid || txnHistory !== null) return;
//     setTxnLoading(true);
//     setTxnError(null);
//     fetch(
//       `${TRANSACTION_HISTORY_API}?senderId=${bid.senderId}&receiverId=${bid.receiverId}&bidId=${bid._id}`,
//     )
//       .then((r) => r.json())
//       .then((json) => {
//         setTxnHistory(
//           Array.isArray(json) ? json : (json.transactionHistory ?? []),
//         );
//       })
//       .catch((e) => setTxnError(e.message))
//       .finally(() => setTxnLoading(false));
//   }, [activeTab, bid?._id]);

//   if (!bid) return null;

//   const accentColor =
//     bid.status === "Accepted"
//       ? colors.chipVerifiedColor
//       : bid.status === "Rejected"
//         ? colors.chipRejectedColor
//         : colors.chipPendingColor;

//   const handleBackdrop = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   const tabs = [
//     { id: "details", label: "Details", icon: FileText },
//     { id: "txn", label: "Transactions", icon: BarChart2 },
//   ];

//   return (
//     <div
//       onClick={handleBackdrop}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1000,
//         background: "rgba(2,22,22,0.88)",
//         backdropFilter: "blur(6px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "24px",
//         animation: "fadeIn 0.2s ease",
//         overflowY: "auto",
//       }}
//     >
//       <div
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${accentColor}28`,
//           borderRadius: 20,
//           width: "100%",
//           maxWidth: 500,
//           position: "relative",
//           overflow: "hidden",
//           animation: "popUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
//           maxHeight: "90vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <div
//           style={{
//             height: 3,
//             flexShrink: 0,
//             background: `linear-gradient(90deg, ${accentColor}, ${colors.chipPaidColor}, transparent)`,
//           }}
//         />

//         {/* header */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "16px 22px 0",
//             flexShrink: 0,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <FileText size={15} color={accentColor} />
//             <span
//               style={{
//                 fontSize: 12,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 color: accentColor,
//                 textTransform: "uppercase",
//                 letterSpacing: 1,
//               }}
//             >
//               Bid Details
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               width: 28,
//               height: 28,
//               borderRadius: "50%",
//               background: colors.userCardBg,
//               border: `1px solid ${colors.borderFaint}`,
//               color: colors.textMuted,
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "all 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = colors.chipRejectedBg;
//               e.currentTarget.style.color = colors.chipRejectedColor;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = colors.userCardBg;
//               e.currentTarget.style.color = colors.textMuted;
//             }}
//           >
//             <X size={13} />
//           </button>
//         </div>

//         {/* Bid ID + status */}
//         <div style={{ padding: "12px 22px 0", flexShrink: 0 }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               marginBottom: 14,
//               flexWrap: "wrap",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 color: colors.textFaint,
//                 background: colors.userCardBg,
//                 padding: "3px 10px",
//                 borderRadius: 6,
//               }}
//             >
//               #{bid._id?.slice(-8).toUpperCase()}
//             </span>
//             <StatusPill status={bid.status} colors={colors} />
//             <span
//               style={{
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 color: colors.textMuted,
//                 marginLeft: "auto",
//               }}
//             >
//               {formatDate(bid.createdAt)}
//             </span>
//           </div>

//           {/* Tabs */}
//           <div
//             style={{
//               display: "flex",
//               gap: 4,
//               padding: "4px",
//               background: colors.inputBg,
//               borderRadius: 12,
//               marginBottom: 16,
//             }}
//           >
//             {tabs.map(({ id, label, icon: Icon }) => {
//               const active = activeTab === id;
//               const tabAccent =
//                 id === "txn" ? colors.accentSecondary : accentColor;
//               return (
//                 <button
//                   key={id}
//                   onClick={() => setActiveTab(id)}
//                   style={{
//                     flex: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 6,
//                     padding: "7px 10px",
//                     borderRadius: 9,
//                     cursor: "pointer",
//                     border: "none",
//                     transition: "all 0.18s",
//                     background: active ? `${tabAccent}18` : "transparent",
//                     color: active ? tabAccent : colors.textMuted,
//                     fontFamily: "monospace",
//                     fontSize: 10,
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.8,
//                   }}
//                 >
//                   <Icon size={11} />
//                   {label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Scrollable content */}
//         <div style={{ overflowY: "auto", padding: "0 22px 22px", flex: 1 }}>
//           {/* ── TAB: Details ── */}
//           {activeTab === "details" && (
//             <>
//               <div
//                 style={{
//                   background: `${accentColor}0D`,
//                   border: `1px solid ${accentColor}22`,
//                   borderRadius: 14,
//                   padding: "18px 20px",
//                   textAlign: "center",
//                   marginBottom: 16,
//                 }}
//               >
//                 <p
//                   style={{
//                     fontSize: 10,
//                     fontFamily: "monospace",
//                     color: colors.textFaint,
//                     textTransform: "uppercase",
//                     letterSpacing: 1.5,
//                     marginBottom: 6,
//                   }}
//                 >
//                   Quoted Amount
//                 </p>
//                 <p
//                   style={{
//                     fontSize: 36,
//                     fontWeight: 900,
//                     color: accentColor,
//                     letterSpacing: "-1px",
//                   }}
//                 >
//                   {formatCurrency(bid.quotation)}
//                 </p>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr 1fr",
//                   gap: 8,
//                   marginBottom: 16,
//                 }}
//               >
//                 <PopChip
//                   icon={Clock}
//                   label="Validity"
//                   value={bid.validityOfQuote}
//                   colors={colors}
//                 />
//                 <PopChip
//                   icon={Percent}
//                   label="Advance"
//                   value={`${bid.advancePayment}%`}
//                   colors={colors}
//                 />
//                 <PopChip
//                   icon={TrendingUp}
//                   label="Quote Status"
//                   value={bid.ActiveUserStatus}
//                   colors={colors}
//                 />
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 12,
//                   padding: "12px 14px",
//                   borderRadius: 12,
//                   background: colors.chipPaidBg,
//                   border: `1px solid ${colors.chipPaidBorder}`,
//                   marginBottom: bid.noteToCustomer ? 12 : 0,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 38,
//                     height: 38,
//                     borderRadius: "50%",
//                     flexShrink: 0,
//                     background: `${colors.chipPaidColor}20`,
//                     color: colors.chipPaidColor,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: 700,
//                     fontSize: 14,
//                   }}
//                 >
//                   {bid.customerName
//                     ?.split(" ")
//                     .map((w) => w[0])
//                     .join("")
//                     .slice(0, 2)
//                     .toUpperCase() || "?"}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <p
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       color: colors.chipPaidColor,
//                       marginBottom: 2,
//                     }}
//                   >
//                     {bid.customerName}
//                   </p>
//                   <p
//                     style={{
//                       fontSize: 10,
//                       fontFamily: "monospace",
//                       color: colors.textFaint,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 4,
//                     }}
//                   >
//                     <Phone size={9} /> {bid.customerPhone}
//                   </p>
//                 </div>
//                 <span
//                   style={{
//                     fontSize: 9,
//                     fontFamily: "monospace",
//                     color: colors.chipPaidColor,
//                     opacity: 0.5,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                   }}
//                 >
//                   Customer
//                 </span>
//               </div>

//               {bid.noteToCustomer && (
//                 <div
//                   style={{
//                     padding: "12px 14px",
//                     borderRadius: 12,
//                     background: colors.userCardBg,
//                     border: `1px solid ${colors.borderFaint}`,
//                     display: "flex",
//                     gap: 8,
//                     alignItems: "flex-start",
//                     marginTop: 12,
//                   }}
//                 >
//                   <MessageSquare
//                     size={12}
//                     color={colors.textMuted}
//                     style={{ marginTop: 1, flexShrink: 0 }}
//                   />
//                   <p
//                     style={{
//                       fontSize: 11,
//                       color: colors.textSecondary,
//                       lineHeight: 1.6,
//                       fontStyle: "italic",
//                     }}
//                   >
//                     {bid.noteToCustomer}
//                   </p>
//                 </div>
//               )}
//             </>
//           )}

//           {/* ── TAB: Transactions ── */}
//           {activeTab === "txn" && (
//             <>
//               <SectionLabel
//                 icon={BarChart2}
//                 label="Transaction History"
//                 color={colors.accentSecondary}
//                 colors={colors}
//               />

//               {txnLoading && (
//                 <InlineLoader label="Loading transactions..." colors={colors} />
//               )}
//               {txnError && (
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     padding: "12px 14px",
//                     borderRadius: 10,
//                     background: colors.chipRejectedBg,
//                     border: `1px solid ${colors.chipRejectedBorder}`,
//                   }}
//                 >
//                   <AlertCircle size={13} color={colors.chipRejectedColor} />
//                   <span
//                     style={{
//                       fontSize: 11,
//                       color: colors.chipRejectedColor,
//                       fontFamily: "monospace",
//                     }}
//                   >
//                     {txnError}
//                   </span>
//                 </div>
//               )}

//               {!txnLoading && !txnError && txnHistory !== null && (
//                 <>
//                   {txnHistory.length === 0 ? (
//                     <EmptyState
//                       label="No transactions found for this bid."
//                       colors={colors}
//                     />
//                   ) : (
//                     <>
//                       <div
//                         style={{
//                           padding: "12px 16px",
//                           borderRadius: 12,
//                           marginBottom: 14,
//                           background: colors.chipVerifiedBg,
//                           border: colors.chipVerifiedBorder,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div>
//                           <p
//                             style={{
//                               fontSize: 9,
//                               fontFamily: "monospace",
//                               color: colors.textFaint,
//                               textTransform: "uppercase",
//                               letterSpacing: 1,
//                               marginBottom: 4,
//                             }}
//                           >
//                             Final Accepted Amount
//                           </p>
//                           <p
//                             style={{
//                               fontSize: 20,
//                               fontWeight: 900,
//                               color: colors.accentPrimary,
//                               letterSpacing: "-0.5px",
//                             }}
//                           >
//                             {(() => {
//                               const accepted = txnHistory.find(
//                                 (t) => t.activeStatus === "accept",
//                               );
//                               if (accepted)
//                                 return formatCurrency(accepted.amount ?? 0);
//                               const isRejected = bid.status === "Rejected";
//                               return (
//                                 <span
//                                   style={{
//                                     fontSize: 14,
//                                     color: isRejected
//                                       ? colors.chipRejectedColor
//                                       : colors.chipPendingColor,
//                                   }}
//                                 >
//                                   {isRejected ? "Rejected" : "Ongoing"}
//                                 </span>
//                               );
//                             })()}
//                           </p>
//                         </div>
//                         <div style={{ textAlign: "right" }}>
//                           <p
//                             style={{
//                               fontSize: 9,
//                               fontFamily: "monospace",
//                               color: colors.textFaint,
//                               textTransform: "uppercase",
//                               letterSpacing: 1,
//                               marginBottom: 4,
//                             }}
//                           >
//                             Count
//                           </p>
//                           <p
//                             style={{
//                               fontSize: 20,
//                               fontWeight: 900,
//                               color: colors.accentSecondary,
//                               letterSpacing: "-0.5px",
//                             }}
//                           >
//                             {txnHistory.length}
//                           </p>
//                         </div>
//                       </div>

//                       <div>
//                         {txnHistory.map((txn, i) => (
//                           <TxnRow
//                             key={txn._id ?? txn.transactionId ?? i}
//                             txn={txn}
//                             isLast={i === txnHistory.length - 1}
//                             colors={colors}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes popUp {
//           from { opacity: 0; transform: scale(0.92) translateY(12px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function VendorBidHistory() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const { colors } = useTheme();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBid, setSelectedBid] = useState(null);
//   const [totalEarnings, setTotalEarnings] = useState(0);

//   useEffect(() => {
//     fetch(`${BID_API}/${userId}`)
//       .then((r) => {
//         if (!r.ok) throw new Error(`HTTP ${r.status}`);
//         return r.json();
//       })
//       .then(async (json) => {
//         if (!json.success) {
//           setError(json.message || "No data returned");
//           return;
//         }

//         setData(json);

//         let earnings = 0;
//         for (const bid of json.data || []) {
//           try {
//             const senderId = bid.customerId || bid.senderId;
//             const receiverId = bid.vendorId || bid.receiverId;
//             const res = await fetch(
//               `${TRANSACTION_HISTORY_API}?senderId=${senderId}&receiverId=${receiverId}&bidId=${bid._id}`,
//             );
//             const txnJson = await res.json();
//             const acceptedTxn = txnJson?.transactionHistory?.find(
//               (t) => t.activeStatus === "accept",
//             );
//             if (acceptedTxn) {
//               earnings += Number(acceptedTxn.amount || 0);
//             }
//           } catch (err) {
//             console.log("Transaction fetch error", err);
//           }
//         }
//         setTotalEarnings(earnings);
//       })
//       .catch((e) => setError(e.message))
//       .finally(() => setLoading(false));
//   }, [userId]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") setSelectedBid(null);
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, []);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: colors.pageBg,
//           flexDirection: "column",
//           gap: 12,
//           transition: "background 0.3s",
//         }}
//       >
//         <div
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             border: `3px solid ${colors.chipPaidBg}`,
//             borderTop: `3px solid ${colors.chipPaidColor}`,
//             animation: "spin 0.8s linear infinite",
//           }}
//         />
//         <p
//           style={{
//             color: colors.textMuted,
//             fontFamily: "monospace",
//             fontSize: 12,
//           }}
//         >
//           Fetching bid history...
//         </p>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: colors.pageBg,
//           flexDirection: "column",
//           gap: 14,
//           transition: "background 0.3s",
//         }}
//       >
//         <AlertCircle size={36} color={colors.chipRejectedColor} />
//         <p
//           style={{
//             color: colors.chipRejectedColor,
//             fontFamily: "monospace",
//             fontSize: 13,
//           }}
//         >
//           {error}
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             background: colors.accentNavHover,
//             color: colors.accentPrimary,
//             border: `1px solid ${colors.borderSubtle}`,
//             borderRadius: 10,
//             padding: "8px 18px",
//             cursor: "pointer",
//             fontSize: 13,
//           }}
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   const bids = data?.data || [];
//   const vendor = bids[0];

//   return (
//     <div
//       style={{
//         background: colors.pageBg,
//         minHeight: "100vh",
//         padding: "28px 32px",
//         transition: "background 0.3s",
//       }}
//     >
//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//       `}</style>

//       <BidDetailPopup
//         bid={selectedBid}
//         onClose={() => setSelectedBid(null)}
//         colors={colors}
//       />

//       {/* Top bar: back + theme toggle */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 24,
//         }}
//       >
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 8,
//             background: colors.accentNavHover,
//             color: colors.textSecondary,
//             border: `1px solid ${colors.borderSubtle}`,
//             borderRadius: 10,
//             padding: "8px 16px",
//             cursor: "pointer",
//             fontSize: 13,
//             fontWeight: 500,
//             transition: "all 0.2s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.color = colors.accentPrimary;
//             e.currentTarget.style.borderColor = colors.borderHover;
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.color = colors.textSecondary;
//             e.currentTarget.style.borderColor = colors.borderSubtle;
//           }}
//         >
//           <ArrowLeft size={15} /> Back to Vendor
//         </button>

//         <ThemeToggle />
//       </div>

//       {/* Vendor Hero */}
//       <div
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.chipPaidBorder}`,
//           borderRadius: 20,
//           padding: "24px 28px",
//           marginBottom: 20,
//           position: "relative",
//           overflow: "hidden",
//           animation: "fadeIn 0.3s ease",
//           transition: "background 0.3s",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: 2,
//             background: `linear-gradient(90deg, ${colors.chipPaidColor}, ${colors.accentPrimary}, transparent)`,
//           }}
//         />
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 18,
//             flexWrap: "wrap",
//           }}
//         >
//           {vendor?.vendorImage ? (
//             <img
//               src={vendor.vendorImage}
//               alt={vendor.vendorName}
//               style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 border: `2px solid ${colors.borderAvatar}`,
//               }}
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: "50%",
//                 background: colors.chipPaidBg,
//                 color: colors.chipPaidColor,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 22,
//                 fontWeight: 700,
//               }}
//             >
//               {vendor?.vendorName
//                 ?.split(" ")
//                 .map((w) => w[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase() || "??"}
//             </div>
//           )}
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 marginBottom: 4,
//               }}
//             >
//               <Briefcase size={14} color={colors.chipPaidColor} />
//               <span
//                 style={{
//                   fontSize: 11,
//                   fontFamily: "monospace",
//                   color: colors.chipPaidColor,
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                 }}
//               >
//                 Bid History
//               </span>
//             </div>
//             <h1
//               style={{
//                 fontSize: 22,
//                 fontWeight: 800,
//                 color: colors.textPrimary,
//                 letterSpacing: "-0.5px",
//                 marginBottom: 4,
//               }}
//             >
//               {vendor?.vendorName || "Vendor"}
//             </h1>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 6,
//                 fontSize: 12,
//                 color: colors.textMuted,
//                 fontFamily: "monospace",
//               }}
//             >
//               <Phone size={10} /> {vendor?.vendorPhone}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(5, 1fr)",
//           gap: 12,
//           marginBottom: 20,
//           animation: "fadeIn 0.4s ease 0.1s both",
//         }}
//       >
//         <StatCard
//           icon={Layers}
//           label="Total Jobs"
//           value={data.totalBids}
//           accent={colors.chipPaidColor}
//           colors={colors}
//         />
//         <StatCard
//           icon={IndianRupee}
//           label="Total Quoted"
//           value={formatCurrency(data.totalQuotedAmount)}
//           accent={colors.accentPrimary}
//           colors={colors}
//         />
//         <StatCard
//           icon={CheckCircle2}
//           label="Accepted"
//           value={data.acceptedBids}
//           accent={colors.accentQuaternary}
//           colors={colors}
//         />
//         <StatCard
//           icon={TrendingUp}
//           label="Negotiable"
//           value={data.negotiableBids}
//           accent={colors.accentSecondary}
//           colors={colors}
//         />
//         <StatCard
//           icon={IndianRupee}
//           label="Total Earnings"
//           value={formatCurrency(totalEarnings)}
//           accent="#FFD700"
//           colors={colors}
//         />
//       </div>

//       {/* Jobs List */}
//       {bids.length === 0 ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "60px 0",
//             gap: 12,
//           }}
//         >
//           <Briefcase size={36} color={colors.textFaint} />
//           <p
//             style={{
//               color: colors.textFaint,
//               fontFamily: "monospace",
//               fontSize: 13,
//             }}
//           >
//             No jobs found for this vendor.
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           <p
//             style={{
//               fontSize: 11,
//               fontFamily: "monospace",
//               color: colors.textMuted,
//               textTransform: "uppercase",
//               letterSpacing: 1.5,
//               marginBottom: 4,
//             }}
//           >
//             {bids.length} job{bids.length !== 1 ? "s" : ""} · tap to view bid
//             details
//           </p>
//           {bids.map((bid, i) => (
//             <JobCard
//               key={bid._id}
//               bid={bid}
//               index={i}
//               onClick={setSelectedBid}
//               colors={colors}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// src/Screens/VendorBidHistory.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  IndianRupee,
  Clock,
  Phone,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Layers,
  AlertCircle,
  X,
  ChevronRight,
  Percent,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Hash,
  BarChart2,
  Sun,
  Moon,
  MessageCircle,
  IndianRupee as RupeeIcon,
  CheckCheck,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const BID_API = `${BASE_URL2}vendor-bid-history`;
const AMOUNT_HISTORY_API = `${BASE_URL2.replace(/api\/$/, "")}getAmountHistory`;
const TRANSACTION_HISTORY_API = `${BASE_URL2.replace(/api\/$/, "")}getTransactionHistory`;
const MESSAGES_API = `${BASE_URL2.replace(/api\/$/, "")}getMessages`;

function formatCurrency(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── ThemeToggle ────────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { toggle, isDark, colors } = useTheme();
  return (
    <button
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: colors.accentNavHover,
        color: colors.textSecondary,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: 10,
        padding: "8px 14px",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = colors.accentPrimary;
        e.currentTarget.style.borderColor = colors.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = colors.textSecondary;
        e.currentTarget.style.borderColor = colors.borderSubtle;
      }}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

// ── StatusPill ─────────────────────────────────────────────────────────────────
function StatusPill({ status, colors }) {
  const map = {
    Negotiable: {
      bg: colors.chipPendingBg,
      color: colors.chipPendingColor,
      border: colors.chipPendingBorder,
      dot: colors.chipPendingColor,
    },
    Accepted: {
      bg: colors.chipVerifiedBg,
      color: colors.chipVerifiedColor,
      border: colors.chipVerifiedBorder,
      dot: colors.chipVerifiedColor,
    },
    Rejected: {
      bg: colors.chipRejectedBg,
      color: colors.chipRejectedColor,
      border: colors.chipRejectedBorder,
      dot: colors.chipRejectedColor,
    },
    Pending: {
      bg: colors.chipPendingBg,
      color: colors.chipPendingColor,
      border: colors.chipPendingBorder,
      dot: colors.chipPendingColor,
    },
  };
  const s = map[status] || map.Pending;
  return (
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
        background: s.bg,
        color: s.color,
        border: s.border,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: s.dot,
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
}

// ── StatCard ───────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent, colors }) {
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${accent}22`,
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          flexShrink: 0,
          background: `${accent}18`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: colors.textFaint,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: accent,
            letterSpacing: "-0.5px",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ── JobCard ────────────────────────────────────────────────────────────────────
function JobCard({ bid, index, onClick, colors }) {
  const accentColor =
    bid.status === "Accepted"
      ? colors.chipVerifiedColor
      : bid.status === "Rejected"
        ? colors.chipRejectedColor
        : colors.chipPendingColor;

  const finalAmt = bid.finalAmount ?? bid.negotiateAmount ?? null;
  const hasNego = finalAmt && Number(finalAmt) !== Number(bid.quotation);

  return (
    <div
      onClick={() => onClick(bid)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderRow}`,
        borderRadius: 16,
        padding: "18px 20px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        animation: `slideUp 0.35s ease both`,
        animationDelay: `${index * 55}ms`,
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}30`;
        e.currentTarget.style.background = colors.rowHoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.borderRow;
        e.currentTarget.style.background = colors.cardBg;
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: accentColor,
          borderRadius: "3px 0 0 3px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            flexShrink: 0,
            background: colors.chipPaidBg,
            color: colors.chipPaidColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            border: `1.5px solid ${colors.chipPaidBorder}`,
          }}
        >
          {bid.customerName
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?"}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 5,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary }}
            >
              {bid.customerName}
            </span>
            <StatusPill status={bid.status} colors={colors} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textFaint,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Phone size={9} /> {bid.customerPhone}
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textMuted,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Calendar size={9} /> {formatDate(bid.createdAt)}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              marginBottom: 3,
            }}
          >
            {hasNego ? "Nego Price" : "Bid Amount"}
          </p>
          <p
            style={{
              fontSize: hasNego ? 12 : 20,
              fontWeight: hasNego ? 600 : 900,
              color: hasNego ? colors.textVeryFaint : accentColor,
              letterSpacing: "-0.3px",
              textDecoration: hasNego ? "line-through" : "none",
              marginBottom: hasNego ? 2 : 0,
            }}
          >
            {formatCurrency(bid.quotation)}
          </p>
          {hasNego && (
            <p
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: colors.accentPrimary,
                letterSpacing: "-0.5px",
              }}
            >
              {formatCurrency(finalAmt)}
            </p>
          )}
        </div>
        <ChevronRight
          size={16}
          color={colors.textFaint}
          style={{ flexShrink: 0, marginLeft: 4 }}
        />
      </div>
    </div>
  );
}

// ── PopChip ────────────────────────────────────────────────────────────────────
function PopChip({ icon: Icon, label, value, colors }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        background: colors.userCardBg,
        border: `1px solid ${colors.borderFaint}`,
        textAlign: "center",
      }}
    >
      <Icon size={12} color={colors.textMuted} style={{ marginBottom: 4 }} />
      <p
        style={{
          fontSize: 9,
          fontFamily: "monospace",
          color: colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          marginBottom: 3,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 12, fontWeight: 700, color: colors.textPrimary }}>
        {value}
      </p>
    </div>
  );
}

// ── SectionLabel ───────────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label, color, colors }) {
  const c = color || colors.chipPaidColor;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 10,
      }}
    >
      <Icon size={12} color={c} />
      <span
        style={{
          fontSize: 10,
          fontFamily: "monospace",
          fontWeight: 700,
          color: c,
          textTransform: "uppercase",
          letterSpacing: 1.2,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: `${c}20` }} />
    </div>
  );
}

// ── TxnRow — no +/- prefix, neutral negotiation style ─────────────────────────
function TxnRow({ txn, isLast, colors }) {
  const isAccepted = txn.activeStatus === "accept";
  const isNegotiate = txn.activeStatus === "negotiate";

  // Color based on activeStatus, not credit/debit direction
  const accent = isAccepted
    ? colors.chipVerifiedColor
    : isNegotiate
      ? colors.chipPendingColor
      : colors.chipPaidColor;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 10,
        background: colors.userCardBg,
        border: `1px solid ${accent}18`,
        marginBottom: isLast ? 0 : 6,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          flexShrink: 0,
          background: `${accent}12`,
          border: `1.5px solid ${accent}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isAccepted ? (
          <CheckCheck size={13} color={accent} />
        ) : isNegotiate ? (
          <ArrowUpRight size={13} color={accent} />
        ) : (
          <MessageSquare size={13} color={accent} />
        )}
      </div>

      {/* Left content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 3,
          }}
        >
          <span
            style={{ fontSize: 11, fontWeight: 700, color: colors.textPrimary }}
          >
            {txn.description || txn.remark || txn.type || "Offer"}
          </span>
          {txn.status && (
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                fontWeight: 700,
                color: accent,
                background: `${accent}15`,
                padding: "2px 7px",
                borderRadius: 6,
                textTransform: "uppercase",
              }}
            >
              {txn.status}
            </span>
          )}
        </div>
        {txn.createdAt && (
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: colors.textMuted,
            }}
          >
            {formatDate(txn.createdAt)}
          </span>
        )}
        {txn.transactionId && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 2,
            }}
          >
            <Hash size={9} color={colors.textFaint} />
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: colors.textFaint,
              }}
            >
              {txn.transactionId}
            </span>
          </div>
        )}
      </div>

      {/* Right: amount + badge — NO +/- prefix */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: accent,
            letterSpacing: "-0.3px",
          }}
        >
          {formatCurrency(txn.amount ?? txn.amountPaid ?? 0)}
        </p>
        {txn.paymentMode && (
          <p
            style={{
              fontSize: 9,
              fontFamily: "monospace",
              color: colors.textMuted,
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            {txn.paymentMode}
          </p>
        )}
        {isAccepted && (
          <span
            style={{
              fontSize: 9,
              fontFamily: "monospace",
              fontWeight: 700,
              color: colors.chipVerifiedColor,
              background: colors.chipVerifiedBg,
              padding: "2px 7px",
              borderRadius: 6,
              textTransform: "uppercase",
              display: "block",
              marginTop: 3,
            }}
          >
            ✓ Accepted
          </span>
        )}
        {isNegotiate && (
          <span
            style={{
              fontSize: 9,
              fontFamily: "monospace",
              fontWeight: 700,
              color: colors.chipPendingColor,
              background: colors.chipPendingBg,
              padding: "2px 7px",
              borderRadius: 6,
              textTransform: "uppercase",
              display: "block",
              marginTop: 3,
            }}
          >
            Negotiate
          </span>
        )}
      </div>
    </div>
  );
}

// ── ChatBubble ─────────────────────────────────────────────────────────────────
// vendorId = bid.vendorId or bid.receiverId (the vendor's ID to distinguish sides)
function ChatBubble({ msg, vendorId, colors }) {
  const isVendor = msg.senderId === vendorId;

  // Decide bubble accent
  const bubbleAccent = isVendor ? colors.chipPaidColor : colors.accentSecondary;
  const bubbleBg = isVendor
    ? `${colors.chipPaidColor}14`
    : `${colors.accentSecondary}10`;
  const bubbleBorder = isVendor
    ? `1px solid ${colors.chipPaidColor}22`
    : `1px solid ${colors.accentSecondary}1A`;

  // API response fields: negotiateAmount, activeStatus, text, timestamp, time, senderId
  const displayAmount =
    msg.activeStatus === "negotiate" && Number(msg.negotiateAmount) > 0
      ? msg.negotiateAmount
      : msg.activeStatus === "accept" && Number(msg.negotiateAmount) > 0
        ? msg.negotiateAmount
        : null;

  // Badge for activeStatus
  const statusBadge = () => {
    if (msg.activeStatus === "accept")
      return {
        label: "✓ Accepted",
        color: colors.chipVerifiedColor,
        bg: colors.chipVerifiedBg,
      };
    if (msg.activeStatus === "negotiate")
      return {
        label: "Negotiate",
        color: colors.chipPendingColor,
        bg: colors.chipPendingBg,
      };
    return null;
  };
  const badge = statusBadge();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isVendor ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      {/* Sender label */}
      <span
        style={{
          fontSize: 9,
          fontFamily: "monospace",
          fontWeight: 700,
          color: bubbleAccent,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          marginBottom: 4,
          opacity: 0.7,
        }}
      >
        {isVendor ? "Vendor" : "Customer"}
      </span>

      {/* Bubble */}
      <div
        style={{
          maxWidth: "78%",
          background: bubbleBg,
          border: bubbleBorder,
          borderRadius: isVendor ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
          padding: "10px 13px",
          position: "relative",
        }}
      >
        {/* Amount pill — show for negotiate/accept messages */}
        {displayAmount && Number(displayAmount) > 0 && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: `${bubbleAccent}18`,
              border: `1px solid ${bubbleAccent}30`,
              borderRadius: 8,
              padding: "4px 10px",
              marginBottom: msg.text ? 6 : 0,
            }}
          >
            <IndianRupee size={11} color={bubbleAccent} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: bubbleAccent,
                letterSpacing: "-0.3px",
                fontFamily: "monospace",
              }}
            >
              {Number(displayAmount).toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Text */}
        {msg.text && msg.text.trim() !== "" && (
          <p
            style={{
              fontSize: 12,
              color: colors.textPrimary,
              lineHeight: 1.55,
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            {msg.text}
          </p>
        )}

        {/* Bottom row: badge + time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: 6,
          }}
        >
          {badge ? (
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                fontWeight: 700,
                color: badge.color,
                background: badge.bg,
                padding: "2px 7px",
                borderRadius: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {badge.label}
            </span>
          ) : (
            <span />
          )}
          <span
            style={{
              fontSize: 9,
              fontFamily: "monospace",
              color: colors.textFaint,
              whiteSpace: "nowrap",
            }}
          >
            {msg.time || (msg.timestamp ? formatTime(msg.timestamp) : "")}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Loader (inline) ────────────────────────────────────────────────────────────
function InlineLoader({ label, colors }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "14px 0",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: `2px solid ${colors.chipPaidBg}`,
          borderTop: `2px solid ${colors.chipPaidColor}`,
          animation: "spin 0.7s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: colors.textFaint,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── EmptyState (inline) ────────────────────────────────────────────────────────
function EmptyState({ label, colors }) {
  return (
    <div style={{ padding: "16px 0", textAlign: "center" }}>
      <p
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: colors.textFaint,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── BidDetailPopup ─────────────────────────────────────────────────────────────
function BidDetailPopup({ bid, onClose, colors }) {
  const [activeTab, setActiveTab] = useState("details");
  const [txnHistory, setTxnHistory] = useState(null);
  const [txnLoading, setTxnLoading] = useState(false);
  const [txnError, setTxnError] = useState(null);
  const [messages, setMessages] = useState(null);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const chatBottomRef = useRef(null);

  // Reset on bid change
  useEffect(() => {
    if (!bid) return;
    setActiveTab("details");
    setTxnHistory(null);
    setMessages(null);
    setTxnError(null);
    setMsgError(null);
  }, [bid?._id]);

  // Fetch transaction history
  useEffect(() => {
    if (activeTab !== "txn" || !bid || txnHistory !== null) return;
    setTxnLoading(true);
    setTxnError(null);
    const url = `${TRANSACTION_HISTORY_API}?senderId=${bid.senderId}&receiverId=${bid.receiverId}&bidId=${bid._id}`;
    console.info("[VendorBidHistory] Loading bid transactions", { bidId: bid._id, url });
    fetch(url)
      .then(async (r) => {
        console.info("[VendorBidHistory] Transaction response", { bidId: bid._id, status: r.status, ok: r.ok });
        const json = await r.json();
        if (!r.ok) throw new Error(json?.message || `HTTP ${r.status}`);
        return json;
      })
      .then((json) => {
        const transactions = Array.isArray(json) ? json : (json.transactionHistory ?? []);
        console.info("[VendorBidHistory] Transactions loaded", { bidId: bid._id, count: transactions.length });
        setTxnHistory(transactions);
      })
      .catch((e) => {
        console.error("[VendorBidHistory] Transaction history failed", { bidId: bid._id, error: e });
        setTxnError(e.message);
      })
      .finally(() => setTxnLoading(false));
  }, [activeTab, bid?._id]);

  // Fetch chat messages — POST with body, response is grouped array with labels
  useEffect(() => {
    if (activeTab !== "chat" || !bid || messages !== null) return;
    setMsgLoading(true);
    setMsgError(null);
    console.info("[VendorBidHistory] Loading bid chat", { bidId: bid._id, url: MESSAGES_API });
    fetch(MESSAGES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: bid.senderId,
        receiverId: bid.receiverId,
        bidId: bid._id,
        chatType: "bid",
      }),
    })
      .then(async (r) => {
        const json = await r.json();
        console.info("[VendorBidHistory] Chat response", { bidId: bid._id, status: r.status, ok: r.ok, isArray: Array.isArray(json) });
        if (!r.ok) throw new Error(json?.message || `HTTP ${r.status}`);
        return json;
      })
      .then((json) => {
        // Response is array of {type:"label", label} | {type:"message", ...}
        // Keep all items (labels + messages) for rendering date separators
        const grouped = Array.isArray(json) ? json : [];
        console.info("[VendorBidHistory] Chat loaded", { bidId: bid._id, itemCount: grouped.length });
        setMessages(grouped);
      })
      .catch((e) => {
        console.error("[VendorBidHistory] Chat request failed", { bidId: bid._id, error: e });
        setMsgError(e.message);
      })
      .finally(() => setMsgLoading(false));
  }, [activeTab, bid?._id]);

  // Scroll chat to bottom when messages load
  useEffect(() => {
    if (activeTab === "chat" && messages?.length) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [activeTab, messages]);

  if (!bid) return null;

  const accentColor =
    bid.status === "Accepted"
      ? colors.chipVerifiedColor
      : bid.status === "Rejected"
        ? colors.chipRejectedColor
        : colors.chipPendingColor;

  // vendorId: vendor is the one who receives the bid from customer
  const vendorId = bid.vendorId || bid.receiverId;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const tabs = [
    { id: "details", label: "Details", icon: FileText },
    { id: "txn", label: "Offers", icon: BarChart2 },
    { id: "chat", label: "Chat", icon: MessageCircle },
  ];

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(2,22,22,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.2s ease",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${accentColor}28`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 500,
          position: "relative",
          overflow: "hidden",
          animation: "popUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            height: 3,
            flexShrink: 0,
            background: `linear-gradient(90deg, ${accentColor}, ${colors.chipPaidColor}, transparent)`,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 22px 0",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={15} color={accentColor} />
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                fontWeight: 700,
                color: accentColor,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Bid Details
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: colors.userCardBg,
              border: `1px solid ${colors.borderFaint}`,
              color: colors.textMuted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.chipRejectedBg;
              e.currentTarget.style.color = colors.chipRejectedColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.userCardBg;
              e.currentTarget.style.color = colors.textMuted;
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Bid ID + status + tabs */}
        <div style={{ padding: "12px 22px 0", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textFaint,
                background: colors.userCardBg,
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              #{bid._id?.slice(-8).toUpperCase()}
            </span>
            <StatusPill status={bid.status} colors={colors} />
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textMuted,
                marginLeft: "auto",
              }}
            >
              {formatDate(bid.createdAt)}
            </span>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: "4px",
              background: colors.inputBg,
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              const tabAccent =
                id === "txn"
                  ? colors.accentSecondary
                  : id === "chat"
                    ? colors.chipPaidColor
                    : accentColor;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    padding: "7px 8px",
                    borderRadius: 9,
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.18s",
                    background: active ? `${tabAccent}18` : "transparent",
                    color: active ? tabAccent : colors.textMuted,
                    fontFamily: "monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  <Icon size={11} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", padding: "0 22px 22px", flex: 1 }}>

          {/* ── TAB: Details ── */}
          {activeTab === "details" && (
            <>
              <div
                style={{
                  background: `${accentColor}0D`,
                  border: `1px solid ${accentColor}22`,
                  borderRadius: 14,
                  padding: "18px 20px",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: colors.textFaint,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    marginBottom: 6,
                  }}
                >
                  Quoted Amount
                </p>
                <p
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: accentColor,
                    letterSpacing: "-1px",
                  }}
                >
                  {formatCurrency(bid.quotation)}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <PopChip icon={Clock} label="Validity" value={bid.validityOfQuote} colors={colors} />
                <PopChip icon={Percent} label="Advance" value={`${bid.advancePayment}%`} colors={colors} />
                <PopChip icon={TrendingUp} label="Quote Status" value={bid.ActiveUserStatus} colors={colors} />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: colors.chipPaidBg,
                  border: `1px solid ${colors.chipPaidBorder}`,
                  marginBottom: bid.noteToCustomer ? 12 : 0,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: `${colors.chipPaidColor}20`,
                    color: colors.chipPaidColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {bid.customerName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?"}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: colors.chipPaidColor, marginBottom: 2 }}>
                    {bid.customerName}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: colors.textFaint,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Phone size={9} /> {bid.customerPhone}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: colors.chipPaidColor,
                    opacity: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Customer
                </span>
              </div>

              {bid.noteToCustomer && (
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: colors.userCardBg,
                    border: `1px solid ${colors.borderFaint}`,
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    marginTop: 12,
                  }}
                >
                  <MessageSquare size={12} color={colors.textMuted} style={{ marginTop: 1, flexShrink: 0 }} />
                  <p
                    style={{
                      fontSize: 11,
                      color: colors.textSecondary,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {bid.noteToCustomer}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── TAB: Offers/Transactions ── */}
          {activeTab === "txn" && (
            <>
              <SectionLabel icon={BarChart2} label="Negotiation Offers" color={colors.accentSecondary} colors={colors} />

              {txnLoading && <InlineLoader label="Loading offers..." colors={colors} />}
              {txnError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: colors.chipRejectedBg,
                    border: `1px solid ${colors.chipRejectedBorder}`,
                  }}
                >
                  <AlertCircle size={13} color={colors.chipRejectedColor} />
                  <span style={{ fontSize: 11, color: colors.chipRejectedColor, fontFamily: "monospace" }}>
                    {txnError}
                  </span>
                </div>
              )}

              {!txnLoading && !txnError && txnHistory !== null && (
                <>
                  {txnHistory.length === 0 ? (
                    <EmptyState label="No offers found for this bid." colors={colors} />
                  ) : (
                    <>
                      {/* Summary bar */}
                      <div
                        style={{
                          padding: "12px 16px",
                          borderRadius: 12,
                          marginBottom: 14,
                          background: colors.chipVerifiedBg,
                          border: `1px solid ${colors.chipVerifiedColor}22`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 9,
                              fontFamily: "monospace",
                              color: colors.textFaint,
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              marginBottom: 4,
                            }}
                          >
                            Final Accepted Amount
                          </p>
                          <p
                            style={{
                              fontSize: 20,
                              fontWeight: 900,
                              color: colors.accentPrimary,
                              letterSpacing: "-0.5px",
                            }}
                          >
                            {(() => {
                              const accepted = txnHistory.find((t) => t.activeStatus === "accept");
                              if (accepted) return formatCurrency(accepted.amount ?? 0);
                              const isRejected = bid.status === "Rejected";
                              return (
                                <span
                                  style={{
                                    fontSize: 14,
                                    color: isRejected ? colors.chipRejectedColor : colors.chipPendingColor,
                                  }}
                                >
                                  {isRejected ? "Rejected" : "Ongoing"}
                                </span>
                              );
                            })()}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p
                            style={{
                              fontSize: 9,
                              fontFamily: "monospace",
                              color: colors.textFaint,
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              marginBottom: 4,
                            }}
                          >
                            Total Offers
                          </p>
                          <p
                            style={{
                              fontSize: 20,
                              fontWeight: 900,
                              color: colors.accentSecondary,
                              letterSpacing: "-0.5px",
                            }}
                          >
                            {txnHistory.length}
                          </p>
                        </div>
                      </div>

                      <div>
                        {txnHistory.map((txn, i) => (
                          <TxnRow
                            key={txn._id ?? txn.transactionId ?? i}
                            txn={txn}
                            isLast={i === txnHistory.length - 1}
                            colors={colors}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {/* ── TAB: Chat ── */}
          {activeTab === "chat" && (
            <>
              <SectionLabel icon={MessageCircle} label="Negotiation Chat" color={colors.chipPaidColor} colors={colors} />

              {msgLoading && <InlineLoader label="Loading messages..." colors={colors} />}
              {msgError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: colors.chipRejectedBg,
                    border: `1px solid ${colors.chipRejectedBorder}`,
                  }}
                >
                  <AlertCircle size={13} color={colors.chipRejectedColor} />
                  <span style={{ fontSize: 11, color: colors.chipRejectedColor, fontFamily: "monospace" }}>
                    {msgError}
                  </span>
                </div>
              )}

              {!msgLoading && !msgError && messages !== null && (
                <>
                  {messages.filter(m => m.type === "message").length === 0 ? (
                    <EmptyState label="No messages found for this bid." colors={colors} />
                  ) : (
                    <>
                      {/* Participants header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          borderRadius: 10,
                          background: colors.userCardBg,
                          border: `1px solid ${colors.borderFaint}`,
                          marginBottom: 14,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: `${colors.chipPaidColor}20`,
                              border: `1px solid ${colors.chipPaidColor}40`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              fontWeight: 700,
                              color: colors.chipPaidColor,
                            }}
                          >
                            V
                          </div>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: colors.chipPaidColor, fontWeight: 700 }}>
                            Vendor
                          </span>
                        </div>
                        <span style={{ fontSize: 9, fontFamily: "monospace", color: colors.textFaint }}>
                          {messages.filter(m => m.type === "message").length} messages
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: colors.accentSecondary, fontWeight: 700 }}>
                            Customer
                          </span>
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: `${colors.accentSecondary}20`,
                              border: `1px solid ${colors.accentSecondary}40`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              fontWeight: 700,
                              color: colors.accentSecondary,
                            }}
                          >
                            C
                          </div>
                        </div>
                      </div>

                      {/* Chat bubbles with date separators */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {messages.map((item, i) => {
                          if (item.type === "label") {
                            return (
                              <div
                                key={`label-${i}`}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  margin: "10px 0",
                                }}
                              >
                                <div style={{ flex: 1, height: 1, background: `${colors.borderFaint}` }} />
                                <span
                                  style={{
                                    fontSize: 9,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: colors.textFaint,
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    background: colors.userCardBg,
                                    padding: "3px 10px",
                                    borderRadius: 20,
                                    border: `1px solid ${colors.borderFaint}`,
                                  }}
                                >
                                  {item.label}
                                </span>
                                <div style={{ flex: 1, height: 1, background: `${colors.borderFaint}` }} />
                              </div>
                            );
                          }
                          return (
                            <ChatBubble
                              key={item._id ?? i}
                              msg={item}
                              vendorId={vendorId}
                              colors={colors}
                            />
                          );
                        })}
                        <div ref={chatBottomRef} />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function VendorBidHistory() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const url = `${BID_API}/${userId}`;
    console.info("[VendorBidHistory] Loading vendor bid history", { userId, url });
    fetch(url)
      .then(async (r) => {
        console.info("[VendorBidHistory] Bid history response", { userId, status: r.status, ok: r.ok });
        const json = await r.json();
        if (!r.ok) throw new Error(json?.message || `HTTP ${r.status}`);
        return json;
      })
      .then(async (json) => {
        console.info("[VendorBidHistory] Bid history payload", { userId, success: json?.success, count: json?.data?.length, message: json?.message });
        if (!json.success) {
          console.error("[VendorBidHistory] API returned unsuccessful response", { userId, message: json.message, payload: json });
          setError(json.message || "No data returned");
          return;
        }
        setData(json);

        let earnings = 0;
        for (const bid of json.data || []) {
          try {
            const senderId = bid.customerId || bid.senderId;
            const receiverId = bid.vendorId || bid.receiverId;
            const txnUrl = `${TRANSACTION_HISTORY_API}?senderId=${senderId}&receiverId=${receiverId}&bidId=${bid._id}`;
            const res = await fetch(txnUrl);
            const txnJson = await res.json();
            if (!res.ok) throw new Error(txnJson?.message || `HTTP ${res.status}`);
            const acceptedTxn = txnJson?.transactionHistory?.find(
              (t) => t.activeStatus === "accept",
            );
            if (acceptedTxn) {
              earnings += Number(acceptedTxn.amount || 0);
            }
          } catch (err) {
            console.error("[VendorBidHistory] Earnings transaction request failed", { bidId: bid._id, error: err });
          }
        }
        setTotalEarnings(earnings);
      })
      .catch((e) => {
        console.error("[VendorBidHistory] Bid history request failed", { userId, error: e });
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSelectedBid(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: colors.pageBg,
          flexDirection: "column",
          gap: 12,
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `3px solid ${colors.chipPaidBg}`,
            borderTop: `3px solid ${colors.chipPaidColor}`,
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: colors.textMuted, fontFamily: "monospace", fontSize: 12 }}>
          Fetching bid history...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: colors.pageBg,
          flexDirection: "column",
          gap: 14,
          transition: "background 0.3s",
        }}
      >
        <AlertCircle size={36} color={colors.chipRejectedColor} />
        <p style={{ color: colors.chipRejectedColor, fontFamily: "monospace", fontSize: 13 }}>
          {error}
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: colors.accentNavHover,
            color: colors.accentPrimary,
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: 10,
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const bids = data?.data || [];
  const vendor = bids[0];

  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
        transition: "background 0.3s",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <BidDetailPopup
        bid={selectedBid}
        onClose={() => setSelectedBid(null)}
        colors={colors}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: colors.accentNavHover,
            color: colors.textSecondary,
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: 10,
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.accentPrimary;
            e.currentTarget.style.borderColor = colors.borderHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textSecondary;
            e.currentTarget.style.borderColor = colors.borderSubtle;
          }}
        >
          <ArrowLeft size={15} /> Back to Vendor
        </button>
        <ThemeToggle />
      </div>

      {/* Vendor Hero */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.chipPaidBorder}`,
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
          animation: "fadeIn 0.3s ease",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${colors.chipPaidColor}, ${colors.accentPrimary}, transparent)`,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          {vendor?.vendorImage ? (
            <img
              src={vendor.vendorImage}
              alt={vendor.vendorName}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${colors.borderAvatar}`,
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: colors.chipPaidBg,
                color: colors.chipPaidColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {vendor?.vendorName?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "??"}
            </div>
          )}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Briefcase size={14} color={colors.chipPaidColor} />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: colors.chipPaidColor,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Bid History
              </span>
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: colors.textPrimary,
                letterSpacing: "-0.5px",
                marginBottom: 4,
              }}
            >
              {vendor?.vendorName || "Vendor"}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "monospace",
              }}
            >
              <Phone size={10} /> {vendor?.vendorPhone}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 20,
          animation: "fadeIn 0.4s ease 0.1s both",
        }}
      >
        <StatCard icon={Layers} label="Total Jobs" value={data.totalBids} accent={colors.chipPaidColor} colors={colors} />
        <StatCard icon={IndianRupee} label="Total Quoted" value={formatCurrency(data.totalQuotedAmount)} accent={colors.accentPrimary} colors={colors} />
        <StatCard icon={CheckCircle2} label="Accepted" value={data.acceptedBids} accent={colors.accentQuaternary} colors={colors} />
        <StatCard icon={TrendingUp} label="Negotiable" value={data.negotiableBids} accent={colors.accentSecondary} colors={colors} />
        <StatCard icon={IndianRupee} label="Total Earnings" value={formatCurrency(totalEarnings)} accent="#FFD700" colors={colors} />
      </div>

      {/* Jobs List */}
      {bids.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 0",
            gap: 12,
          }}
        >
          <Briefcase size={36} color={colors.textFaint} />
          <p style={{ color: colors.textFaint, fontFamily: "monospace", fontSize: 13 }}>
            No jobs found for this vendor.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 4,
            }}
          >
            {bids.length} job{bids.length !== 1 ? "s" : ""} · tap to view bid details
          </p>
          {bids.map((bid, i) => (
            <JobCard key={bid._id} bid={bid} index={i} onClick={setSelectedBid} colors={colors} />
          ))}
        </div>
      )}
    </div>
  );
}
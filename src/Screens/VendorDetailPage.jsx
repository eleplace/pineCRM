import { BASE_URL as API_BASE_URL, BASE_URL2 } from "../api/config";
// src/Screens/VendorDetailPage.jsx

// import { useEffect, useState, useCallback, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Building2,
//   ShieldCheck,
//   ShieldOff,
//   // CreditCard,
//   User,
//   Hash,
//   FileText,
//   Briefcase,
//   // Image,
//   Check,
//   X,
// } from "lucide-react";

// // ── helpers ────────────────────────────────────────────────────────────────────
// // const BASE_URL = "https://pineapplebyele.com/pineverse-api/";
// const ASSET_BASE_URL = "https://pineapplebyele.com/";
// const KYC_API = `${API_BASE_URL}kycstatus.php`;
// const ACCOUNT_STATUS_API =
//   `${API_BASE_URL}accountstatus.php`;
// /** Call kycstatus.php with user_id, field name, and status (1=Approved / 2=Rejected) */
// async function updateKycField(userId, field, status) {
//   const body = new URLSearchParams();
//   body.append("user_id", userId);
//   body.append(field, status);
//   const res = await fetch(KYC_API, { method: "POST", body });
//   return res.json();
// }

// // ── Avatar ─────────────────────────────────────────────────────────────────────
// function Avatar({ name, size = 80 }) {
//   const initials = name
//     ? name
//         .split(" ")
//         .map((w) => w[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
//     : "??";
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         background: "#3C5B30",
//         color: "#5CFF67",
//         border: "2.5px solid rgba(92,255,103,0.3)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: size / 3,
//         fontWeight: 700,
//         flexShrink: 0,
//       }}
//     >
//       {initials}
//     </div>
//   );
// }

// // ── Chip ───────────────────────────────────────────────────────────────────────
// function Chip({ type }) {
//   const map = {
//     verified: {
//       bg: "rgba(92,255,103,0.12)",
//       color: "#5CFF67",
//       border: "1px solid rgba(92,255,103,0.22)",
//       label: "✓ KYC Verified",
//     },
//     pending: {
//       bg: "rgba(183,246,110,0.08)",
//       color: "#B7F66E",
//       border: "1px solid rgba(183,246,110,0.18)",
//       label: "⏳ KYC Pending",
//     },
//     rejected: {
//       bg: "rgba(255,80,80,0.1)",
//       color: "#FF6B6B",
//       border: "1px solid rgba(255,80,80,0.2)",
//       label: "✗ KYC Rejected",
//     },
//     paid: {
//       bg: "rgba(28,88,88,0.35)",
//       color: "#5CDFDF",
//       border: "1px solid rgba(92,223,223,0.2)",
//       label: "✓ Paid",
//     },
//     unpaid: {
//       bg: "rgba(60,90,46,0.25)",
//       color: "rgba(254,253,250,0.4)",
//       border: "1px solid rgba(94,255,103,0.08)",
//       label: "Unpaid",
//     },
//     customer: {
//       bg: "rgba(92,255,103,0.1)",
//       color: "#5CFF67",
//       border: "1px solid rgba(92,255,103,0.2)",
//       label: "Customer",
//     },
//   };
//   const s = map[type] || map.pending;
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         padding: "4px 12px",
//         borderRadius: 20,
//         fontSize: 11,
//         fontWeight: 600,
//         fontFamily: "monospace",
//         background: s.bg,
//         color: s.color,
//         border: s.border,
//       }}
//     >
//       {s.label}
//     </span>
//   );
// }

// // ── InfoRow ────────────────────────────────────────────────────────────────────
// function InfoRow({ icon: Icon, label, value }) {
//   if (!value) return null;
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 12,
//         padding: "12px 0",
//         borderBottom: "1px solid rgba(92,255,103,0.06)",
//       }}
//     >
//       <div
//         style={{
//           width: 32,
//           height: 32,
//           borderRadius: 8,
//           flexShrink: 0,
//           background: "rgba(92,255,103,0.08)",
//           color: "#5CFF67",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Icon size={15} />
//       </div>
//       <div>
//         <p
//           style={{
//             fontSize: 10,
//             fontFamily: "monospace",
//             color: "rgba(254,253,250,0.3)",
//             textTransform: "uppercase",
//             letterSpacing: 1,
//             marginBottom: 2,
//           }}
//         >
//           {label}
//         </p>
//         <p style={{ fontSize: 13, color: "#FEFDFA", fontWeight: 500 }}>
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Section ────────────────────────────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div
//       style={{
//         background: "#1A2421",
//         border: "1px solid rgba(92,255,103,0.1)",
//         borderRadius: 16,
//         padding: "20px 24px",
//         marginBottom: 16,
//       }}
//     >
//       <p
//         style={{
//           fontSize: 11,
//           fontWeight: 600,
//           textTransform: "uppercase",
//           letterSpacing: 1.5,
//           color: "rgba(254,253,250,0.3)",
//           fontFamily: "monospace",
//           marginBottom: 4,
//         }}
//       >
//         {title}
//       </p>
//       {children}
//     </div>
//   );
// }

// // ── ApproveRejectBtn ───────────────────────────────────────────────────────────
// function ApproveRejectBtn({ currentStatus, onAction, loading }) {
//   const btnBase = {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 4,
//     padding: "2px 9px",
//     borderRadius: 20,
//     cursor: loading ? "not-allowed" : "pointer",
//     fontSize: 10,
//     fontFamily: "monospace",
//     fontWeight: 600,
//     border: "none",
//     opacity: loading ? 0.5 : 1,
//     transition: "opacity 0.2s",
//   };

//   if (currentStatus === 1) {
//     return (
//       <button
//         style={{
//           ...btnBase,
//           background: "rgba(255,80,80,0.12)",
//           color: "#FF6B6B",
//           border: "1px solid rgba(255,80,80,0.25)",
//         }}
//         onClick={() => onAction(2)}
//         disabled={loading}
//         title="Reject"
//       >
//         <X size={10} /> Reject
//       </button>
//     );
//   }

//   if (currentStatus === 2) {
//     return (
//       <button
//         style={{
//           ...btnBase,
//           background: "rgba(92,255,103,0.1)",
//           color: "#5CFF67",
//           border: "1px solid rgba(92,255,103,0.25)",
//         }}
//         onClick={() => onAction(1)}
//         disabled={loading}
//         title="Approve"
//       >
//         <Check size={10} /> Approve
//       </button>
//     );
//   }

//   return (
//     <div style={{ display: "flex", gap: 4 }}>
//       <button
//         style={{
//           ...btnBase,
//           background: "rgba(92,255,103,0.1)",
//           color: "#5CFF67",
//           border: "1px solid rgba(92,255,103,0.25)",
//         }}
//         onClick={() => onAction(1)}
//         disabled={loading}
//         title="Approve"
//       >
//         <Check size={10} /> Approve
//       </button>
//       <button
//         style={{
//           ...btnBase,
//           background: "rgba(255,80,80,0.12)",
//           color: "#FF6B6B",
//           border: "1px solid rgba(255,80,80,0.25)",
//         }}
//         onClick={() => onAction(2)}
//         disabled={loading}
//         title="Reject"
//       >
//         <X size={10} /> Reject
//       </button>
//     </div>
//   );
// }

// // ── DocBadge ───────────────────────────────────────────────────────────────────
// function DocBadge({
//   label,
//   url,
//   fieldKey,
//   statusVal,
//   onAction,
//   actionLoading,
// }) {
//   const exists = !!url;
//   const statusBg =
//     statusVal === 1
//       ? "rgba(92,255,103,0.06)"
//       : statusVal === 2
//         ? "rgba(255,80,80,0.06)"
//         : "rgba(255,255,255,0.03)";
//   const statusBorder =
//     statusVal === 1
//       ? "1px solid rgba(92,255,103,0.15)"
//       : statusVal === 2
//         ? "1px solid rgba(255,80,80,0.15)"
//         : "1px solid rgba(255,255,255,0.06)";

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         padding: "10px 14px",
//         borderRadius: 10,
//         background: exists ? statusBg : "rgba(255,255,255,0.03)",
//         border: exists ? statusBorder : "1px solid rgba(255,255,255,0.06)",
//         flexWrap: "wrap",
//       }}
//     >
//       <FileText
//         size={14}
//         color={
//           exists
//             ? statusVal === 1
//               ? "#5CFF67"
//               : statusVal === 2
//                 ? "#FF6B6B"
//                 : "#B7F66E"
//             : "rgba(254,253,250,0.2)"
//         }
//       />
//       <span
//         style={{
//           fontSize: 12,
//           color: exists ? "#FEFDFA" : "rgba(254,253,250,0.3)",
//           flex: 1,
//           minWidth: 80,
//         }}
//       >
//         {label}
//       </span>
//       {fieldKey && (
//         <a
//           href={ASSET_BASE_URL + url}
//           target="_blank"
//           rel="noreferrer"
//           style={{
//             fontSize: 10,
//             fontFamily: "monospace",
//             color: "#5CFF67",
//             background: "rgba(92,255,103,0.1)",
//             padding: "2px 8px",
//             borderRadius: 20,
//             textDecoration: "none",
//             border: "1px solid rgba(92,255,103,0.2)",
//           }}
//         >
//           View
//         </a>
//       ) : (
//         <span
//           style={{
//             fontSize: 10,
//             fontFamily: "monospace",
//             color: "rgba(254,253,250,0.2)",
//           }}
//         >
//           Not uploaded
//         </span>
//       )}
//       {exists && fieldKey && (
//         <ApproveRejectBtn
//           currentStatus={statusVal ?? 0}
//           onAction={(newStatus) => onAction(fieldKey, newStatus)}
//           loading={actionLoading}
//         />
//       )}
//     </div>
//   );
// }

// // ── Toast ──────────────────────────────────────────────────────────────────────
// function Toast({ msg, type }) {
//   if (!msg) return null;
//   const color = type === "error" ? "#FF6B6B" : "#5CFF67";
//   const border =
//     type === "error"
//       ? "1px solid rgba(255,80,80,0.3)"
//       : "1px solid rgba(92,255,103,0.3)";
//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: 24,
//         right: 24,
//         zIndex: 9999,
//         background: "#1A2421",
//         border,
//         borderRadius: 12,
//         padding: "12px 20px",
//         color,
//         fontSize: 13,
//         fontFamily: "monospace",
//         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//         animation: "fadeIn 0.25s ease",
//       }}
//     >
//       {msg}
//       <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
//     </div>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function VendorDetailPage() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [docStatus, setDocStatus] = useState({});
//   const [kycStatus, setKycStatus] = useState(0);
//   const [busyField, setBusyField] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [accountStatus, setAccountStatus] = useState(0);
//   const showToast = useCallback((msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   }, []);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}getuser.php`)
//       .then((r) => r.json())
//       .then((data) => {
//         const all = data.data || data || [];
//         const found = all.find((item) => item.partner?.user_id === userId);
//         if (found) {
//           const p = found.partner;
//           setCustomer(found);
//           setKycStatus(p.kycstatus ?? 0);
//           setDocStatus({
//             shoppic_status: p.shoppic_status ?? 0,
//             kycidproof_status: p.kycidproof_status ?? 0,
//             businesslicense_status: p.businesslicense_status ?? 0,
//             insurancedetails_status: p.insurancedetails_status ?? 0,
//           });
//           setAccountStatus(p.accountstatus ?? 1); // 1=active default
//         }
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [userId]);

//   const handleDocAction = useCallback(
//     async (fieldKey, newStatus) => {
//       const actionText = newStatus === 1 ? "approve" : "reject";
//       const confirmed = window.confirm(
//         `Are you sure you want to ${actionText} this document?`,
//       );
//       if (!confirmed) return;
//       setBusyField(fieldKey);
//       try {
//         const res = await updateKycField(
//           customer.partner.user_id,
//           fieldKey,
//           newStatus,
//         );
//         if (res.status === "success" || res.success) {
//           setDocStatus((prev) => ({ ...prev, [fieldKey]: newStatus }));
//           showToast(
//             `${fieldKey.replace("_status", "").replace(/_/g, " ")} ${newStatus === 1 ? "approved ✓" : "rejected ✗"}`,
//           );
//         } else {
//           showToast(res.message || "Update failed", "error");
//         }
//       } catch {
//         showToast("Network error", "error");
//       } finally {
//         setBusyField(null);
//       }
//     },
//     [customer, showToast],
//   );

//   const handleKycAction = useCallback(
//     async (newStatus) => {
//       const actionText = newStatus === 1 ? "approve" : "reject";
//       const confirmed = window.confirm(
//         `Are you sure you want to ${actionText} overall KYC?`,
//       );
//       if (!confirmed) return;
//       setBusyField("kycstatus");
//       try {
//         const res = await updateKycField(
//           customer.partner.user_id,
//           "kycstatus",
//           newStatus,
//         );
//         if (res.status === "success" || res.success) {
//           setKycStatus(newStatus);
//           showToast(`KYC ${newStatus === 1 ? "approved ✓" : "rejected ✗"}`);
//         } else {
//           showToast(res.message || "Update failed", "error");
//         }
//       } catch {
//         showToast("Network error", "error");
//       } finally {
//         setBusyField(null);
//       }
//     },
//     [customer, showToast],
//   );
//   const handleAccountToggle = useCallback(async () => {
//     const newStatus = accountStatus === 1 ? 0 : 1;
//     const actionText = newStatus === 1 ? "activate" : "deactivate";
//     const confirmed = window.confirm(
//       `Are you sure you want to ${actionText} this vendor?`,
//     );
//     if (!confirmed) return;
//     setBusyField("accountstatus");
//     try {
//       const body = new URLSearchParams();
//       body.append("user_id", customer.partner.user_id);
//       body.append("accountstatus", newStatus);
//       // const res = await fetch(KYC_API, { method: "POST", body });
//       const res = await fetch(ACCOUNT_STATUS_API, {
//   method: "POST",
//   body,
// });
//       const json = await res.json();
//       if (json.status === "success" || json.success) {
//         setAccountStatus(newStatus);
//         showToast(
//           `Vendor ${newStatus === 1 ? "activated ✓" : "deactivated ✗"}`,
//         );
//       } else {
//         showToast(json.message || "Update failed", "error");
//       }
//     } catch {
//       showToast("Network error", "error");
//     } finally {
//       setBusyField(null);
//     }
//   }, [accountStatus, customer, showToast]);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: "#021616",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <div
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               border: "3px solid rgba(92,255,103,0.15)",
//               borderTop: "3px solid #5CFF67",
//               animation: "spin 0.8s linear infinite",
//             }}
//           />
//           <p
//             style={{
//               color: "rgba(254,253,250,0.4)",
//               fontFamily: "monospace",
//               fontSize: 12,
//             }}
//           >
//             Loading profile...
//           </p>
//         </div>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: "#021616",
//           flexDirection: "column",
//           gap: 12,
//         }}
//       >
//         <p style={{ color: "rgba(254,253,250,0.4)", fontFamily: "monospace" }}>
//           Customer not found.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             background: "rgba(92,255,103,0.1)",
//             color: "#5CFF67",
//             border: "1px solid rgba(92,255,103,0.2)",
//             borderRadius: 10,
//             padding: "8px 18px",
//             cursor: "pointer",
//             fontSize: 13,
//           }}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const p = customer.partner;

//   const kycDocs = [
//     {
//       label: "KYC ID Proof",
//       url: p.kycidproof,
//       fieldKey: "kycidproof_status",
//       statusVal: docStatus.kycidproof_status,
//     },
//     {
//       label: "Business License",
//       url: p.businesslicense,
//       fieldKey: "businesslicense_status",
//       statusVal: docStatus.businesslicense_status,
//     },
//     {
//       label: "Insurance Details",
//       url: p.insurancedetails,
//       fieldKey: "insurancedetails_status",
//       statusVal: docStatus.insurancedetails_status,
//     },
//     {
//       label: "Shop Photo",
//       url: p.shoppic,
//       fieldKey: "shoppic_status",
//       statusVal: docStatus.shoppic_status,
//     },
//     {
//       label: "Profile Photo",
//       url: p.profilepic,
//       fieldKey: null,
//       statusVal: null,
//     },
//     { label: "Cover Photo", url: p.cover_pic, fieldKey: null, statusVal: null },
//   ];

//   const kycVerified = kycStatus === 1;
//   const kycRejected = kycStatus === 2;

//   return (
//     <div
//       style={{
//         background: "#021616",
//         minHeight: "100vh",
//         padding: "28px 32px",
//       }}
//     >
//       <Toast msg={toast?.msg} type={toast?.type} onClose={() => { clearTimeout(toastTimerRef.current); setToast(null); }} />

//       {/* Back Button */}
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
//         <ArrowLeft size={15} /> Back to Customers
//       </button>

//       {/* ── Profile Hero ── */}
//       <div
//         style={{
//           background: "#1A2421",
//           border: "1px solid rgba(92,255,103,0.12)",
//           borderRadius: 20,
//           padding: "28px 28px 24px",
//           marginBottom: 16,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* top accent */}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: 2,
//             background: "linear-gradient(90deg, #5CFF67, #9EFD38, transparent)",
//           }}
//         />

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 20,
//             flexWrap: "wrap",
//           }}
//         >
//           {p.profilepic ? (
//             <img
//               src={ASSET_BASE_URL + p.profilepic}
//               alt={p.fullname}
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 border: "2.5px solid rgba(92,255,103,0.3)",
//               }}
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//           ) : (
//             <Avatar name={p.fullname} size={80} />
//           )}

//           <div style={{ flex: 1, minWidth: 200 }}>
//             <h1
//               style={{
//                 fontSize: 24,
//                 fontWeight: 800,
//                 color: "#FEFDFA",
//                 letterSpacing: "-0.5px",
//                 marginBottom: 6,
//               }}
//             >
//               {p.fullname}
//             </h1>
//             <p
//               style={{
//                 fontSize: 12,
//                 color: "rgba(254,253,250,0.4)",
//                 fontFamily: "monospace",
//                 marginBottom: 10,
//               }}
//             >
//               @{p.username} · ID: {p.user_id?.slice(0, 12)}...
//             </p>

//             {/* Chips row + See Jobs button */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: 8,
//                 flexWrap: "wrap",
//                 alignItems: "center",
//               }}
//             >
//               <Chip type="customer" />
//               <Chip
//                 type={
//                   kycVerified
//                     ? "verified"
//                     : kycRejected
//                       ? "rejected"
//                       : "pending"
//                 }
//               />
//               <Chip
//                 type={
//                   customer.subscription_status === "paid" ? "paid" : "unpaid"
//                 }
//               />

//               {/* ── See Jobs Button ── */}
//               <button
//                 onClick={() => navigate(`/vendor-bid-history/${p.user_id}`)}
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 6,
//                   padding: "4px 14px",
//                   borderRadius: 20,
//                   cursor: "pointer",
//                   fontSize: 11,
//                   fontFamily: "monospace",
//                   fontWeight: 600,
//                   background: "rgba(92,223,223,0.1)",
//                   color: "#5CDFDF",
//                   border: "1px solid rgba(92,223,223,0.25)",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(92,223,223,0.18)";
//                   e.currentTarget.style.borderColor = "rgba(92,223,223,0.5)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(92,223,223,0.1)";
//                   e.currentTarget.style.borderColor = "rgba(92,223,223,0.25)";
//                 }}
//               >
//                 <Briefcase size={11} /> See Jobs
//               </button>
//               <button
//                 onClick={() => navigate(`/vendor-subscription/${p.user_id}`)}
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 6,
//                   padding: "4px 14px",
//                   borderRadius: 20,
//                   cursor: "pointer",
//                   fontSize: 11,
//                   fontFamily: "monospace",
//                   fontWeight: 600,
//                   background: "rgba(92,223,223,0.1)",
//                   color: "#5CDFDF",
//                   border: "1px solid rgba(92,223,223,0.25)",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(92,223,223,0.18)";
//                   e.currentTarget.style.borderColor = "rgba(92,223,223,0.5)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(92,223,223,0.1)";
//                   e.currentTarget.style.borderColor = "rgba(92,223,223,0.25)";
//                 }}
//               >
//                 {/* {customer.subscription_status === "paid" ? "✓ Paid" : "Unpaid"} */}
//                 Vendor Subscriptions
//               </button>
//             </div>
//           </div>

//           {/* KYC status card + Approve/Reject */}
//           {/* <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 8,
//               background: kycVerified
//                 ? "rgba(92,255,103,0.08)"
//                 : kycRejected
//                   ? "rgba(255,80,80,0.08)"
//                   : "rgba(183,246,110,0.06)",
//               border: kycVerified
//                 ? "1px solid rgba(92,255,103,0.2)"
//                 : kycRejected
//                   ? "1px solid rgba(255,80,80,0.2)"
//                   : "1px solid rgba(183,246,110,0.15)",
//               borderRadius: 14,
//               padding: "16px 24px",
//             }}
//           >
//             {kycVerified ? (
//               <ShieldCheck size={28} color="#5CFF67" />
//             ) : kycRejected ? (
//               <ShieldOff size={28} color="#FF6B6B" />
//             ) : (
//               <ShieldOff size={28} color="#B7F66E" />
//             )}
//             <p
//               style={{
//                 fontSize: 11,
//                 fontFamily: "monospace",
//                 fontWeight: 600,
//                 color: kycVerified
//                   ? "#5CFF67"
//                   : kycRejected
//                     ? "#FF6B6B"
//                     : "#B7F66E",
//               }}
//             >
//               {kycVerified
//                 ? "KYC Done"
//                 : kycRejected
//                   ? "KYC Rejected"
//                   : "KYC Pending"}
//             </p>
//             <ApproveRejectBtn
//               currentStatus={kycStatus}
//               onAction={handleKycAction}
//               loading={busyField === "kycstatus"}
//             />
//           </div> */}
//           {/* ── Account Status Card ── */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 8,
//               background:
//                 accountStatus === 1
//                   ? "rgba(92,255,103,0.08)"
//                   : "rgba(255,80,80,0.08)",
//               border:
//                 accountStatus === 1
//                   ? "1px solid rgba(92,255,103,0.2)"
//                   : "1px solid rgba(255,80,80,0.2)",
//               borderRadius: 14,
//               padding: "16px 24px",
//               minWidth: 130,
//             }}
//           >
//             <div
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: "50%",
//                 background:
//                   accountStatus === 1
//                     ? "rgba(92,255,103,0.15)"
//                     : "rgba(255,80,80,0.15)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {accountStatus === 1 ? (
//                 <ShieldCheck size={24} color="#5CFF67" />
//               ) : (
//                 <ShieldOff size={24} color="#FF6B6B" />
//               )}
//             </div>
//             <p
//               style={{
//                 fontSize: 11,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 color: accountStatus === 1 ? "#5CFF67" : "#FF6B6B",
//                 textTransform: "uppercase",
//                 letterSpacing: 0.8,
//               }}
//             >
//               {accountStatus === 1 ? "Active" : "Inactive"}
//             </p>
//             <p
//               style={{
//                 fontSize: 9,
//                 fontFamily: "monospace",
//                 color: "rgba(254,253,250,0.3)",
//                 textAlign: "center",
//               }}
//             >
//               Account Status
//             </p>
//             <button
//               onClick={handleAccountToggle}
//               disabled={busyField === "accountstatus"}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 5,
//                 padding: "5px 14px",
//                 borderRadius: 20,
//                 cursor:
//                   busyField === "accountstatus" ? "not-allowed" : "pointer",
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 border: "none",
//                 opacity: busyField === "accountstatus" ? 0.5 : 1,
//                 background:
//                   accountStatus === 1
//                     ? "rgba(255,80,80,0.15)"
//                     : "rgba(92,255,103,0.15)",
//                 color: accountStatus === 1 ? "#FF6B6B" : "#5CFF67",
//                 border:
//                   accountStatus === 1
//                     ? "1px solid rgba(255,80,80,0.3)"
//                     : "1px solid rgba(92,255,103,0.3)",
//                 transition: "all 0.2s",
//               }}
//             >
//               {busyField === "accountstatus"
//                 ? "Updating..."
//                 : accountStatus === 1
//                   ? "Deactivate"
//                   : "Activate"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── 2 col grid ── */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         {/* LEFT */}
//         <div>
//           <Section title="Personal Info">
//             <InfoRow icon={Mail} label="Email" value={p.email} />
//             <InfoRow icon={Phone} label="Phone" value={p.phone_number} />
//             <InfoRow
//               icon={Calendar}
//               label="Date of Birth"
//               value={p.dateofbirth}
//             />
//             <InfoRow icon={User} label="Username" value={p.username} />
//             <InfoRow icon={Hash} label="User ID" value={p.user_id} />
//           </Section>

//           <Section title="Business Info">
//             <InfoRow
//               icon={Building2}
//               label="Business Name"
//               value={p.businessname}
//             />
//             <InfoRow
//               icon={MapPin}
//               label="Business Address"
//               value={p.bussinessaddress}
//             />
//             <InfoRow icon={MapPin} label="City" value={p.city} />
//             <InfoRow icon={MapPin} label="State" value={p.state} />
//             <InfoRow icon={Hash} label="Pincode" value={p.pincode} />
//             <InfoRow
//               icon={Hash}
//               label="Flat / Building"
//               value={p.flat_buildingno}
//             />
//           </Section>
//         </div>

//         {/* RIGHT */}
//         <div>
//           <Section title="KYC & Documents">
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 8,
//                 marginTop: 8,
//               }}
//             >
//               {kycDocs.map((d) => (
//                 <DocBadge
//                   key={d.label}
//                   label={d.label}
//                   url={d.url}
//                   fieldKey={d.fieldKey}
//                   statusVal={d.statusVal}
//                   onAction={handleDocAction}
//                   actionLoading={busyField === d.fieldKey}
//                 />
//               ))}
//             </div>

//             {/* Doc verification status grid */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 8,
//                 marginTop: 16,
//               }}
//             >
//               {[
//                 {
//                   label: "Shop Pic",
//                   fieldKey: "shoppic_status",
//                   file: p.shoppic,
//                 },
//                 {
//                   label: "KYC ID",
//                   fieldKey: "kycidproof_status",
//                   file: p.kycidproof,
//                 },
//                 {
//                   label: "Biz License",
//                   fieldKey: "businesslicense_status",
//                   file: p.businesslicense,
//                 },
//                 {
//                   label: "Insurance",
//                   fieldKey: "insurancedetails_status",
//                   file: p.insurancedetails,
//                 },
//               ]
//                 .filter((d) => d.file) // only show uploaded docs
//                 .map((d) => {
//                   const val = docStatus[d.fieldKey] ?? 0;
//                   return (
//                     <div
//                       key={d.label}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 8,
//                         background:
//                           val === 1
//                             ? "rgba(92,255,103,0.08)"
//                             : val === 2
//                               ? "rgba(255,80,80,0.08)"
//                               : "rgba(255,255,255,0.03)",
//                         border:
//                           val === 1
//                             ? "1px solid rgba(92,255,103,0.15)"
//                             : val === 2
//                               ? "1px solid rgba(255,80,80,0.15)"
//                               : "1px solid rgba(255,255,255,0.05)",
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 6,
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontSize: 11,
//                             color: "rgba(254,253,250,0.5)",
//                           }}
//                         >
//                           {d.label}
//                         </span>
//                         <span
//                           style={{
//                             fontSize: 10,
//                             fontFamily: "monospace",
//                             fontWeight: 600,
//                             color:
//                               val === 1
//                                 ? "#5CFF67"
//                                 : val === 2
//                                   ? "#FF6B6B"
//                                   : "#B7F66E",
//                           }}
//                         >
//                           {val === 1
//                             ? "✓ Approved"
//                             : val === 2
//                               ? "✗ Rejected"
//                               : "Pending"}
//                         </span>
//                       </div>
//                       <ApproveRejectBtn
//                         currentStatus={val}
//                         onAction={(newStatus) =>
//                           handleDocAction(d.fieldKey, newStatus)
//                         }
//                         loading={busyField === d.fieldKey}
//                       />
//                     </div>
//                   );
//                 })}
//             </div>
//           </Section>

//           <Section title="Identity Numbers">
//             <InfoRow icon={Hash} label="PAN Number" value={p.pan_number} />
//             <InfoRow icon={Hash} label="GST Number" value={p.gst_number} />
//             <InfoRow
//               icon={Hash}
//               label="Aadhar Number"
//               value={p.aadhar_number}
//             />
//           </Section>

//           <Section title="Account Info">
//             <InfoRow
//               icon={Calendar}
//               label="Created On"
//               value={new Date(p.create_date).toLocaleString("en-IN")}
//             />
//             <InfoRow
//               icon={Calendar}
//               label="Updated On"
//               value={new Date(p.update_date).toLocaleString("en-IN")}
//             />
//             <InfoRow icon={User} label="About" value={p.about_us} />
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// }


// tehme: dark;

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ShieldCheck,
  ShieldOff,
  User,
  Hash,
  FileText,
  Briefcase,
  Check,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // adjust path as needed

// ── helpers ────────────────────────────────────────────────────────────────────
const ASSET_BASE_URL = "https://pineapplebyele.com/";
const KYC_API = `${API_BASE_URL}kycstatus.php`;
const ACCOUNT_STATUS_API =
  `${API_BASE_URL}accountstatus.php`;

async function updateKycField(userId, field, status) {
  const body = new URLSearchParams();
  body.append("user_id", userId);
  body.append(field, status);
  const res = await fetch(KYC_API, { method: "POST", body });
  return res.json();
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 80 }) {
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
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors.avatarBg,
        color: colors.avatarColor,
        border: `2.5px solid ${colors.borderAvatar}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 3,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── Chip ───────────────────────────────────────────────────────────────────────
function Chip({ type }) {
  const { colors } = useTheme();
  const map = {
    verified: {
      bg: colors.chipVerifiedBg,
      color: colors.chipVerifiedColor,
      border: colors.chipVerifiedBorder,
      label: "✓ KYC Verified",
    },
    pending: {
      bg: colors.chipPendingBg,
      color: colors.chipPendingColor,
      border: colors.chipPendingBorder,
      label: "⏳ KYC Pending",
    },
    rejected: {
      bg: colors.chipRejectedBg,
      color: colors.chipRejectedColor,
      border: colors.chipRejectedBorder,
      label: "✗ KYC Rejected",
    },
    paid: {
      bg: colors.chipPaidBg,
      color: colors.chipPaidColor,
      border: colors.chipPaidBorder,
      label: "✓ Paid",
    },
    unpaid: {
      bg: colors.chipUnpaidBg,
      color: colors.chipUnpaidColor,
      border: colors.chipUnpaidBorder,
      label: "Unpaid",
    },
    customer: {
      bg: colors.chipVerifiedBg,
      color: colors.chipVerifiedColor,
      border: colors.chipVerifiedBorder,
      label: "Customer",
    },
  };
  const s = map[type] || map.pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "monospace",
        background: s.bg,
        color: s.color,
        border: s.border,
      }}
    >
      {s.label}
    </span>
  );
}

// ── InfoRow ────────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value }) {
  const { colors } = useTheme();
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 0",
        borderBottom: `1px solid ${colors.borderFaint}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          flexShrink: 0,
          background: colors.accentIconBg,
          color: colors.accentPrimary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={15} />
      </div>
      <div>
        <p
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 500 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
function Section({ title, children }) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: colors.textMuted,
          fontFamily: "monospace",
          marginBottom: 4,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

// ── ApproveRejectBtn ───────────────────────────────────────────────────────────
function ApproveRejectBtn({ currentStatus, onAction, loading, loadingStatus }) {
  const { colors } = useTheme();
  const buttonStyle = (status) => {
    const approved = status === 1;
    const selected = currentStatus === status;
    const background = approved ? colors.chipVerifiedBg : colors.chipRejectedBg;
    const foreground = approved ? colors.chipVerifiedColor : colors.chipRejectedColor;
    const border = approved ? colors.chipVerifiedBorder : colors.chipRejectedBorder;
    return {
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
      minHeight: 36, minWidth: 106, padding: "7px 12px", borderRadius: 10,
      cursor: loading || selected ? "default" : "pointer", fontSize: 12, fontWeight: 700,
      fontFamily: "inherit", background: selected ? background : "transparent",
      color: foreground, border: selected ? border : `1px solid ${colors.borderInput}`,
      opacity: loading && loadingStatus !== status ? 0.55 : 1,
      transition: "background 160ms ease, border-color 160ms ease, transform 160ms ease",
      whiteSpace: "nowrap",
    };
  };
  return (
    <div role="group" aria-label="Review document" style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}>
      <button type="button" aria-pressed={currentStatus === 1} disabled={loading || currentStatus === 1} onClick={() => onAction(1)} style={buttonStyle(1)}>
        <CheckCircle2 size={15} />
        {loading && loadingStatus === 1 ? "Saving…" : currentStatus === 1 ? "Approved" : "Approve"}
      </button>
      <button type="button" aria-pressed={currentStatus === 2} disabled={loading || currentStatus === 2} onClick={() => onAction(2)} style={buttonStyle(2)}>
        <XCircle size={15} />
        {loading && loadingStatus === 2 ? "Saving…" : currentStatus === 2 ? "Rejected" : "Reject"}
      </button>
    </div>
  );
}
// ── DocBadge ───────────────────────────────────────────────────────────────────
function DocBadge({ label, url, fieldKey, statusVal, onAction, actionLoading, actionLoadingStatus }) {
  const { colors } = useTheme();
  const exists = !!url;

  const statusBg =
    statusVal === 1
      ? colors.chipVerifiedBg
      : statusVal === 2
        ? colors.chipRejectedBg
        : colors.userCardBg;

  const statusBorder =
    statusVal === 1
      ? colors.chipVerifiedBorder
      : statusVal === 2
        ? colors.chipRejectedBorder
        : `1px solid ${colors.borderFaint}`;

  const iconColor = exists
    ? statusVal === 1
      ? colors.chipVerifiedColor
      : statusVal === 2
        ? colors.chipRejectedColor
        : colors.accentSecondary
    : colors.textFaint;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 10,
        background: exists ? statusBg : colors.userCardBg,
        border: exists ? statusBorder : `1px solid ${colors.borderFaint}`,
        flexWrap: "wrap",
      }}
    >
      <FileText size={14} color={iconColor} />
      <span
        style={{
          fontSize: 12,
          color: exists ? colors.textPrimary : colors.textFaint,
          flex: 1,
          minWidth: 80,
        }}
      >
        {label}
      </span>
      {fieldKey && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 9px", borderRadius: 999,
          color: statusVal === 1 ? colors.chipVerifiedColor : statusVal === 2 ? colors.chipRejectedColor : colors.chipPendingColor,
          background: statusVal === 1 ? colors.chipVerifiedBg : statusVal === 2 ? colors.chipRejectedBg : colors.chipPendingBg,
          border: statusVal === 1 ? colors.chipVerifiedBorder : statusVal === 2 ? colors.chipRejectedBorder : colors.chipPendingBorder,
          fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
        }}>
          {statusVal === 1 ? "Approved" : statusVal === 2 ? "Rejected" : exists ? "Pending review" : "Not submitted"}
        </span>
      )}
      {exists ? (
        <a
          href={ASSET_BASE_URL + url}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: colors.accentPrimary,
            background: colors.accentIconBg,
            padding: "2px 8px",
            borderRadius: 20,
            textDecoration: "none",
            border: `1px solid ${colors.borderHover}`,
          }}
        >
          View
        </a>
      ) : (
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: colors.textFaint,
          }}
        >
          Not uploaded
        </span>
      )}
      {exists && fieldKey && (
        <ApproveRejectBtn
          currentStatus={statusVal ?? 0}
          onAction={(newStatus) => onAction(fieldKey, newStatus)}
          loading={actionLoading}
          loadingStatus={actionLoadingStatus}
        />
      )}
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  const { colors } = useTheme();
  if (!msg) return null;
  const isError = type === "error";
  const ToastIcon = isError ? XCircle : CheckCircle2;
  const foreground = isError ? colors.chipRejectedColor : colors.chipVerifiedColor;
  const border = isError ? colors.chipRejectedBorder : colors.chipVerifiedBorder;
  const background = isError ? colors.chipRejectedBg : colors.chipVerifiedBg;
  return (
    <div role={isError ? "alert" : "status"} aria-live={isError ? "assertive" : "polite"} style={{
      position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", alignItems: "flex-start", gap: 12,
      width: "min(380px, calc(100vw - 40px))", boxSizing: "border-box", padding: "15px 14px", overflow: "hidden",
      color: colors.textPrimary, background: colors.cardBg, border: `1px solid ${border}`, borderRadius: 16,
      boxShadow: "0 18px 48px rgba(0,0,0,0.22)", backdropFilter: "blur(16px)",
      animation: "vendorToastIn 220ms cubic-bezier(.2,.8,.2,1) both",
    }}>
      <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, flexShrink: 0, color: foreground, background, borderRadius: 11 }}>
        <ToastIcon size={19} />
      </span>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
        <p style={{ margin: "0 0 3px", color: foreground, fontSize: 13, fontWeight: 750 }}>
          {isError ? "Couldn’t complete action" : "Changes saved"}
        </p>
        <p style={{ margin: 0, color: colors.textSecondary, fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" }}>{msg}</p>
      </div>
      <button type="button" aria-label="Dismiss notification" onClick={onClose} style={{
        display: "grid", placeItems: "center", width: 28, height: 28, flexShrink: 0, padding: 0,
        color: colors.textMuted, background: "transparent", border: 0, borderRadius: 8, cursor: "pointer",
      }}>
        <X size={16} />
      </button>
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: foreground, transformOrigin: "left", animation: "vendorToastProgress 3.6s linear forwards" }} />
      <style>{`@keyframes vendorToastIn { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } } @keyframes vendorToastProgress { to { transform: scaleX(0); } }`}</style>
    </div>
  );
}
// ── Main Component ─────────────────────────────────────────────────────────────
export default function VendorDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docStatus, setDocStatus] = useState({});
  const [kycStatus, setKycStatus] = useState(0);
  const [busyField, setBusyField] = useState(null);
  const [toast, setToast] = useState(null);
  const [busyStatus, setBusyStatus] = useState(null);
  const toastTimerRef = useRef(null);
  const [accountStatus, setAccountStatus] = useState(0);

  const showToast = useCallback((msg, type = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 3600);
  }, []);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    fetch(`${API_BASE_URL}getuser.php`)
      .then((r) => r.json())
      .then((data) => {
        const all = data.data || data || [];
        const found = all.find((item) => item.partner?.user_id === userId);
        if (found) {
          const p = found.partner;
          setCustomer(found);
          setKycStatus(p.kycstatus ?? 0);
          setDocStatus({
            shoppic_status: p.shoppic_status ?? 0,
            kycidproof_status: p.kycidproof_status ?? 0,
            businesslicense_status: p.businesslicense_status ?? 0,
            insurancedetails_status: p.insurancedetails_status ?? 0,
          });
          setAccountStatus(p.accountstatus ?? 1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDocAction = useCallback(
    async (fieldKey, newStatus) => {
      const action = newStatus === 1 ? "approve" : "reject";
      const documentName = fieldKey.replace("_status", "").replace(/_/g, " ");
      if (!window.confirm(`Are you sure you want to ${action} ${documentName}?`)) return;
      setBusyField(fieldKey);
      setBusyStatus(newStatus);
      try {
        const res = await updateKycField(
          customer.partner.user_id,
          fieldKey,
          newStatus,
        );
        if (res.status === "success" || res.success) {
          setDocStatus((prev) => ({ ...prev, [fieldKey]: newStatus }));
          showToast(
            `${fieldKey.replace("_status", "").replace(/_/g, " ")} ${newStatus === 1 ? "approved ✓" : "rejected ✗"}`,
          );
        } else {
          showToast(res.message || "Update failed", "error");
        }
      } catch {
        showToast("Network error", "error");
      } finally {
        setBusyField(null);
        setBusyStatus(null);
      }
    },
    [customer, showToast],
  );

  const handleKycAction = useCallback(
    async (newStatus) => {
      const action = newStatus === 1 ? "approve" : "reject";
      if (!window.confirm(`Are you sure you want to ${action} overall KYC?`)) return;
      setBusyField("kycstatus");
      setBusyStatus(newStatus);
      try {
        const res = await updateKycField(
          customer.partner.user_id,
          "kycstatus",
          newStatus,
        );
        if (res.status === "success" || res.success) {
          setKycStatus(newStatus);
          showToast(`KYC ${newStatus === 1 ? "approved ✓" : "rejected ✗"}`);
        } else {
          showToast(res.message || "Update failed", "error");
        }
      } catch {
        showToast("Network error", "error");
      } finally {
        setBusyField(null);
        setBusyStatus(null);
      }
    },
    [customer, showToast],
  );

  const handleAccountToggle = useCallback(async () => {
    const newStatus = accountStatus === 1 ? 0 : 1;
    const actionText = newStatus === 1 ? "activate" : "deactivate";
    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} this vendor?`,
    );
    if (!confirmed) return;
    setBusyField("accountstatus");
    try {
      const body = new URLSearchParams();
      body.append("user_id", customer.partner.user_id);
      body.append("accountstatus", newStatus);
      const res = await fetch(ACCOUNT_STATUS_API, { method: "POST", body });
      const json = await res.json();
      if (json.status === "success" || json.success) {
        setAccountStatus(newStatus);
        showToast(
          `Vendor ${newStatus === 1 ? "activated ✓" : "deactivated ✗"}`,
        );
      } else {
        showToast(json.message || "Update failed", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setBusyField(null);
    }
  }, [accountStatus, customer, showToast]);

  // ── Loading State ──
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: colors.pageBg,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `3px solid ${colors.accentSkeletonBg2}`,
              borderTop: `3px solid ${colors.accentPrimary}`,
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p
            style={{
              color: colors.textMuted,
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            Loading profile...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Not Found State ──
  if (!customer) {
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
        }}
      >
        <p style={{ color: colors.textMuted, fontFamily: "monospace" }}>
          Customer not found.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: colors.accentIconBg,
            color: colors.accentPrimary,
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: 10,
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const p = customer.partner;

  const kycDocs = [
    {
      label: "KYC ID Proof",
      url: p.kycidproof,
      fieldKey: "kycidproof_status",
      statusVal: docStatus.kycidproof_status,
    },
    {
      label: "Business License",
      url: p.businesslicense,
      fieldKey: "businesslicense_status",
      statusVal: docStatus.businesslicense_status,
    },
    {
      label: "Insurance Details",
      url: p.insurancedetails,
      fieldKey: "insurancedetails_status",
      statusVal: docStatus.insurancedetails_status,
    },
    {
      label: "Shop Photo",
      url: p.shoppic,
      fieldKey: "shoppic_status",
      statusVal: docStatus.shoppic_status,
    },
    {
      label: "Profile Photo",
      url: p.profilepic,
      fieldKey: null,
      statusVal: null,
    },
    { label: "Cover Photo", url: p.cover_pic, fieldKey: null, statusVal: null },
  ];

  const kycVerified = kycStatus === 1;
  const kycRejected = kycStatus === 2;

  // Teal chip colors (used for action buttons) — derived from paid chip
  const tealBg = colors.chipPaidBg;
  const tealColor = colors.chipPaidColor;
  const tealBorder = colors.chipPaidBorder;

  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
      }}
    >
      <Toast msg={toast?.msg} type={toast?.type} onClose={() => { clearTimeout(toastTimerRef.current); setToast(null); }} />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: colors.accentIconBg,
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
        <ArrowLeft size={15} /> Back to Customers
      </button>

      {/* ── Profile Hero ── */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 20,
          padding: "28px 28px 24px",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* top accent */}
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
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {p.profilepic ? (
            <img
              src={ASSET_BASE_URL + p.profilepic}
              alt={p.fullname}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2.5px solid ${colors.borderAvatar}`,
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <Avatar name={p.fullname} size={80} />
          )}

          <div style={{ flex: 1, minWidth: 200 }}>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: colors.textPrimary,
                letterSpacing: "-0.5px",
                marginBottom: 6,
              }}
            >
              {p.fullname}
            </h1>
            <p
              style={{
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "monospace",
                marginBottom: 10,
              }}
            >
              @{p.username} · ID: {p.user_id?.slice(0, 12)}...
            </p>

            {/* Chips row + action buttons */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Chip type="customer" />
              <Chip
                type={
                  kycVerified ? "verified" : kycRejected ? "rejected" : "pending"
                }
              />
              <Chip
                type={
                  customer.subscription_status === "paid" ? "paid" : "unpaid"
                }
              />

              {/* See Jobs Button */}
              <button
                onClick={() => navigate(`/vendor-bid-history/${p.user_id}`)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 14px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 600,
                  background: tealBg,
                  color: tealColor,
                  border: tealBorder,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <Briefcase size={11} /> See Jobs
              </button>

              {/* Vendor Subscriptions Button */}
              <button
                onClick={() => navigate(`/vendor-subscription/${p.user_id}`)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 14px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 600,
                  background: tealBg,
                  color: tealColor,
                  border: tealBorder,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Vendor Subscriptions
              </button>
            </div>
          </div>

          {/* ── Account Status Card ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              background:
                accountStatus === 1
                  ? colors.chipVerifiedBg
                  : colors.chipRejectedBg,
              border:
                accountStatus === 1
                  ? colors.chipVerifiedBorder
                  : colors.chipRejectedBorder,
              borderRadius: 14,
              padding: "16px 24px",
              minWidth: 130,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background:
                  accountStatus === 1
                    ? colors.chipVerifiedBg
                    : colors.chipRejectedBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {accountStatus === 1 ? (
                <ShieldCheck size={24} color={colors.chipVerifiedColor} />
              ) : (
                <ShieldOff size={24} color={colors.chipRejectedColor} />
              )}
            </div>
            <p
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: 700,
                color:
                  accountStatus === 1
                    ? colors.chipVerifiedColor
                    : colors.chipRejectedColor,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              {accountStatus === 1 ? "Active" : "Inactive"}
            </p>
            <p
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: colors.textMuted,
                textAlign: "center",
              }}
            >
              Account Status
            </p>
            <button
              onClick={handleAccountToggle}
              disabled={busyField === "accountstatus"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 14px",
                borderRadius: 20,
                cursor:
                  busyField === "accountstatus" ? "not-allowed" : "pointer",
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                opacity: busyField === "accountstatus" ? 0.5 : 1,
                background:
                  accountStatus === 1
                    ? colors.chipRejectedBg
                    : colors.chipVerifiedBg,
                color:
                  accountStatus === 1
                    ? colors.chipRejectedColor
                    : colors.chipVerifiedColor,
                border:
                  accountStatus === 1
                    ? colors.chipRejectedBorder
                    : colors.chipVerifiedBorder,
                transition: "all 0.2s",
              }}
            >
              {busyField === "accountstatus"
                ? "Updating..."
                : accountStatus === 1
                  ? "Deactivate"
                  : "Activate"}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2 col grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* LEFT */}
        <div>
          <Section title="Personal Info">
            <InfoRow icon={Mail} label="Email" value={p.email} />
            <InfoRow icon={Phone} label="Phone" value={p.phone_number} />
            <InfoRow icon={Calendar} label="Date of Birth" value={p.dateofbirth} />
            <InfoRow icon={User} label="Username" value={p.username} />
            <InfoRow icon={Hash} label="User ID" value={p.user_id} />
          </Section>

          <Section title="Business Info">
            <InfoRow icon={Building2} label="Business Name" value={p.businessname} />
            <InfoRow icon={MapPin} label="Business Address" value={p.bussinessaddress} />
            <InfoRow icon={MapPin} label="City" value={p.city} />
            <InfoRow icon={MapPin} label="State" value={p.state} />
            <InfoRow icon={Hash} label="Pincode" value={p.pincode} />
            <InfoRow icon={Hash} label="Flat / Building" value={p.flat_buildingno} />
          </Section>
        </div>

        {/* RIGHT */}
        <div>
          <Section title="KYC & Documents">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 8,
              }}
            >
              {kycDocs.map((d) => (
                <DocBadge
                  key={d.label}
                  label={d.label}
                  url={d.url}
                  fieldKey={d.fieldKey}
                  statusVal={d.statusVal}
                  onAction={handleDocAction}
                  actionLoading={busyField === d.fieldKey}
                  actionLoadingStatus={busyField === d.fieldKey ? busyStatus : null}
                />
              ))}
            </div>

          </Section>

          <Section title="Identity Numbers">
            <InfoRow icon={Hash} label="PAN Number" value={p.pan_number} />
            <InfoRow icon={Hash} label="GST Number" value={p.gst_number} />
            <InfoRow icon={Hash} label="Aadhar Number" value={p.aadhar_number} />
          </Section>

          <Section title="Account Info">
            <InfoRow
              icon={Calendar}
              label="Created On"
              value={new Date(p.create_date).toLocaleString("en-IN")}
            />
            <InfoRow
              icon={Calendar}
              label="Updated On"
              value={new Date(p.update_date).toLocaleString("en-IN")}
            />
            <InfoRow icon={User} label="About" value={p.about_us} />
          </Section>
        </div>
      </div>
    </div>
  );
}
import { BASE_URL as API_BASE_URL, BASE_URL2 } from "../api/config";
// // src/Screens/CustomerDetailsScreen.jsx

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Building2,
//   User,
//   Hash,
//   Briefcase,
//   Gavel,
//   ChevronRight,
// } from "lucide-react";

// // ── Constants ──────────────────────────────────────────────────────────────────
// const ASSET_BASE_URL = "https://pineapplebyele.com/";
// const USERS_API = `${API_BASE_URL}getuser.php`;

// // ── Cache: avoid re-fetching users list on every visit ────────────────────────
// let _usersCache = null;
// let _usersCacheTime = 0;
// const CACHE_TTL = 60_000; // 1 minute

// async function fetchUsers() {
//   const now = Date.now();
//   if (_usersCache && now - _usersCacheTime < CACHE_TTL) return _usersCache;
//   const res = await fetch(USERS_API);
//   const data = await res.json();
//   _usersCache = data.data || data || [];
//   _usersCacheTime = now;
//   return _usersCache;
// }

// // ── Avatar ─────────────────────────────────────────────────────────────────────
// function Avatar({ name, size = 80 }) {
//   const initials = name
//     ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
//     : "??";
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: "#3C5B30", color: "#5CFF67",
//       border: "2.5px solid rgba(92,255,103,0.3)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size / 3, fontWeight: 700, flexShrink: 0,
//     }}>
//       {initials}
//     </div>
//   );
// }

// // ── Chip ───────────────────────────────────────────────────────────────────────
// function Chip({ type }) {
//   const map = {
//     paid:     { bg: "rgba(28,88,88,0.35)",  color: "#5CDFDF",               border: "1px solid rgba(92,223,223,0.2)",  label: "✓ Paid" },
//     unpaid:   { bg: "rgba(60,90,46,0.25)",  color: "rgba(254,253,250,0.4)", border: "1px solid rgba(94,255,103,0.08)", label: "Unpaid" },
//     customer: { bg: "rgba(92,255,103,0.1)", color: "#5CFF67",               border: "1px solid rgba(92,255,103,0.2)",  label: "Customer" },
//   };
//   const s = map[type] || map.customer;
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center",
//       padding: "4px 12px", borderRadius: 20,
//       fontSize: 11, fontWeight: 600, fontFamily: "monospace",
//       background: s.bg, color: s.color, border: s.border,
//     }}>
//       {s.label}
//     </span>
//   );
// }

// // ── InfoRow ────────────────────────────────────────────────────────────────────
// function InfoRow({ icon: Icon, label, value }) {
//   if (!value) return null;
//   return (
//     <div style={{
//       display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0",
//       borderBottom: "1px solid rgba(92,255,103,0.06)",
//     }}>
//       <div style={{
//         width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//         background: "rgba(92,255,103,0.08)", color: "#5CFF67",
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <Icon size={15} />
//       </div>
//       <div>
//         <p style={{
//           fontSize: 10, fontFamily: "monospace", color: "rgba(254,253,250,0.3)",
//           textTransform: "uppercase", letterSpacing: 1, marginBottom: 2,
//         }}>{label}</p>
//         <p style={{ fontSize: 13, color: "#FEFDFA", fontWeight: 500 }}>{value}</p>
//       </div>
//     </div>
//   );
// }

// // ── Section ────────────────────────────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div style={{
//       background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)",
//       borderRadius: 16, padding: "20px 24px", marginBottom: 16,
//     }}>
//       <p style={{
//         fontSize: 11, fontWeight: 600, textTransform: "uppercase",
//         letterSpacing: 1.5, color: "rgba(254,253,250,0.3)",
//         fontFamily: "monospace", marginBottom: 4,
//       }}>{title}</p>
//       {children}
//     </div>
//   );
// }

// // ── Skeleton ───────────────────────────────────────────────────────────────────
// function Skeleton({ width = "100%", height = 20, radius = 6, style = {} }) {
//   return (
//     <div style={{
//       width, height, borderRadius: radius,
//       background: "rgba(255,255,255,0.06)",
//       animation: "skPulse 1.4s ease-in-out infinite",
//       ...style,
//     }} />
//   );
// }

// // ── StatCard ───────────────────────────────────────────────────────────────────
// function StatCard({ icon: Icon, label, value, accent, loading, onClick, clickable }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onClick={clickable && !loading ? onClick : undefined}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         flex: 1,
//         background: `rgba(${accent},0.06)`,
//         border: `1px solid rgba(${accent},${hovered && clickable ? "0.35" : "0.18"})`,
//         borderRadius: 14,
//         padding: "18px 20px",
//         display: "flex",
//         flexDirection: "column",
//         gap: 10,
//         position: "relative",
//         overflow: "hidden",
//         cursor: clickable && !loading ? "pointer" : "default",
//         transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
//         transform: hovered && clickable && !loading ? "translateY(-2px)" : "none",
//         boxShadow: hovered && clickable && !loading
//           ? `0 8px 24px rgba(${accent},0.12)`
//           : "none",
//       }}
//     >
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: 2,
//         background: `linear-gradient(90deg, rgba(${accent},0.7), transparent)`,
//       }} />

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <div style={{
//           width: 36, height: 36, borderRadius: 10,
//           background: `rgba(${accent},0.12)`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//         }}>
//           <Icon size={17} color={`rgb(${accent})`} />
//         </div>
//         {clickable && (
//           <div style={{
//             display: "flex", alignItems: "center", gap: 4,
//             fontSize: 10, fontFamily: "monospace", fontWeight: 600,
//             color: `rgba(${accent},0.6)`,
//             opacity: hovered ? 1 : 0.4,
//             transition: "opacity 0.2s",
//           }}>
//             View All <ChevronRight size={12} />
//           </div>
//         )}
//       </div>

//       <div>
//         <p style={{
//           fontSize: 10, fontFamily: "monospace", fontWeight: 600,
//           textTransform: "uppercase", letterSpacing: 1.2,
//           color: "rgba(254,253,250,0.35)", marginBottom: 4,
//         }}>{label}</p>

//         {loading ? (
//           <Skeleton width={50} height={28} radius={6} />
//         ) : (
//           <p style={{
//             fontSize: 28, fontWeight: 800, color: "#FEFDFA",
//             letterSpacing: "-1px", lineHeight: 1,
//           }}>
//             {value ?? "—"}
//           </p>
//         )}
//       </div>

//       <style>{`
//         @keyframes skPulse {
//           0%, 100% { opacity: 0.4; }
//           50%       { opacity: 0.8; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ── ProfileSkeleton ────────────────────────────────────────────────────────────
// function ProfileSkeleton() {
//   return (
//     <div style={{ background: "#021616", minHeight: "100vh", padding: "28px 32px" }}>
//       <Skeleton width={140} height={36} radius={10} style={{ marginBottom: 24 }} />
//       <div style={{
//         background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)",
//         borderRadius: 20, padding: "28px", marginBottom: 16,
//       }}>
//         <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
//           <Skeleton width={80} height={80} radius={40} />
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
//             <Skeleton width="40%" height={24} />
//             <Skeleton width="30%" height={14} />
//             <div style={{ display: "flex", gap: 8 }}>
//               <Skeleton width={80} height={24} radius={20} />
//               <Skeleton width={80} height={24} radius={20} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{
//         background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)",
//         borderRadius: 16, padding: "20px 24px", marginBottom: 16,
//         display: "flex", gap: 14,
//       }}>
//         <Skeleton height={100} radius={14} style={{ flex: 1 }} />
//         <Skeleton height={100} radius={14} style={{ flex: 1 }} />
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <Skeleton height={240} radius={16} />
//         <Skeleton height={240} radius={16} />
//       </div>
//       <style>{`@keyframes skPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }`}</style>
//     </div>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function CustomerDetailsScreen() {
//   const { userId } = useParams();
//   const navigate   = useNavigate();

//   const [customer,     setCustomer]     = useState(null);
//   const [loading,      setLoading]      = useState(true);
//   const [jobCount,     setJobCount]     = useState(null);
//   const [bidCount,     setBidCount]     = useState(null);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const abortRef = useRef(null);

//   useEffect(() => {
//     // Abort previous requests if userId changes
//     if (abortRef.current) abortRef.current.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;
//     const sig = controller.signal;

//     setLoading(true);
//     setStatsLoading(true);
//     setCustomer(null);
//     setJobCount(null);
//     setBidCount(null);

//     // Fire all 3 requests in parallel
//     const profilePromise = fetchUsers().then((all) =>
//       all.find((item) => item.partner?.user_id === userId) ?? null
//     );

//     const jobsPromise = fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocationsByUser/${userId}`, { signal: sig })
//       .then((r) => r.json())
//       .then((d) => {
//         const jobs = Array.isArray(d) ? d : (d.data ?? d.locations ?? []);
//         return Array.isArray(jobs) ? jobs.length : (d.count ?? 0);
//       })
//       .catch(() => null);

//     const bidsPromise = fetch(`${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${userId}`, { signal: sig })
//       .then((r) => r.json())
//       .then((d) => d.totalBids ?? d.count ?? (Array.isArray(d.bids) ? d.bids.length : 0))
//       .catch(() => null);

//     // Profile resolves first — show it as soon as possible
//     profilePromise
//       .then((found) => { if (!sig.aborted) setCustomer(found); })
//       .catch(() => {})
//       .finally(() => { if (!sig.aborted) setLoading(false); });

//     // Stats resolve independently
//     Promise.allSettled([jobsPromise, bidsPromise]).then(([jr, br]) => {
//       if (sig.aborted) return;
//       if (jr.status === "fulfilled") setJobCount(jr.value);
//       if (br.status === "fulfilled") setBidCount(br.value);
//       setStatsLoading(false);
//     });

//     return () => controller.abort();
//   }, [userId]);

//   if (loading) return <ProfileSkeleton />;

//   if (!customer) {
//     return (
//       <div style={{
//         display: "flex", alignItems: "center", justifyContent: "center",
//         height: "100vh", background: "#021616", flexDirection: "column", gap: 12,
//       }}>
//         <p style={{ color: "rgba(254,253,250,0.4)", fontFamily: "monospace" }}>Customer not found.</p>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             background: "rgba(92,255,103,0.1)", color: "#5CFF67",
//             border: "1px solid rgba(92,255,103,0.2)", borderRadius: 10,
//             padding: "8px 18px", cursor: "pointer", fontSize: 13,
//           }}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const p = customer.partner;

//   return (
//     <div style={{ background: "#021616", minHeight: "100vh", padding: "28px 32px" }}>

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         style={{
//           display: "inline-flex", alignItems: "center", gap: 8,
//           background: "rgba(92,255,103,0.06)", color: "rgba(254,253,250,0.7)",
//           border: "1px solid rgba(92,255,103,0.12)", borderRadius: 10,
//           padding: "8px 16px", cursor: "pointer", fontSize: 13,
//           marginBottom: 24, fontWeight: 500, transition: "color 0.2s, border-color 0.2s",
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
//       <div style={{
//         background: "#1A2421", border: "1px solid rgba(92,255,103,0.12)",
//         borderRadius: 20, padding: "28px 28px 24px", marginBottom: 16,
//         position: "relative", overflow: "hidden",
//       }}>
//         <div style={{
//           position: "absolute", top: 0, left: 0, right: 0, height: 2,
//           background: "linear-gradient(90deg, #5CFF67, #9EFD38, transparent)",
//         }} />

//         <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
//           {p.profilepic ? (
//             <img
//               src={ASSET_BASE_URL + p.profilepic}
//               alt={p.fullname}
//               loading="lazy"
//               style={{
//                 width: 80, height: 80, borderRadius: "50%",
//                 objectFit: "cover", border: "2.5px solid rgba(92,255,103,0.3)",
//               }}
//               onError={(e) => { e.target.replaceWith(Object.assign(document.createElement("div"))); }}
//             />
//           ) : (
//             <Avatar name={p.fullname} size={80} />
//           )}

//           <div style={{ flex: 1, minWidth: 200 }}>
//             <h1 style={{
//               fontSize: 24, fontWeight: 800, color: "#FEFDFA",
//               letterSpacing: "-0.5px", marginBottom: 6,
//             }}>
//               {p.fullname}
//             </h1>
//             <p style={{
//               fontSize: 12, color: "rgba(254,253,250,0.4)",
//               fontFamily: "monospace", marginBottom: 10,
//             }}>
//               @{p.username} · ID: {p.user_id?.slice(0, 12)}...
//             </p>
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               <Chip type="customer" />
//               <Chip type={customer.subscription_status === "paid" ? "paid" : "unpaid"} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Activity Overview ── */}
//       <div style={{
//         background: "#1A2421", border: "1px solid rgba(92,255,103,0.1)",
//         borderRadius: 16, padding: "20px 24px", marginBottom: 16,
//       }}>
//         <p style={{
//           fontSize: 11, fontWeight: 600, textTransform: "uppercase",
//           letterSpacing: 1.5, color: "rgba(254,253,250,0.3)",
//           fontFamily: "monospace", marginBottom: 14,
//         }}>Activity Overview</p>

//         <div style={{ display: "flex", gap: 14 }}>
//           <StatCard
//             icon={Briefcase}
//             label="Total Jobs"
//             value={jobCount}
//             accent="92,255,103"
//             loading={statsLoading}
//             clickable
//             onClick={() => navigate(`/customers/${userId}/jobs`)}
//           />
//           <StatCard
//             icon={Gavel}
//             label="Total Bids"
//             value={bidCount}
//             accent="92,223,223"
//             loading={statsLoading}
//             clickable={false}
//           />
//         </div>
//       </div>

//       {/* ── 2 col grid ── */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

//         {/* LEFT */}
//         <div>
//           <Section title="Personal Info">
//             <InfoRow icon={Mail}     label="Email"         value={p.email} />
//             <InfoRow icon={Phone}    label="Phone"         value={p.phone_number} />
//             <InfoRow icon={Calendar} label="Date of Birth" value={p.dateofbirth} />
//             <InfoRow icon={User}     label="Username"      value={p.username} />
//             <InfoRow icon={Hash}     label="User ID"       value={p.user_id} />
//           </Section>

//           <Section title="Business Info">
//             <InfoRow icon={Building2} label="Business Name"    value={p.businessname} />
//             <InfoRow icon={MapPin}    label="Business Address" value={p.bussinessaddress} />
//             <InfoRow icon={MapPin}    label="City"             value={p.city} />
//             <InfoRow icon={MapPin}    label="State"            value={p.state} />
//             <InfoRow icon={Hash}      label="Pincode"          value={p.pincode} />
//             <InfoRow icon={Hash}      label="Flat / Building"  value={p.flat_buildingno} />
//           </Section>
//         </div>

//         {/* RIGHT */}
//         <div>
//           <Section title="Identity Numbers">
//             <InfoRow icon={Hash} label="PAN Number"    value={p.pan_number} />
//             <InfoRow icon={Hash} label="GST Number"    value={p.gst_number} />
//             <InfoRow icon={Hash} label="Aadhar Number" value={p.aadhar_number} />
//           </Section>

//           <Section title="Account Info">
//             <InfoRow icon={Calendar} label="Created On" value={new Date(p.create_date).toLocaleString("en-IN")} />
//             <InfoRow icon={Calendar} label="Updated On" value={new Date(p.update_date).toLocaleString("en-IN")} />
//             <InfoRow icon={User}     label="About"      value={p.about_us} />
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// }

// use theam
// src/Screens/CustomerDetailsScreen.jsx

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  User,
  Hash,
  Briefcase,
  Gavel,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ── Constants ──────────────────────────────────────────────────────────────────
const ASSET_BASE_URL = "https://pineapplebyele.com/";
const USERS_API = `${API_BASE_URL}getuser.php`;

// ── Cache ──────────────────────────────────────────────────────────────────────
let _usersCache = null;
let _usersCacheTime = 0;
const CACHE_TTL = 60_000;

async function fetchUsers() {
  const now = Date.now();
  if (_usersCache && now - _usersCacheTime < CACHE_TTL) return _usersCache;
  const res = await fetch(USERS_API);
  const data = await res.json();
  _usersCache = data.data || data || [];
  _usersCacheTime = now;
  return _usersCache;
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
  const s = map[type] || map.customer;
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

// ── StatCard ───────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  accentRgb,
  loading,
  onClick,
  clickable,
}) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={clickable && !loading ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        background: `rgba(${accentRgb},0.06)`,
        border: `1px solid rgba(${accentRgb},${hovered && clickable ? "0.35" : "0.18"})`,
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
        cursor: clickable && !loading ? "pointer" : "default",
        transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
        transform:
          hovered && clickable && !loading ? "translateY(-2px)" : "none",
        boxShadow:
          hovered && clickable && !loading
            ? `0 8px 24px rgba(${accentRgb},0.12)`
            : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, rgba(${accentRgb},0.7), transparent)`,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `rgba(${accentRgb},0.12)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={17} color={`rgb(${accentRgb})`} />
        </div>
        {clickable && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 600,
              color: `rgba(${accentRgb},0.6)`,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.2s",
            }}
          >
            View All <ChevronRight size={12} />
          </div>
        )}
      </div>

      <div>
        <p
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: colors.textMuted,
            marginBottom: 4,
          }}
        >
          {label}
        </p>

        {loading ? (
          <Skeleton width={50} height={28} radius={6} />
        ) : (
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.textPrimary,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            {value ?? "—"}
          </p>
        )}
      </div>

      <style>{`
        @keyframes skPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// ── ProfileSkeleton ────────────────────────────────────────────────────────────
function ProfileSkeleton() {
  const { colors } = useTheme();
  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
      }}
    >
      <Skeleton
        width={140}
        height={36}
        radius={10}
        style={{ marginBottom: 24 }}
      />
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 20,
          padding: "28px",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Skeleton width={80} height={80} radius={40} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Skeleton width="40%" height={24} />
            <Skeleton width="30%" height={14} />
            <div style={{ display: "flex", gap: 8 }}>
              <Skeleton width={80} height={24} radius={20} />
              <Skeleton width={80} height={24} radius={20} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 16,
          display: "flex",
          gap: 14,
        }}
      >
        <Skeleton height={100} radius={14} style={{ flex: 1 }} />
        <Skeleton height={100} radius={14} style={{ flex: 1 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Skeleton height={240} radius={16} />
        <Skeleton height={240} radius={16} />
      </div>
      <style>{`@keyframes skPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }`}</style>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CustomerDetailsScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobCount, setJobCount] = useState(null);
  const [bidCount, setBidCount] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const abortRef = useRef(null);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const sig = controller.signal;

    setLoading(true);
    setStatsLoading(true);
    setCustomer(null);
    setJobCount(null);
    setBidCount(null);

    const profilePromise = fetchUsers().then(
      (all) => all.find((item) => item.partner?.user_id === userId) ?? null,
    );

    const jobsPromise = fetch(`${BASE_URL2.replace(/\/$/, "")}/getLocationsByUser/${userId}`, {
      signal: sig,
    })
      .then((r) => r.json())
      .then((d) => {
        const jobs = Array.isArray(d) ? d : (d.data ?? d.locations ?? []);
        return Array.isArray(jobs) ? jobs.length : (d.count ?? 0);
      })
      .catch(() => null);

    const bidsPromise = fetch(
      `${BASE_URL2.replace(/\/$/, "")}/getBidsByRecipient?recipientId=${userId}`,
      { signal: sig },
    )
      .then((r) => r.json())
      .then(
        (d) =>
          d.totalBids ?? d.count ?? (Array.isArray(d.bids) ? d.bids.length : 0),
      )
      .catch(() => null);

    profilePromise
      .then((found) => {
        if (!sig.aborted) setCustomer(found);
      })
      .catch(() => {})
      .finally(() => {
        if (!sig.aborted) setLoading(false);
      });

    Promise.allSettled([jobsPromise, bidsPromise]).then(([jr, br]) => {
      if (sig.aborted) return;
      if (jr.status === "fulfilled") setJobCount(jr.value);
      if (br.status === "fulfilled") setBidCount(br.value);
      setStatsLoading(false);
    });

    return () => controller.abort();
  }, [userId]);

  if (loading) return <ProfileSkeleton />;

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
            border: `1px solid ${colors.borderInput}`,
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

  return (
    <div
      style={{
        background: colors.pageBg,
        minHeight: "100vh",
        padding: "28px 32px",
      }}
    >
      {/* Back Button */}
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
          transition: "color 0.2s, border-color 0.2s",
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
              loading="lazy"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2.5px solid ${colors.borderAvatar}`,
              }}
              onError={(e) => {
                e.target.replaceWith(
                  Object.assign(document.createElement("div")),
                );
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Chip type="customer" />
              <Chip
                type={
                  customer.subscription_status === "paid" ? "paid" : "unpaid"
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Activity Overview ── */}
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
            marginBottom: 14,
          }}
        >
          Activity Overview
        </p>

        <div style={{ display: "flex", gap: 14 }}>
          <StatCard
            icon={Briefcase}
            label="Total Jobs"
            value={jobCount}
            accentRgb="92,255,103"
            loading={statsLoading}
            clickable
            onClick={() => navigate(`/customers/${userId}/jobs`)}
          />
          <StatCard
            icon={Gavel}
            label="Total Bids"
            value={bidCount}
            accentRgb="92,223,223"
            loading={statsLoading}
            clickable={false}
          />
        </div>
      </div>

      {/* ── 2 col grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* LEFT */}
        <div>
          <Section title="Personal Info">
            <InfoRow icon={Mail} label="Email" value={p.email} />
            <InfoRow icon={Phone} label="Phone" value={p.phone_number} />
            <InfoRow
              icon={Calendar}
              label="Date of Birth"
              value={p.dateofbirth}
            />
            <InfoRow icon={User} label="Username" value={p.username} />
            <InfoRow icon={Hash} label="User ID" value={p.user_id} />
          </Section>

          <Section title="Business Info">
            <InfoRow
              icon={Building2}
              label="Business Name"
              value={p.businessname}
            />
            <InfoRow
              icon={MapPin}
              label="Business Address"
              value={p.bussinessaddress}
            />
            <InfoRow icon={MapPin} label="City" value={p.city} />
            <InfoRow icon={MapPin} label="State" value={p.state} />
            <InfoRow icon={Hash} label="Pincode" value={p.pincode} />
            <InfoRow
              icon={Hash}
              label="Flat / Building"
              value={p.flat_buildingno}
            />
          </Section>
        </div>

        {/* RIGHT */}
        <div>
          <Section title="Identity Numbers">
            <InfoRow icon={Hash} label="PAN Number" value={p.pan_number} />
            <InfoRow icon={Hash} label="GST Number" value={p.gst_number} />
            <InfoRow
              icon={Hash}
              label="Aadhar Number"
              value={p.aadhar_number}
            />
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
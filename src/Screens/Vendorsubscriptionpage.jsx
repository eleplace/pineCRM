

// src/Screens/VendorSubscriptionPage.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  RefreshCw,
  Zap,
  AlertCircle,
  ChevronRight,
  IndianRupee,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { BASE_URL2 } from "../api/config";

const SUB_API = `${BASE_URL2}getSubscriptionHistory`;

function fmtDate(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d)
    ? val
    : d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

function fmtDateTime(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d)
    ? val
    : d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function daysLeft(endDate) {
  if (!endDate) return null;
  return Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
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
function StatusPill({ active, colors }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 14px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "monospace",
        background: active ? colors.chipVerifiedBg : colors.chipRejectedBg,
        color: active ? colors.chipVerifiedColor : colors.chipRejectedColor,
        border: active ? colors.chipVerifiedBorder : colors.chipRejectedBorder,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          display: "inline-block",
          background: active
            ? colors.chipVerifiedColor
            : colors.chipRejectedColor,
        }}
      />
      {active ? "Active" : "Inactive"}
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
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}

// ── ExpiryBar ──────────────────────────────────────────────────────────────────
function ExpiryBar({ startDate, endDate, colors }) {
  if (!startDate || !endDate) return null;
  const total = new Date(endDate) - new Date(startDate);
  const elapsed = Date.now() - new Date(startDate);
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  const left = daysLeft(endDate);
  const expired = left !== null && left <= 0;
  const barColor = expired
    ? colors.chipRejectedColor
    : left <= 7
      ? "#F5C542"
      : colors.accentPrimary;

  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: colors.textFaint,
          }}
        >
          {fmtDate(startDate)} → {fmtDate(endDate)}
        </span>
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 700,
            color: barColor,
          }}
        >
          {expired ? "Expired" : `${left} day${left === 1 ? "" : "s"} left`}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 6,
          borderRadius: 99,
          background: colors.borderFaint,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg, ${barColor}, ${barColor}99)`,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── InfoRow ────────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, accent, colors }) {
  if (value === null || value === undefined || value === "") return null;
  const ic = accent || colors.accentPrimary;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 0",
        borderBottom: `1px solid ${colors.borderRow}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          flexShrink: 0,
          background: `${ic}14`,
          color: ic,
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
          {String(value)}
        </p>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
function Section({ title, children, colors }) {
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 16,
        transition: "background 0.3s",
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

// ── HistoryRow ─────────────────────────────────────────────────────────────────
function HistoryRow({ item, index, colors }) {
  const isActive = item?.useSubscriptionStatus === "Active";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 12,
        background: colors.inputBg,
        border: `1px solid ${colors.borderRow}`,
        animation: `slideUp 0.3s ease ${index * 50}ms both`,
      }}
    >
      {/* index bubble */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          flexShrink: 0,
          background: isActive ? colors.chipVerifiedBg : colors.userCardBg,
          color: isActive ? colors.chipVerifiedColor : colors.textMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "monospace",
          border: isActive
            ? colors.chipVerifiedBorder
            : `1px solid ${colors.borderFaint}`,
        }}
      >
        {index + 1}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary }}
          >
            {item.planLabel || "Plan"}
          </span>
          <StatusPill active={isActive} colors={colors} />
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
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
            <Calendar size={9} /> {fmtDate(item.activatedAt || item.createdAt)}{" "}
            → {fmtDate(item.expiryDate)}
          </span>
          {item.transactionId && (
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: colors.textVeryFaint,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Hash size={9} /> {item.transactionId}
            </span>
          )}
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
          Amount
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: isActive ? colors.accentPrimary : colors.textSecondary,
            letterSpacing: "-0.5px",
          }}
        >
          ₹{item.price || item.amount || "0"}
        </p>
      </div>

      <ChevronRight size={14} color={colors.textFaint} />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function VendorSubscriptionPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${SUB_API}/${userId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

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
            border: `3px solid ${colors.chipPendingBg}`,
            borderTop: `3px solid ${colors.accentSecondary}`,
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
          Loading subscription...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !data) {
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
        <p
          style={{
            color: colors.chipRejectedColor,
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          {!userId
       ? "Open a vendor profile to view their subscription history."
           : error || "No subscription data found."}
        </p>
        <button
          onClick={() => navigate(userId ? -1 : "/customersScreen")}
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
          {userId ? "← Go Back" : "Browse Vendors"}
        </button>
      </div>
    );
  }

  // ── Normalise response shape ────────────────────────────────────────────────
  const apiData = data?.data || {};
  const summary = apiData?.summary || {};
  const current = apiData?.currentActiveSubscription || {};
  const history = apiData?.history || [];
  const isActive = current?.useSubscriptionStatus === "Active";
  const hasActivePlan = current && Object.keys(current).length > 0;

  const planName = hasActivePlan
    ? current?.planType === "paid"
      ? `Paid Plan (${current?.months} months)`
      : "Free Plan"
    : null;
  const planPrice = history?.[0]?.amount || 0;
  const planType = current?.planType || "—";
  const startDate = current?.activatedAt || null;
  const endDate = current?.expiryDate || null;
  const txnId = current?.transactionId || null;
  const payMethod = "Online";
  const autoRenew = false;
  const left = daysLeft(endDate);
  const totalSpent = summary?.totalAmountSpent || 0;

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
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>

      {/* Top bar: back + theme toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <button
          onClick={() => navigate(userId ? -1 : "/customersScreen")}
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

      {/* ── Hero Card ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.accentSecondary}25`,
          borderRadius: 20,
          padding: "28px 28px 24px",
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
            background: `linear-gradient(90deg, ${colors.accentSecondary}, ${colors.accentPrimary}, transparent)`,
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
          {/* Plan icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              flexShrink: 0,
              background: colors.chipPendingBg,
              border: `1.5px solid ${colors.accentSecondary}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={32} color={colors.accentSecondary} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: colors.textPrimary,
                letterSpacing: "-0.5px",
                marginBottom: 4,
              }}
            >
              {planName}
            </h1>
            <p
              style={{
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "monospace",
                marginBottom: 10,
              }}
            >
              Vendor ID: {userId?.slice(0, 14)}...
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <StatusPill active={isActive} colors={colors} />

              {planPrice && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "monospace",
                    background: colors.chipPendingBg,
                    color: colors.accentSecondary,
                    border: `1px solid ${colors.accentSecondary}35`,
                  }}
                >
                  <CreditCard size={10} /> ₹{planPrice}
                  {planType ? ` / ${planType}` : ""}
                </span>
              )}

              {autoRenew !== null && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "monospace",
                    background: autoRenew
                      ? colors.chipVerifiedBg
                      : colors.userCardBg,
                    color: autoRenew
                      ? colors.chipVerifiedColor
                      : colors.textMuted,
                    border: autoRenew
                      ? colors.chipVerifiedBorder
                      : `1px solid ${colors.borderFaint}`,
                  }}
                >
                  <RefreshCw size={10} />{" "}
                  {autoRenew ? "Auto-renew ON" : "No auto-renew"}
                </span>
              )}
            </div>
          </div>

          {/* Expiry mini-card */}
          <div
            style={{
              background: isActive
                ? colors.chipPendingBg
                : colors.chipRejectedBg,
              border: isActive
                ? `1px solid ${colors.accentSecondary}35`
                : colors.chipRejectedBorder,
              borderRadius: 14,
              padding: "16px 22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            {isActive ? (
              <CheckCircle2 size={28} color={colors.accentSecondary} />
            ) : (
              <XCircle size={28} color={colors.chipRejectedColor} />
            )}
            <p
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: 600,
                color: isActive
                  ? colors.accentSecondary
                  : colors.chipRejectedColor,
              }}
            >
              {isActive ? "Subscribed" : "Not Active"}
            </p>
            {endDate && (
              <p
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: colors.textFaint,
                  textAlign: "center",
                }}
              >
                {left !== null && left > 0 ? `${left}d remaining` : "Expired"} ·{" "}
                {fmtDate(endDate)}
              </p>
            )}
          </div>
        </div>

        <ExpiryBar startDate={startDate} endDate={endDate} colors={colors} />
      </div>

      {/* ── Stat row ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
          animation: "fadeIn 0.4s ease 0.1s both",
        }}
      >
        <StatCard
          icon={Layers}
          label="Total Plans"
          value={history.length || 0}
          accent={colors.accentSecondary}
          colors={colors}
        />
        <StatCard
          icon={IndianRupee}
          label="Total Spent"
          value={totalSpent ? `₹${totalSpent}` : `₹${planPrice || 0}`}
          accent={colors.accentPrimary}
          colors={colors}
        />
        <StatCard
          icon={Clock}
          label="Days Left"
          value={left !== null ? (left > 0 ? left : "Expired") : "—"}
          accent={colors.chipPaidColor}
          colors={colors}
        />
        <StatCard
          icon={RefreshCw}
          label="Auto Renew"
          value={autoRenew !== null ? (autoRenew ? "Yes" : "No") : "—"}
          accent={colors.accentQuaternary}
          colors={colors}
        />
      </div>

      {/* ── 2-col grid ───────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          {hasActivePlan && (
            <Section title="Current Plan" colors={colors}>
              <InfoRow
                icon={Zap}
                label="Plan Name"
                value={planName}
                accent={colors.accentSecondary}
                colors={colors}
              />
              <InfoRow
                icon={CreditCard}
                label="Price"
                value={planPrice ? `₹${planPrice}` : null}
                accent={colors.accentSecondary}
                colors={colors}
              />
              <InfoRow
                icon={Layers}
                label="Billing Cycle"
                value={planType}
                colors={colors}
              />
              <InfoRow
                icon={RefreshCw}
                label="Auto Renew"
                value={autoRenew !== null ? (autoRenew ? "Yes" : "No") : null}
                colors={colors}
              />
            </Section>
          )}

          {hasActivePlan && (
            <Section title="Validity" colors={colors}>
              <InfoRow
                icon={Calendar}
                label="Start Date"
                value={fmtDateTime(startDate)}
                colors={colors}
              />
              <InfoRow
                icon={Calendar}
                label="Expiry Date"
                value={fmtDateTime(endDate)}
                colors={colors}
              />
              {left !== null && (
                <InfoRow
                  icon={Clock}
                  label="Days Remaining"
                  value={
                    left > 0 ? `${left} day${left === 1 ? "" : "s"}` : "Expired"
                  }
                  colors={colors}
                />
              )}
            </Section>
          )}
        </div>

        <div>
          <Section title="Payment Info" colors={colors}>
            <InfoRow
              icon={Hash}
              label="Transaction ID"
              value={txnId}
              colors={colors}
            />
            <InfoRow
              icon={CreditCard}
              label="Payment Method"
              value={payMethod}
              accent={colors.chipPaidColor}
              colors={colors}
            />
            <InfoRow
              icon={Hash}
              label="Order ID"
              value={current?.order_id}
              colors={colors}
            />
            <InfoRow
              icon={Hash}
              label="Invoice / Ref"
              value={current?.invoice_id ?? current?.ref_id}
              colors={colors}
            />
          </Section>

          {history.length > 1 && (
            <Section
              title={`Subscription History · ${history.length} plans`}
              colors={colors}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {history.map((item, i) => (
                  <HistoryRow
                    key={item._id || item.id || i}
                    item={item}
                    index={i}
                    colors={colors}
                  />
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
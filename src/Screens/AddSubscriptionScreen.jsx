import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Layers } from "lucide-react";
import { BASE_URL2 } from "../api/config";
import { useTheme } from "../context/ThemeContext";

const API_BASE = BASE_URL2.replace(/\/$/, "");
const inputStyle = (colors) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  color: colors.textPrimary,
  background: colors.inputBg,
  border: `1px solid ${colors.borderInput}`,
  borderRadius: 11,
  outline: "none",
  fontSize: 13,
});

function Field({ label, children, colors }) {
  return (
    <label style={{ display: "grid", gap: 8, color: colors.textSecondary, fontSize: 12, fontWeight: 650 }}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function AddSubscriptionScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [form, setForm] = useState({ label: "", duration: "", AdvancePayment: "", pricePerMonth: "", desc: "" });
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const loadPlans = async () => {
    setLoadingPlans(true);
    setPlansError("");
    try {
      const response = await fetch(`${API_BASE}/getAllPlans`);
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Subscription plans could not be loaded.");
      setPlans(Array.isArray(result.data) ? result.data : []);
    } catch (loadError) {
      setPlansError(loadError.message || "Subscription plans could not be loaded.");
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => { loadPlans(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const pricePerMonth = Number(form.pricePerMonth);
    const AdvancePayment = Number(form.AdvancePayment);
    if (!form.label.trim() || !form.duration.trim() || !form.desc.trim()) {
      setError("Fill in the plan name, duration, and description.");
      return;
    }
    if (!Number.isFinite(pricePerMonth) || pricePerMonth < 0 || !Number.isFinite(AdvancePayment) || AdvancePayment < 0) {
      setError("Enter valid non-negative price and advance amounts.");
      return;
    }

    const isFree = form.label.trim().toLowerCase().startsWith("free");
    const durationMonths = form.duration.trim().match(/^(\d+)\s*months?$/i);
    const payload = {
      icon: "Crown",
      planType: isFree ? "free" : "paid",
      label: form.label.trim(),
      duration: form.duration.trim(),
      months: durationMonths ? Number(durationMonths[1]) : null,
      pricePerMonth,
      desc: form.desc.trim(),
      features: [],
      tag: null,
      btnText: "Choose Plan",
      isFree,
      isActive: true,
      sortOrder: 0,
      AdvancePayment,
    };

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/createPlan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Plan could not be saved.");
      setNotice(result.message || "Plan created successfully.");
      setForm({ label: "", duration: "", AdvancePayment: "", pricePerMonth: "", desc: "" });
      await loadPlans();
    } catch (submitError) {
      setError(submitError.message || "Plan could not be saved.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "30px clamp(18px, 4vw, 48px)", background: colors.pageBg, color: colors.textPrimary }}>
      <button type="button" onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "9px 13px", borderRadius: 10, border: `1px solid ${colors.borderInput}`, background: colors.cardBg, color: colors.textSecondary, cursor: "pointer" }}>
        <ArrowLeft size={15} /> Back
      </button>

      <div style={{ maxWidth: 950, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 14, color: colors.accentPrimary, background: colors.accentIconBg }}><Layers size={23} /></div>
          <div>
            <p style={{ margin: "0 0 4px", color: colors.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>Plan management</p>
            <h1 style={{ margin: 0, color: colors.textPrimary, fontSize: 25, letterSpacing: "-0.6px" }}>Add Subscription Plan</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: colors.cardBg, border: `1px solid ${colors.borderSubtle}`, borderRadius: 18, padding: "clamp(18px, 3vw, 30px)", boxShadow: "0 18px 48px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
            <Field label="Plan name" colors={colors}>
              <input required maxLength={100} value={form.label} onChange={(event) => update("label", event.target.value)} placeholder="e.g. Free Plan or Pro" style={inputStyle(colors)} />
            </Field>
            <Field label="Duration" colors={colors}>
              <input required maxLength={80} value={form.duration} onChange={(event) => update("duration", event.target.value)} placeholder="e.g. 3 Months or Lifetime" style={inputStyle(colors)} />
            </Field>
            <Field label="Advance (₹)" colors={colors}>
              <input type="number" min="0" step="0.01" required value={form.AdvancePayment} onChange={(event) => update("AdvancePayment", event.target.value)} placeholder="0" style={inputStyle(colors)} />
            </Field>
            <Field label="Price (₹)" colors={colors}>
              <input type="number" min="0" step="0.01" required value={form.pricePerMonth} onChange={(event) => update("pricePerMonth", event.target.value)} placeholder="0" style={inputStyle(colors)} />
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Description" colors={colors}>
                <textarea required rows={4} maxLength={2000} value={form.desc} onChange={(event) => update("desc", event.target.value)} placeholder="Describe this subscription plan…" style={{ ...inputStyle(colors), resize: "vertical", lineHeight: 1.5 }} />
              </Field>
            </div>
          </div>

          {error && <div role="alert" style={{ marginTop: 18, padding: "11px 13px", borderRadius: 10, color: colors.chipRejectedColor, background: colors.chipRejectedBg, border: colors.chipRejectedBorder, fontSize: 12 }}>{error}</div>}
          {notice && <div role="status" style={{ marginTop: 18, padding: "11px 13px", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, color: colors.chipVerifiedColor, background: colors.chipVerifiedBg, border: colors.chipVerifiedBorder, fontSize: 12 }}><CheckCircle2 size={16} />{notice}</div>}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button type="submit" disabled={submitting} style={{ minWidth: 190, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 18px", borderRadius: 11, border: 0, color: colors.pageBg, background: colors.accentPrimary, fontSize: 13, fontWeight: 750, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.6 : 1 }}>
              {submitting ? "Saving plan…" : "Save subscription plan"}
            </button>
          </div>
        </form>

        <section style={{ marginTop: 26, background: colors.cardBg, border: `1px solid ${colors.borderSubtle}`, borderRadius: 18, padding: "clamp(18px, 3vw, 26px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0, color: colors.textPrimary, fontSize: 18 }}>Subscription plans</h2>
              <p style={{ margin: "5px 0 0", color: colors.textMuted, fontSize: 12 }}>Plans currently saved in the database</p>
            </div>
            <button type="button" onClick={loadPlans} disabled={loadingPlans} style={{ padding: "8px 12px", borderRadius: 9, border: `1px solid ${colors.borderInput}`, background: colors.cardBg, color: colors.textSecondary, cursor: loadingPlans ? "wait" : "pointer" }}>
              {loadingPlans ? "Loading…" : "Refresh"}
            </button>
          </div>
          {plansError && <div role="alert" style={{ marginBottom: 14, padding: "10px 12px", borderRadius: 10, color: colors.chipRejectedColor, background: colors.chipRejectedBg, border: colors.chipRejectedBorder, fontSize: 12 }}>{plansError}</div>}
          {loadingPlans && <p style={{ color: colors.textMuted, fontSize: 13 }}>Loading plans…</p>}
          {!loadingPlans && !plansError && plans.length === 0 && <p style={{ color: colors.textMuted, fontSize: 13 }}>No subscription plans found.</p>}
          {!loadingPlans && plans.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
            {plans.map((plan) => <article key={plan._id || `${plan.label}-${plan.sortOrder}`} style={{ padding: 15, borderRadius: 13, border: `1px solid ${colors.borderSubtle}`, background: colors.pageBg }}>
              <h3 style={{ margin: 0, color: colors.textPrimary, fontSize: 15 }}>{plan.label}</h3>
              <p style={{ margin: "7px 0 0", color: colors.textMuted, fontSize: 12 }}>{plan.duration}</p>
              <p style={{ margin: "12px 0 5px", color: colors.textPrimary, fontSize: 14, fontWeight: 700 }}>Price: ₹{Number(plan.pricePerMonth || 0).toLocaleString("en-IN")}</p>
              <p style={{ margin: 0, color: colors.textMuted, fontSize: 12 }}>Advance: ₹{Number(plan.AdvancePayment || 0).toLocaleString("en-IN")}</p>
              {plan.desc && <p style={{ margin: "10px 0 0", color: colors.textSecondary, fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{plan.desc}</p>}
            </article>)}
          </div>}
        </section>
      </div>
    </div>
  );
}

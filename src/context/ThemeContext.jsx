// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// ─── Color Palettes ───────────────────────────────────────────────────────────

const dark = {
  pageBg: "#021616",
  cardBg: "#1A2421",
  sidebarBg: "#021616",
  inputBg: "rgba(0,0,0,0.25)",
  rowHoverBg: "rgba(92,255,103,0.03)",
  avatarBg: "#3C5B30",
  userCardBg: "rgba(255,255,255,0.04)",

  borderSubtle: "rgba(92,255,103,0.1)",
  borderMid: "rgba(92,255,103,0.08)",
  borderFaint: "rgba(92,255,103,0.06)",
  borderHover: "rgba(92,255,103,0.28)",
  borderInput: "rgba(92,255,103,0.12)",
  borderRow: "rgba(92,255,103,0.05)",
  borderAvatar: "rgba(92,255,103,0.22)",
  borderActive: "1px solid rgba(92,255,103,0.22)",

  textPrimary: "#FEFDFA",
  textSecondary: "rgba(254,253,250,0.55)",
  textMuted: "rgba(254,253,250,0.4)",
  textFaint: "rgba(254,253,250,0.28)",
  textVeryFaint: "rgba(254,253,250,0.25)",
  textMono: "rgba(254,253,250,0.38)",
  textPhone: "rgba(254,253,250,0.65)",

  accentPrimary: "#5CFF67",
  accentSecondary: "#B7F66E",
  accentTertiary: "#C7FD98",
  accentQuaternary: "#9EFD38",
  accentIconBg: "rgba(92,255,103,0.1)",
  accentSkeletonBg: "rgba(92,255,103,0.05)",
  accentSkeletonBg2: "rgba(92,255,103,0.07)",
  accentNavActive: "rgba(92,255,103,0.12)",
  accentNavHover: "rgba(92,255,103,0.06)",
  accentBadgeBg: "rgba(92,255,103,0.15)",
  avatarColor: "#5CFF67",

  chipVerifiedBg: "rgba(92,255,103,0.12)",
  chipVerifiedColor: "#5CFF67",
  chipVerifiedBorder: "1px solid rgba(92,255,103,0.22)",
  chipPendingBg: "rgba(183,246,110,0.08)",
  chipPendingColor: "#B7F66E",
  chipPendingBorder: "1px solid rgba(183,246,110,0.18)",
  chipRejectedBg: "rgba(255,80,80,0.1)",
  chipRejectedColor: "#FF6B6B",
  chipRejectedBorder: "1px solid rgba(255,80,80,0.2)",
  chipPaidBg: "rgba(28,88,88,0.35)",
  chipPaidColor: "#5CDFDF",
  chipPaidBorder: "1px solid rgba(92,223,223,0.2)",
  chipUnpaidBg: "rgba(60,90,46,0.25)",
  chipUnpaidColor: "rgba(254,253,250,0.4)",
  chipUnpaidBorder: "1px solid rgba(94,255,103,0.08)",
};

const light = {
  pageBg: "#F0F7F4",
  cardBg: "#FFFFFF",
  sidebarBg: "#FFFFFF",
  inputBg: "rgba(0,0,0,0.04)",
  rowHoverBg: "rgba(2,70,50,0.03)",
  avatarBg: "#D4EDDA",
  userCardBg: "rgba(0,0,0,0.04)",

  borderSubtle: "rgba(2,70,50,0.12)",
  borderMid: "rgba(2,70,50,0.1)",
  borderFaint: "rgba(2,70,50,0.08)",
  borderHover: "rgba(2,70,50,0.35)",
  borderInput: "rgba(2,70,50,0.18)",
  borderRow: "rgba(2,70,50,0.07)",
  borderAvatar: "rgba(2,70,50,0.2)",
  borderActive: "1px solid rgba(2,70,50,0.25)",

  textPrimary: "#0A1F1A",
  textSecondary: "rgba(10,31,26,0.65)",
  textMuted: "rgba(10,31,26,0.5)",
  textFaint: "rgba(10,31,26,0.38)",
  textVeryFaint: "rgba(10,31,26,0.3)",
  textMono: "rgba(10,31,26,0.5)",
  textPhone: "rgba(10,31,26,0.7)",

  accentPrimary: "#0D7A4E",
  accentSecondary: "#1A9E62",
  accentTertiary: "#28B873",
  accentQuaternary: "#15A355",
  accentIconBg: "rgba(13,122,78,0.1)",
  accentSkeletonBg: "rgba(13,122,78,0.06)",
  accentSkeletonBg2: "rgba(13,122,78,0.08)",
  accentNavActive: "rgba(13,122,78,0.1)",
  accentNavHover: "rgba(13,122,78,0.06)",
  accentBadgeBg: "rgba(13,122,78,0.12)",
  avatarColor: "#0D7A4E",

  chipVerifiedBg: "rgba(13,122,78,0.1)",
  chipVerifiedColor: "#0D7A4E",
  chipVerifiedBorder: "1px solid rgba(13,122,78,0.2)",
  chipPendingBg: "rgba(180,120,0,0.08)",
  chipPendingColor: "#9A6800",
  chipPendingBorder: "1px solid rgba(180,120,0,0.18)",
  chipRejectedBg: "rgba(200,40,40,0.08)",
  chipRejectedColor: "#C42828",
  chipRejectedBorder: "1px solid rgba(200,40,40,0.18)",
  chipPaidBg: "rgba(0,100,130,0.08)",
  chipPaidColor: "#006882",
  chipPaidBorder: "1px solid rgba(0,100,130,0.18)",
  chipUnpaidBg: "rgba(100,100,100,0.08)",
  chipUnpaidColor: "rgba(10,31,26,0.45)",
  chipUnpaidBorder: "1px solid rgba(100,100,100,0.15)",
};

export const THEMES = { dark, light };

// ─── Context ──────────────────────────────────────────────────────────────────

const  ThemeContext   = createContext(null);

const STORAGE_KEY = "pineverse_theme";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "dark";
    } catch {
      return "dark";
    }
  });

  const toggle = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{ mode, colors: THEMES[mode], toggle, isDark: mode === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
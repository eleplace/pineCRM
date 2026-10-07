// src/components/layout/Sidebar.jsx

import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/pineLogo.png";
import { useTheme } from "../../context/ThemeContext";

const menuItems = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/" },
      { name: "Customers", icon: Users, path: "/customersScreen" },
      { name: "All Jobs", icon: FileText, path: "/AllJobs" },
      { name: "All Bids", icon: Receipt, path: "/AllBidsScreen" },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      { name: "Analytics", icon: BarChart3, path: "/analytics" },
    ],
  },
];
 
export default function Sidebar() {
  const { pathname } = useLocation();
  const { colors, toggle, isDark } = useTheme();

  return (
    <aside
      className="w-[260px] min-h-screen flex flex-col"
      style={{
        background: colors.sidebarBg,
        borderRight: `1px solid ${colors.borderSubtle}`,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Logo */}
      <div
        className="h-[72px] flex items-center px-6"
        style={{ borderBottom: `1px solid ${colors.borderMid}` }}
      >
        <img
          src={Logo}
          alt="PineVerse Logo"
          style={{ width: 35, height: 38 }}
        />
        <h1 className="ml-3 text-xl font-bold tracking-tight">
          <span style={{ color: colors.textPrimary }}>Pine</span>
          <span style={{ color: colors.accentPrimary }}>Verse</span>
        </h1>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 pt-3 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-2">
            <p
              className="px-3 mb-3 text-[10px] font-semibold tracking-widest uppercase"
              style={{
                color: colors.textFaint,
                fontFamily: "monospace",
              }}
            >
              {section.title}
            </p>

            <div className="space-y-[2px]">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    to={item.path || "#"}
                    key={item.name}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-[10px] transition-all duration-150"
                    style={
                      isActive
                        ? {
                            background: colors.accentNavActive,
                            border: colors.borderActive,
                            color: colors.accentPrimary,
                          }
                        : {
                            color: colors.textMuted,
                            border: "1px solid transparent",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          colors.accentNavHover;
                        e.currentTarget.style.color = colors.textPrimary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = colors.textMuted;
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} />
                      <span className="text-[13.5px] font-medium">
                        {item.name}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className="min-w-[22px] h-5 px-2 rounded-full text-[11px] font-semibold flex items-center justify-center"
                        style={{
                          background: colors.accentBadgeBg,
                          color: colors.accentPrimary,
                          fontFamily: "monospace",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Theme Toggle ──────────────────────────────────────────────────── */}
      <div
        className="px-3 pb-3"
        style={{ borderTop: `1px solid ${colors.borderMid}` }}
      >
        <button
          onClick={toggle}
          className="w-full flex items-center justify-between rounded-xl px-4 py-3 mt-3 transition-all duration-200"
          style={{
            background: colors.accentIconBg,
            border: `1px solid ${colors.borderSubtle}`,
            color: colors.textPrimary,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.borderHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.borderSubtle;
          }}
        >
          <div className="flex items-center gap-3">
            {isDark ? (
              <Sun size={16} style={{ color: colors.accentPrimary }} />
            ) : (
              <Moon size={16} style={{ color: colors.accentPrimary }} />
            )}
            <span
              className="text-[13px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </div>

          {/* Toggle pill */}
          <div
            className="relative w-10 h-5 rounded-full transition-all duration-300"
            style={{
              background: isDark ? colors.accentPrimary : colors.borderSubtle,
            }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
              style={{
                background: isDark ? "#021616" : "#FFFFFF",
                left: isDark ? "calc(100% - 18px)" : "2px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </button>
      </div>

      {/* Bottom User */}
      <div
        className="p-3"
        style={{ borderTop: `1px solid ${colors.borderMid}` }}
      >
        <div
          className="flex items-center gap-3 rounded-xl p-3"
          style={{ background: colors.userCardBg }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: colors.avatarBg,
              color: colors.avatarColor,
              border: `1.5px solid ${colors.borderSubtle}`,
            }}
          >
            AD
          </div>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: colors.textPrimary }}
            >
              Admin User
            </p>
            <p className="text-xs" style={{ color: colors.textMuted }}>
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

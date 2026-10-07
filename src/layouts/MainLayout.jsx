// src/layouts/MainLayout.jsx

import Sidebar from "../components/layout/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#021616" }}
    >
      {/* Sidebar — fixed height, never scrolls */}
      <div className="flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Content area — scrolls independently */}
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
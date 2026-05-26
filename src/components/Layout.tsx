// Layout.tsx — Persistent app shell: sidebar + topbar + page content slot.

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Terminal, Settings, Puzzle,
  Package, Globe, Coffee, Plus, Upload,
} from "lucide-react";
import { useServerStore } from "../stores/serverStore";
import NewServerModal from "./NewServerModal";

const NAV = [
  { section: "Main", items: [
    { to: "/dashboard", label: "Dashboard",  Icon: LayoutDashboard },
    { to: "/console",   label: "Console",    Icon: Terminal         },
    { to: "/settings",  label: "Settings",   Icon: Settings         },
  ]},
  { section: "Ecosystem", items: [
    { to: "/plugins", label: "Plugins", Icon: Puzzle  },
    { to: "/mods",    label: "Mods",    Icon: Package },
    { to: "/network", label: "Network", Icon: Globe   },
  ]},
  { section: "System", items: [
    { to: "/java", label: "Java", Icon: Coffee },
  ]},
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showNewServer, setShowNewServer] = useState(false);
  const runningCount = useServerStore((s) =>
    s.servers.filter((sv) => sv.status === "online").length
  );

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside
        className="flex w-[200px] flex-shrink-0 flex-col"
        style={{ background: "#090c12", borderRight: "1px solid var(--bg-subtle)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 px-4 py-[18px]"
          style={{ borderBottom: "1px solid var(--bg-subtle)" }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-[7px] text-sm"
            style={{ background: "linear-gradient(135deg, #22d3a8, #16a97e)" }}
          >
            ⛏
          </div>
          <span className="text-[15px] font-bold tracking-tight" style={{ color: "#f0f4f8" }}>
            EasyServe
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {NAV.map(({ section, items }) => (
            <div key={section} className="mb-4">
              <p
                className="mb-1.5 px-2 text-[9px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-dim)" }}
              >
                {section}
              </p>
              {items.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `mb-0.5 flex items-center gap-[9px] rounded-[7px] px-2.5 py-[7px] text-xs font-medium transition-colors ${
                      isActive
                        ? ""
                        : "text-[#687280] hover:bg-[#131925] hover:text-[#a0b0c0]"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: "var(--teal-bg)", color: "var(--teal)" }
                      : {}
                  }
                >
                  <Icon size={15} strokeWidth={1.8} />
                  <span>{label}</span>
                  {to === "/dashboard" && runningCount > 0 && (
                    <span
                      className="ml-auto rounded-full px-1.5 py-px text-[9px] font-bold"
                      style={{ background: "var(--teal)", color: "#042c1e" }}
                    >
                      {runningCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-3 text-[10px]"
          style={{ borderTop: "1px solid var(--bg-subtle)", color: "var(--text-dim)" }}
        >
          v0.1.0-alpha
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex h-12 flex-shrink-0 items-center justify-between px-5"
          style={{
            background: "var(--bg-topbar)",
            borderBottom: "1px solid var(--bg-subtle)",
          }}
        >
          <span className="text-sm font-semibold" style={{ color: "#dde4ee" }}>
            EasyServe
          </span>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 rounded-[7px] border px-3 py-1.5 text-xs transition-colors hover:bg-[#131925]"
              style={{ borderColor: "var(--bg-border)", color: "var(--text-secondary)" }}
            >
              <Upload size={13} />
              Import
            </button>
            <button
              onClick={() => setShowNewServer(true)}
              className="flex items-center gap-1.5 rounded-[7px] px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--teal)", color: "#03150e" }}
            >
              <Plus size={13} strokeWidth={2.5} />
              New Server
            </button>
          </div>
        </header>

        {/* Page slot */}
        <main className="flex-1 overflow-hidden" style={{ background: "var(--bg-base)" }}>
          {children}
        </main>
      </div>

      {showNewServer && (
        <NewServerModal onClose={() => setShowNewServer(false)} />
      )}
    </div>
  );
}

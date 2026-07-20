import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  DoorClosed,
  Users,
  Stethoscope,
  AlertTriangle,
  Wrench,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../lib/auth.jsx";

const nav = [
  { title: "Tableau de bord", to: "/dashboard", icon: LayoutDashboard },
  { title: "Portes", to: "/portes", icon: DoorClosed },
  { title: "Clients", to: "/clients", icon: Users },
  { title: "Diagnostics", to: "/diagnostics", icon: Stethoscope },
  { title: "Incidents", to: "/incidents", icon: AlertTriangle },
  { title: "Réparations", to: "/reparations", icon: Wrench },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-slate-100 transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-800">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
            <DoorClosed className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              PortesPro
            </div>
            <div className="text-[11px] text-slate-400">Maintenance industrielle</div>
          </div>
          <button className="ml-auto md:hidden text-slate-400" onClick={onClose} aria-label="Fermer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="px-2 pb-2 text-[11px] uppercase tracking-wider text-slate-500">
            Navigation
          </div>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export function AppLayout({ title, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard
  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate, location.pathname]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between border-b border-slate-200 bg-white px-4 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="rounded p-1.5 text-slate-600 hover:bg-slate-100 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold truncate text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-slate-900">{user.nom}</span>
              <span className="text-[11px] text-slate-500 capitalize">{user.role}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between border-b border-slate-200 px-5 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, subtitle }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </h2>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function Table({ head, children, empty, colSpan }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 font-medium ${h.align === "right" ? "text-right" : ""}`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
          {empty && (
            <tr>
              <td colSpan={colSpan} className="px-4 py-8 text-center text-slate-500">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "", align }) {
  return (
    <td className={`px-4 py-3 text-slate-700 ${align === "right" ? "text-right" : ""} ${className}`}>
      {children}
    </td>
  );
}

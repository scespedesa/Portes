import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ConfirmDialog } from "./Modal.jsx";

export function AddButton({ onClick, label = "Nouveau" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

export function RowActions({ onEdit, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        onClick={onEdit}
        className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        aria-label="Modifier"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
        aria-label="Supprimer"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={onDelete} />
    </div>
  );
}

export function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    blue: "bg-blue-100 text-blue-800 ring-blue-200",
    green: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    amber: "bg-amber-100 text-amber-800 ring-amber-200",
    red: "bg-red-100 text-red-800 ring-red-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone] ?? tones.slate}`}
    >
      {children}
    </span>
  );
}

// Inputs stylés réutilisables (Tailwind uniquement).
export function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

import { useRef } from "react";
import { toast } from "sonner";
import { Paperclip, FileText, FileSpreadsheet, X, Download } from "lucide-react";

const ACCEPT =
  ".pdf,.xls,.xlsx,.csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv";
const MAX_BYTES = 4 * 1024 * 1024;

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function iconFor(type, name) {
  const n = name.toLowerCase();
  if (type.includes("pdf") || n.endsWith(".pdf")) return <FileText className="h-4 w-4 text-red-600" />;
  if (
    type.includes("sheet") ||
    type.includes("excel") ||
    n.endsWith(".xls") ||
    n.endsWith(".xlsx") ||
    n.endsWith(".csv")
  )
    return <FileSpreadsheet className="h-4 w-4 text-emerald-600" />;
  return <FileText className="h-4 w-4 text-slate-500" />;
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

export function AttachmentPicker({ value = [], onChange, label = "Pièces jointes (PDF / Excel)" }) {
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const next = [...value];
    for (const f of Array.from(files)) {
      if (f.size > MAX_BYTES) {
        alert(`${f.name} dépasse 4 Mo`);
        // toast.error(`${f.name} dépasse 4 Mo`);
        continue;
      }
      try {
        const dataUrl = await readAsDataURL(f);
        next.push({ name: f.name, type: f.type, size: f.size, dataUrl });
      } catch {
        alert(`Erreur de lecture: ${f.name}`);
        // toast.error(`Erreur de lecture: ${f.name}`);
      }
    }
    onChange(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (idx) => {
    const next = value.slice();
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <Paperclip className="h-4 w-4" />
          Ajouter un fichier
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {value.length === 0 ? (
        <p className="text-xs text-slate-500">
          Aucun fichier. Formats acceptés : PDF, Excel (.xls, .xlsx), CSV — 4 Mo max par fichier.
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 rounded-md border border-slate-200">
          {value.map((a, i) => (
            <li key={i} className="flex items-center gap-2 px-3 py-2 text-sm">
              {iconFor(a.type, a.name)}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-slate-800">{a.name}</div>
                <div className="text-xs text-slate-500">{humanSize(a.size)}</div>
              </div>
              <a
                href={a.dataUrl}
                download={a.name}
                className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-slate-100"
                title="Télécharger"
              >
                <Download className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="inline-flex h-8 w-8 items-center justify-center rounded text-red-500 hover:bg-red-50"
                title="Supprimer"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AttachmentBadges({ items }) {
  if (!items || items.length === 0) return <span className="text-xs text-slate-400">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((a, i) => (
        <a
          key={i}
          href={a.dataUrl}
          download={a.name}
          title={a.name}
          className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
        >
          {iconFor(a.type, a.name)}
          <span className="max-w-[120px] truncate">{a.name}</span>
        </a>
      ))}
    </div>
  );
}

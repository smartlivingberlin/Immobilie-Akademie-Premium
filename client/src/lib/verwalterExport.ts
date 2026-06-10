/** HTML/PDF-Export für Verwalter-Suite (Vorgänge, Fristen). */

import type { FristItem } from "@shared/verwalterFristen";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import {
  isVorgangOverdue,
  VORGANG_STATUS_LABELS,
  VORGANG_TYP_LABELS,
  type VerwalterVorgang,
} from "@shared/verwalterVorgangTypes";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadBlob(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function htmlShell(title: string, body: string): string {
  const date = new Date().toLocaleDateString("de-DE");
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #1e293b; }
    h1 { font-size: 1.5rem; color: #047857; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f1f5f9; }
    .overdue { color: #b91c1c; font-weight: 600; }
    .footer { margin-top: 2rem; font-size: 0.75rem; color: #94a3b8; }
    @media print { body { margin: 1cm; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">Erstellt am ${date} · Verwalter-Rechner · Keine Rechtsberatung</p>
  ${body}
  <p class="footer">Immobilien Akademie Smart — Export zur internen Dokumentation.</p>
</body>
</html>`;
}

export function downloadVorgaengeHtml(vorgaenge: VerwalterVorgang[], label?: string): void {
  const title = label ? `Vorgänge — ${label}` : "Vorgänge — Übersicht";
  const rows = vorgaenge
    .map((v) => {
      const overdue = isVorgangOverdue(v);
      const faellig = v.faelligAm
        ? `<span class="${overdue ? "overdue" : ""}">${escapeHtml(v.faelligAm)}${overdue ? " (überfällig)" : ""}</span>`
        : "—";
      return `<tr>
        <td>${escapeHtml(v.titel)}</td>
        <td>${escapeHtml(v.objektName)}</td>
        <td>${escapeHtml(VORGANG_TYP_LABELS[v.typ])}</td>
        <td>${escapeHtml(VORGANG_STATUS_LABELS[v.status])}</td>
        <td>${faellig}</td>
      </tr>`;
    })
    .join("\n");

  const body = `<table>
    <thead><tr><th>Titel</th><th>Objekt</th><th>Typ</th><th>Status</th><th>Fällig</th></tr></thead>
    <tbody>${rows || "<tr><td colspan='5'>Keine Vorgänge</td></tr>"}</tbody>
  </table>`;

  const safe = (label || "vorgaenge").replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "_").slice(0, 30);
  downloadBlob(`${safe}.html`, htmlShell(title, body), "text/html;charset=utf-8");
}

export async function downloadVorgaengePdf(vorgaenge: VerwalterVorgang[], label?: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 15;
  let y = margin;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(label ? `Vorgänge — ${label}` : "Vorgänge — Übersicht", margin, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Stand: ${new Date().toLocaleDateString("de-DE")}`, margin, y);
  y += 10;
  doc.setTextColor(0, 0, 0);

  for (const v of vorgaenge) {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    const overdue = isVorgangOverdue(v);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(v.titel.slice(0, 60), margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const line = `${v.objektName} · ${VORGANG_TYP_LABELS[v.typ]} · ${VORGANG_STATUS_LABELS[v.status]}`;
    doc.text(line.slice(0, 90), margin, y);
    y += 4;
    if (v.faelligAm) {
      if (overdue) doc.setTextColor(185, 28, 28);
      doc.text(`Fällig: ${v.faelligAm}${overdue ? " (überfällig)" : ""}`, margin, y);
      doc.setTextColor(0, 0, 0);
      y += 4;
    }
    y += 4;
  }

  if (vorgaenge.length === 0) {
    doc.text("Keine Vorgänge vorhanden.", margin, y);
  }

  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text("Keine Rechtsberatung — Immobilien Akademie Smart", margin, 290);

  const safe = (label || "vorgaenge").replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "_").slice(0, 30);
  doc.save(`${safe}.pdf`);
}

export function downloadFristenChecklisteHtml(
  fristen: FristItem[],
  opts?: { objekt?: VerwalterObjekt; startDate?: string },
): void {
  const objektLabel = opts?.objekt?.name;
  const title = objektLabel ? `Fristen-Checkliste — ${objektLabel}` : "Fristen-Checkliste WEG";
  const meta = opts?.startDate
    ? `<p class="meta">Stichtag für Fristberechnung: ${escapeHtml(opts.startDate)}</p>`
    : "";

  const items = fristen
    .map((f) => {
      let faellig = "";
      if (f.durationDays != null && opts?.startDate) {
        const d = new Date(opts.startDate);
        if (!Number.isNaN(d.getTime())) {
          d.setDate(d.getDate() + f.durationDays);
          faellig = `<br/><small>Fällig ca.: ${d.toLocaleDateString("de-DE")}</small>`;
        }
      }
      return `<li><strong>${escapeHtml(f.title)}</strong> — ${escapeHtml(f.description)}
        <br/><small>${escapeHtml(f.legalBasis)}${f.durationDays != null ? ` · ca. ${f.durationDays} Tage` : ""}</small>${faellig}</li>`;
    })
    .join("\n");

  const body = `${meta}<ul>${items}</ul>`;
  const safe = (objektLabel || "fristen").replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "_").slice(0, 30);
  downloadBlob(`${safe}-fristen.html`, htmlShell(title, body), "text/html;charset=utf-8");
}

export async function downloadStammdatenCsv(): Promise<void> {
  const res = await fetch("/api/verwalter/export/stammdaten-csv", { credentials: "include" });
  if (!res.ok) throw new Error("Export fehlgeschlagen");
  const text = await res.text();
  downloadBlob("verwalter-stammdaten.csv", text, "text/csv;charset=utf-8");
}

export async function downloadDatevBuchungenCsv(
  objektId: string,
  periode: string,
  force = false,
): Promise<void> {
  const q = new URLSearchParams({ objektId, periode });
  if (force) q.set("force", "1");
  const res = await fetch(`/api/verwalter/export/datev-buchungen?${q}`, { credentials: "include" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.error || "DATEV-Export fehlgeschlagen") as Error & {
      hinweise?: { level: string; message: string }[];
    };
    err.hinweise = data.hinweise;
    throw err;
  }
  const text = await res.text();
  downloadBlob(`EXTF_Buchungen_${objektId}_${periode}.csv`, text, "text/csv;charset=utf-8");
}

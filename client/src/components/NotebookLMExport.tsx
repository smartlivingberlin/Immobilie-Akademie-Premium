import { Download, ExternalLink, BookOpen, FileText, Headphones, Video, HelpCircle, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NotebookLMExportProps {
  moduleId: number;
  dayNumber: number;
  title: string;
  theory: string;
  law?: string[];
  practice?: string;
  task?: string;
  extendedTheory?: string;
}

const NLM_FUNCTIONS = [
  { id: "audio", icon: "🎙️", label: "Audio Podcast", desc: "2 KI-Sprecher, Deep Dive, 10-20 Min" },
  { id: "guide", icon: "📚", label: "Study Guide", desc: "Zusammenfassung + Schlüsselkonzepte" },
  { id: "briefing", icon: "📄", label: "Briefing Doc", desc: "Executive Summary auf 1 Seite" },
  { id: "faq", icon: "❓", label: "FAQ", desc: "Häufige Fragen automatisch generieren" },
  { id: "video", icon: "🎬", label: "Video Präsentation", desc: "Stehbilder + Stimme (neu 2025)" },
  { id: "mindmap", icon: "🗺️", label: "Mindmap", desc: "Visuelle Konzeptkarte (neu 2025)" },
];

export function NotebookLMExport({
  moduleId, dayNumber, title, theory, law, practice, task, extendedTheory
}: NotebookLMExportProps) {
  const [expanded, setExpanded] = useState(false);

  const buildExportText = () => {
    const parts: string[] = [
      "# Modul " + moduleId + " - Tag " + dayNumber + ": " + title,
      "## Immobilien Akademie Smart | IHK-Vorbereitung §34c/§34i GewO",
      "",
      "---",
      "## THEORIE",
      "",
      theory,
    ];
    if (extendedTheory) {
      parts.push("", "---", "## VERTIEFUNGSWISSEN", "", extendedTheory);
    }
    if (law && law.length > 0) {
      parts.push("", "---", "## NORMEN & GESETZE", "");
      law.forEach((l: string) => parts.push("§ " + l));
    }
    if (practice) {
      parts.push("", "---", "## PRAXIS & ANWENDUNG", "", practice);
    }
    if (task) {
      parts.push("", "---", "## AUFGABEN & ÜBUNGEN", "", task);
    }
    parts.push(
      "",
      "---",
      "## LERNZIELE",
      "Nach diesem Lerntag können Sie:",
      "- Die wichtigsten Konzepte dieses Themas erklären",
      "- Praxisaufgaben zu diesem Thema lösen",
      "- Relevante Gesetze und Normen benennen",
      "",
      "*Exportiert aus Immobilien Akademie Smart*",
      "*NotebookLM: Datei hochladen → Funktion wählen*"
    );
    return parts.join("\n");
  };

  const downloadTxt = () => {
    const text = buildExportText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Modul" + moduleId + "_Tag" + dayNumber + "_" + title.replace(/[^a-zA-Z0-9]/g, "_").slice(0,30) + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(buildExportText());
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 w-full p-3 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left"
      >
        <span className="text-lg">📓</span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-purple-800">NotebookLM — KI-Lerntools</div>
          <div className="text-xs text-purple-500">Podcast, Präsentation, Mindmap, FAQ & mehr</div>
        </div>
        <span className="text-purple-400 text-xs">▼ öffnen</span>
      </button>
    );
  }

  return (
    <div className="border border-purple-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-purple-600 text-white">
        <div className="flex items-center gap-2">
          <span className="text-lg">📓</span>
          <div>
            <div className="font-bold text-sm">NotebookLM — KI-Lerntools</div>
            <div className="text-xs text-purple-200">Schritt 1: Exportieren → Schritt 2: NotebookLM öffnen → Schritt 3: Funktion wählen</div>
          </div>
        </div>
        <button onClick={() => setExpanded(false)} className="text-purple-200 hover:text-white text-lg">✕</button>
      </div>

      {/* Export Buttons */}
      <div className="p-3 bg-purple-50 border-b border-purple-100 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={downloadTxt}
          className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs">
          <Download className="h-3 w-3" /> .txt herunterladen
        </Button>
        <Button variant="outline" size="sm" onClick={copyToClipboard}
          className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs">
          <FileText className="h-3 w-3" /> Text kopieren
        </Button>
        <Button variant="default" size="sm" asChild
          className="gap-1.5 bg-purple-600 hover:bg-purple-700 text-xs">
          <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer">
            <ExternalLink className="h-3 w-3" /> NotebookLM öffnen ↗
          </a>
        </Button>
      </div>

      {/* Funktionen */}
      <div className="p-3 bg-white">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Verfügbare NotebookLM Funktionen:</div>
        <div className="grid grid-cols-2 gap-2">
          {NLM_FUNCTIONS.map(fn => (
            <div key={fn.id} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-base flex-shrink-0">{fn.icon}</span>
              <div>
                <div className="text-xs font-semibold text-slate-700">{fn.label}</div>
                <div className="text-xs text-slate-400">{fn.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
          <strong>So gehts:</strong> Text kopieren oder .txt herunterladen → notebooklm.google.com öffnen → Neues Notebook → Datei hochladen → gewünschte Funktion wählen
        </div>
      </div>
    </div>
  );
}

import { Download, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotebookLMExportProps {
  moduleId: number;
  dayNumber: number;
  title: string;
  theory: string;
  law?: string[];
  practice?: string;
  task?: string;
}

export function NotebookLMExport({
  moduleId, dayNumber, title, theory, law, practice, task
}: NotebookLMExportProps) {
  
  const exportForNotebookLM = () => {
    const content = `# Modul ${moduleId} — Tag ${dayNumber}: ${title}
## Immobilien Akademie Smart | IHK-Vorbereitung

---

## THEORIE

${theory}

${law && law.length > 0 ? `---

## NORMEN & GESETZE

${law.map(l => `- ${l}`).join('\n')}` : ''}

${practice ? `---

## PRAXIS & ANWENDUNG

${practice}` : ''}

${task ? `---

## AUFGABEN & ÜBUNGEN

${task}` : ''}

---
*Exportiert aus Immobilien Akademie Smart — immobilie-akademie-production.up.railway.app*
*Für NotebookLM: Neues Notebook erstellen → Datei hochladen → Audio Overview generieren*
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Modul${moduleId}_Tag${dayNumber}_NotebookLM.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-xl">
      <BookOpen className="h-4 w-4 text-purple-600 flex-shrink-0" />
      <span className="text-sm text-purple-700 font-medium flex-1">
        NotebookLM Podcast generieren
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={exportForNotebookLM}
        className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs"
      >
        <Download className="h-3 w-3" />
        Export
      </Button>
      
        href="https://notebooklm.google.com"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs"
        >
          <ExternalLink className="h-3 w-3" />
          NotebookLM öffnen
        </Button>
      </a>
    </div>
  );
}

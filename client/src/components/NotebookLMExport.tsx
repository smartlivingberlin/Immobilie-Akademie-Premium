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
    const parts: string[] = [
      "# Modul " + moduleId + " - Tag " + dayNumber + ": " + title,
      "## Immobilien Akademie Smart | IHK-Vorbereitung",
      "",
      "---",
      "## THEORIE",
      "",
      theory,
    ];
    if (law && law.length > 0) {
      parts.push("", "---", "## NORMEN & GESETZE", "");
      law.forEach((l: string) => parts.push("- " + l));
    }
    if (practice) {
      parts.push("", "---", "## PRAXIS", "", practice);
    }
    if (task) {
      parts.push("", "---", "## AUFGABEN", "", task);
    }
    parts.push("", "---", "*Exportiert aus Immobilien Akademie Smart*");

    const blob = new Blob([parts.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Modul" + moduleId + "_Tag" + dayNumber + "_NotebookLM.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-xl">
      <BookOpen className="h-4 w-4 text-purple-600 flex-shrink-0" />
      <span className="text-sm text-purple-700 font-medium flex-1">NotebookLM Podcast</span>
      <Button
        variant="outline" size="sm"
        onClick={exportForNotebookLM}
        className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs"
      >
        <Download className="h-3 w-3" />
        Export .txt
      </Button>
      <Button
        variant="outline" size="sm" asChild
        className="gap-1.5 text-purple-700 border-purple-300 hover:bg-purple-100 text-xs"
      >
        <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer">
          <ExternalLink className="h-3 w-3" />
          NotebookLM
        </a>
      </Button>
    </div>
  );
}

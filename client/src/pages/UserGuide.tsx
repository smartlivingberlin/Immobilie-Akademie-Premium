import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Download, Printer } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function UserGuide() {
  const [loading] = useState(false);
  const content = [
    "# Benutzerhandbuch — Immobilien Akademie Smart",
    "## Login: /login → E-Mail + Passwort → Dashboard",
    "## Testzugang: Startseite → 24h testen → E-Mail eingeben → Code einlösen",
    "## Module: M1 Grundkurs (20 Tage), M2 Makler §34c (60), M3 WEG (80), M4 Gutachter (40), M5 §34i (40)",
    "## KI-Tutor: Claude + Gemini + Groq — Fragen direkt im Modul stellen",
    "## Prüfung: 855+ IHK-Fragen, 70% zum Bestehen, Zertifikat als PDF",
    "## Support: info@immobilien-akademie-smart.de oder /beschwerde",
  ].join("\n\n");
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'benutzerhandbuch.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-slate-100">
                <ArrowLeft className="h-5 w-5" />
              </div>
</Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-emerald-600" />
                Benutzerhandbuch
              </h1>
              <p className="text-slate-600 mt-1">
                Vollständige Anleitung zur Nutzung des Lernportals
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Drucken
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8 md:p-12">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <div className="prose prose-lg prose-slate max-w-none
                prose-headings:text-slate-900
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-700 prose-p:leading-relaxed
                prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-slate-700 prose-li:my-2
                prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
                prose-hr:border-slate-200 prose-hr:my-8
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-slate-200
                prose-td:p-3 prose-td:border prose-td:border-slate-200
              ">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Schnellzugriff</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start">
                  Zur Startseite
                </div>
</Link>
              <Link href="/modul/3">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start">
                  Zu Modul 3
                </div>
</Link>
              <Link href="/glossary">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start">
                  Zum Glossar
                </div>
</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

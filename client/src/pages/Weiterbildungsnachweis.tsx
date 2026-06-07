import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Download, FileCheck, Clock, Calendar, AlertCircle, CheckCircle2, Info,
} from "lucide-react";
import { defaultWeiterbildungDateRange, MABV_PFlicht_STUNDEN, WEITERBILDUNG_DISCLAIMER } from "@shared/weiterbildung";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  nutzer: { name: string; email: string };
  zeitraum: { von: string; bis: string };
  gesamtStunden: number;
  gesamtMinuten: number;
  gesamtSitzungen: number;
  aktiveTage: number;
  abgeschlosseneEinheiten: number;
  pflichtStunden: number;
  pflichtErfuellt: boolean;
  fortschrittProzent: number;
  tagesNachweis: Array<{
    datum: string;
    sitzungen: number;
    minuten: number;
    stunden: number;
    module: string;
    abgeschlossen: number;
  }>;
  moduleBreakdown: Array<{
    moduleId: number;
    label: string;
    sitzungen: number;
    minuten: number;
    stunden: number;
    abgeschlossen: number;
  }>;
}

export default function Weiterbildungsnachweis() {
  const defaults = defaultWeiterbildungDateRange();
  const [startDate, setStartDate] = useState(defaults.startDate);
  const [endDate, setEndDate] = useState(defaults.endDate);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/user/weiterbildungsnachweis?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Bericht konnte nicht geladen werden");
      const data = await res.json();
      setReport(data);
    } catch {
      toast({ title: "Fehler", description: "Lernnachweis konnte nicht geladen werden.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, toast]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/user/weiterbildungsnachweis/pdf?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("PDF-Fehler");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Weiterbildungsnachweis_${startDate}_${endDate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "PDF heruntergeladen", description: "Ihr Weiterbildungsnachweis wurde gespeichert." });
    } catch {
      toast({ title: "Fehler", description: "PDF konnte nicht erstellt werden.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/zertifikate">
          <span className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Zurück zu Zertifikate
          </span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
          <FileCheck className="h-4 w-4" /> §34c / §15b MaBV
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Weiterbildungsnachweis</h1>
        <p className="text-slate-600 max-w-2xl">
          Serverseitig protokollierte Lernzeit aus Ihren Lerneinheiten — als Grundlage für Ihre
          Dokumentation der gesetzlichen Weiterbildungspflicht ({MABV_PFlicht_STUNDEN} Zeitstunden in 3 Jahren).
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">{WEITERBILDUNG_DISCLAIMER}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Berichtszeitraum</CardTitle>
          <CardDescription>Standard: letzte 3 Kalenderjahre (§15b MaBV)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <Label htmlFor="start">Von</Label>
              <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-44" />
            </div>
            <div>
              <Label htmlFor="end">Bis</Label>
              <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-44" />
            </div>
            <Button variant="outline" onClick={fetchReport} disabled={loading}>Aktualisieren</Button>
            <Button onClick={handleDownload} disabled={downloading || loading || !report}>
              <Download className="h-4 w-4 mr-2" />
              {downloading ? "Erstelle PDF…" : "PDF herunterladen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Lade Lernnachweis…</div>
      ) : report ? (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{report.gesamtStunden}h</p>
                    <p className="text-xs text-slate-500">Nachgewiesene Zeitstunden</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                  <div>
                    <p className="text-2xl font-bold">{report.aktiveTage}</p>
                    <p className="text-xs text-slate-500">Aktive Lerntage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  {report.pflichtErfuellt ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-amber-600" />
                  )}
                  <div>
                    <p className="text-2xl font-bold">{report.fortschrittProzent}%</p>
                    <p className="text-xs text-slate-500">von {report.pflichtStunden}h Pflicht</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Fortschritt zur 20-Stunden-Pflicht</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={report.fortschrittProzent} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-slate-600">
                <span>{report.gesamtStunden}h von {report.pflichtStunden}h</span>
                <Badge variant={report.pflichtErfuellt ? "default" : "secondary"}>
                  {report.pflichtErfuellt ? "Pflicht erfüllt" : "Noch offen"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {report.moduleBreakdown.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">Modulübersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {report.moduleBreakdown.map((mod) => (
                    <div key={mod.moduleId} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-700">{mod.label}</span>
                      <span className="text-slate-500">{mod.stunden}h · {mod.sitzungen} Einheiten</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {report.tagesNachweis.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tagesnachweis</CardTitle>
                <CardDescription>{report.gesamtSitzungen} Lerneinheiten protokolliert</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-slate-500">
                        <th className="py-2 pr-4">Datum</th>
                        <th className="py-2 pr-4">Minuten</th>
                        <th className="py-2 pr-4">Stunden</th>
                        <th className="py-2 pr-4">Einheiten</th>
                        <th className="py-2">Inhalte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.tagesNachweis.map((tag) => (
                        <tr key={tag.datum} className="border-b border-slate-50">
                          <td className="py-2 pr-4 font-medium">{tag.datum}</td>
                          <td className="py-2 pr-4">{tag.minuten}</td>
                          <td className="py-2 pr-4">{tag.stunden}</td>
                          <td className="py-2 pr-4">{tag.sitzungen}</td>
                          <td className="py-2 text-slate-600 text-xs">{tag.module}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-slate-500">
                Noch keine Lernaktivität im gewählten Zeitraum. Starten Sie ein Modul, um Ihre Zeit zu protokollieren.
              </CardContent>
            </Card>
          )}
        </>
      ) : null}
    </div>
  );
}

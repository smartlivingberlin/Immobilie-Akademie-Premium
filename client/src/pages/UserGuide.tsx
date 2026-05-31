import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Download, Printer, LogIn, PlayCircle, Brain, Award, HelpCircle, Mail } from "lucide-react";


const QUICK_LINKS = [
  { href: "/statistiken", label: "Mein Dashboard" },
  { href: "/modul/1", label: "Modul 1 starten" },
  { href: "/modul/2", label: "Modul 2 starten" },
  { href: "/modul/3", label: "Modul 3 starten" },
  { href: "/modul/4", label: "Modul 4 starten" },
  { href: "/modul/5", label: "Modul 5 starten" },
  { href: "/pruefung", label: "Wissenscheck" },
  { href: "/zertifikate", label: "Meine Zertifikate" },
  { href: "/quiz", label: "Quiz starten" },
  { href: "/glossary", label: "Glossar" },
  { href: "/foerderung", label: "Fördermöglichkeiten" },
  { href: "/beschwerde", label: "Support kontaktieren" },
];

const MODULE_DATA = [
  ["Modul 1", "Immobilien-Grundkurs", "20", "160", "149 €"],
  ["Modul 2", "Makler §34c GewO", "60", "480", "499 €"],
  ["Modul 3", "WEG-Verwalter", "80", "640", "699 €"],
  ["Modul 4", "Gutachter & Sachverständiger", "40", "320", "399 €"],
  ["Modul 5", "§34i Darlehensvermittler", "40", "320", "499 €"],
];

export default function UserGuide() {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    const text = [
      "BENUTZERHANDBUCH — IMMOBILIEN AKADEMIE SMART",
      "",
      "1. ERSTE SCHRITTE",
      "Login: immobilien-akademie-smart.de/login",
      "24h-Testzugang: Startseite > 24h kostenlos testen > E-Mail eingeben > Code einloesen",
      "Passwort vergessen: /forgot-password",
      "",
      "2. MODULE",
      "Modul 1: Immobilien-Grundkurs — 20 Tage, 160 UE, 149 EUR",
      "Modul 2: Makler §34c GewO — 60 Tage, 480 UE, 499 EUR",
      "Modul 3: WEG-Verwalter — 80 Tage, 640 UE, 699 EUR",
      "Modul 4: Gutachter — 40 Tage, 320 UE, 399 EUR",
      "Modul 5: §34i Darlehensvermittler — 40 Tage, 320 UE, 499 EUR",
      "Komplett-Paket: alle 5 Module — 1.955 EUR (spare 290 EUR)",
      "",
      "3. KI-TUTOR",
      "Claude + Gemini + Groq — 24/7 verfuegbar, Sokrates-Modus",
      "",
      "4. WISSENSCHECKS",
      "Wissenscheck: /pruefung — Lernfragen und Praxisfälle zur Selbstkontrolle",
      "Quiz: /quiz — ohne Zeitdruck nach Modulen",
      "Spaced Repetition: /wiederholung",
      "",
      "5. ZERTIFIKATE",
      "PDF-Kurszertifikat nach portalinternem Wissenscheck — /zertifikate",
      "",
      "6. SUPPORT",
      "E-Mail: info@immobilien-akademie-smart.de",
      "Beschwerdeformular: /beschwerde",
      "Oeffnungszeiten: Mo-Fr 9-17 Uhr (Berlin)",
    ].join("\n");
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain; charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "Benutzerhandbuch-Immobilien-Akademie-Smart.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="inline-flex items-center justify-center rounded-md h-10 w-10 hover:bg-slate-100 cursor-pointer">
                <ArrowLeft className="h-5 w-5" />
              </div>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-emerald-600" />
                Benutzerhandbuch
              </h1>
              <p className="text-slate-600 mt-1">Vollständige Anleitung zur Nutzung des Lernportals</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" /> Drucken
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>

        {/* 1. Erste Schritte */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <LogIn className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">1. Erste Schritte</h2>
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Registrierung & Login</h3>
                <p className="text-slate-600 leading-relaxed">Rufen Sie <strong>immobilien-akademie-smart.de/login</strong> auf. Sie können sich mit E-Mail und Passwort registrieren oder mit Ihrem Google-Konto anmelden. Nach der Registrierung erhalten Sie sofort Zugang zu Ihrem Dashboard.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">24-Stunden-Testzugang</h3>
                <p className="text-slate-600 leading-relaxed">Klicken Sie auf der Startseite auf <strong>"24h kostenlos testen"</strong>. Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten per E-Mail einen Zugangscode, den Sie unter <strong>/code-einloesen</strong> einlösen. Der Testzugang gilt 24 Stunden für Modul 1 — keine Kreditkarte erforderlich.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Passwort vergessen</h3>
                <p className="text-slate-600 leading-relaxed">Unter <strong>/forgot-password</strong> können Sie Ihr Passwort zurücksetzen. Sie erhalten eine E-Mail mit einem Reset-Link der 1 Stunde gültig ist.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Module */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <PlayCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">2. Die fünf Lernmodule</h2>
            </div>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-3 border border-slate-200 font-semibold">Modul</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">Thema</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">Lerntage</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">UE</th>
                    <th className="text-left p-3 border border-slate-200 font-semibold">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {MODULE_DATA.map(([modul, thema, tage, ue, preis]) => (
                    <tr key={modul} className="hover:bg-slate-50">
                      <td className="p-3 border border-slate-200 font-medium text-emerald-700">{modul}</td>
                      <td className="p-3 border border-slate-200">{thema}</td>
                      <td className="p-3 border border-slate-200">{tage}</td>
                      <td className="p-3 border border-slate-200">{ue}</td>
                      <td className="p-3 border border-slate-200 font-semibold">{preis}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50">
                    <td className="p-3 border border-slate-200 font-bold text-emerald-800" colSpan={4}>Komplett-Paket — alle 5 Module (Sie sparen 290 €)</td>
                    <td className="p-3 border border-slate-200 font-bold text-emerald-800">1.955 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 leading-relaxed">Jedes Modul ist in tagesstrukturierte Einheiten aufgeteilt. Pro Lerntag: <strong>Theorie → Gesetzestexte → Analyse → Aufgaben → Videos</strong>. Ihr Fortschritt wird automatisch gespeichert.</p>
          </CardContent>
        </Card>

        {/* 3. KI-Tutor */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">3. KI-Tutor</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">Der KI-Tutor steht in jedem Modul zur Verfügung. Er arbeitet im <strong>Sokrates-Modus</strong>: statt fertige Antworten zu liefern, stellt er Rückfragen und führt Sie zur Lösung. Drei KI-Modelle stehen bereit: <strong>Claude</strong> (Anthropic), <strong>Gemini</strong> (Google) und <strong>Groq</strong> — rund um die Uhr ohne Wartezeiten.</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Öffnen Sie ein Modul</li>
              <li>Klicken Sie auf das Chat-Symbol</li>
              <li>Stellen Sie Ihre Frage im Freitext</li>
              <li>Der Tutor antwortet und stellt Verständnisfragen</li>
            </ol>
          </CardContent>
        </Card>

        {/* 4. Prüfung */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">4. Wissenschecks</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Wissenscheck (/pruefung)</h3>
                <p className="text-slate-600 leading-relaxed">Lernfragen und Praxisfälle zur Selbstkontrolle. Die Ergebnisse dokumentieren nur den portalinternen Lernstand.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Quiz (/quiz)</h3>
                <p className="text-slate-600 leading-relaxed">Üben Sie gezielt nach Modulen ohne Zeitdruck.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Spaced Repetition (/wiederholung)</h3>
                <p className="text-slate-600 leading-relaxed">Das System analysiert Ihre Schwächen und wiederholt automatisch die Fragen mit Nachholbedarf.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Lernkarten (/lernkarten)</h3>
                <p className="text-slate-600 leading-relaxed">Kompakte Karteikarten — ideal für unterwegs.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Zertifikate */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">5. Zertifikate</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">Nach Abschluss eines Moduls und erfolgreichem portalinternem Wissenscheck erhalten Sie ein <strong>PDF-Kurszertifikat</strong> mit Ihrem Namen, der Modulbezeichnung, dem Abschlussdatum und Ihrer Punktzahl.</p>
            <Link href="/zertifikate">
              <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 cursor-pointer">
                <Award className="h-4 w-4" /> Zu meinen Zertifikaten
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* 6. Support */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">6. Support & Kontakt</h2>
            </div>
            <div className="space-y-3 text-slate-600">
              <p><strong>E-Mail:</strong> info@immobilien-akademie-smart.de</p>
              <p><strong>Beschwerdeformular:</strong>{" "}
                <Link href="/beschwerde"><span className="text-emerald-600 hover:underline cursor-pointer">/beschwerde</span></Link>
                {" "}— DSGVO-konform, Antwort binnen 14 Tagen
              </p>
              <p><strong>Öffnungszeiten:</strong> Montag–Freitag 9–17 Uhr (Berlin)</p>
              <p><strong>Meine Daten / Konto löschen:</strong>{" "}
                <Link href="/konto/datenschutz"><span className="text-emerald-600 hover:underline cursor-pointer">/konto/datenschutz</span></Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Schnellzugriff */}
        <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Schnellzugriff</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="inline-flex items-center justify-start rounded-md text-sm font-medium border border-input bg-white hover:bg-slate-50 h-10 px-4 py-2 w-full cursor-pointer transition-colors">
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

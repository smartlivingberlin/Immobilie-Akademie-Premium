export default function Bildungskonzept() {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <h1 className="text-2xl font-bold text-slate-900">Bildungskonzept</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
        >
          Als PDF speichern (Drucken → PDF)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-10 space-y-8 text-sm leading-relaxed text-slate-700 print:border-none print:rounded-none print:p-0">

        {/* Deckblatt */}
        <div className="text-center border-b border-slate-200 pb-8">
          <div className="text-blue-600 font-bold text-lg mb-2">Immobilien-Akademie Smart</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Bildungskonzept</h1>
          <p className="text-slate-500 text-xs">Praxisvorbereitung §34c GewO · IHK-Sachkundeprüfung §34i GewO · WEG-Verwalter §26a WEG</p>
          <div className="mt-4 text-xs text-slate-400">
            Durlacher Str. 36 · 10715 Berlin · info@immobilien-akademie-smart.de<br />
            Stand: März 2026 · Version 1.0
          </div>
        </div>

        {/* 1. Träger */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">1</span>
            Bildungsträger
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div><span className="text-slate-400">Name:</span><br /><strong>Immobilien-Akademie Smart (i.G.)</strong></div>
            <div><span className="text-slate-400">Rechtsform:</span><br />GmbH in Gründung, aktuell Einzelunternehmen</div>
            <div><span className="text-slate-400">Adresse:</span><br />Durlacher Str. 36, 10715 Berlin</div>
            <div><span className="text-slate-400">Kontakt:</span><br />info@immobilien-akademie-smart.de</div>
            <div><span className="text-slate-400">Verantwortliche Leitung:</span><br />Alisad Gadyri, IHK-Immobilienkaufmann (Berlin, 2023)</div>
            <div><span className="text-slate-400">Portal:</span><br />immobilien-akademie-smart.de</div>
          </div>
        </section>

        {/* 2. Zielgruppe */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">2</span>
            Zielgruppe & Zugangsvorraussetzungen
          </h2>
          <p className="mb-2">Das Bildungsangebot richtet sich an:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Quereinsteiger aus anderen Berufsfeldern, die eine Tätigkeit als Immobilienmakler (§34c GewO) oder Darlehensvermittler (§34i GewO) anstreben</li>
            <li>Arbeitssuchende und Bürgergeldempfänger im Rahmen der beruflichen Neuorientierung</li>
            <li>Beschäftigte in der Immobilienbranche, die ihr Wissen systematisch vertiefen möchten</li>
            <li>Selbständige Immobilieneigentümer und Verwalter</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs">
            <strong>Zugangsvoraussetzungen:</strong> Kein formaler Bildungsabschluss erforderlich. Empfohlen: mittlerer Schulabschluss, Grundkenntnisse Deutsch (B2), Internetzugang. Für die Sachkundeprüfung nach §34i GewO und für erlaubnis- bzw. weiterbildungsbezogene Themen nach §34c GewO gelten jeweils eigene rechtliche Vorgaben und zuständige Stellen.
          </div>
        </section>

        {/* 3. Lernziele */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">3</span>
            Lernziele & Qualifikationen
          </h2>
          <p className="mb-3">Nach Abschluss des Gesamtprogramms sind Teilnehmende in der Lage:</p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {[
              "Die rechtlichen Grundlagen der Immobilienwirtschaft (BGB, GewO, WEG) sicher anzuwenden",
              "Die Tätigkeit als Immobilienmakler nach §34c GewO aufzunehmen (Erlaubnisvoraussetzungen: Zuverlässigkeit, geordnete Vermögensverhältnisse)",
              "Die IHK-Sachkundeprüfung nach §34i GewO (Darlehensvermittler) abzulegen",
              "WEG-Versammlungen rechtssicher vorzubereiten und durchzuführen",
              "Immobilien nach ImmoWertV 2021 mit allen drei Verfahren zu bewerten",
              "Immobilienfinanzierungen nach EU-WIKR zu beraten und zu dokumentieren",
              "Alle relevanten Berechnungen (Courtage, Nebenkostenabrechnung, Annuität) selbständig durchzuführen",
            ].map((z, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>{z}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Curriculum */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">4</span>
            Curriculum — Modulübersicht
          </h2>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200 font-semibold">Modul</th>
                <th className="text-left p-2 border border-slate-200 font-semibold">Inhalt</th>
                <th className="text-center p-2 border border-slate-200 font-semibold">Tage</th>
                <th className="text-center p-2 border border-slate-200 font-semibold">UE</th>
                <th className="text-left p-2 border border-slate-200 font-semibold">Rechtsgrundlage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "Einführung Immobilienwirtschaft", "20", "160", "§34c GewO Grundlagen"],
                ["2", "Immobilienmakler §34c GewO", "60", "440", "§34c GewO, §652 BGB, MaBV"],
                ["3", "Verwalter WEG & Mietrecht", "80", "528", "WEG, §535ff BGB, BetrKV"],
                ["4", "Gutachter & Sachverständiger", "40", "264", "ImmoWertV 2021, §194 BauGB"],
                ["5", "Darlehensvermittler §34i GewO", "40", "304", "§34i GewO, WIKR, §491ff BGB"],
              ].map(([nr, name, tage, ue, recht]) => (
                <tr key={nr} className="hover:bg-slate-50">
                  <td className="p-2 border border-slate-200 font-medium">Modul {nr}</td>
                  <td className="p-2 border border-slate-200">{name}</td>
                  <td className="p-2 border border-slate-200 text-center">{tage}</td>
                  <td className="p-2 border border-slate-200 text-center">{ue}</td>
                  <td className="p-2 border border-slate-200 text-slate-500">{recht}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold">
                <td className="p-2 border border-slate-200">Gesamt</td>
                <td className="p-2 border border-slate-200">Vollständige Immobilienausbildung</td>
                <td className="p-2 border border-slate-200 text-center">240</td>
                <td className="p-2 border border-slate-200 text-center">1.920</td>
                <td className="p-2 border border-slate-200 text-slate-500">§34c, §34i GewO</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. Lernmethodik */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">5</span>
            Lernmethodik & didaktisches Konzept
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              ["Asynchrones Selbststudium", "Strukturierte Tages-Lerneinheiten, abrufbar jederzeit auf allen Geräten (Desktop, Tablet, Smartphone)"],
              ["Synchroner Unterricht", "Geplant: Live-Sessions via Zoom/Teams (nach ZFU-Zulassung) (IHK-Immobilienkaufmann) — Mindestvoraussetzung für AZAV"],
              ["KI-gestützter Tutor", "Gemini 2.0 Flash mit Modulwissensbasis — beantwortet Fachfragen paragraphengenau in Echtzeit"],
              ["Prüfungssimulation", "91 prüfungsnahe Fragen (M1: 20, M2: 17, M3: 17, M4: 22, M5: 15) mit sofortigem Feedback"],
              ["Praxisrechner", "9 interaktive Rechner (Maklercourtage, Mietrendite, Annuität, Nebenkostenabrechnung u.a.)"],
              ["Gamification", "XP-Punkte, Badges, Leaderboard — steigern Motivation und Lernkontinuität"],
            ].map(([titel, beschr]) => (
              <div key={titel} className="p-3 bg-slate-50 rounded-lg">
                <div className="font-semibold text-slate-800 mb-1">{titel}</div>
                <div className="text-slate-600">{beschr}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Lernerfolgskontrolle */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">6</span>
            Lernerfolgskontrolle
          </h2>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Modul-Quiz nach jeder Lerneinheit (Multiple-Choice, sofortige Auswertung)</li>
            <li>Prüfungssimulation: 50 Fragen, 90 Minuten, Bestehensgrenze 70%</li>
            <li>Prüfungsmodus: Schwachstellenanalyse und Wissenslücken-Identifikation</li>
            <li>Zertifikat nach Modul-Abschluss (ab 80% Quiz-Score)</li>
            <li>Lernfortschritts-Tracking in Datenbank (interner Aktivitätsnachweis)</li>
            <li>Fragerecht jederzeit via KI-Tutor (synchron: Live-Sessions, asynchron: KI)</li>
          </ul>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-700">
            <strong>Rechtlicher Hinweis:</strong> Aktuell ist Phase A als digitales Selbstlernmaterial ohne externe Zertifizierung ausgewiesen. FernUSG-/ZFU-relevante Einstufungen werden vor einer kostenpflichtigen Aktivierung gesondert rechtlich geprüft.
          </div>
        </section>

        {/* 7. Qualitätssicherung */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">7</span>
            Qualitätssicherung & Zertifizierungsstatus
          </h2>
          <div className="text-xs space-y-2">
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Phase A (aktiv):</strong> Digitales Lernmaterial — rechtssicher als Selbststudium vermarktbar</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
              <span className="text-amber-600 font-bold">⏳</span>
              <span><strong>Phase B (geplant):</strong> ZFU-Zulassung — Antrag in Vorbereitung (Bearbeitungszeit: 3 Monate)</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 font-bold">○</span>
              <span><strong>Phase C (geplant):</strong> AZAV-Akkreditierung — ermöglicht Bildungsgutschein (BGS) und §16i SGB II</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 font-bold">○</span>
              <span><strong>Phase D (geplant):</strong> IHK-Kooperation — offizielle IHK-Prüfungskooperation</span>
            </div>
          </div>
        </section>

        {/* 8. Dozent */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">8</span>
            Dozent & Qualifikationsnachweis
          </h2>
          <div className="text-xs grid grid-cols-2 gap-4">
            <div><span className="text-slate-400">Name:</span><br /><strong>Alisad Gadyri</strong></div>
            <div><span className="text-slate-400">Qualifikation:</span><br />IHK-Immobilienkaufmann (Berlin, 2023)</div>
            <div><span className="text-slate-400">Fachbereiche:</span><br />§34c GewO, WEG, Mietrecht, Immobilienbewertung, §34i GewO</div>
            <div><span className="text-slate-400">Unterrichtsform:</span><br />Synchron (Zoom/Teams) + Asynchron (Portal)</div>
          </div>
        </section>

        {/* Unterschrift */}
        <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
          <div className="flex justify-between">
            <div>
              <div className="mb-8">Berlin, März 2026</div>
              <div className="border-t border-slate-300 pt-1 w-48">Alisad Gadyri, Geschäftsführer</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400">Immobilien-Akademie Smart</div>
              <div className="text-slate-400">Durlacher Str. 36, 10715 Berlin</div>
              <div className="text-blue-600">immobilien-akademie-smart.de</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

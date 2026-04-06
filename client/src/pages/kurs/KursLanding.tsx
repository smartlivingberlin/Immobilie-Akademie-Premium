import { TrialForm } from "@/components/TrialForm";
import { Link, useLocation } from "wouter";
import { SEO } from "@/components/SEO";
import { useState } from "react";

const KURSE: Record<string, {
  id: string; titel: string; untertitel: string; preis: number;
  tage: number; ue: number; farbe: string; emoji: string;
  hero: string; story: string; zielgruppe: string[];
  inhalte: string[]; vorteile: string[];
  faq: {f: string; a: string}[];
  seo_title: string; seo_desc: string;
}> = {
  "modul-1-immobilien-grundkurs": {
    id: "modul_1",
    titel: "Modul 1: Ihr Fundament in der Immobilienwirtschaft",
    untertitel: "Der smarte Einstieg in Ihre Immobilienkarriere",
    preis: 149, tage: 20, ue: 160, farbe: "blue", emoji: "🏠",
    hero: "Sie wollen in die Immobilienbranche einsteigen — oder Ihr Grundlagenwissen endlich auf ein solides Fundament stellen? Modul 1 ist Ihr persönlicher Crashkurs: praxisnah, verständlich und mit einem KI-Tutor der Ihnen jeden Begriff sofort erklärt.",
    story: "Stellen Sie sich vor: Sie sitzen beim ersten Kundengespräch und der Käufer fragt nach dem Unterschied zwischen Grundschuld und Hypothek. Oder warum der Notar eigentlich nötig ist. Mit Modul 1 haben Sie auf jede dieser Fragen eine kompetente Antwort — weil Sie das Fundament beherrschen, auf dem die gesamte Immobilienwirtschaft aufbaut.",
    zielgruppe: [
      "Quereinsteiger die in die Immobilienbranche einsteigen wollen",
      "Makler die ihr Grundlagenwissen auffrischen möchten",
      "Umschüler mit Jobcenter-Förderung (AZAV)",
      "Alle die §34c, WEG oder §34i anstreben",
    ],
    inhalte: [
      "Immobilienmarkt Deutschland — Strukturen, Akteure, Trends",
      "Grundlagen Immobilienrecht — BGB, WEG, Mietrecht im Überblick",
      "Kaufvertrag, Grundbuch, Notarielle Beurkundung",
      "Erste Schritte in der Immobilienbewertung",
      "Finanzierungsgrundlagen — Darlehen und KfW",
      "Maklerrecht — Provision, Exposé, §34c Pflichten",
      "Steuerrecht für Immobilienprofis",
      "Praxisfallstudien aus dem echten Makleralltag",
    ],
    vorteile: [
      "KI-Tutor erklärt jeden Begriff auf Knopfdruck",
      "Audio-Funktion: Lernen beim Joggen oder Kochen",
      "200+ IHK-orientierte Prüfungsfragen",
      "Offizielles Zertifikat nach Abschluss",
      "Pflichtbasis für alle weiteren Module",
      "Einmalig kaufen — " + zugang.monate + " Monate Vollzugang",
    ],
    faq: [
      { f: "Muss ich Modul 1 vor den anderen Modulen machen?", a: "Modul 1 wird als Basis empfohlen — viele Grundbegriffe die in Modul 2–5 vorausgesetzt werden, werden hier erklärt. Es ist nicht zwingend vorgeschrieben, aber sehr sinnvoll." },
      { f: "Ist Modul 1 für die §34c Prüfung ausreichend?", a: "Nein. Modul 1 legt das Fundament. Für die vollständige §34c-Vorbereitung brauchen Sie zusätzlich Modul 2." },
      { f: "Wie lange dauert das Lernen täglich?", a: "Empfohlen sind 30–60 Minuten täglich. Bei 45 Minuten pro Tag sind Sie in ca. 5–6 Wochen durch." },
    ],
    seo_title: "Immobilien Grundkurs online | IHK-Vorbereitung mit KI-Tutor",
    seo_desc: "Der smarte Einstieg in die Immobilienwirtschaft: 20 Lerntage, 160 UE, KI-Tutor, Zertifikat. Jetzt für 149 EUR starten.",
  },
  "modul-2-makler-34c": {
    id: "modul_2",
    titel: "Modul 2: Immobilienmakler §34c GewO",
    untertitel: "Ihre Lizenz zum Vermitteln — die komplette IHK-Vorbereitung",
    preis: 499, tage: 60, ue: 480, farbe: "green", emoji: "🔑",
    hero: "Ohne §34c-Sachkundeprüfung kein Maklergeschäft. Punkt. Mit Modul 2 bereiten Sie sich in 60 Lerntagen systematisch und sicher auf die IHK-Prüfung vor — mit KI-Tutor, 300+ Übungsfragen und einem bewährten Lernpfad.",
    story: "Der Immobilienmarkt boomt. Qualifizierte Makler werden gesucht. Doch die §34c-Sachkundeprüfung ist eine echte Hürde — Maklerrecht, Steuerrecht, Vertragsrecht alles auf einmal. Modul 2 zerlegt diesen Berg in 60 überschaubare Lerntage. Jeden Tag ein Schritt weiter. Am Ende kennen Sie nicht nur die Antworten für die Prüfung — Sie verstehen das Maklergeschäft von Grund auf.",
    zielgruppe: [
      "Angehende Immobilienmakler vor der IHK-Prüfung",
      "Makler mit §34c Weiterbildungspflicht (20h/Jahr)",
      "Immobilienkaufleute die in die Vermittlung wollen",
      "Quereinsteiger mit Ambitionen im Maklerbereich",
    ],
    inhalte: [
      "§34c GewO — alle Voraussetzungen und Pflichten",
      "Maklervertrag, Alleinauftrag, Provision rechtssicher",
      "Exposé erstellen — rechtssichere Formulierungen",
      "Kaufvertrag und notarielle Beurkundung",
      "Maklerhaftung und aktuelle Rechtsprechung",
      "Immobilienmarketing und professionelle Akquise",
      "Steuerrecht für Makler — EkSt, Umsatzsteuer",
      "Energieausweis — Pflichten und Praxis",
    ],
    vorteile: [
      "300+ IHK-Prüfungsfragen mit Erklärungen",
      "KI-Tutor für komplexe Rechtsfragen",
      "Erfüllt Weiterbildungspflicht §34c (20h/Jahr)",
      "Prüfungssimulation wie in der echten IHK",
      "Zertifikat als Nachweis für IHK und Kunden",
      "Am Handy lernen — überall, jederzeit",
    ],
    faq: [
      { f: "Reicht Modul 2 für die §34c IHK-Prüfung?", a: "Ja! Modul 2 deckt den vollständigen Prüfungsstoff ab. Wir empfehlen vorher Modul 1 als Grundlage." },
      { f: "Gilt das als Weiterbildung nach §34c?", a: "Die Inhalte decken die gesetzliche Weiterbildungspflicht von 20 Stunden pro Jahr vollständig ab." },
      { f: "Wie viele Fragen hat die echte IHK-Prüfung?", a: "Die IHK-Prüfung hat typischerweise 72 Multiple-Choice-Fragen. Unser Prüfungsmodus simuliert genau dieses Format." },
    ],
    seo_title: "§34c GewO Prüfungsvorbereitung online | IHK Makler Sachkundeprüfung",
    seo_desc: "Bestehen Sie die IHK-Sachkundeprüfung nach §34c GewO: 60 Lerntage, 480 UE, 300+ Prüfungsfragen, KI-Tutor. Jetzt für 499 EUR.",
  },
  "modul-3-weg-verwalter": {
    id: "modul_3",
    titel: "Modul 3: WEG-Verwalter & Mietrecht",
    untertitel: "Professionelle Hausverwaltung — rechtssicher und kompetent",
    preis: 699, tage: 80, ue: 640, farbe: "orange", emoji: "🏢",
    hero: "Die WEG-Reform 2020 hat alles verändert. Neue Beschlusskompetenz, neuer Verwaltervertrag, neue Pflichten. Als professioneller Verwalter müssen Sie auf dem neuesten Stand sein. Modul 3 bringt Sie in 80 Lerntagen durch den kompletten Stoff.",
    story: "Stellen Sie sich vor: Eine Eigentümerversammlung mit 30 aufgebrachten Eigentümern. Einer fragt nach der korrekten Einberufungsfrist, ein anderer bezweifelt die Beschlussfähigkeit, der dritte reklamiert seine Nebenkostenabrechnung. Mit Modul 3 haben Sie für jeden dieser Fälle die richtige Antwort — und das Vertrauen das kommt wenn man wirklich weiß wovon man spricht.",
    zielgruppe: [
      "Angehende WEG-Verwalter und Hausverwalter",
      "Makler die Verwaltungsmandate übernehmen",
      "Verwalter vor der Pflicht-Weiterbildung §26a WEG",
      "Hausverwaltungen die Mitarbeiter schulen",
    ],
    inhalte: [
      "WEG-Reform 2020 — alle Änderungen kompakt erklärt",
      "Eigentümerversammlung — Einladung, Beschlüsse, Protokoll",
      "Nebenkostenabrechnung rechtssicher erstellen",
      "Verwaltervertrag — Rechte, Pflichten, Haftung",
      "Mietrecht §535ff BGB — Mietvertrag, Kündigung, Kaution",
      "Instandhaltung, Instandsetzung, Modernisierung",
      "Wohnungseigentumsrecht in der Praxis",
      "Aktuelle Rechtsprechung und Streitfälle",
    ],
    vorteile: [
      "Erfüllt Weiterbildungspflicht §26a WEG",
      "Aktuellster Stand WEG-Reform 2020",
      "400+ Prüfungsfragen Mietrecht und WEG",
      "Praxisfälle aus der echten Hausverwaltung",
      "KI-Tutor für komplexe Eigentumsfragen",
      "Zertifikat als Nachweis für Eigentümer und Auftraggeber",
    ],
    faq: [
      { f: "Erfüllt das die Weiterbildungspflicht nach §26a WEG?", a: "Die Inhalte decken die gesetzlich vorgeschriebene Weiterbildung für WEG-Verwalter vollständig ab." },
      { f: "Wie aktuell sind die Inhalte?", a: "Alle Inhalte sind auf dem Stand der WEG-Reform 2020 und werden regelmäßig aktualisiert." },
      { f: "Brauche ich Vorwissen?", a: "Modul 1 als Grundlage wird empfohlen. Grundkenntnisse im deutschen Recht sind hilfreich aber nicht zwingend." },
    ],
    seo_title: "WEG-Verwalter Weiterbildung online | §26a WEG Pflichtfortbildung",
    seo_desc: "Professionelle Hausverwaltung: WEG-Reform 2020, Mietrecht, Nebenkostenabrechnung. 80 Lerntage, 640 UE. Jetzt für 699 EUR.",
  },
  "modul-4-gutachter": {
    id: "modul_4",
    titel: "Modul 4: Immobilienbewertung & Sachverständigenwesen",
    untertitel: "Werte erkennen die andere übersehen",
    preis: 399, tage: 40, ue: 320, farbe: "purple", emoji: "📊",
    hero: "Eine Immobilie richtig bewerten — das ist Kunst und Wissenschaft zugleich. Vergleichswert, Ertragswert, Sachwert: In Modul 4 meistern Sie alle drei Verfahren nach ImmoWertV 2021 und bereiten sich auf Sachverständigen-Tätigkeiten und HypZert vor.",
    story: "Der Unterschied zwischen einem guten und einem sehr guten Immobilienprofi? Die einen schätzen Immobilien — die anderen bewerten sie. Mit Methode, mit Verfahren, mit Begründung. Wer ImmoWertV 2021 beherrscht und Ertragswerte sicher berechnet, hat einen Informationsvorsprung den kein Portalbewertungstool ersetzen kann.",
    zielgruppe: [
      "Makler die Bewertungsgutachten erstellen wollen",
      "Bankmitarbeiter in der Immobilienfinanzierung",
      "Angehende Sachverständige und Gutachter",
      "HypZert-Kandidaten und Beleihungswertprüfer",
    ],
    inhalte: [
      "ImmoWertV 2021 — alle Grundsätze und Änderungen",
      "Vergleichswertverfahren — Kaufpreissammlungen nutzen",
      "Ertragswertverfahren — Rendite und Kapitalisierung",
      "Sachwertverfahren — Herstellungskosten und Abschreibung",
      "Beleihungswertermittlung nach BelWertV",
      "Gutachterausschüsse und Bodenrichtwerte",
      "Bewertung bei Erbschaft, Scheidung, Zwangsversteigerung",
      "HypZert S — Vorbereitung auf die Zertifizierungsprüfung",
    ],
    vorteile: [
      "HypZert S Vorbereitung inklusive",
      "ImmoWertV 2021 — neuester Rechtsstand",
      "Integrierter Immobilienrechner für alle Verfahren",
      "200+ Prüfungsfragen Bewertungsverfahren",
      "KI-Tutor erklärt Berechnungen Schritt für Schritt",
      "Zertifikat für Kunden und Auftraggeber",
    ],
    faq: [
      { f: "Werde ich damit zum zertifizierten Sachverständigen?", a: "Das Modul bereitet auf die HypZert-Prüfung vor und vermittelt alle nötigen Kenntnisse. Die offizielle Zertifizierung erfolgt durch HypZert GmbH." },
      { f: "Ist ImmoWertV 2021 komplett enthalten?", a: "Ja, alle Änderungen der ImmoWertV 2021 sind vollständig und aktuell integriert." },
      { f: "Brauche ich Mathematik-Kenntnisse?", a: "Grundrechenarten reichen. Unser KI-Tutor erklärt jeden Rechenschritt verständlich, der integrierte Rechner hilft beim Üben." },
    ],
    seo_title: "Immobilienbewertung lernen online | ImmoWertV 2021 & HypZert Vorbereitung",
    seo_desc: "Vergleichswert, Ertragswert, Sachwert nach ImmoWertV 2021: 40 Lerntage, 320 UE, HypZert-Vorbereitung. Jetzt für 399 EUR.",
  },
  "modul-5-34i-darlehensvermittler": {
    id: "modul_5",
    titel: "Modul 5: Darlehensvermittler §34i GewO",
    untertitel: "Immobilienfinanzierung als Ihr Geschäftsfeld",
    preis: 499, tage: 40, ue: 320, farbe: "teal", emoji: "💶",
    hero: "Die Nachfrage nach kompetenter Immobilienfinanzierungsberatung boomt. Mit der §34i-Erlaubnis erschließen Sie sich ein lukratives Geschäftsfeld. Modul 5 bringt Sie in 40 Lerntagen durch alle Prüfungsthemen — von KfW bis ESIS.",
    story: "Wer heute eine Immobilie kauft fragt nicht mehr nur nach dem Preis — er fragt nach der besten Finanzierung. Welche KfW-Förderung passt? Wie hoch sollte die Tilgung sein? Was bedeutet das ESIS-Merkblatt? Als §34i-zugelassener Darlehensvermittler sind Sie der Experte dem Käufer und Verkäufer gleichermaßen vertrauen.",
    zielgruppe: [
      "Makler die Finanzierungsberatung anbieten wollen",
      "Angehende §34i-Darlehensvermittler",
      "Bankmitarbeiter die sich selbständig machen",
      "Finanzberater mit Immobilienfokus",
    ],
    inhalte: [
      "§34i GewO — Erlaubnisvoraussetzungen und Pflichten",
      "Annuitätendarlehen — Berechnung, Tilgung, Zinsbindung",
      "KfW-Förderprogramme 2025 — alle aktuellen Produkte",
      "EU-Wohnimmobilienkreditrichtlinie (EU-WIKR)",
      "ESIS-Merkblatt — Erstellung und Pflichten",
      "Bonität prüfen — Schufa, Einkommensnachweise",
      "Nachrangdarlehen und Zwischenfinanzierung",
      "Haftung und Dokumentationspflichten §34i",
    ],
    vorteile: [
      "Erfüllt Weiterbildungspflicht §34i (15h/Jahr)",
      "Aktuelle KfW-Programme 2025 vollständig",
      "EU-WIKR und ESIS prüfungsrelevant erklärt",
      "200+ Prüfungsfragen §34i",
      "Integrierter Finanzierungsrechner",
      "Zertifikat als Nachweis für die IHK",
    ],
    faq: [
      { f: "Reicht das für die §34i IHK-Sachkundeprüfung?", a: "Ja! Modul 5 deckt den vollständigen Prüfungsstoff der §34i-Sachkundeprüfung komplett ab." },
      { f: "Sind die KfW-Programme aktuell?", a: "Ja, wir aktualisieren die KfW-Inhalte regelmäßig. Aktuell auf dem Stand 2025." },
      { f: "Gilt das als Weiterbildung nach §34i?", a: "Die Inhalte decken die gesetzliche Weiterbildungspflicht von 15 Stunden pro Jahr vollständig ab." },
    ],
    seo_title: "§34i GewO Prüfungsvorbereitung online | Darlehensvermittler IHK Kurs",
    seo_desc: "Bestehen Sie die §34i IHK-Sachkundeprüfung: 40 Lerntage, 320 UE, KfW 2025, KI-Tutor. Jetzt für 499 EUR starten.",
  },
};

const FARBEN: Record<string, {grad: string; btn: string; badge: string}> = {
  blue:   { grad: "from-blue-700 to-blue-900",   btn: "bg-blue-600 hover:bg-blue-700",   badge: "bg-blue-100 text-blue-800" },
  green:  { grad: "from-green-700 to-green-900",  btn: "bg-green-600 hover:bg-green-700", badge: "bg-green-100 text-green-800" },
  orange: { grad: "from-orange-600 to-orange-800",btn: "bg-orange-500 hover:bg-orange-600",badge: "bg-orange-100 text-orange-800" },
  purple: { grad: "from-purple-700 to-purple-900",btn: "bg-purple-600 hover:bg-purple-700",badge: "bg-purple-100 text-purple-800" },
  teal:   { grad: "from-teal-700 to-teal-900",   btn: "bg-teal-600 hover:bg-teal-700",   badge: "bg-teal-100 text-teal-800" },
};

const ZUGANG: Record<string, {monate: number; verlaengerung: number; versuche: number}> = {
  "modul-1-immobilien-grundkurs":    { monate: 4,  verlaengerung: 2, versuche: 3 },
  "modul-2-makler-34c":              { monate: 8,  verlaengerung: 3, versuche: 3 },
  "modul-3-weg-verwalter":           { monate: 10, verlaengerung: 4, versuche: 3 },
  "modul-4-gutachter":               { monate: 6,  verlaengerung: 2, versuche: 3 },
  "modul-5-34i-darlehensvermittler": { monate: 6,  verlaengerung: 2, versuche: 3 },
};

export default function KursLanding({ slug }: { slug: string }) {
  const kurs = KURSE[slug];
  const zugang = ZUGANG[slug] || { monate: 6, verlaengerung: 2, versuche: 3 };
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleKaufen = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: kurs.id }),
      });
      if (!res.ok) throw new Error("Checkout fehlgeschlagen");
      const { url } = await res.json();
      if (url) window.location.href = url;
      else navigate("/login");
    } catch (e) {
      // Fallback: zur Login/Kurse Seite
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (!kurs) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Kurs nicht gefunden</h1>
        <Link href="/kurse"><button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl">Alle Kurse ansehen</button></Link>
      </div>
    </div>
  );

  const f = FARBEN[kurs.farbe] || FARBEN.blue;

  return (
    <>
      <SEO title={kurs.seo_title} description={kurs.seo_desc} />
      <div className="min-h-screen bg-white">

        {/* HERO SECTION */}
        <div className={`bg-gradient-to-br ${f.grad} text-white`}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <Link href="/kurse">
              <button className="text-white/60 hover:text-white text-sm mb-8 flex items-center gap-2 transition-colors">
                ← Alle Kurse
              </button>
            </Link>
            <div className="text-6xl mb-6">{kurs.emoji}</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-3xl">{kurs.titel}</h1>
            <p className="text-xl text-white/80 mb-8 font-medium">{kurs.untertitel}</p>
            <p className="text-lg text-white/90 max-w-3xl leading-relaxed mb-12">{kurs.hero}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Lerntage", value: kurs.tage },
                { label: "Unterrichtseinheiten", value: kurs.ue },
                { label: "Prüfungsfragen", value: "200+" },
                { label: "Zugang", value: String(zugang.monate) + " Monate" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-white/60 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleKaufen}
                disabled={loading}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Weiterleitung..." : `Jetzt kaufen — ${kurs.preis} EUR`}
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("kostenlos-testen");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                🎁 Kostenlos 24h testen
              </button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              ✓ 14 Tage Widerrufsrecht &nbsp;·&nbsp; ✓ Sichere Zahlung via Stripe &nbsp;·&nbsp; ✓ Sofortzugang nach Kauf
            </p>
          </div>
        </div>

        {/* STORY */}
        <div className="bg-slate-50 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-400 pl-6">
              "{kurs.story}"
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6">

          {/* ZIELGRUPPE */}
          <div className="py-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Für wen ist dieser Kurs?</h2>
            <p className="text-slate-500 mb-8">Dieser Kurs wurde entwickelt für:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kurs.zielgruppe.map((z, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-5">
                  <span className="text-green-500 text-xl font-bold mt-0.5">✓</span>
                  <span className="text-slate-700 font-medium">{z}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LERNINHALTE */}
          <div className="py-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Was Sie lernen</h2>
            <p className="text-slate-500 mb-8">
              {kurs.tage} Lerntage · {kurs.ue} Unterrichtseinheiten à 45 Min · Strukturierter Lernpfad
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kurs.inhalte.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <span className="text-blue-500 font-bold text-lg mt-0.5">→</span>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VORTEILE */}
          <div className="py-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Ihre Vorteile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kurs.vorteile.map((v, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                  <div className="text-2xl mb-3">⭐</div>
                  <p className="text-slate-700 text-sm leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="py-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Häufige Fragen</h2>
            <div className="space-y-4">
              {kurs.faq.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.f}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FINALER CTA */}
        <div className={`bg-gradient-to-br ${f.grad} text-white`}>
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <div className="text-5xl mb-6">{kurs.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für den nächsten Schritt?</h2>
            <p className="text-white/70 mb-2 text-lg">Einmalige Investition — {zugang.monate} Monate Vollzugang Nutzen</p>
            <div className="text-7xl font-bold my-6">{kurs.preis} EUR</div>
            <p className="text-white/50 mb-6">
              Einmalige Zahlung · {zugang.monate} Monate Vollzugang · {zugang.versuche}× Prüfungsversuch
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { text: "Monate Zugang", val: zugang.monate },
                { text: "Monate verlängerbar", val: zugang.verlaengerung },
                { text: "Prüfungsversuche", val: zugang.versuche },
              ].map(b => (
                <span key={b.text} className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">
                  ✓ {b.val} {b.text}
                </span>
              ))}
              <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">✓ Zertifikat inklusive</span>
              <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">✓ Sofortzugang nach Kauf</span>
            </div>
              <button
                onClick={handleKaufen}
                disabled={loading}
                className="bg-white text-slate-900 px-12 py-5 rounded-xl font-bold text-xl hover:bg-white/90 transition-all shadow-2xl disabled:opacity-70"
              >
                {loading ? "Weiterleitung zu Stripe..." : `Jetzt kaufen — ${kurs.preis} EUR`}
              </button>
              <p className="mt-4 text-white/60 text-sm">
                Oder{" "}
                <a href="#kostenlos-testen" className="underline hover:text-white">
                  24h kostenlos testen
                </a>
              </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              <span>✓ 14 Tage Widerrufsrecht</span>
              <span>✓ Sichere Zahlung via Stripe</span>
              <span>✓ Sofortzugang nach Kauf</span>
              <span>✓ Auf allen Geräten nutzbar</span>
              <span>✓ Verlängerung auf Anfrage möglich</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION ZU ANDEREN KURSEN */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Weitere Kurse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(KURSE).filter(([s]) => s !== slug).map(([s, k]) => (
              <Link key={s} href={`/kurs/${s}`}>
                <div className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-2xl mb-2">{k.emoji}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{k.titel}</h3>
                  <p className="text-slate-500 text-xs">{k.tage} Tage · {k.ue} UE · {k.preis} EUR</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export { KURSE };

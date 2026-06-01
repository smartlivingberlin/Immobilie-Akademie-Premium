import { TrialForm } from "@/components/TrialForm";
import { AudioPreview } from "@/components/AudioPreview";
import { VideoPreview } from "@/components/VideoPreview";
import { Link, useLocation } from "wouter";
import { SEO } from "@/components/SEO";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

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
      "Umschüler und Quereinsteiger (AZAV-Zulassung in Vorbereitung)",
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
      "200+ Lernfragen und Praxisübungen",
      "Kursabschluss-Zertifikat nach erfolgreichem Kursabschluss",
      "Pflichtbasis für alle weiteren Module",
      "Einmalig kaufen — zeitlich befristeter Vollzugang",
    ],
    faq: [
      { f: "Muss ich Modul 1 vor den anderen Modulen machen?", a: "Modul 1 wird als Basis empfohlen — viele Grundbegriffe die in Modul 2–5 vorausgesetzt werden, werden hier erklärt. Es ist nicht zwingend vorgeschrieben, aber sehr sinnvoll." },
      { f: "Ist Modul 1 als Grundlage für §34c-Themen ausreichend?", a: "Nein. Modul 1 legt das Fundament. Für vertiefte §34c-Praxis- und Weiterbildungsthemen empfehlen wir zusätzlich Modul 2." },
      { f: "Wie lange dauert das Lernen täglich?", a: "Empfohlen sind 30–60 Minuten täglich. Bei 45 Minuten pro Tag sind Sie in ca. 5–6 Wochen durch." },
    ],
    seo_title: "Immobilien Grundkurs online | Grundlagen mit KI-Tutor",
    seo_desc: "Der smarte Einstieg in die Immobilienwirtschaft: 20 Lerntage, 160 UE, KI-Tutor, Zertifikat. Jetzt für 149 EUR Endpreis starten.",
  },
  "modul-2-makler-34c": {
    id: "modul_2",
    titel: "Modul 2: Immobilienmakler §34c GewO",
    untertitel: "Fach- und Praxisvorbereitung §34c - strukturiert und praxisnah",
    preis: 499, tage: 60, ue: 480, farbe: "green", emoji: "🔑",
    hero: "Mit Modul 2 vertiefen Sie in 60 Lerntagen Maklerrecht, Provision, Exposé, Kaufvertrag, GwG und MaBV - mit KI-Tutor, Praxisaufgaben und einem strukturierten Lernpfad.",
    story: "Der Immobilienmarkt bleibt anspruchsvoll. Qualifizierte Makler brauchen belastbares Praxiswissen: Maklerrecht, Provision, Exposé, Kaufvertrag, GwG und MaBV. Modul 2 zerlegt diese Themen in 60 überschaubare Lerntage. Jeden Tag ein Schritt weiter. Am Ende kennen Sie nicht nur typische Fallfragen - Sie verstehen das Maklergeschäft von Grund auf.",
    zielgruppe: [
      "Angehende Immobilienmakler mit Fokus auf §34c-Praxiswissen",
      "Makler mit Fokus auf §34c-Weiterbildungsthemen",
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
      "300+ Praxisaufgaben und Lernfragen mit Erklärungen",
      "KI-Tutor für komplexe Rechtsfragen",
      "Orientiert an typischen §34c-Weiterbildungsthemen",
      "Strukturierte Wissenschecks und Fallübungen",
      "Kursabschluss-Zertifikat nach erfolgreichem Abschluss",
      "Am Handy lernen — überall, jederzeit",
    ],
    faq: [
      { f: "Bereitet Modul 2 auf §34c-Praxis und Weiterbildung vor?", a: "Ja, Modul 2 behandelt zentrale Themen rund um Maklerrecht, Provision, Exposé, Kaufvertrag, GwG und MaBV. Es ersetzt keine behördliche, rechtliche oder prüfungsrechtliche Zulassungsauskunft." },
      { f: "Gilt das als Weiterbildung nach §34c?", a: "Die Inhalte sind an typischen §34c-Weiterbildungsthemen orientiert. Ob ein Nachweis im Einzelfall anerkannt wird, sollte mit der zuständigen Stelle oder dem Auftraggeber geprüft werden." },
      { f: "Wie sind die Wissenschecks aufgebaut?", a: "Die Wissenschecks kombinieren Multiple-Choice-Fragen, Praxisfälle und Wiederholungsfragen. Sie dienen der Lernkontrolle und sind keine Aussage über ein amtliches Prüfungsformat." },
    ],
    seo_title: "§34c GewO Fachwissen online | Maklerrecht und Praxis",
    seo_desc: "Fach- und Praxiswissen für Immobilienmakler nach §34c GewO: 60 Lerntage, 480 UE, Praxisaufgaben, KI-Tutor. Jetzt für 499 EUR Endpreis.",
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
      "Orientiert an Weiterbildungsthemen für WEG-Verwalter",
      "Aktuellster Stand WEG-Reform 2020",
      "400+ Lernfragen Mietrecht und WEG",
      "Praxisfälle aus der echten Hausverwaltung",
      "KI-Tutor für komplexe Eigentumsfragen",
      "Zertifikat als Nachweis für Eigentümer und Auftraggeber",
    ],
    faq: [
      { f: "Erfüllt das die Weiterbildungspflicht nach §26a WEG?", a: "Die Inhalte orientieren sich an typischen Weiterbildungsthemen für WEG-Verwalter. Anerkennung oder Nachweiswirkung sollten im Einzelfall geprüft werden." },
      { f: "Wie aktuell sind die Inhalte?", a: "Alle Inhalte sind auf dem Stand der WEG-Reform 2020 und werden regelmäßig aktualisiert." },
      { f: "Brauche ich Vorwissen?", a: "Modul 1 als Grundlage wird empfohlen. Grundkenntnisse im deutschen Recht sind hilfreich aber nicht zwingend." },
    ],
    seo_title: "WEG-Verwalter Weiterbildung online | §26a WEG Pflichtfortbildung",
    seo_desc: "Professionelle Hausverwaltung: WEG-Reform 2020, Mietrecht, Nebenkostenabrechnung. 80 Lerntage, 640 UE. Jetzt für 699 EUR Endpreis.",
  },
  "modul-4-gutachter": {
    id: "modul_4",
    titel: "Modul 4: Immobilienbewertung & Sachverständigenwesen",
    untertitel: "Werte erkennen die andere übersehen",
    preis: 399, tage: 40, ue: 320, farbe: "purple", emoji: "📊",
    hero: "Eine Immobilie richtig bewerten — das ist Kunst und Wissenschaft zugleich. Vergleichswert, Ertragswert, Sachwert: In Modul 4 lernen Sie die zentralen Verfahren nach ImmoWertV 2021 kennen und ordnen Sachverständigen- und Zertifizierungsthemen realistisch ein.",
    story: "Der Unterschied zwischen einem guten und einem sehr guten Immobilienprofi? Die einen schätzen Immobilien — die anderen bewerten sie. Mit Methode, mit Verfahren, mit Begründung. Wer ImmoWertV 2021 beherrscht und Ertragswerte sicher berechnet, hat einen Informationsvorsprung den kein Portalbewertungstool ersetzen kann.",
    zielgruppe: [
      "Makler die Bewertungsgutachten erstellen wollen",
      "Bankmitarbeiter in der Immobilienfinanzierung",
      "Angehende Sachverständige und Gutachter",
      "Immobilienprofis mit Interesse an Bewertungs- und Zertifizierungsthemen",
    ],
    inhalte: [
      "ImmoWertV 2021 — alle Grundsätze und Änderungen",
      "Vergleichswertverfahren — Kaufpreissammlungen nutzen",
      "Ertragswertverfahren — Rendite und Kapitalisierung",
      "Sachwertverfahren — Herstellungskosten und Abschreibung",
      "Beleihungswertermittlung nach BelWertV",
      "Gutachterausschüsse und Bodenrichtwerte",
      "Bewertung bei Erbschaft, Scheidung, Zwangsversteigerung",
      "Bewertungs- und Zertifizierungskontext",
    ],
    vorteile: [
      "HypZert-Kontext und Bewertungsgrundlagen",
      "ImmoWertV 2021 — neuester Rechtsstand",
      "Integrierter Immobilienrechner für alle Verfahren",
      "200+ Lernfragen Bewertungsverfahren",
      "KI-Tutor erklärt Berechnungen Schritt für Schritt",
      "Zertifikat für Kunden und Auftraggeber",
    ],
    faq: [
      { f: "Werde ich damit zum zertifizierten Sachverständigen?", a: "Das Modul vermittelt Grundlagen und Praxiswissen zu Bewertungsmethoden. Eine offizielle Zertifizierung erfolgt ausschließlich durch die zuständige Zertifizierungsstelle." },
      { f: "Ist ImmoWertV 2021 komplett enthalten?", a: "Die zentralen Änderungen und Grundsätze der ImmoWertV 2021 werden praxisnah behandelt." },
      { f: "Brauche ich Mathematik-Kenntnisse?", a: "Grundrechenarten reichen. Unser KI-Tutor erklärt jeden Rechenschritt verständlich, der integrierte Rechner hilft beim Üben." },
    ],
    seo_title: "Immobilienbewertung lernen online | ImmoWertV 2021 und Bewertungspraxis",
    seo_desc: "Vergleichswert, Ertragswert, Sachwert nach ImmoWertV 2021: 40 Lerntage, 320 UE, Bewertungs- und Zertifizierungskontext. Jetzt für 399 EUR Endpreis.",
  },
  "modul-5-34i-darlehensvermittler": {
    id: "modul_5",
    titel: "Modul 5: Darlehensvermittler §34i GewO",
    untertitel: "Immobilienfinanzierung als Ihr Geschäftsfeld",
    preis: 499, tage: 40, ue: 320, farbe: "teal", emoji: "💶",
    hero: "Die Nachfrage nach kompetenter Immobilienfinanzierungsberatung bleibt hoch. Mit §34i-Fachwissen erschließen Sie sich ein anspruchsvolles Geschäftsfeld. Modul 5 führt Sie in 40 Lerntagen durch zentrale Fachthemen - von KfW bis ESIS.",
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
      "Orientiert an Weiterbildungsthemen §34i",
      "Aktuelle KfW-Programme 2025 im Überblick",
      "EU-WIKR und ESIS prüfungsrelevant erklärt",
      "200+ Lernfragen §34i",
      "Integrierter Finanzierungsrechner",
      "Kursabschluss-Zertifikat nach erfolgreichem Abschluss",
    ],
    faq: [
      { f: "Reicht das für die §34i IHK-Sachkundeprüfung?", a: "Modul 5 behandelt zentrale prüfungsrelevante Themen rund um Darlehensrecht, Verbraucherschutz, KfW-Förderung, Bonitätsprüfung und Beratungspflichten." },
      { f: "Sind die KfW-Programme aktuell?", a: "Ja, wir aktualisieren die KfW-Inhalte regelmäßig. Aktuell auf dem Stand 2025." },
      { f: "Gilt das als Weiterbildung nach §34i?", a: "Die Inhalte orientieren sich an typischen Weiterbildungsthemen für Immobiliardarlehensvermittler. Anerkennung oder Nachweiswirkung sollten im Einzelfall geprüft werden." },
    ],
    seo_title: "§34i GewO Vorbereitung online | Darlehensvermittler Kurs",
    seo_desc: "Bereiten Sie zentrale §34i-Themen strukturiert vor: 40 Lerntage, 320 UE, KfW 2025, KI-Tutor. Jetzt für 499 EUR Endpreis starten.",
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
  const [widerrufsAkzeptiert, setWiderrufsAkzeptiert] = useState(false);
  const [agbAkzeptiert, setAgbAkzeptiert] = useState(false);
  const [widerrufsError, setWiderrufsError] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleKaufen = async () => {
    if (!widerrufsAkzeptiert || !agbAkzeptiert) {
      setWiderrufsError(true);
      setCheckoutError("Bitte bestätigen Sie Widerrufsbelehrung, AGB und Datenschutzerklärung.");
      return;
    }
    setWiderrufsError(false);
    setCheckoutError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: kurs.id,
          userEmail: user?.email || "",
          widerrufsAkzeptiert: widerrufsAkzeptiert,
        }),
      });
      if (!res.ok) throw new Error("Checkout fehlgeschlagen");
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setCheckoutError("Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } catch (e: any) {
      console.error("Checkout Fehler:", e);
      // Im Vorschau-Modus: kein Login-Redirect
      if (document.cookie.includes("inspect_mode") || 
          sessionStorage.getItem("inspect_mode") === "1") {
        alert("Vorschau-Modus: Kaeufe sind deaktiviert. In der echten Version funktioniert der Kauf mit Stripe.");
        return;
      }
      setCheckoutError("Checkout fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.");
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
  const FARB_MAP: Record<string, string> = {
    blue: "#2563eb", green: "#059669", orange: "#ea580c",
    purple: "#7c3aed", teal: "#0d9488"
  };
  const hauptfarbe = FARB_MAP[kurs.farbe] || "#2563eb";

  return (
    <>
      <SEO title={kurs.seo_title} description={kurs.seo_desc} ogImage="/icon-512.png" />
      <div style={{ minHeight:"100vh", background:"#f8fafc" }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <div style={{ background:`linear-gradient(135deg, #0c1628 0%, #0f2744 50%, #1a3a5c 100%)`, padding:"72px 20px 56px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:`${hauptfarbe}12`, pointerEvents:"none" }} />
          <div style={{ maxWidth:960, margin:"0 auto" }}>
            <Link href="/kurse">
              <button style={{ color:"rgba(255,255,255,0.5)", background:"none", border:"none", cursor:"pointer", fontSize:13, marginBottom:24, display:"flex", alignItems:"center", gap:6 }}>
                ← Alle Kurse
              </button>
            </Link>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"start" }}>
              <div>
                <div style={{ fontSize:56, marginBottom:16 }}>{kurs.emoji}</div>
                <h1 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:900, color:"#f1f5f9", margin:"0 0 12px", lineHeight:1.15, letterSpacing:"-0.02em" }}>
                  {kurs.titel}
                </h1>
                <p style={{ fontSize:18, color:`${hauptfarbe === "#2563eb" ? "#93c5fd" : "rgba(255,255,255,0.7)"}`, fontWeight:600, margin:"0 0 16px" }}>
                  {kurs.untertitel}
                </p>
                <p style={{ fontSize:16, color:"rgba(255,255,255,0.75)", lineHeight:1.7, maxWidth:600, margin:"0 0 32px" }}>
                  {kurs.hero}
                </p>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:32 }}>
                  {[
                    { label:"Lerntage", value: String(kurs.tage) },
                    { label:"Unterrichtseinheiten", value: String(kurs.ue) },
                    { label:"Lernfragen", value:"200+" },
                    { label:"Zugang", value:`${zugang.monate} Mon.` },
                  ].map(s => (
                    <div key={s.label} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:12, padding:"12px 20px", textAlign:"center", minWidth:80 }}>
                      <div style={{ fontSize:22, fontWeight:900, color:"white", fontFamily:"Fraunces, Georgia, serif" }}>{s.value}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── STICKY KAUF-BOX ── */}
              <div style={{ background:"white", borderRadius:20, padding:"28px 24px", width:300, boxShadow:"0 20px 60px rgba(0,0,0,0.4)", flexShrink:0, border:`2px solid ${hauptfarbe}30` }}>
                <div style={{ fontSize:11, fontWeight:700, color:hauptfarbe, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>
                  {kurs.emoji} {kurs.titel.split(":")[0]}
                </div>
                <div style={{ fontSize:38, fontWeight:900, color:"#0f172a", fontFamily:"Fraunces, Georgia, serif", letterSpacing:"-0.02em", margin:"4px 0 4px" }}>
                  {kurs.preis} €
                </div>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:16 }}>Endpreis · Einmalzahlung · kein Abo</div>

                {/* Widerrufs-Checkbox */}
                <div style={{ background: widerrufsError ? "#fef2f2" : "#f8fafc", border:`1px solid ${widerrufsError ? "#fca5a5" : "#e2e8f0"}`, borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer" }}>
                    <input type="checkbox" checked={widerrufsAkzeptiert}
                      onChange={e => { setWiderrufsAkzeptiert(e.target.checked); setWiderrufsError(false); }}
                      style={{ marginTop:2, width:14, height:14, flexShrink:0, cursor:"pointer", accentColor:hauptfarbe }} />
                    <span style={{ fontSize:10, color:"#64748b", lineHeight:1.5 }}>
                      Ich stimme zu, dass mit der Ausführung sofort begonnen wird und bestätige den Verlust des Widerrufsrechts gemäß{" "}
                      <a href="/widerruf" target="_blank" style={{ color:hauptfarbe }}>§356 Abs. 5 BGB</a>.
                    </span>
                  </label>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer", marginTop:8 }}>
                    <input type="checkbox" checked={agbAkzeptiert}
                      onChange={e => { setAgbAkzeptiert(e.target.checked); setWiderrufsError(false); setCheckoutError(null); }}
                      style={{ marginTop:2, width:14, height:14, flexShrink:0, cursor:"pointer", accentColor:hauptfarbe }} />
                    <span style={{ fontSize:10, color:"#64748b", lineHeight:1.5 }}>
                      Ich akzeptiere die <a href="/agb" target="_blank" style={{ color:hauptfarbe, fontWeight:600 }}>AGB</a> und die <a href="/datenschutz" target="_blank" style={{ color:hauptfarbe, fontWeight:600 }}>Datenschutzerklärung</a>.
                    </span>
                  </label>
                  {widerrufsError && <p style={{ color:"#dc2626", fontSize:10, marginTop:4, marginLeft:22 }}>Bitte zuerst bestätigen.</p>}
                </div>

                {checkoutError && <p style={{ color: "#dc2626", fontSize: 12, marginBottom: 12, textAlign: "center", fontWeight: 600 }}>{checkoutError}</p>}

                <button onClick={handleKaufen} disabled={loading}
                  style={{ width:"100%", background:`linear-gradient(135deg, ${hauptfarbe}, ${hauptfarbe}cc)`, color:"white", border:"none", borderRadius:12, padding:"14px", fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", boxShadow:`0 4px 16px ${hauptfarbe}50`, marginBottom:10, opacity:loading?0.7:1 }}>
                  {loading ? "Weiterleitung..." : `Jetzt kaufen — ${kurs.preis} €`}
                </button>
                <button onClick={() => { const el = document.getElementById("kostenlos-testen"); if(el) el.scrollIntoView({behavior:"smooth"}); }}
                  style={{ width:"100%", background:"transparent", color:hauptfarbe, border:`1px solid ${hauptfarbe}40`, borderRadius:12, padding:"11px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  🎁 24h kostenlos testen
                </button>

                <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:6 }}>
                  {[`✓ ${zugang.monate} Monate Vollzugang`, "✓ Sofortzugang nach Kauf", "✓ Zertifikat inklusive", "✓ Sichere Zahlung via Stripe"].map(t => (
                    <div key={t} style={{ fontSize:11, color:"#64748b", display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ color:"#10b981" }}>✓</span> {t.replace("✓ ","")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <div style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"14px 20px" }}>
          <div style={{ maxWidth:960, margin:"0 auto", display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {["🎓 Praxiswissen","🤖 KI-Tutor inklusive","🔒 Stripe-Zahlung","📋 Zertifikat","⚡ Sofortzugang"].map(t => (
              <span key={t} style={{ fontSize:12, color:"#64748b", fontWeight:600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── AUDIO VORSCHAU ───────────────────────────────── */}
        <div style={{ background:"#f0f9ff", borderTop:"1px solid #bae6fd", borderBottom:"1px solid #bae6fd", padding:"20px" }}>
          <div style={{ maxWidth:960, margin:"0 auto", display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ fontSize:32 }}>🎧</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#0369a1" }}>
                Jetzt kostenlos reinhören — erste Lektion als Vorschau
              </div>
              <div style={{ fontSize:12, color:"#0284c7" }}>
                Hören Sie wie der KI-gestützte Audio-Lernmodus klingt — kein Login nötig
              </div>
            </div>
            <AudioPreview
              moduleId={parseInt(kurs.id.replace("modul_",""))||1}
              hauptfarbe={hauptfarbe}
            />
          </div>
        </div>

        {/* ── STORY ─────────────────────────────────────────── */}
        <div style={{ background:"#eff6ff", borderBottom:"1px solid #dbeafe", padding:"40px 20px" }}>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            <p style={{ fontSize:18, color:"#1e40af", lineHeight:1.8, fontStyle:"italic", borderLeft:`4px solid ${hauptfarbe}`, paddingLeft:24, margin:0 }}>
              "{kurs.story}"
            </p>
          </div>
        </div>

        <div style={{ maxWidth:960, margin:"0 auto", padding:"0 20px" }}>

          {/* ── VIDEO VORSCHAU ───────────────────────────────── */}
        <div style={{ maxWidth:960, margin:"0 auto", padding:"32px 20px 0" }}>
          <VideoPreview
            hauptfarbe={hauptfarbe}
            titel={kurs.titel}
            beschreibung={`${kurs.tage} Lerntage · ${kurs.ue} UE · KI-Tutor inklusive`}
          />
        </div>

        {/* ── ZIELGRUPPE ────────────────────────────────────── */}
          <div style={{ padding:"56px 0 48px" }}>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:28, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>Für wen ist dieser Kurs?</h2>
            <p style={{ color:"#64748b", marginBottom:24, fontSize:15 }}>Dieser Kurs wurde entwickelt für:</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:12 }}>
              {kurs.zielgruppe.map((z, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                  <span style={{ color:"#10b981", fontSize:18, flexShrink:0 }}>✓</span>
                  <span style={{ color:"#374151", fontSize:14, fontWeight:500, lineHeight:1.5 }}>{z}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── LERNINHALTE ───────────────────────────────────── */}
          <div style={{ padding:"48px 0", borderTop:"1px solid #f1f5f9" }}>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:28, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>Was Sie lernen</h2>
            <p style={{ color:"#64748b", marginBottom:24, fontSize:15 }}>{kurs.tage} Lerntage · {kurs.ue} Unterrichtseinheiten à 45 Min</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:10 }}>
              {kurs.inhalte.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
                  <span style={{ color:hauptfarbe, fontWeight:700, fontSize:16, flexShrink:0 }}>→</span>
                  <span style={{ color:"#374151", fontSize:13, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── VORTEILE ──────────────────────────────────────── */}
          <div style={{ padding:"48px 0", borderTop:"1px solid #f1f5f9" }}>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:28, fontWeight:800, color:"#0f172a", margin:"0 0 24px" }}>Ihre Vorteile</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:14 }}>
              {kurs.vorteile.map((v, i) => (
                <div key={i} style={{ background:"white", border:`1px solid ${hauptfarbe}20`, borderRadius:14, padding:"20px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>⭐</div>
                  <p style={{ color:"#374151", fontSize:13, lineHeight:1.6, margin:0 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ───────────────────────────────────────────── */}
          <div style={{ padding:"48px 0", borderTop:"1px solid #f1f5f9" }}>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:28, fontWeight:800, color:"#0f172a", margin:"0 0 24px" }}>Häufige Fragen</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {kurs.faq.map((item, i) => (
                <div key={i} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:14, padding:"20px 22px" }}>
                  <h3 style={{ fontWeight:700, color:"#0f172a", margin:"0 0 8px", fontSize:16 }}>{item.f}</h3>
                  <p style={{ color:"#64748b", lineHeight:1.6, margin:0, fontSize:14 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── TRIAL FORMULAR ────────────────────────────────── */}
        <div id="kostenlos-testen" style={{ padding:"56px 20px", background:"linear-gradient(135deg, #0c1628, #0f2744)", scrollMarginTop:32 }}>
          <div style={{ maxWidth:580, margin:"0 auto", textAlign:"center" }}>
            <div style={{ display:"inline-block", background:"rgba(245,158,11,0.2)", color:"#fbbf24", borderRadius:20, padding:"6px 16px", fontSize:12, fontWeight:700, marginBottom:16 }}>
              🎁 KOSTENLOS TESTEN
            </div>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:30, fontWeight:800, color:"#f1f5f9", margin:"0 0 12px" }}>
              Erst testen, dann entscheiden
            </h2>
            <p style={{ color:"#94a3b8", fontSize:16, margin:"0 0 28px", lineHeight:1.6 }}>
              24 Stunden vollständiger Zugang — kein Risiko, keine Kreditkarte.
            </p>
            <TrialForm moduleSlug={slug} />
            <p style={{ color:"#64748b", fontSize:12, marginTop:12 }}>
              Bereits überzeugt?{" "}
              <button onClick={handleKaufen} style={{ background:"none", border:"none", color:"#93c5fd", cursor:"pointer", textDecoration:"underline", fontSize:12 }}>
                Direkt kaufen für {kurs.preis} € →
              </button>
            </p>
          </div>
        </div>

        {/* ── FINALER CTA ───────────────────────────────────── */}
        <div style={{ background:`linear-gradient(135deg, #0c1628, #0f2744)`, padding:"64px 20px", textAlign:"center", borderTop:"1px solid #1e3a5f" }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>{kurs.emoji}</div>
            <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:36, fontWeight:900, color:"#f1f5f9", margin:"0 0 12px" }}>
              Bereit für den nächsten Schritt?
            </h2>
            <p style={{ color:"#94a3b8", fontSize:16, margin:"0 0 8px" }}>Einmalige Investition — {zugang.monate} Monate Vollzugang</p>
            <div style={{ fontSize:60, fontWeight:900, color:"white", fontFamily:"Fraunces, Georgia, serif", margin:"16px 0" }}>{kurs.preis} €</div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
              {[`${zugang.monate} Monate Zugang`,`${zugang.verlaengerung} Mon. verlängerbar`,`${zugang.versuche}× Abschlussversuch`,"Zertifikat inklusive","Sofortzugang"].map(t => (
                <span key={t} style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", padding:"6px 14px", borderRadius:20, fontSize:12 }}>✓ {t}</span>
              ))}
            </div>
            <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 16px", marginBottom:16, maxWidth:480, margin:"0 auto 16px" }}>
              <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" }}>
                <input type="checkbox" checked={widerrufsAkzeptiert}
                  onChange={e => { setWiderrufsAkzeptiert(e.target.checked); setWiderrufsError(false); }}
                  style={{ marginTop:2, width:14, height:14, flexShrink:0, accentColor:hauptfarbe }} />
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>
                  Ich stimme der sofortigen Ausführung zu und bestätige den Verlust des Widerrufsrechts gemäß{" "}
                  <a href="/widerruf" target="_blank" style={{ color:"#93c5fd" }}>§356 Abs. 5 BGB</a>.
                </span>
              </label>
              <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", marginTop:8 }}>
                <input type="checkbox" checked={agbAkzeptiert}
                  onChange={e => { setAgbAkzeptiert(e.target.checked); setWiderrufsError(false); setCheckoutError(null); }}
                  style={{ marginTop:2, width:14, height:14, flexShrink:0, accentColor:hauptfarbe }} />
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>
                  Ich akzeptiere die <a href="/agb" target="_blank" style={{ color:"#93c5fd" }}>AGB</a> und die <a href="/datenschutz" target="_blank" style={{ color:"#93c5fd" }}>Datenschutzerklärung</a>.
                </span>
              </label>
              {widerrufsError && <p style={{ color:"#fca5a5", fontSize:10, marginTop:4, marginLeft:24 }}>Bitte zuerst bestätigen.</p>}
            </div>

            {checkoutError && <p style={{ color: "#fca5a5", fontSize: 14, marginBottom: 16, fontWeight: 600 }}>{checkoutError}</p>}

            <button onClick={handleKaufen} disabled={loading}
              style={{ background:"white", color:"#0f172a", border:"none", borderRadius:14, padding:"16px 48px", fontSize:17, fontWeight:800, cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", fontFamily:"Fraunces, Georgia, serif", opacity:loading?0.7:1 }}>
              {loading ? "Weiterleitung zu Stripe..." : `Jetzt kaufen — ${kurs.preis} €`}
            </button>
            <p style={{ marginTop:12, color:"rgba(255,255,255,0.4)", fontSize:12 }}>
              Oder{" "}
              <a href="#kostenlos-testen" style={{ color:"#93c5fd", textDecoration:"underline" }}>24h kostenlos testen</a>
            </p>
            <div style={{ marginTop:24, display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
              {["14 Tage Widerrufsrecht","Sichere Zahlung via Stripe","Sofortzugang","Auf allen Geräten"].map(t => (
                <span key={t} style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── WEITERE KURSE ─────────────────────────────────── */}
        <div style={{ maxWidth:960, margin:"0 auto", padding:"48px 20px" }}>
          <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:22, fontWeight:700, color:"#0f172a", margin:"0 0 20px" }}>Weitere Kurse</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", gap:12 }}>
            {Object.entries(KURSE).filter(([s]) => s !== slug).map(([s, k]) => (
              <Link key={s} href={`/kurs/${s}`}>
                <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:14, padding:"16px", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=hauptfarbe; e.currentTarget.style.boxShadow=`0 4px 16px ${hauptfarbe}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{k.emoji}</div>
                  <h3 style={{ fontWeight:700, color:"#0f172a", fontSize:13, margin:"0 0 6px", lineHeight:1.3 }}>{k.titel}</h3>
                  <p style={{ color:"#94a3b8", fontSize:11, margin:0 }}>{k.tage} Tage · {k.ue} UE · {k.preis} €</p>
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

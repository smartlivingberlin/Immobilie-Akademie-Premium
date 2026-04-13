export default function Datenschutz() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">1. Verantwortlicher</h2>
        <p className="text-slate-700">
          Immobilien-Akademie GmbH<br />
          Geschäftsführer: Alisad Gadyri<br />
          [Adresse], Berlin<br />
          E-Mail: info@immobilien-akademie.de
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">2. Erhobene Daten</h2>
        <p className="text-slate-700">Wir erheben folgende personenbezogene Daten:</p>
        <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
          <li>Name und E-Mail-Adresse</li>
          <li>Lernfortschritt und Kursdaten</li>
          <li>Login-Zeitpunkte</li>
          <li>Technische Daten (IP-Adresse, Browser)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. Zweck der Verarbeitung</h2>
        <p className="text-slate-700">
          Die Daten werden ausschließlich zur Bereitstellung der Lernplattform,
          Kursverwaltung und Zertifizierung verwendet (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. Speicherdauer</h2>
        <p className="text-slate-700">
          Daten werden gespeichert solange ein aktives Nutzerkonto besteht.
          Nach Kontolöschung werden alle personenbezogenen Daten binnen 30 Tagen gelöscht.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. Drittanbieter</h2>
        <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
          <li><strong>Railway (USA)</strong> — Hosting (Standardvertragsklauseln gem. Art. 46 DSGVO)</li>
          <li><strong>Resend</strong> — E-Mail-Versand (AVV vorhanden)</li>
          <li><strong>Google Gemini API</strong> — KI-Tutor für Lernunterstützung (AVV gem. Art. 28 DSGVO vorhanden; Verarbeitung in der EU/USA mit Standardvertragsklauseln)</li>
          <li><strong>Anthropic Claude API</strong> — KI-gestützte Inhaltsanalyse und Lernunterstützung (Verarbeitung in den USA; Standardvertragsklauseln gem. Art. 46 DSGVO; keine dauerhafte Speicherung von Nutzerdaten durch Anthropic laut DPA)</li>
          <li><strong>Stripe Inc. (USA)</strong> — Zahlungsabwicklung (AVV vorhanden; PCI-DSS-zertifiziert; Standardvertragsklauseln gem. Art. 46 DSGVO)</li>
          <li><strong>Groq (USA)</strong> — Sprachverarbeitung (Audio-Transkription); Standardvertragsklauseln gem. Art. 46 DSGVO</li>
          <li><strong>ElevenLabs (USA)</strong> — Text-zu-Sprache für Lernmaterialien; Standardvertragsklauseln gem. Art. 46 DSGVO</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. KI-gestützte Dienste & Datenverarbeitung</h2>
        <p className="text-slate-700 mb-2">
          Diese Plattform nutzt KI-Dienste zur Lernunterstützung. Folgende Daten können dabei verarbeitet werden:
        </p>
        <ul className="list-disc pl-6 text-slate-700 space-y-1 mb-3">
          <li><strong>Google Gemini API:</strong> Ihre Fragen und Lerneingaben werden zur Generierung von Antworten an Google übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Google verarbeitet diese Daten gem. AVV nicht für eigene Zwecke.</li>
          <li><strong>Anthropic Claude API:</strong> Für KI-gestützte Lernanalysen werden Lerninhalte (keine personenbezogenen Daten) übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Qualitätssicherung). Kein Profiling einzelner Nutzer.</li>
          <li><strong>Keine dauerhafte KI-Speicherung:</strong> Beide KI-Anbieter nutzen übermittelte Daten nicht zum Training ihrer Modelle (vertraglich vereinbart).</li>
        </ul>
        <p className="text-slate-700">
          Sie können die Nutzung KI-gestützter Funktionen jederzeit in den Einstellungen deaktivieren.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">7. Zertifizierung & Qualitätssicherung (AZAV/ZFU)</h2>
        <p className="text-slate-700 mb-2">
          Immobilien Akademie Smart strebt die Anerkennung als förderungsfähige Bildungsmaßnahme an.
          Im Rahmen von AZAV- und ZFU-Zertifizierungsverfahren können folgende Daten verarbeitet werden:
        </p>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li><strong>AZAV (Akkreditierungs- und Zulassungsverordnung Arbeitsförderung):</strong> Für die Anerkennung durch die Bundesagentur für Arbeit werden anonymisierte Teilnahme- und Abschlussdaten an akkreditierte Stellen übermittelt.</li>
          <li><strong>ZFU (Zentralstelle für Fernunterricht):</strong> Für die ZFU-Zulassung als Fernlehrgang werden Kursinhalte und Lehrgangsstruktur geprüft. Personenbezogene Teilnehmerdaten werden dabei nicht übermittelt.</li>
          <li>Rechtsgrundlage: Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) sowie Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. Ihre Rechte</h2>
        <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO) — über Konto-Einstellungen</li>
          <li>Einschränkung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">9. Cookies</h2>
        <p className="text-slate-700">
          Wir verwenden technisch notwendige Cookies für die Sitzungsverwaltung
          sowie optionale Analyse-Cookies. Einstellungen jederzeit über den Cookie-Banner anpassbar.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">10. Beschwerderecht</h2>
        <p className="text-slate-700">
          Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
          Friedrichstr. 219, 10969 Berlin<br />
          E-Mail: mailbox@datenschutz-berlin.de
        </p>
      </section>
    </div>
  );
}

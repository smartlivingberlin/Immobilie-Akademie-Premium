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
          <li><strong>Google Gemini API</strong> — KI-Tutor (AVV vorhanden)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. Ihre Rechte</h2>
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
        <h2 className="text-lg font-semibold mb-2">7. Cookies</h2>
        <p className="text-slate-700">
          Wir verwenden technisch notwendige Cookies für die Sitzungsverwaltung
          sowie optionale Analyse-Cookies. Einstellungen jederzeit über den Cookie-Banner anpassbar.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. Beschwerderecht</h2>
        <p className="text-slate-700">
          Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
          Friedrichstr. 219, 10969 Berlin<br />
          E-Mail: mailbox@datenschutz-berlin.de
        </p>
      </section>
    </div>
  );
}

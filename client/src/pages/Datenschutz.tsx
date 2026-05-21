import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Datenschutzerklärung</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Stand: April 2026</p>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none space-y-6">

          <h2>1. Verantwortliche Stelle</h2>
          <p>
            <strong>Alisad Gadyri</strong> (Inhaber: Immobilien Akademie Smart)<br />
            Durlacher Str. 36, 10715 Berlin<br />
            E-Mail: info@immobilien-akademie-smart.de
          </p>

          <h2>2. Welche Daten wir erheben</h2>
          <h3>2.1 Konto- und Registrierungsdaten</h3>
          <p>E-Mail-Adresse, Passwort (PBKDF2-SHA256-Hash, nie im Klartext).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>

          <h3>2.2 Lernfortschritt (Server-seitig gespeichert)</h3>
          <p><strong>Ihr Lernfortschritt wird auf unseren Servern gespeichert</strong> —
          nicht nur lokal in Ihrem Browser. Dazu gehören: abgeschlossene Lerntage,
          Quiz-Ergebnisse, Prüfungssimulationen, Lernzeiten, KI-Tutor-Gespräche.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>

          <h3>2.3 Technische Zugriffsdaten</h3>
          <p>IP-Adresse (anonymisiert nach 7 Tagen), Browser-Typ, Betriebssystem, Uhrzeit.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>

          <h2>3. Cookies</h2>
          <ul>
            <li><strong>app_session_id</strong> — technisch notwendig, 30 Tage, HTTP-only</li>
            <li><strong>cookie_consent</strong> — speichert Ihre Cookie-Entscheidung</li>
            
          </ul>

          <h2>4. Drittanbieter</h2>

          <h3>4.1 Railway (Hosting & Datenbank)</h3>
          <p>Railway Corp., USA. Server-Standort: Europe (europe-west4). Alle Nutzerdaten
          und Lernfortschritte werden dort gespeichert. Art. 6 Abs. 1 lit. b + f DSGVO.
          Nach EU-US Data Privacy Framework zertifiziert. railway.app/legal/privacy</p>

          <h3>4.2 Stripe (Zahlungsabwicklung)</h3>
          <p>Stripe, Inc., San Francisco, USA. Verarbeitet Zahlungsdaten.
          Art. 6 Abs. 1 lit. b DSGVO. stripe.com/de/privacy</p>

          <h3>4.3 Anthropic — Claude (KI-Tutor, primär)</h3>
          <p>Anthropic, PBC, San Francisco, USA. Ihre Fragen im KI-Tutor werden
          an Anthropic-Server übermittelt. <strong>Bitte keine personenbezogenen Daten Dritter
          eingeben.</strong> Art. 6 Abs. 1 lit. b DSGVO. anthropic.com/privacy</p>

          <h3>4.4 Google Gemini (KI-Tutor, Fallback)</h3>
          <p>Google LLC, USA. Fallback für den KI-Tutor. Anfragen können an Google
          übermittelt werden. Art. 6 Abs. 1 lit. b DSGVO. policies.google.com/privacy</p>

          <h3>4.5 Groq (KI-Tutor, zweiter Fallback)</h3>
          <p>Groq, Inc., Palo Alto, USA. Zweiter Fallback. Nutzeranfragen können
          übermittelt werden. Art. 6 Abs. 1 lit. b DSGVO. groq.com/privacy</p>


          
          <h3>4.5b Plausible Analytics</h3>
          <p>Plausible Insights OÜ, Tallinn, Estland. Cookiefreie, DSGVO-konforme Webanalyse ohne personenbezogene Daten, ohne Cookies, kein Cross-Site-Tracking.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). plausible.io/privacy</p>
          <h3>4.6 ElevenLabs (Text-to-Speech)</h3>
          <p>ElevenLabs, Inc., New York, USA. Für die Vorlesefunktion werden Lerntexte übermittelt. Keine personenbezogenen Daten. Art. 6 Abs. 1 lit. b DSGVO. elevenlabs.io/privacy</p>
          <p><strong>4.x Sentry (Fehler-Monitoring)</strong><br />
          Sentry Inc., USA. Technische Fehlerberichte zur Verbesserung des Portals.
          Keine personenbezogenen Inhalte. Datenschutz: <a href="https://sentry.io/privacy/" target="_blank" rel="noopener">sentry.io/privacy</a>.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
          <h3>4.7 api.qrserver.com (QR-Codes für Zertifikate)</h3>
          <p>goQR.me / kaywa GmbH. Beim Zertifikat-Download wird eine kodierte
          Zertifikat-ID (kein Name, keine E-Mail) übermittelt.
          Art. 6 Abs. 1 lit. b DSGVO.</p>


          <h2>5. Ihre Rechte (Art. 15–21 DSGVO)</h2>
          <ul>
            <li><strong>Auskunft</strong> (Art. 15): Auf Anfrage teilen wir mit, welche Daten wir speichern.</li>
            <li><strong>Berichtigung</strong> (Art. 16): Falsche Daten werden korrigiert.</li>
            <li><strong>Löschung</strong> (Art. 17): Unter /konto-loeschen können Sie alle Daten löschen.</li>
            <li><strong>Einschränkung</strong> (Art. 18): Verarbeitung kann eingeschränkt werden.</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20): Export auf Anfrage per E-Mail.</li>
            <li><strong>Widerspruch</strong> (Art. 21): Widerspruch gegen Verarbeitung möglich.</li>
            <li><strong>Beschwerde</strong> (Art. 77): Berliner Beauftragter für Datenschutz,
            Friedrichstr. 219, 10969 Berlin, mailbox@datenschutz-berlin.de</li>
          </ul>

          <h2>6. Speicherdauer</h2>
          <p>Kontodaten: bis zur Konto-Löschung. Lernfortschritt: bis zur Konto-Löschung.
          Server-Logs: max. 7 Tage. Zahlungsdaten: 10 Jahre (§ 147 AO).</p>

          <h2>7. Datensicherheit</h2>
          <p>SSL/TLS-Verschlüsselung (HTTPS). Passwörter: PBKDF2-SHA256 (100.000 Iterationen).
          Session-Cookies: HTTP-only, nicht per JavaScript zugreifbar.</p>

          <h2>8. Kontakt Datenschutz</h2>
          <p>E-Mail: info@immobilien-akademie-smart.de<br />
          (bis Domain-Aktivierung: Kontakt über das Portal-Beschwerdeformular unter /beschwerde)</p>

          <p className="text-xs text-slate-500 mt-8">Stand: April 2026 | Immobilien Akademie Smart</p>
        </CardContent>
      </Card>
    </div>
  );
}

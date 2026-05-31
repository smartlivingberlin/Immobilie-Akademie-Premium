import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Impressum() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Impressum</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Angaben gemaess § 5 DDG</p>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <h2>Anbieter</h2>
          <div className="not-prose bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
            <p className="font-semibold text-lg mb-2">Alisad Gadyri</p>
            <p className="text-slate-700">Einzelunternehmen</p>
            <div className="flex items-start gap-2 mt-4 text-slate-700">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                Durlacher Str. 36<br />
                10715 Berlin<br />
                Deutschland
              </div>
            </div>
          </div>

          <h2>Kontakt</h2>
          <div className="not-prose space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-600" />
              <span>Telefon: +49 171 1526327</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-600" />
              <span>
                E-Mail: <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 hover:underline">info@immobilien-akademie-smart.de</a>
              </span>
            </div>
          </div>

          <h2>Vertretungsberechtigte Person</h2>
          <p>Alisad Gadyri (Inhaber)</p>

          <h2>Registereintrag</h2>
          <p className="text-sm text-muted-foreground italic">
            Als Einzelunternehmen besteht keine Pflicht zur Eintragung in ein Handelsregister.
          </p>

          <h2>Umsatzsteuer</h2>
          <p className="text-sm text-muted-foreground italic">
            Kleinunternehmerregelung gemaess § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            <strong>Taetigkeit:</strong> Betreiber eines Online-Lernportals fuer Immobilienwissen und Weiterbildung<br />
            <strong>Verliehen in:</strong> Deutschland
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Alisad Gadyri<br />
            Durlacher Str. 36<br />
            10715 Berlin<br />
            E-Mail: <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 hover:underline">info@immobilien-akademie-smart.de</a>
          </p>

          <h2>Zentrale Kontaktstelle nach dem Digital Services Act (DSA)</h2>
          <p>
            Unsere zentrale Kontaktstelle fuer Nutzer und Behoerden nach Art. 11 und Art. 12 DSA erreichen Sie unter:
          </p>
          <p>
            E-Mail: <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 hover:underline">info@immobilien-akademie-smart.de</a><br />
            Telefon: +49 171 1526327
          </p>
          <p>Die fuer den Kontakt zur Verfuegung stehenden Sprachen sind Deutsch und Englisch.</p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            {' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung fuer Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir fuer eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberuehrt.
            Eine diesbezuegliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moeglich.
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2>Haftung fuer Links</h2>
          <p>
            Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb koennen wir fuer diese fremden Inhalte auch keine Gewaehr uebernehmen. Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>

          <h2>Bildnachweise</h2>
          <p>
            Die auf dieser Website verwendeten Bilder, Grafiken und Medien werden entweder selbst erstellt, lizenziert oder aus rechtmaessig nutzbaren Quellen eingebunden. Hinweise auf fehlerhafte oder unvollstaendige Bildnachweise koennen an die oben genannte Kontaktadresse gesendet werden.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

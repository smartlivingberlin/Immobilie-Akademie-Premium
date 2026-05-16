import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Impressum() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Impressum</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Angaben gemäß § 5 TMG</p>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <h2>Anbieter</h2>
          <div className="not-prose bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
            <p className="font-semibold text-lg mb-2">Alisad Gadyri
                <br />E-Mail: alisadgadyri38@gmail.com
                <br />Tel: +49 171 1526327</p>
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
              <span>E-Mail: <a href="mailto:gadyri@icloud.com" className="text-blue-600 hover:underline">gadyri@icloud.com</a></span>
            </div>
          </div>

          <h2>Vertretungsberechtigte Person(en)</h2>
          <p>Alisad Gadyri
                <br />E-Mail: alisadgadyri38@gmail.com
                <br />Tel: +49 171 1526327 (Inhaber)</p>

          <h2>Registereintrag</h2>
          <p className="text-sm text-muted-foreground italic">
            Als Einzelunternehmen besteht keine Pflicht zur Eintragung in ein Handelsregister.
          </p>

          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p className="text-sm text-muted-foreground italic">
            Kleinunternehmerregelung gemäß § 19 UStG - keine Umsatzsteuer-Identifikationsnummer erforderlich.
          </p>

          <h2>Wirtschafts-Identifikationsnummer</h2>
          <p className="text-sm text-muted-foreground italic">
            Wird auf Anfrage mitgeteilt.
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            <strong>Berufsbezeichnung:</strong> Bildungsträger / Online-Lernportal-Betreiber<br />
            <strong>Zuständige Kammer:</strong> IHK Berlin<br />
            <strong>Verliehen in:</strong> Deutschland
          </p>

          <h2>Aufsichtsbehörde</h2>
          <p>
            Industrie- und Handelskammer zu Berlin<br />
            Fasanenstraße 85<br />
            10623 Berlin<br />
            <a href="https://www.ihk.de/berlin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ihk.de/berlin</a>
          </p>

          <h2>Angaben zur Berufshaftpflichtversicherung</h2>
          <p>
            <strong>Name und Sitz des Versicherers:</strong><br />
            wird beantragt<br />
            
          </p>
          <p>
            <strong>Geltungsraum der Versicherung:</strong><br />
            Deutschland / Europa / Weltweit
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Alisad Gadyri
                <br />E-Mail: alisadgadyri38@gmail.com
                <br />Tel: +49 171 1526327<br />
            Durlacher Str. 36<br />
            10715 Berlin
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p className="text-sm text-muted-foreground italic">
            (Alternative: Falls Sie an Streitbeilegungsverfahren teilnehmen, geben Sie hier die zuständige 
            Schlichtungsstelle an)
          </p>

          <h2>Zentrale Kontaktstelle nach dem Digital Services Act - DSA (Verordnung (EU) 2022/265)</h2>
          <p>
            Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
          </p>
          <p>
            E-Mail: <a href="mailto:gadyri@icloud.com" className="text-blue-600 hover:underline">gadyri@icloud.com</a><br />
            Telefon: +49 171 1526327
          </p>
          <p>
            Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
            der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
            einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
            Links umgehend entfernen.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
            auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>

          <h2>Bildnachweise</h2>
          <p>
            Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen:
          </p>
          <ul>
            <li>Eigene Fotografien und Grafiken</li>
            <li>[Stockfoto-Anbieter, z.B. Unsplash, Pexels] - Lizenz: [Lizenztyp]</li>
            <li>[Weitere Bildquellen mit Lizenzangaben]</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-slate-200">
            <strong>Hinweis:</strong> Dieses Impressum ist eine Vorlage und muss mit den tatsächlichen Daten 
            des Betreibers ausgefüllt werden. Die Platzhalter in [eckigen Klammern] sind durch die korrekten 
            Angaben zu ersetzen. Je nach Rechtsform, Geschäftstätigkeit und Standort können weitere Angaben 
            erforderlich sein. Im Zweifelsfall sollte ein Rechtsanwalt konsultiert werden.
          </p>

          <p className="text-sm text-muted-foreground">
            Quelle: Erstellt mit Unterstützung von e-recht24.de
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

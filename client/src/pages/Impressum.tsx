export default function Impressum() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Angaben gemäß § 5 DDG</h2>
        <p className="text-slate-700">
          Alisad Gadyri<br />
          (Inhaber: Immobilien Akademie Smart)<br />
          Durlacher Str. 36<br />
          10715 Berlin<br />
          Deutschland
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Kontakt</h2>
        <p className="text-slate-700">
          E-Mail: info@immobilien-akademie-smart.de<br />
          Telefon: Auf Anfrage per E-Mail erhältlich
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Umsatzsteuer</h2>
        <p className="text-slate-700">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
          Kleinunternehmer gemäß § 19 UStG — derzeit keine USt-ID erforderlich
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Zuständige Behörde</h2>
        <p className="text-slate-700">
          Verantwortlich für den Betrieb dieses Bildungsportals:<br />
          Alisad Gadyri, Durlacher Str. 36, 10715 Berlin
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Streitschlichtung</h2>
        <p className="text-slate-700">
          Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr"
            className="text-blue-600 hover:underline"
            target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>.<br />
          Wir sind nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Hinweis Bildungsangebot</h2>
        <p className="text-slate-700 text-sm">
          Die Inhalte dieses Portals dienen der Weiterbildung und Prüfungsvorbereitung.
          Sie stellen keine Rechtsberatung dar. Das Portal ist kein staatlich anerkannter
          Bildungsträger (Zertifizierungsoptionen werden geprüft). IHK-Abschlüsse müssen bei der
          zuständigen IHK abgelegt werden.
        </p>
      </section>
    </div>
  );
}

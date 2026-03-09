export default function Impressum() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p className="text-slate-700">
          Immobilien-Akademie GmbH<br />
          [Straße und Hausnummer]<br />
          [PLZ] Berlin<br />
          Deutschland
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Vertreten durch</h2>
        <p className="text-slate-700">Geschäftsführer: Alisad Gadyri</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Kontakt</h2>
        <p className="text-slate-700">
          E-Mail: info@immobilien-akademie.de<br />
          Telefon: [Telefonnummer]
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Registereintrag</h2>
        <p className="text-slate-700">
          Registergericht: Amtsgericht Berlin<br />
          Registernummer: [HRB-Nummer]
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Umsatzsteuer-ID</h2>
        <p className="text-slate-700">DE[Nummer]</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Streitschlichtung</h2>
        <p className="text-slate-700">
          Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
          <a href="https://ec.europa.eu/consumers/odr" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>.<br />
          Wir sind nicht verpflichtet, an Streitbeilegungsverfahren teilzunehmen.
        </p>
      </section>
    </div>
  );
}

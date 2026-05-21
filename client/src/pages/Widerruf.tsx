export default function Widerruf() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Widerrufsbelehrung</h1>
      <p className="text-sm text-slate-500 mb-8">gemäß § 355 BGB i.V.m. Art. 246a EGBGB</p>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">

        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
            zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
            Vertragsabschlusses.
          </p>
          <p className="mt-2">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3">
            <p className="font-medium text-slate-900">Immobilien-Akademie Smart</p>
            <p>Durlacher Str. 36, 10715 Berlin</p>
            <p>E-Mail: <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 hover:underline">info@immobilien-akademie-smart.de</a></p>
          </div>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
            eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch
            nicht vorgeschrieben ist.
          </p>
          <p className="mt-2">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
            Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">Folgen des Widerrufs</h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
            Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem
            Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags
            bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
            Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben,
            es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.
          </p>
        </section>

        
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">Rücksendung digitaler Inhalte</h2>
          <p>
            Da es sich um digitale Inhalte handelt, die nicht auf einem körperlichen Datenträger geliefert werden,
            entfällt eine physische Rücksendung. Nach erfolgtem Widerruf werden Ihre Zugangsdaten deaktiviert.
            Die Rückzahlung erfolgt innerhalb von 14 Tagen nach Eingang Ihrer Widerrufserklärung.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">
            Erlöschen des Widerrufsrechts bei digitalen Inhalten
          </h2>
          <p>
            Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von digitalen
            Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden, wenn
            der Unternehmer mit der Ausführung des Vertrags begonnen hat, nachdem der
            Verbraucher ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung
            des Vertrags vor Ablauf der Widerrufsfrist beginnt, und der Verbraucher seine
            Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der
            Ausführung des Vertrags sein Widerrufsrecht verliert.
          </p>
          <p className="mt-2 text-slate-500 text-xs">
            Hinweis: Beim Kauf eines Kurszugangs werden Sie vor dem Kaufabschluss ausdrücklich
            gefragt, ob Sie dem sofortigen Zugang zustimmen und damit auf Ihr Widerrufsrecht
            verzichten möchten.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">Muster-Widerrufsformular</h2>
          <p className="text-slate-500 text-xs mb-3">
            (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus
            und senden Sie es zurück.)
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-2">
            <p>An: Immobilien-Akademie Smart, Durlacher Str. 36, 10715 Berlin</p>
            <p>E-Mail: info@immobilien-akademie-smart.de</p>
            <p className="mt-3">
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
              über den Kauf der folgenden Waren (*) / die Erbringung der folgenden
              Dienstleistung (*)
            </p>
            <p>Bestellt am (*) _____________ / erhalten am (*) _____________</p>
            <p>Name des/der Verbraucher(s): _________________________________</p>
            <p>Anschrift des/der Verbraucher(s): _________________________________</p>
            <p>Datum: _________________</p>
            <p className="text-slate-400">(*) Unzutreffendes streichen</p>
          </div>
        </section>

      </div>
    </div>
  );
}

# Legal Compliance Report — Immobilien Akademie Smart
**Datum:** 24. Mai 2026
**Experte:** Jules (Digital Education Compliance Expert)

## VERSTÖSSE (sofort beheben)
1. **Impressum unvollständig (§5 TMG):**
   - In `client/src/pages/legal/Impressum.tsx` befinden sich Platzhalter für die Berufshaftpflichtversicherung (`[Name der Versicherung]`, `[Adresse der Versicherung]`). Dies ist ein abmahnfähiger Verstoß gegen die Impressumspflicht.
2. **Datenschutzerklärung unvollständig (DSGVO Art. 13):**
   - Die Drittanbieter **Plausible Analytics** (in `client/index.html`) und **Google Analytics** (in `client/index.html` und `client/src/hooks/useAnalytics.ts`) werden in der Datenschutzerklärung (`client/src/pages/Datenschutz.tsx`) nicht aufgeführt.
3. **Tracking ohne Einwilligung (§25 TDDDG):**
   - Der Hook `client/src/hooks/useAnalytics.ts` führt `gtag('event', 'page_view', ...)` aus, ohne den Status der Einwilligung aus dem `CookieConsent` zu prüfen.
   - In `client/index.html` wird das Plausible-Skript (`plausible.io/js/script.js`) ohne Prüfung der Einwilligung geladen.

## WARNUNGEN (dringend prüfen)
1. **Redundante Rechtsseiten:**
   - Es existieren mehrere Versionen von Impressum und Datenschutz (z. B. `client/src/pages/Impressum.tsx` vs. `client/src/pages/legal/Impressum.tsx`). Dies kann zu Inkonsistenzen führen, wenn nur eine Datei aktualisiert wird. Es sollte sichergestellt werden, dass nur die Dateien im Verzeichnis `legal/` verwendet werden.
2. **Verwendung von "garantiert":**
   - Das Wort "garantiert" wurde in Lerninhalten gefunden (z. B. `Module1Content_Maximal.ts`: "Betreiber garantiert Miete"). Da dies im Kontext der Erklärung von Finanzprodukten und nicht als Marketingversprechen für den Kurserfolg steht, ist es rechtlich weniger riskant, sollte aber im Marketing-Kontext (Home, Landingpages) strikt vermieden werden.
3. **Zertifikats-Aussagen:**
   - In `client/src/pages/Home.tsx` wird mit "IHK-konformes Format" für Zertifikate geworben. Dies ist zulässig, da es sich auf das Format bezieht, sollte aber nicht so missverstanden werden können, dass das Zertifikat selbst ein IHK-Zertifikat ist.

## OK
1. **IHK-Claims:** Die Bezeichnungen werden korrekt als "IHK-Vorbereitung" oder "IHK-vorbereitet" geführt. Es werden keine unzulässigen Claims wie "IHK-anerkannt" für das Portal selbst erhoben.
2. **AZAV/ZFU-Claims:** Diese werden korrekt als "in Vorbereitung" oder "geplant" deklariert.
3. **Widerrufsbelehrung:** Die Frist von 14 Tagen ist korrekt angegeben, und ein Muster-Widerrufsformular ist vorhanden.
4. **Cookie-Banner:** Ein funktionsfähiger Cookie-Banner mit Opt-out-Möglichkeit ist implementiert (die technische Verknüpfung mit den Analytics-Skripten muss jedoch wie unter "VERSTÖSSE" beschrieben korrigiert werden).

## RECHTSBEWERTUNG 6/10
Das Portal macht einen sehr professionellen Eindruck und die kritischen Claims (IHK, AZAV, ZFU) sind sauber formuliert. Die Abwertung auf 6/10 resultiert primär aus den formalen Mängeln im Impressum (Platzhalter) und der fehlenden datenschutzrechtlichen Dokumentation/Einbindung der Analytics-Tools. Nach Behebung dieser Punkte ist eine Bewertung von 9/10 realistisch.

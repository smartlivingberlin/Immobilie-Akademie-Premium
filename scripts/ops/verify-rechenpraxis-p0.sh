#!/usr/bin/env bash
# Verifikation Rechenpraxis P0 + Modul-3 Audio (lokal, ohne Prod-Login)
set -euo pipefail

cd "$(dirname "$0")/../.."

echo "=== TypeScript ==="
npx tsc --noEmit --skipLibCheck

echo "=== Vitest (alle Unit-Tests) ==="
npx vitest run

echo "=== Modul-3 Audio: Lerntage 4–22 ==="
npx tsx -e "
import { parseModuleDayLessons } from './server/moduleDayExtractor';
const lessons = parseModuleDayLessons(3);
const days = lessons.map((l) => l.dayNumber);
if (lessons.length < 40) throw new Error('Zu wenig Modul-3-Lektionen: ' + lessons.length);
for (let d = 4; d <= 22; d++) {
  if (!days.includes(d)) throw new Error('Tag ' + d + ' fehlt');
}
console.log('OK:', lessons.length, 'Lektionen, Tags 4–22 vorhanden');
"

echo "=== Freemium-Konstanten ==="
npx tsx -e "
import { RECHENPRAXIS_FREEMIUM_TASK_IDS } from './shared/rechenpraxisAccess';
if (RECHENPRAXIS_FREEMIUM_TASK_IDS.length !== 10) throw new Error('Freemium muss 10 IDs haben');
console.log('OK: 10 Freemium-WEG-IDs');
"

echo ""
echo "=== Live-Test (nach Railway-Deploy) ==="
echo "1. Audio: https://immobilien-akademie-smart.de/audio-modus → Modul 3 → Tag 4–22 sichtbar"
echo "2. Rechenpraxis: https://immobilien-akademie-smart.de/app/rechenpraxis"
echo "   - Ohne Vollabo: 10 WEG-Aufgaben frei, Rest mit Schloss"
echo "   - Falsche Zahl eingeben → regelbasiertes Fehler-Feedback"
echo "3. E2E (mit B2B_ADMIN_PASSWORD): npx playwright test tests/e2e/24-rechenpraxis-p0-module3-audio.spec.ts"
echo ""
echo "Alle lokalen Checks bestanden."

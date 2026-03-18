import { contentDataPart2 } from "../pages/modules/Module3ContentPart2";
import { contentDataPart3 } from "../pages/modules/Module3ContentPart3";
import { contentDataPart4 } from "../pages/modules/Module3ContentPart4";

// Manuelle Zusammenführung der Daten, da wir hier keinen direkten Zugriff auf die React-Komponenten haben
// und die Daten dort lokal definiert sein könnten.
// Für diesen Test importieren wir die externen Parts und definieren einen Mock für Part 1.

const mockContentPart1 = {
  day_1: { title: "Test", theory: "Test", law: [], practice: "Test", task: "Test" }
};

const allModule3Content = {
  ...mockContentPart1,
  ...contentDataPart2,
  ...contentDataPart3,
  ...contentDataPart4
};

export function checkModule3Completeness() {
  const missingDays: string[] = [];
  const totalDays = 80;
  
  // Wir prüfen hier nur ab Tag 21, da Tag 1-20 in der Komponente definiert sind
  // und wir für diesen automatisierten Test die externen Dateien prüfen.
  for (let i = 21; i <= totalDays; i++) {
    const dayKey = `day_${i}`;
    if (!allModule3Content[dayKey as keyof typeof allModule3Content]) {
      missingDays.push(dayKey);
    }
  }

  return {
    totalChecked: 60, // Tag 21-80
    missingCount: missingDays.length,
    missingDays: missingDays,
    status: missingDays.length === 0 ? "COMPLETE" : "INCOMPLETE"
  };
}

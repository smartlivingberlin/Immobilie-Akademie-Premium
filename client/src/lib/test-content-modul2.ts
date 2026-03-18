import { contentDataPart2 } from "../pages/modules/Module2ContentPart2";
import { contentDataPart3 } from "../pages/modules/Module2ContentPart3";

// Mock for Part 1 (Day 1-20) which is inline in Module2Detail.tsx
const mockContentPart1: Record<string, any> = {};
for (let i = 1; i <= 20; i++) {
  mockContentPart1[`day_${i}`] = { title: "Test", theory: "Test", law: [], practice: "Test", task: "Test" };
}

const allModule2Content = {
  ...mockContentPart1,
  ...contentDataPart2,
  ...contentDataPart3
};

export function checkModule2Completeness() {
  const missingDays: string[] = [];
  const totalDays = 60;
  
  for (let i = 1; i <= totalDays; i++) {
    const dayKey = `day_${i}`;
    if (!allModule2Content[dayKey as keyof typeof allModule2Content]) {
      missingDays.push(dayKey);
    }
  }

  return {
    totalDaysExpected: totalDays,
    checkedDays: Object.keys(allModule2Content).length,
    missingCount: missingDays.length,
    missingDays: missingDays,
    status: missingDays.length === 0 ? "COMPLETE" : "INCOMPLETE"
  };
}

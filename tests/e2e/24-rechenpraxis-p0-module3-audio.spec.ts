import { test, expect } from "@playwright/test";
import {
  RECHENPRAXIS_FREEMIUM_TASK_IDS,
} from "../../shared/rechenpraxisAccess";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Rechenpraxis P0 & Modul-3 Audio", () => {
  test("API: Modul-3-Audio enthält Lerntage 4–22", async ({ request }) => {
    const res = await request.get(`${BASE}/api/learning/audio-lessons?moduleId=3`);
    expect(res.ok(), await res.text()).toBeTruthy();
    const lessons = (await res.json()) as Array<{ dayNumber: number; title: string; source: string }>;
    expect(lessons.length).toBeGreaterThanOrEqual(40);
    const days = lessons.map((l) => l.dayNumber);
    for (let d = 4; d <= 22; d++) {
      expect(days, `Tag ${d} fehlt in Modul-3-Audio`).toContain(d);
    }
    expect(lessons[0]?.source).toBe("module_day");
  });

  test("API: rechenpraxis.json für eingeloggte Nutzer erreichbar", async ({ request }) => {
    const res = await request.get(`${BASE}/data/rechenpraxis.json`);
    expect(res.ok(), await res.text()).toBeTruthy();
    const tasks = (await res.json()) as Array<{ id: number; bereich: string; titel: string }>;
    expect(tasks.length).toBeGreaterThanOrEqual(100);
    for (const id of RECHENPRAXIS_FREEMIUM_TASK_IDS) {
      expect(tasks.some((t) => t.id === id)).toBe(true);
    }
  });

  test("/rechenpraxis lädt Aufgabenliste", async ({ page }) => {
    await page.goto(`${BASE}/rechenpraxis`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Rechenpraxis Immobilienwirtschaft/i })).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/Schritt-für-Schritt/i)).toBeVisible();
    await expect(page.getByText(/Fortschritt:/i)).toBeVisible({ timeout: 15000 });
  });

  test("Rechenpraxis: Fehler-Feedback bei falscher Eingabe", async ({ page }) => {
    await page.goto(`${BASE}/rechenpraxis`, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Hausgeld berechnen/i }).first().click({ timeout: 15000 });
    const input = page.getByPlaceholder("Ihre Berechnung...").first();
    await input.fill("4800");
    await page.getByRole("button", { name: "Prüfen" }).first().click();
    await expect(page.getByText(/Monats- und Jahresbetrag|Prozent|Formel/i).first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("Freemium-Konstante: 10 WEG-Aufgaben definiert", () => {
    expect(RECHENPRAXIS_FREEMIUM_TASK_IDS).toHaveLength(10);
  });
});

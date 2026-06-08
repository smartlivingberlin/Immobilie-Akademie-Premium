import { chromium } from "@playwright/test";
import { existsSync } from "fs";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";
const TEST_EMAIL = process.env.TEST_ADMIN_EMAIL || "alisadgadyri38@gmail.com";
const TEST_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "Admin2026!";
const STATE_PATH = "tests/e2e/.auth-state.json";

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext(
    existsSync(STATE_PATH) ? { storageState: STATE_PATH } : {}
  );
  const page = await context.newPage();

  // Prüfen ob bestehender Auth-State noch gültig
  if (existsSync(STATE_PATH)) {
    const check = await page.request.get(`${BASE}/api/auth/me`);
    const data = await check.json();
    if (data?.email || data?.name) {
      console.log("✅ Auth-State noch gültig — kein neuer Login nötig");
      await browser.close();
      return;
    }
  }

  const magicSecret = process.env.MAGIC_LINK_SECRET;
  if (magicSecret) {
    await page.goto(`${BASE}/api/auth/magic?secret=${magicSecret}`);
    const magicCheck = await page.request.get(`${BASE}/api/auth/me`);
    const magicUser = await magicCheck.json();
    if (magicUser?.email || magicUser?.name) {
      await context.storageState({ path: STATE_PATH });
      console.log("✅ Auth-State via MAGIC_LINK_SECRET gespeichert");
      await browser.close();
      return;
    }
  }

  if (!TEST_PASSWORD || TEST_PASSWORD === "DEIN_PASSWORT") {
    throw new Error(
      "TEST_ADMIN_PASSWORD fehlt oder ist Platzhalter. Setze: export TEST_ADMIN_PASSWORD='dein echtes Passwort'",
    );
  }

  const response = await page.request.post(`${BASE}/api/auth/login`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok()) {
    const body = await response.text();
    if (response.status() === 429) {
      throw new Error(
        `Rate-Limit aktiv (429). 15 Min. warten oder MAGIC_LINK_SECRET setzen. ${body}`,
      );
    }
    throw new Error(`Login fehlgeschlagen: ${response.status()} ${body}`);
  }

  await context.storageState({ path: STATE_PATH });
  console.log("✅ Auth-State gespeichert");
  await browser.close();
}

export default globalSetup;

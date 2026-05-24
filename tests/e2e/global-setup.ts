import { chromium } from "@playwright/test";

const BASE = "https://immobilie-akademie-premium-production.up.railway.app";
const TEST_EMAIL = "playwright@test.de";
const TEST_PASSWORD = "Test2026!";

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const response = await page.request.post(`${BASE}/api/auth/login`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok()) {
    throw new Error(`Login fehlgeschlagen: ${response.status()} ${await response.text()}`);
  }

  await context.storageState({ path: "tests/e2e/.auth-state.json" });
  console.log("✅ Auth-State gespeichert");
  await browser.close();
}

export default globalSetup;

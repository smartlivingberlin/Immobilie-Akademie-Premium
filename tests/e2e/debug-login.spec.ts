import { test } from "@playwright/test";
const BASE = "https://immobilie-akademie-production.up.railway.app";

test("debug login page", async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await page.waitForTimeout(5000);
  
  const inputs = await page.locator("input").all();
  console.log("Inputs:", inputs.length);
  for (const inp of inputs) {
    console.log("  Input:", 
      await inp.getAttribute("type"),
      await inp.getAttribute("name"),
      await inp.getAttribute("placeholder")
    );
  }
  
  const buttons = await page.locator("button").all();
  for (const btn of buttons) {
    console.log("  Button:", (await btn.textContent())?.trim());
  }
  
  await page.screenshot({ path: "tests/screenshots/login-debug.png", fullPage: true });
  
  // Versuche Login mit API direkt
  const res = await page.request.post(`${BASE}/api/auth/login`, {
    data: { email: "admin@immobilie.de", password: "TestAdmin2026!" }
  });
  console.log("API Login Status:", res.status());
  const body = await res.json();
  console.log("API Response:", JSON.stringify(body).slice(0, 100));
  
  // Cookie setzen und Admin direkt öffnen
  if (body.ok) {
    const cookies = await page.context().cookies();
    console.log("Cookies nach API-Login:", cookies.map(c => c.name));
  }
});

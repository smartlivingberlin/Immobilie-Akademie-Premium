import type { APIRequestContext, Page } from "@playwright/test";

export const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

/** True when storageState / cookies yield a logged-in user (no credential values logged). */
export async function hasValidSession(request: APIRequestContext): Promise<boolean> {
  try {
    const res = await request.get(`${BASE}/api/auth/me`);
    if (!res.ok()) return false;
    const data = await res.json();
    return Boolean(data?.email || data?.name);
  } catch {
    return false;
  }
}

export type LawSlugCheck = {
  moduleId: number;
  slug: string;
  label: string;
};

/** #204 Gesetzeslink smoke — href substring checks without external navigation. */
export const LAW_SLUG_CHECKS: LawSlugCheck[] = [
  { moduleId: 1, slug: "woeigg", label: "WEG (Modul 1)" },
  { moduleId: 3, slug: "woeigg", label: "WEG (Modul 3)" },
  { moduleId: 4, slug: "immowertv_2021", label: "ImmoWertV (Modul 4)" },
  { moduleId: 5, slug: "gesetze-im-internet.de", label: "Gesetzesquellen (Modul 5)" },
];

export async function collectGesetzeHrefs(page: Page): Promise<string[]> {
  return page.$$eval('a[href*="gesetze-im-internet.de"]', (anchors) =>
    anchors.map((a) => a.getAttribute("href") || ""),
  );
}

export async function openNormenTabIfPresent(page: Page): Promise<void> {
  const normen = page.getByRole("tab", { name: /Normen/i });
  if (await normen.isVisible().catch(() => false)) {
    await normen.click();
    await page.waitForTimeout(500);
  }
}

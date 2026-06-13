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
  /** Tag route segment; defaults to 1 in tests. Use 0 for documentation-only entries. */
  tagId?: number;
  slug: string;
  label: string;
  /** When set, the test is skipped with this documented reason instead of asserting. */
  skipReason?: string;
};

/**
 * #204 Gesetzeslink smoke — href/html substring checks without external navigation.
 * Tag IDs match static content in Module*Content*.ts (see README-AUTH.md).
 */
export const LAW_SLUG_CHECKS: LawSlugCheck[] = [
  { moduleId: 1, tagId: 12, slug: "woeigg", label: "WEG (Modul 1 Tag 12)" },
  { moduleId: 1, tagId: 2, slug: "mabv", label: "MaBV (Modul 1 Tag 2)" },
  { moduleId: 3, tagId: 1, slug: "woeigg", label: "WEG (Modul 3 Tag 1)" },
  { moduleId: 4, tagId: 1, slug: "immowertv_2021", label: "ImmoWertV (Modul 4 Tag 1)" },
  {
    moduleId: 4,
    tagId: 37,
    slug: "heimmindbauv",
    label: "HeimMindBauV (Modul 4 Tag 37 HypZert Bonus)",
  },
  {
    moduleId: 0,
    slug: "grstvg",
    label: "GRStVG (dokumentierte Ausnahme)",
    skipReason:
      "GRStVG-hrefs liegen in glossary-data.ts und LegalLink/lawLinks.ts, nicht in Modul-Theorie-/Normen-Tabs der Auth-Smoke-Routen.",
  },
  {
    moduleId: 5,
    tagId: 1,
    slug: "n/a",
    label: "Modul 5 §34i (dokumentierte Ausnahme)",
    skipReason:
      "Modul 5 enthält keine festen gesetze-im-internet.de-hrefs auf Tag-Seiten — nur generische Recherche-Hinweise in Übungen.",
  },
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

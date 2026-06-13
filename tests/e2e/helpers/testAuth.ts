import fs from "fs";
import path from "path";
import { expect, type APIRequestContext, type Page } from "@playwright/test";

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
 * #204 Gesetzeslink smoke — strict gesetze-im-internet.de href checks (no html text fallback).
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

/** Repo source JSON paths validated in smoke (see README-AUTH.md). */
export const SOURCE_JSON_LINK_ASSERTIONS = [
  { moduleId: 1, tagId: 2, slug: "mabv", label: "MaBV in module1.json day_2" },
  { moduleId: 4, tagId: 1, slug: "immowertv_2021", label: "ImmoWertV in module4.json day_1" },
] as const;

export function slugMatchesHref(href: string, slug: string): boolean {
  return href.toLowerCase().includes(slug.toLowerCase());
}

function moduleJsonPath(moduleId: number): string {
  return path.join(process.cwd(), "client/public/data", `module${moduleId}.json`);
}

function dayLawBlob(day: unknown): string {
  if (!day || typeof day !== "object") return "";
  const law = (day as { law?: string[] }).law;
  if (!Array.isArray(law)) return "";
  return law.join("\n");
}

export function extractGesetzeHrefsFromLawBlob(lawBlob: string): string[] {
  return lawBlob.match(/https:\/\/www\.gesetze-im-internet\.de[^)\s"']+/gi) ?? [];
}

function gesetzeHrefsForTagFromData(data: Record<string, unknown>, tagId: number): string[] {
  return extractGesetzeHrefsFromLawBlob(dayLawBlob(data[`day_${tagId}`]));
}

/** Strict: repo source JSON must contain a gesetze-im-internet href with slug in law[]. */
export function sourceJsonLawContainsGesetzeSlug(
  moduleId: number,
  tagId: number,
  slug: string,
): boolean {
  const data = JSON.parse(fs.readFileSync(moduleJsonPath(moduleId), "utf8"));
  return gesetzeHrefsForTagFromData(data, tagId).some((href) => slugMatchesHref(href, slug));
}

/**
 * Skip runtime law E2E when repo JSON already has gesetze slug but deployed JSON at BASE does not.
 * Prevents timeouts against Production before #209 JSON is deployed.
 */
export async function runtimeLawCheckSkipReason(
  request: APIRequestContext,
  moduleId: number,
  tagId: number,
  slug: string,
): Promise<string | null> {
  const sourceData = JSON.parse(fs.readFileSync(moduleJsonPath(moduleId), "utf8"));
  const sourceHas = gesetzeHrefsForTagFromData(sourceData, tagId).some((href) =>
    slugMatchesHref(href, slug),
  );
  if (!sourceHas) return null;

  const res = await request.get(`${BASE}/data/module${moduleId}.json`);
  if (!res.ok()) {
    return `deployed module${moduleId}.json auf ${BASE} nicht lesbar (HTTP ${res.status()}) — Runtime-Law-Check übersprungen`;
  }

  const deployedData = await res.json();
  const deployedHas = gesetzeHrefsForTagFromData(deployedData, tagId).some((href) =>
    slugMatchesHref(href, slug),
  );
  if (!deployedHas) {
    return `Runtime auf ${BASE}: gesetze-im-internet.de/${slug} in Repo-JSON vorhanden, deployed module${moduleId}.json noch ohne diesen href — Merge/Deploy #209 abwarten`;
  }

  return null;
}

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

/**
 * Navigate to a module tag route and wait for async JSON + tab shell.
 * Module 1/3 reload once so selectedDay matches the URL without changing app code.
 */
export async function gotoModuleTagAndWaitForContent(
  page: Page,
  moduleId: number,
  tagId: number,
): Promise<void> {
  const path = `/modul/${moduleId}/tag/${tagId}`;
  const jsonPattern = `/data/module${moduleId}.json`;

  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await expect(page).not.toHaveURL(/\/login/);

  if (moduleId === 1 || moduleId === 3) {
    const jsonWait = page.waitForResponse(
      (r) => r.url().includes(jsonPattern) && r.status() === 200,
      { timeout: 30000 },
    );
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page).not.toHaveURL(/\/login/);
    await jsonWait.catch(() => undefined);
  } else {
    await page
      .waitForResponse((r) => r.url().includes(jsonPattern) && r.status() === 200, {
        timeout: 30000,
      })
      .catch(() => undefined);
  }

  await expect(page.getByRole("tab", { name: /Theorie/i })).toBeVisible({ timeout: 20000 });
  await page.waitForFunction(
    () => document.body.innerText.replace(/\s+/g, " ").trim().length > 400,
    { timeout: 30000 },
  );
}

/** Wait for a rendered gesetze-im-internet anchor containing slug (Normen tab preferred). */
export async function waitForGesetzeHrefWithSlug(page: Page, slug: string): Promise<void> {
  const slugLower = slug.toLowerCase();
  await openNormenTabIfPresent(page);
  await page.waitForFunction(
    (s) =>
      Array.from(document.querySelectorAll('a[href*="gesetze-im-internet.de"]')).some((a) =>
        (a.getAttribute("href") || "").toLowerCase().includes(s),
      ),
    slugLower,
    { timeout: 30000 },
  );
}

/** Strict runtime assertion: only rendered gesetze-im-internet hrefs, never html text fallback. */
export async function assertLawSlugHrefPresent(
  page: Page,
  moduleId: number,
  tagId: number,
  slug: string,
): Promise<void> {
  await gotoModuleTagAndWaitForContent(page, moduleId, tagId);
  await waitForGesetzeHrefWithSlug(page, slug);

  const hrefs = await collectGesetzeHrefs(page);
  const found = hrefs.some((h) => slugMatchesHref(h, slug));
  expect(
    found,
    `Kein gesetze-im-internet.de-href mit „${slug}“ auf Modul ${moduleId}/tag/${tagId} (${BASE})`,
  ).toBe(true);
}

export async function openKiAssistantOverlay(page: Page): Promise<void> {
  await page.getByRole("button", { name: "KI-Assistent öffnen" }).click({ timeout: 15000 });
  await expect(page.getByText(/KI-Tutor.*Immobilien-Akademie/)).toBeVisible({ timeout: 10000 });
}

/** Fixed full-screen overlay root (z-index 9999) — not the inner title-only div. */
export function kiAssistantOverlayRoot(page: Page) {
  return page.locator('div[style*="z-index: 9999"]').first();
}

/** Assert KI overlay input + mic are visible without touching page AudioPlayer or sending chat. */
export async function expectKiAssistantControlsVisible(page: Page): Promise<void> {
  const overlay = kiAssistantOverlayRoot(page);
  await expect(overlay).toBeVisible();

  const textbox = overlay.getByRole("textbox");
  await expect(textbox).toBeVisible();

  const micByTitle = overlay.getByTitle(/Spracheingabe starten|Aufnahme stoppen/i);
  if ((await micByTitle.count()) > 0) {
    await expect(micByTitle.first()).toBeVisible();
    await expect(micByTitle.first()).toBeEnabled();
    return;
  }

  const micByIcon = overlay.locator("button").filter({
    has: overlay.locator("svg.lucide-mic, svg.lucide-mic-off"),
  });
  await expect(micByIcon.first()).toBeVisible();
  await expect(micByIcon.first()).toBeEnabled();
}

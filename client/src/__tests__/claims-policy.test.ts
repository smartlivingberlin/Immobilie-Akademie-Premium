import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

type ForbiddenClaim = {
  label: string;
  pattern: RegExp;
};

const repoRoot = path.basename(process.cwd()) === "client"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();

const scanRoots = [
  "client/public/data",
  "client/src",
  "server",
];

const allowedRelativePaths = new Set([
  "CLAIMS_POLICY.md",
  "client/src/__tests__/claims-policy.test.ts",
  "shared/claims.ts",
]);

const ignoredDirectories = new Set([
  ".git",
  "audit_runs",
  "dist",
  "node_modules",
]);

const allowedExtensions = new Set([
  ".json",
  ".ts",
  ".tsx",
  ".txt",
]);

const forbiddenClaims: ForbiddenClaim[] = [
  {
    label: "keine 34c-IHK-Sachkundepruefung behaupten",
    pattern: /(?:Sachkundepruefung|Sachkundeprüfung)\s+nach\s+(?:§|Para(?:graph)?\s*)\s*34c/iu,
  },
  {
    label: "keine 34c-Sachkundeanforderung behaupten",
    pattern: /Sachkundeanforderung\s+nach\s+(?:§|Para(?:graph)?\s*)\s*34c/iu,
  },
  {
    label: "keinen IHK-Sachkundenachweis seit 2018 fuer 34c behaupten",
    pattern: /seit\s+2018\s+einen\s+IHK-Sachkundenachweis/iu,
  },
  {
    label: "keine Missachtung einer 34c-Sachkundeanforderung behaupten",
    pattern: /Missachtung\s+der\s+Sachkundeanforderung/iu,
  },
  {
    label: "keine IHK-Sachkunde Para 34c behaupten",
    pattern: /IHK-Sachkunde(?:pruefung|prüfung)?\s+(?:Para|§)\s*34c/iu,
  },
  {
    label: "keine IHK-Musterpruefungen fuer 34c-Kursinhalte behaupten",
    pattern: /IHK-Muster(?:pruefungen|prüfungen)/iu,
  },
  {
    label: "keine IHK-typischen Pruefungsfragen fuer 34c-Kursinhalte behaupten",
    pattern: /IHK-typische(?:n)?\s+(?:Pruefungsfragen|Prüfungsfragen)/iu,
  },
  {
    label: "kein IHK-Pruefungsformat fuer 34c-Kursinhalte behaupten",
    pattern: /Pruefungsformat\s+IHK|Prüfungsformat\s+IHK/iu,
  },
  {
    label: "keine IHK-Bestehensgrenze fuer 34c-Kursinhalte behaupten",
    pattern: /Bestehensgrenze\s+IHK/iu,
  },
  {
    label: "keine unbelegten IHK-Pruefungsschwerpunkte behaupten",
    pattern: /IHK.{0,80}(?:Pruefungsschwerpunkte|Prüfungsschwerpunkte)|(?:Pruefungsschwerpunkte|Prüfungsschwerpunkte).{0,80}IHK/iu,
  },
];

function collectFiles(relativeDir: string): string[] {
  const absoluteDir = path.join(repoRoot, relativeDir);
  if (!existsSync(absoluteDir)) return [];

  const files: string[] = [];
  const stack = [absoluteDir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    for (const entry of readdirSync(current)) {
      const absolutePath = path.join(current, entry);
      const relativePath = path.relative(repoRoot, absolutePath).replaceAll(path.sep, "/");
      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        if (!ignoredDirectories.has(entry)) stack.push(absolutePath);
        continue;
      }

      if (!stats.isFile()) continue;
      if (allowedRelativePaths.has(relativePath)) continue;
      if (!allowedExtensions.has(path.extname(entry))) continue;
      files.push(absolutePath);
    }
  }

  return files;
}

describe("Claims Policy", () => {
  it("blockiert bekannte falsche oder unbelegte 34c/IHK-Sachkunde-Claims", () => {
    const findings = scanRoots
      .flatMap(collectFiles)
      .flatMap((absolutePath) => {
        const text = readFileSync(absolutePath, "utf-8");
        const relativePath = path.relative(repoRoot, absolutePath).replaceAll(path.sep, "/");

        return forbiddenClaims
          .filter(({ pattern }) => pattern.test(text))
          .map(({ label, pattern }) => `${relativePath}: ${label} (${pattern})`);
      });

    expect(findings).toEqual([]);
  });
});

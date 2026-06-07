import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function readRepoFile(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), "utf-8");
}

describe("Express route registrations", () => {
  it("registers the case-study grading endpoint only once", () => {
    const route = "/api/ai/bewerte-fallstudie";
    const files = [
      "server/ragTutor.ts",
      "server/agent/agentRoutes.ts",
    ];

    const registrations = files.flatMap((file) => {
      const source = readRepoFile(file);
      const matches = source.matchAll(/app\.post\("([^"]+)"/g);
      return [...matches]
        .filter((match) => match[1] === route)
        .map(() => file);
    });

    expect(registrations).toEqual(["server/ragTutor.ts"]);
  });
});

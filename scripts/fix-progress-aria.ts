import fs from "node:fs";
let src = fs.readFileSync("client/src/components/ui/progress.tsx", "utf-8");
src = src.replace(
  '      {...props}\n    >',
  '      aria-label={(props as any)["aria-label"] ?? "Fortschritt"}\n      {...props}\n    >'
);
fs.writeFileSync("client/src/components/ui/progress.tsx", src);
const ok = fs.readFileSync("client/src/components/ui/progress.tsx", "utf-8").includes('aria-label');
console.log(ok ? "✓ aria-label eingefügt" : "✗ FEHLER");

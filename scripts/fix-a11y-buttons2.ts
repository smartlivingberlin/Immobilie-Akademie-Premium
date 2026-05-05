import fs from "node:fs";
let src = fs.readFileSync("client/src/components/layout/DashboardLayout.tsx", "utf-8");

src = src.replace(
  'className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-800"\n            onClick={() => setIsCollapsed(!isCollapsed)}',
  'aria-label={isCollapsed ? "Menü aufklappen" : "Menü einklappen"}\n            className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-800"\n            onClick={() => setIsCollapsed(!isCollapsed)}'
);
src = src.replace(
  'className="lg:hidden text-slate-400"\n            onClick={() => setIsMobileMenuOpen(false)}',
  'aria-label="Menü schließen"\n            className="lg:hidden text-slate-400"\n            onClick={() => setIsMobileMenuOpen(false)}'
);
src = src.replace(
  'className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-40"\n        size="icon"',
  'aria-label="KI-Assistent öffnen"\n        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-40"\n        size="icon"'
);

fs.writeFileSync("client/src/components/layout/DashboardLayout.tsx", src);
const count = (src.match(/aria-label=/g) || []).length;
console.log(`✓ aria-label total: ${count}`);

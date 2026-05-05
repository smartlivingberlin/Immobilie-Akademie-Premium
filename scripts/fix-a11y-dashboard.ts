import fs from "node:fs";

let src = fs.readFileSync("client/src/components/layout/DashboardLayout.tsx", "utf-8");

// Icon-Buttons aria-label hinzufügen
src = src.replace(
  /size="icon" className=\{`text-slate-300 hover:text-white hover:bg-slate-800 \$\{location === '\/rechner'/,
  'size="icon" aria-label="Praxisrechner" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === \'/rechner\''
);
src = src.replace(
  /size="icon" className=\{`text-slate-300 hover:text-white hover:bg-slate-800 \$\{location === '\/statistiken'/,
  'size="icon" aria-label="Lernstatistiken" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === \'/statistiken\''
);
src = src.replace(
  /size="icon" className=\{`text-slate-300 hover:text-white hover:bg-slate-800 \$\{location === '\/zertifikate'/,
  'size="icon" aria-label="Zertifikate" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === \'/zertifikate\''
);
src = src.replace(
  'size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">\n                            <BookOpen',
  'size="icon" aria-label="Fachbegriffe & Gesetze" className="text-slate-300 hover:text-white hover:bg-slate-800">\n                            <BookOpen'
);
src = src.replace(
  'size="icon" onClick={() => setIsMobileMenuOpen(true)}>',
  'size="icon" aria-label="Menü öffnen" onClick={() => setIsMobileMenuOpen(true)}>'
);

fs.writeFileSync("client/src/components/layout/DashboardLayout.tsx", src);
const count = (fs.readFileSync("client/src/components/layout/DashboardLayout.tsx", "utf-8").match(/aria-label=/g) || []).length;
console.log(`✓ aria-label gesetzt: ${count}`);

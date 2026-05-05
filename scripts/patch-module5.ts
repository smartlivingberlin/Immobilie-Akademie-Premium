import fs from "node:fs";
const file = "client/src/pages/modules/Module5Detail.tsx";
let src = fs.readFileSync(file, "utf-8");

// 1. Imports entfernen
src = src.replace(
  /\/\/ Import Content\n\/\/ OLD[^\n]*\n(import \{ contentDataModule5_34i[^\n]*\n)+/,
  ""
);

// 2. Merge-Block ersetzen
src = src.replace(
  /\/\/ Merge all parts into one object\nconst contentDataModule5Maximal = \{[\s\S]*?\};/,
  `type DayContent = Record<string, unknown>;\nlet _module5Cache: DayContent | null = null;`
);

// 3. fetch-State nach selectedDay einfügen
src = src.replace(
  `  const [selectedDay, setSelectedDay] = useState(urlDay);`,
  `  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [moduleData, setModuleData] = useState<DayContent | null>(null);

  useEffect(() => {
    if (_module5Cache) { setModuleData(_module5Cache); return; }
    fetch("/data/module5.json")
      .then(r => r.json())
      .then(d => { _module5Cache = d; setModuleData(d); });
  }, []);`
);

// 4. currentContent ersetzen
src = src.replace(
  `  const currentContent = contentDataModule5Maximal[selectedDay as keyof typeof contentDataModule5Maximal] || contentDataModule5Maximal.day_1;`,
  `  const currentContent = (moduleData?.[selectedDay] ?? moduleData?.["day_1"]) as any;\n  if (!currentContent) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:14,color:"#64748b"}}>Laden...</div>;`
);

fs.writeFileSync(file, src);
console.log("✓ gepatcht");
// Validierung
const result = fs.readFileSync(file, "utf-8");
console.log("Import noch drin?", result.includes("Module5Content_34i_Part1") ? "JA - FEHLER" : "NEIN - OK");
console.log("fetch drin?", result.includes('fetch("/data/module5.json")') ? "JA - OK" : "NEIN - FEHLER");

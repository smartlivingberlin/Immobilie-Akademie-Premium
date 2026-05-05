import fs from "node:fs";

const patches = [
  {
    file: "client/src/pages/modules/Module1Detail.tsx",
    jsonFile: "module1",
    importPattern: /import \{ contentDataModule1Maximal as contentData \} from "\.\/Module1Content_Maximal";\n/,
    mergePattern: null,
    varName: "contentData",
    totalDays: 20,
  },
  {
    file: "client/src/pages/modules/Module2Detail.tsx",
    jsonFile: "module2",
    importPattern: /import \{ contentDataPart[^\n]+\n/g,
    mergePattern: /\/\/ Merge[\s\S]*?};\n/,
    varName: "contentData",
    totalDays: 60,
  },
  {
    file: "client/src/pages/modules/Module3Detail.tsx",
    jsonFile: "module3",
    importPattern: /import \{ contentDataModule3[^\n]+\n/g,
    mergePattern: /const contentData[^\n]*=\s*\{[\s\S]*?\};\n/,
    varName: "contentData",
    totalDays: 80,
  },
  {
    file: "client/src/pages/modules/Module4Detail.tsx",
    jsonFile: "module4",
    importPattern: /import \{ contentDataModule4[^\n]+\n/g,
    mergePattern: /const contentData[^\n]*=\s*\{[\s\S]*?\};\n/,
    varName: "contentData",
    totalDays: 40,
  },
];

for (const p of patches) {
  let src = fs.readFileSync(p.file, "utf-8");
  const before = src.length;

  // Imports entfernen
  src = src.replace(p.importPattern, "");
  if (p.mergePattern) src = src.replace(p.mergePattern, "");

  // Cache + State einfügen (nach letztem import)
  const lastImport = src.lastIndexOf("\nimport ");
  const insertAfter = src.indexOf("\n", lastImport + 1) + 1;
  const cacheCode = `\ntype DayContent = Record<string, any>;\nlet _cache_${p.jsonFile}: DayContent | null = null;\n`;
  src = src.slice(0, insertAfter) + cacheCode + src.slice(insertAfter);

  // useState für moduleData nach erstem useState einfügen
  src = src.replace(
    /const \[selectedDay, setSelectedDay\] = useState\([^)]+\);/,
    (m) => `${m}\n  const [moduleData, setModuleData] = useState<DayContent | null>(null);\n\n  useEffect(() => {\n    if (_cache_${p.jsonFile}) { setModuleData(_cache_${p.jsonFile}); return; }\n    fetch("/data/${p.jsonFile}.json").then(r => r.json()).then(d => { _cache_${p.jsonFile} = d; setModuleData(d); });\n  }, []);`
  );

  // contentData Nutzung auf moduleData umleiten
  src = src.replace(/\bcontentData\b/g, "(moduleData ?? {})");

  // currentContent null-guard
  src = src.replace(
    /const currentContent = [^\n]+/,
    `const currentContent = moduleData?.[(selectedDay as string)] ?? moduleData?.["day_1"];\n  if (!currentContent) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:14,color:"#64748b"}}>Laden...</div>;`
  );

  fs.writeFileSync(p.file, src);
  console.log(`✓ ${p.file} — ${before} → ${src.length} Bytes`);
}

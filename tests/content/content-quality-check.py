#!/usr/bin/env python3
"""
Content-Qualitätsprüfung — alle Lerninhalte auf Vollständigkeit prüfen
"""
import os, json, re

BASE_DIR = "client/src/pages/modules"
results = {"ok": 0, "issues": []}

MODULE_FILES = {
    1: ["Module1Content_Maximal.ts"],
    2: ["Module2ContentPart1_Maximal.ts", "Module2ContentPart2_Maximal.ts", "Module2ContentPart3_Maximal.ts"],
    3: ["Module3Content_Maximal.ts", "Module3Content_Maximal_MissingDays.ts",
        "Module3Content_Maximal_Part2_Extended.ts", "Module3Content_Maximal_Part3_Extended.ts",
        "Module3Content_Maximal_Part4.ts"],
    4: ["Module4Content_Valuation_Maximalist.ts", "Module4Content_Valuation_Maximalist_Part2.ts",
        "Module4Content_Bonus_HypZert.ts", "Module4Content_Bonus_HypZert_Part2.ts"],
    5: ["Module5Content_34i_Part1.ts", "Module5Content_34i_Part2.ts", "Module5Content_34i_Part3.ts",
        "Module5Content_34i_Part4.ts", "Module5Content_34i_Part5.ts", "Module5Content_34i_Part6.ts",
        "Module5Content_34i_Part7_Final.ts"],
}
SOLL = {1: 20, 2: 60, 3: 80, 4: 40, 5: 40}

print("\n" + "="*60)
print("CONTENT-QUALITÄTSPRÜFUNG — ALLE LERNINHALTE")
print("="*60)

for mid, files in MODULE_FILES.items():
    content = ""
    for f in files:
        path = os.path.join(BASE_DIR, f)
        if os.path.exists(path):
            with open(path) as fh:
                content += fh.read()
    
    days = set(int(m.group(1)) for m in re.finditer(r'day_(\d+):', content))
    soll = SOLL[mid]
    missing = [d for d in range(1, soll+1) if d not in days]
    
    without_theory = sum(1 for d in days if f'day_{d}:' in content and 
                        not re.search(rf'day_{d}:.*?theory:', content[:content.find(f'day_{d}:')+5000], re.DOTALL))
    
    status = "✅" if not missing and without_theory < 5 else "⚠️"
    print(f"\n{status} MODUL {mid}: {len(days)}/{soll} Tage")
    if missing:
        print(f"   ❌ Fehlende Tage: {missing}")
        results["issues"].append(f"M{mid}: Tage {missing} fehlen")
    if without_theory > 0:
        print(f"   ⚠️ Mögliche leere Theorie-Felder: {without_theory}")
    if not missing and without_theory < 5:
        results["ok"] += 1
        print(f"   Vollständig ✓")

print(f"\n{'='*60}")
print(f"ERGEBNIS: {results['ok']}/5 Module vollständig")
if results["issues"]:
    for issue in results["issues"]:
        print(f"  ❌ {issue}")

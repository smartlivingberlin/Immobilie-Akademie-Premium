#!/usr/bin/env python3
"""
IHK Vollaudit-Agent — Autonomer Content-Prüfer
Liest alle Modul-Dateien, analysiert jeden Tag, schreibt Fixes.
"""

import re, os, json, time, sys, hashlib, urllib.request, urllib.error
from datetime import datetime
from pathlib import Path

# ══ KONFIGURATION ══
BASE_DIR = Path("/home/lenovo/projects/Immobilie-Akademie")
MODULES_DIR = BASE_DIR / "client/src/pages/modules"
CACHE_FILE = BASE_DIR / "audit_cache.json"
REPORT_FILE = BASE_DIR / "audit_report.html"
FIXES_FILE = BASE_DIR / "audit_fixes.json"

# API Key aus .env lesen
def get_api_key():
    env_file = BASE_DIR / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("ANTHROPIC_API_KEY="):
                return line.split("=", 1)[1].strip()
    return os.environ.get("ANTHROPIC_API_KEY", "")

API_KEY = get_api_key()
MODEL = "claude-haiku-4-5-20251001"  # Billigste und schnellste Option

# ══ IHK NORMEN-DATENBANK (kein API nötig) ══
IHK_NORMEN = {
    "makler": ["§ 652 BGB", "§ 653 BGB", "§ 654 BGB", "§ 656a BGB", "§ 656c BGB", "§ 656d BGB", "§ 34c GewO", "§ 1 MaBV"],
    "bgb_allg": ["§ 1 BGB", "§ 104 BGB", "§ 105 BGB", "§ 145 BGB", "§ 241 BGB", "§ 242 BGB"],
    "sachenrecht": ["§ 854 BGB", "§ 873 BGB", "§ 903 BGB", "§ 925 BGB", "§ 985 BGB"],
    "gwg": ["§ 2 GwG", "§ 10 GwG", "§ 11 GwG", "§ 43 GwG", "§ 56 GwG"],
    "gewerberecht": ["§ 34c GewO", "§ 34i GewO", "§ 14 GewO", "§ 29 GewO"],
    "mietrecht": ["§ 535 BGB", "§ 536 BGB", "§ 556 BGB", "§ 558 BGB", "§ 573 BGB"],
    "weg": ["§ 1 WEG", "§ 8 WEG", "§ 10 WEG", "§ 16 WEG", "§ 26a WEG"],
    "finanzierung": ["§ 34i GewO", "§ 488 BGB", "§ 489 BGB"],
    "wertermittlung": ["ImmoWertV 2021", "§ 194 BauGB", "§ 193 BauGB"],
    "steuer": ["§ 23 EStG", "§ 4 GrEStG"],
}

# Welche Normen für welchen Titel
# Präzises Normen-Mapping: Keyword → Normen-Kategorie
# Prüft Titel UND ersten Absatz des Inhalts
NORMEN_MAPPING = {
    # BGB Allgemein
    "bürgerliches gesetzbuch": "bgb_allg",
    "bgb": "bgb_allg",
    "vertragsrecht": "bgb_allg",
    "willenserklärung": "bgb_allg",
    "geschäftsfähigkeit": "bgb_allg",
    "rechtsfähigkeit": "bgb_allg",
    "allgemeiner teil": "bgb_allg",
    # Sachenrecht
    "sachenrecht": "sachenrecht",
    "eigentum": "sachenrecht",
    "besitz": "sachenrecht",
    "grundbuch": "sachenrecht",
    "auflassung": "sachenrecht",
    "grundschuld": "sachenrecht",
    # Maklerrecht
    "maklervertrag": "makler",
    "provision": "makler",
    "maklerrecht": "makler",
    "§ 652": "makler",
    "wohnungsvermittlung": "makler",
    "alleinauftrag": "makler",
    # Gewerberecht
    "§34c": "gewerberecht",
    "gewerbeerlaubnis": "gewerberecht",
    "gewerberecht": "gewerberecht",
    "gewerbeanmeldung": "gewerberecht",
    "mabv": "gewerberecht",
    "makler- und bauträger": "gewerberecht",
    # GwG
    "geldwäsche": "gwg",
    "gwg": "gwg",
    "sorgfaltspflicht": "gwg",
    "identifizierung": "gwg",
    "fiu": "gwg",
    # Mietrecht
    "mietrecht": "mietrecht",
    "mietvertrag": "mietrecht",
    "mieter": "mietrecht",
    "vermieter": "mietrecht",
    "betriebskosten": "mietrecht",
    "nebenkosten": "mietrecht",
    "kündigung": "mietrecht",
    "mieterhöhung": "mietrecht",
    # WEG
    "wohnungseigentumsgesetz": "weg",
    "weg-recht": "weg",
    "eigentümerversammlung": "weg",
    "hausverwaltung": "weg",
    "wohnungseigentum": "weg",
    "weg-verwalt": "weg",
    "sondereigentum": "weg",
    "gemeinschaftseigentum": "weg",
    # Finanzierung
    "§34i": "finanzierung",
    "darlehen": "finanzierung",
    "annuitätendarlehen": "finanzierung",
    "finanzierungsberatung": "finanzierung",
    "kfw": "finanzierung",
    "eu-wikr": "finanzierung",
    "darlehensvermittler": "finanzierung",
    # Wertermittlung
    "wertermittlung": "wertermittlung",
    "immobilienbewertung": "wertermittlung",
    "gutachten": "wertermittlung",
    "sachwert": "wertermittlung",
    "ertragswert": "wertermittlung",
    "vergleichswert": "wertermittlung",
    "immowertv": "wertermittlung",
    "liegenschaftszins": "wertermittlung",
    "bodenrichtwert": "wertermittlung",
    # Steuer
    "grunderwerbsteuer": "steuer",
    "spekulationssteuer": "steuer",
    "umsatzsteuer": "steuer",
    "einkommensteuer": "steuer",
    "abschreibung": "steuer",
    "afa": "steuer",
}

# Tage die KEINE Rechtsnormen brauchen (didaktische Tage)
NO_NORM_DAYS = {
    1: [1, 2, 3, 4, 5, 16, 17, 18, 19, 20],  # Soft Skills, Tools, Karriere
    2: [],
    3: [],
    4: [],
    5: [],
}

# ══ CACHE ══
def load_cache():
    if CACHE_FILE.exists():
        return json.loads(CACHE_FILE.read_text())
    return {}

def save_cache(cache):
    CACHE_FILE.write_text(json.dumps(cache, ensure_ascii=False, indent=2))

def cache_key(text):
    return hashlib.md5(text[:500].encode()).hexdigest()[:12]

# ══ CONTENT EXTRACTOR ══
def extract_days(filepath):
    """Extrahiert alle Lerntage aus einer Content-Datei"""
    content = Path(filepath).read_text(encoding='utf-8', errors='ignore')
    days = []
    
    # Finde alle day_N: { ... } Blöcke
    day_matches = list(re.finditer(r'day_(\d+)\s*:', content))
    
    for i, match in enumerate(day_matches):
        day_num = int(match.group(1))
        start = match.start()
        end = day_matches[i+1].start() if i+1 < len(day_matches) else len(content)
        block = content[start:end]
        
        def get_field(name):
            # Backtick string
            m = re.search(rf'{name}:\s*`([\s\S]*?)`', block)
            if m: return m.group(1).strip()
            # Double quote string  
            m = re.search(rf'{name}:\s*"(([^"\\]|\\.)*)"', block)
            if m: return m.group(1).strip()
            return ""
        
        def get_array(name):
            idx = block.find(f'{name}:')
            if idx < 0: return []
            b_start = block.find('[', idx)
            if b_start < 0: return []
            depth = 0
            for i in range(b_start, len(block)):
                if block[i] == '[': depth += 1
                elif block[i] == ']':
                    depth -= 1
                    if depth == 0:
                        return re.findall(r'"([^"]+)"', block[b_start+1:i])
            return []
        
        # Theory: alle Formate robust extrahieren
        theory_raw = ""
        # Backtick-Format zuerst
        idx_th = block.find("theory:")
        if idx_th >= 0:
            th_rest = block[idx_th+7:].lstrip()
            if th_rest.startswith("`"):
                end_bt = th_rest.find("`", 1)
                if end_bt > 0:
                    theory_raw = th_rest[1:end_bt].strip()[:500]
            elif th_rest.startswith('"'):
                end_q = th_rest.find('"', 1)
                if end_q > 0:
                    theory_raw = th_rest[1:end_q].strip()[:500]
        
                # Normen: norms[] oder law[] 
        norms_list = get_array("norms")
        law_list = get_array("law")
        all_norms = norms_list or law_list
        
        # Task: String oder Backtick
        task_raw = get_field("task") or ""
        if not task_raw:
            bt_task = re.search(r'task:\s*`([\s\S]*?)`', block)
            if bt_task:
                task_raw = bt_task.group(1).strip()[:300]
        
        # Extended: auch practice als Fallback
        extended_raw = get_field("extendedTheory") or ""
        if not extended_raw:
            bt_ext = re.search(r'extendedTheory:\s*`([\s\S]*?)`', block)
            if bt_ext:
                extended_raw = bt_ext.group(1).strip()
        if not extended_raw:
            bt_prac = re.search(r'practice:\s*`([\s\S]*?)`', block)
            if bt_prac:
                extended_raw = bt_prac.group(1).strip()
        
        day = {
            "day": day_num,
            "title": get_field("title"),
            "theory": theory_raw,
            "extended": extended_raw[:800],
            "task": task_raw,
            "norms": all_norms,
            "law": law_list,
            "examples": get_array("examples"),
            "keywords": get_array("keywords"),
        }
        
        if day["title"]:
            days.append(day)
    
    return sorted(days, key=lambda x: x["day"])

# ══ MODUL-MAPPING ══
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

MODULE_INFO = {
    1: {"name": "Einführung & Grundlagen", "target_days": 20, "ihk": "§34c GewO Grundlagen"},
    2: {"name": "Makler §34c GewO", "target_days": 60, "ihk": "§34c GewO, MaBV, §652 BGB"},
    3: {"name": "WEG & Mietrecht", "target_days": 80, "ihk": "WEG, §535ff BGB"},
    4: {"name": "Wertermittlung", "target_days": 40, "ihk": "ImmoWertV 2021"},
    5: {"name": "§34i Finanzierung", "target_days": 40, "ihk": "§34i GewO, EU-WIKR"},
}

# ══ STATISCHE ANALYSE (ohne API, 0 tokens) ══
def static_check(day, module):
    """Schnelle Checks ohne API-Calls"""
    issues = []
    fixes = {}
    score = 100
    
    # Inhaltsprüfung — theory ODER extended muss ausreichend sein
    theory_len = len(day.get("theory", "").strip())
    extended_len = len(day.get("extended", "").strip())
    best_content = max(theory_len, extended_len)
    if best_content < 80:
        issues.append(f"❌ Inhalt sehr kurz ({best_content} Zeichen)")
        score -= 25
    
    # Keine Normen (norms: oder law: Feld)
    no_norm = NO_NORM_DAYS.get(module, [])
    has_any_norms = bool(day.get("norms") or day.get("law"))
    if not has_any_norms and day["day"] not in no_norm:
        # Auto-detect welche Normen passen
        title_lower = day.get("title", "").lower()
        ext_lower = day.get("extended", "").lower()
        combined = title_lower + " " + ext_lower
        suggested_norms = []
        norm_keys_found = set()
        for keyword, norm_key in NORMEN_MAPPING.items():
            if keyword in combined and norm_key not in norm_keys_found:
                suggested_norms.extend(IHK_NORMEN.get(norm_key, []))
                norm_keys_found.add(norm_key)
        suggested_norms = list(dict.fromkeys(suggested_norms))[:6]
        
        if suggested_norms:
            issues.append(f"❌ Normen fehlen — Vorschlag: {', '.join(suggested_norms[:3])}")
            fixes["norms"] = suggested_norms
            score -= 20
        elif day["day"] not in no_norm:
            issues.append(f"⚠️ Normen prüfen")
            score -= 5
    
    # Keine Aufgabe
    if not day.get("task"):
        issues.append("❌ Keine Aufgabenstellung")
        score -= 15
        fixes["task"] = f"Erklären Sie das Thema '{day.get('title','')}' anhand eines Praxisbeispiels aus dem Makleralltag."
    
    # Kein extendedTheory
    if len(day.get("extended", "")) < 200:
        issues.append(f"❌ Inhalt sehr kurz ({len(day.get('extended',''))} Zeichen)")
        score -= 25
    
    # Titel/Inhalt-Mismatch prüfen (präziser)
    title_lower = day.get("title", "").lower()
    content_text = (day.get("theory","") + day.get("extended","") + day.get("task","")).lower()
    
    # Stopwords die nicht geprüft werden
    stopwords = {"grundlagen","einführung","berufsfeld","überblick","grundkurs",
                 "teil","modul","tag","und","der","die","das","für","in","im",
                 "wiederholung","abschluss","zertifikat","zwischentest","prüfungsvorbereitung",
                 "simulation","spezial","start","praxis","block","deep","dive"}
    
    key_title_words = {w for w in title_lower.split() 
                       if len(w) > 5 and w not in stopwords
                       and not w.startswith("§")}
    
    if len(key_title_words) >= 2:
        found_count = sum(1 for w in key_title_words if w[:6] in content_text)
        if found_count == 0 and len(content_text) > 200:
            issues.append(f"⚠️ Inhalt prüfen: Titel-Thema nicht im Inhalt erkennbar")
            score -= 15
    
    # Keine Keywords
    if not day.get("keywords"):
        score -= 5  # Kleiner Abzug
    
    return {
        "score": max(0, score),
        "issues": issues,
        "fixes": fixes,
        "static": True
    }

# ══ API ANALYSE (nur wenn nötig) ══
def api_analyze(day, module, cache):
    """Claude Haiku Analyse — nur für komplexe Prüfungen"""
    if not API_KEY:
        return None
    
    key = f"m{module}_d{day['day']}_{cache_key(day.get('extended',''))}"
    if key in cache:
        return cache[key]
    
    prompt = f"""IHK §34c Experte. Tag{day['day']} M{module}: "{day['title']}"
Inhalt:{day.get('extended','')[:400]}
Normen:{','.join(day.get('norms',[])[:5]) or 'KEINE'}
Aufgabe:{day.get('task','')[:100] or 'KEINE'}

Antworte NUR:
SCORE:X/100
FEHLER:(max 3, je 1 Zeile)
NORMEN_FEHLEN:(§§ oder NEIN)
AUFGABE_OK:(JA/NEIN)
INHALT_PASST:(JA/NEIN)"""

    try:
        data = json.dumps({
            "model": MODEL,
            "max_tokens": 180,
            "messages": [{"role": "user", "content": prompt}]
        }).encode()
        
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=data,
            headers={
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "anthropic-version": "2023-06-01"
            }
        )
        
        with urllib.request.urlopen(req, timeout=15) as r:
            resp = json.loads(r.read())
            result = resp["content"][0]["text"]
            tokens = resp.get("usage", {})
            cache[key] = {"result": result, "tokens": tokens, "time": time.time()}
            save_cache(cache)
            return cache[key]
    
    except Exception as e:
        return {"result": f"API Fehler: {e}", "tokens": {}, "time": time.time()}

# ══ PARSE API RESULT ══
def parse_api_result(result_text):
    if not result_text:
        return {}
    
    parsed = {}
    for line in result_text.split("\n"):
        if "SCORE:" in line:
            m = re.search(r'(\d+)', line)
            if m: parsed["api_score"] = int(m.group(1))
        elif "FEHLER:" in line:
            parsed["api_errors"] = line.replace("FEHLER:", "").strip()
        elif "NORMEN_FEHLEN:" in line:
            parsed["api_norms"] = line.replace("NORMEN_FEHLEN:", "").strip()
        elif "AUFGABE_OK:" in line:
            parsed["task_ok"] = "JA" in line.upper()
        elif "INHALT_PASST:" in line:
            parsed["content_ok"] = "JA" in line.upper()
    
    return parsed

# ══ HAUPTANALYSE ══
def analyze_module(module_num, use_api=True):
    """Analysiert komplettes Modul"""
    files = MODULE_FILES.get(module_num, [])
    info = MODULE_INFO[module_num]
    
    print(f"\n{'='*60}")
    print(f"MODUL {module_num}: {info['name']}")
    print(f"{'='*60}")
    
    all_days = []
    for fname in files:
        fpath = MODULES_DIR / fname
        if not fpath.exists():
            print(f"  ⚠️  Datei fehlt: {fname}")
            continue
        
        days = extract_days(fpath)
        print(f"  📄 {fname}: {len(days)} Tage extrahiert")
        
        for day in days:
            day["source_file"] = fname
            all_days.append(day)
    
    # Deduplizieren nach Tag-Nummer (erste Datei gewinnt)
    seen_days = {}
    for day in all_days:
        if day["day"] not in seen_days:
            seen_days[day["day"]] = day
    
    unique_days = sorted(seen_days.values(), key=lambda x: x["day"])
    actual_count = len(unique_days)
    target_count = info["target_days"]
    
    print(f"\n  Gefunden: {actual_count}/{target_count} Tage")
    missing_days = [d for d in range(1, target_count+1) if d not in seen_days]
    if missing_days:
        print(f"  ❌ Fehlende Tage: {missing_days[:10]}{'...' if len(missing_days)>10 else ''}")
    
    # Analysiere jeden Tag
    cache = load_cache()
    results = []
    total_tokens = 0
    total_score = 0
    issues_count = 0
    fixes_count = 0
    
    for i, day in enumerate(unique_days):
        sys.stdout.write(f"\r  Analysiere Tag {day['day']:3d}/{target_count}... ", )
        sys.stdout.flush()
        
        # Statische Analyse (kostenlos)
        static = static_check(day, module_num)
        
        # API nur wenn statische Analyse Probleme findet UND API verfügbar
        api_result = None
        if use_api and API_KEY and (static["score"] < 85 or not day.get("norms")):
            result = api_analyze(day, module_num, cache)
            if result:
                api_result = parse_api_result(result.get("result", ""))
                tokens = result.get("tokens", {})
                total_tokens += tokens.get("input_tokens", 0) + tokens.get("output_tokens", 0)
                time.sleep(0.2)  # Rate limiting
        
        # Kombinierter Score
        final_score = static["score"]
        if api_result and "api_score" in api_result:
            final_score = (static["score"] + api_result["api_score"]) // 2
        
        # Merge issues
        all_issues = static["issues"]
        if api_result:
            if not api_result.get("task_ok") and "Keine Aufgabe" not in str(all_issues):
                all_issues.append("⚠️ Aufgabe unzureichend (KI-Bewertung)")
            if not api_result.get("content_ok"):
                all_issues.append("🔴 Inhalt passt nicht zum Titel (KI-Bestätigung)")
        
        result_entry = {
            "module": module_num,
            "day": day["day"],
            "title": day["title"],
            "score": final_score,
            "issues": all_issues,
            "fixes": static["fixes"],
            "has_norms": bool(day.get("norms")),
            "has_task": bool(day.get("task")),
            "theory_len": len(day.get("theory", "")),
            "content_len": len(day.get("extended", "")),
            "source": day.get("source_file", ""),
        }
        
        results.append(result_entry)
        total_score += final_score
        issues_count += len(all_issues)
        fixes_count += len(static["fixes"])
    
    avg_score = total_score // len(unique_days) if unique_days else 0
    
    print(f"\r  ✅ {len(unique_days)} Tage analysiert | Ø Score: {avg_score}/100 | {issues_count} Probleme | {total_tokens} tokens")
    
    return {
        "module": module_num,
        "name": info["name"],
        "actual_days": actual_count,
        "target_days": target_count,
        "missing_days": missing_days,
        "avg_score": avg_score,
        "total_tokens": total_tokens,
        "results": results,
        "issues_count": issues_count,
        "fixes_count": fixes_count,
    }

# ══ REPORT GENERATOR ══
def generate_html_report(all_modules):
    total_days = sum(m["actual_days"] for m in all_modules)
    total_issues = sum(m["issues_count"] for m in all_modules)
    total_tokens = sum(m["total_tokens"] for m in all_modules)
    overall_score = sum(m["avg_score"] for m in all_modules) // len(all_modules)
    
    def color(score):
        if score >= 80: return "#2e7d32"
        if score >= 60: return "#f57f17"
        return "#c62828"
    
    def badge(score):
        if score >= 80: return "background:#e8f5e9;color:#1b5e20"
        if score >= 60: return "background:#fff8e1;color:#6d4c00"
        return "background:#ffebee;color:#7f0000"
    
    rows = ""
    for mod in all_modules:
        for r in mod["results"]:
            issue_html = "<br>".join(r["issues"][:3]) if r["issues"] else "✅ Keine"
            fix_html = ", ".join(f"{k}: {str(v)[:40]}" for k,v in r["fixes"].items())[:80] if r["fixes"] else "—"
            rows += f"""
            <tr>
                <td style="font-family:monospace;font-size:12px">M{r['module']}</td>
                <td style="font-family:monospace">T{r['day']:02d}</td>
                <td style="font-size:13px">{r['title'][:45]}</td>
                <td style="text-align:center"><span style="font-family:monospace;font-weight:700;color:{color(r['score'])}">{r['score']}</span></td>
                <td style="color:{'#2e7d32' if r['has_norms'] else '#c62828'}">{'✅' if r['has_norms'] else '❌'}</td>
                <td style="color:{'#2e7d32' if r['has_task'] else '#c62828'}">{'✅' if r['has_task'] else '❌'}</td>
                <td style="font-size:11px;color:#555">{issue_html}</td>
                <td style="font-size:11px;color:#1565c0">{fix_html}</td>
            </tr>"""
    
    mod_cards = ""
    for mod in all_modules:
        missing_str = str(mod["missing_days"][:5])[1:-1] if mod["missing_days"] else "—"
        mod_cards += f"""
        <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:18px;border-left:4px solid {color(mod['avg_score'])}">
            <div style="font-size:11px;color:#999;font-family:monospace">MODUL {mod['module']}</div>
            <div style="font-size:16px;font-weight:700;margin:4px 0">{mod['name']}</div>
            <div style="font-size:28px;font-weight:800;color:{color(mod['avg_score'])};font-family:monospace">{mod['avg_score']}<span style="font-size:14px">/100</span></div>
            <div style="font-size:12px;color:#666;margin-top:8px">
                {mod['actual_days']}/{mod['target_days']} Tage ·
                {mod['issues_count']} Probleme ·
                {mod['fixes_count']} Auto-Fixes
            </div>
            {"<div style='font-size:11px;color:#c62828;margin-top:4px'>Fehlende Tage: " + missing_str + "</div>" if mod['missing_days'] else ""}
        </div>"""
    
    html = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>IHK Vollaudit — Immobilien Akademie Smart</title>
<style>
body{{font-family:'Segoe UI',sans-serif;margin:0;background:#f5f5f5;color:#222}}
.header{{background:linear-gradient(135deg,#1a472a,#2d6a4f);color:white;padding:30px 40px}}
.header h1{{font-size:26px;margin:0 0 4px}}
.header .meta{{font-size:13px;opacity:.8;font-family:monospace}}
.content{{max-width:1400px;margin:0 auto;padding:30px 20px}}
.stat-grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px}}
.stat{{background:white;border-radius:10px;padding:16px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.08)}}
.stat-val{{font-size:32px;font-weight:800;font-family:monospace}}
.stat-lbl{{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.06em;margin-top:4px}}
.mod-grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px}}
.section-title{{font-size:16px;font-weight:700;margin-bottom:12px;color:#1a472a}}
table{{width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08)}}
th{{background:#1a472a;color:white;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em}}
td{{padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top}}
tr:hover td{{background:#f9f9f9}}
.filter-row{{display:flex;gap:8px;margin-bottom:12px}}
input[type=text]{{padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:13px;width:300px}}
select{{padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:13px}}
</style>
</head>
<body>
<div class="header">
    <h1>🎓 IHK Vollaudit — Immobilien Akademie Smart</h1>
    <div class="meta">Generiert: {datetime.now().strftime('%d.%m.%Y %H:%M')} · {total_days} Tage analysiert · {total_tokens} tokens verbraucht · Modell: {MODEL}</div>
</div>
<div class="content">
    <div class="stat-grid">
        <div class="stat"><div class="stat-val" style="color:{color(overall_score)}">{overall_score}</div><div class="stat-lbl">Gesamt-Score /100</div></div>
        <div class="stat"><div class="stat-val">{total_days}</div><div class="stat-lbl">Tage analysiert</div></div>
        <div class="stat"><div class="stat-val" style="color:#c62828">{total_issues}</div><div class="stat-lbl">Probleme gesamt</div></div>
        <div class="stat"><div class="stat-val" style="color:#1565c0">{sum(m['fixes_count'] for m in all_modules)}</div><div class="stat-lbl">Auto-Fixes verfügbar</div></div>
        <div class="stat"><div class="stat-val" style="color:#6a1b9a">{total_tokens}</div><div class="stat-lbl">Tokens verbraucht</div></div>
    </div>
    
    <div class="section-title">Modul-Übersicht</div>
    <div class="mod-grid">{mod_cards}</div>
    
    <div class="section-title">Vollständige Tages-Analyse</div>
    <div class="filter-row">
        <input type="text" id="search" placeholder="🔍 Suche (Titel, Probleme...)" oninput="filterTable()">
        <select id="mod-filter" onchange="filterTable()">
            <option value="">Alle Module</option>
            <option value="M1">Modul 1</option>
            <option value="M2">Modul 2</option>
            <option value="M3">Modul 3</option>
            <option value="M4">Modul 4</option>
            <option value="M5">Modul 5</option>
        </select>
        <select id="score-filter" onchange="filterTable()">
            <option value="">Alle Scores</option>
            <option value="critical">Kritisch (unter 60)</option>
            <option value="warn">Warnung (60-79)</option>
            <option value="ok">OK (80+)</option>
        </select>
    </div>
    <table id="main-table">
        <thead><tr>
            <th>Mod</th><th>Tag</th><th>Titel</th><th>Score</th>
            <th>Normen</th><th>Aufgabe</th><th>Probleme</th><th>Auto-Fix</th>
        </tr></thead>
        <tbody>{rows}</tbody>
    </table>
</div>
<script>
function filterTable(){{
    const search = document.getElementById('search').value.toLowerCase();
    const mod = document.getElementById('mod-filter').value;
    const scoreF = document.getElementById('score-filter').value;
    document.querySelectorAll('#main-table tbody tr').forEach(tr=>{{
        const text = tr.textContent.toLowerCase();
        const scoreEl = tr.querySelector('td:nth-child(4) span');
        const score = scoreEl ? parseInt(scoreEl.textContent) : 100;
        const modMatch = !mod || tr.cells[0].textContent === mod;
        const scoreMatch = !scoreF || 
            (scoreF==='critical' && score<60) ||
            (scoreF==='warn' && score>=60 && score<80) ||
            (scoreF==='ok' && score>=80);
        tr.style.display = (text.includes(search) && modMatch && scoreMatch) ? '' : 'none';
    }});
}}
</script>
</body>
</html>"""
    
    return html

# ══ FIXES WRITER ══
def apply_auto_fixes(all_modules):
    """Schreibt automatische Fixes direkt in die Content-Dateien"""
    fixes_applied = 0
    
    for mod in all_modules:
        for result in mod["results"]:
            if not result["fixes"]:
                continue
            
            # Finde die Quelldatei
            src = result.get("source", "")
            if not src:
                continue
            
            fpath = MODULES_DIR / src
            if not fpath.exists():
                continue
            
            content = fpath.read_text(encoding='utf-8', errors='ignore')
            title = result["title"]
            
            # Fix: Normen hinzufügen
            if "norms" in result["fixes"] and not result["has_norms"]:
                norms_str = ', '.join(f'"{n}"' for n in result["fixes"]["norms"])
                old = f'title: "{title}"'
                # Suche norms: [] nach diesem Titel
                idx = content.find(old)
                if idx >= 0:
                    section = content[idx:idx+400]
                    if 'norms: []' in section:
                        new_norms = f'norms: [{norms_str}]'
                        content = content[:idx] + section.replace('norms: []', new_norms, 1) + content[idx+400:]
                        fixes_applied += 1
            
            fpath.write_text(content, encoding='utf-8')
    
    return fixes_applied

# ══ MAIN ══
def main():
    print("🎓 IHK VOLLAUDIT-AGENT")
    print("=" * 60)
    print(f"Zeit: {datetime.now().strftime('%d.%m.%Y %H:%M')}")
    print(f"API: {'✅ Verfügbar (' + MODEL + ')' if API_KEY else '⚠️  Kein API Key — nur statische Analyse'}")
    print(f"Dateien: {MODULES_DIR}")
    
    # Argumente parsen
    modules_to_check = [1,2,3,4,5]
    apply_fixes = "--fix" in sys.argv
    no_api = "--no-api" in sys.argv
    
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        modules_to_check = [int(sys.argv[1])]
    
    print(f"Module: {modules_to_check} | Fixes: {'JA' if apply_fixes else 'NEIN'} | API: {'NEIN' if no_api else 'JA'}")
    
    all_modules = []
    start_time = time.time()
    
    for m in modules_to_check:
        result = analyze_module(m, use_api=not no_api)
        all_modules.append(result)
    
    elapsed = time.time() - start_time
    
    # HTML Report
    print(f"\n📄 Generiere HTML-Report...")
    html = generate_html_report(all_modules)
    REPORT_FILE.write_text(html, encoding='utf-8')
    print(f"✅ Report: {REPORT_FILE}")
    
    # JSON Fixes
    all_fixes = []
    for mod in all_modules:
        for r in mod["results"]:
            if r["fixes"] or r["issues"]:
                all_fixes.append(r)
    
    FIXES_FILE.write_text(json.dumps(all_fixes, ensure_ascii=False, indent=2))
    print(f"✅ Fixes-JSON: {FIXES_FILE}")
    
    # Auto-Fixes anwenden
    if apply_fixes:
        print(f"\n🔧 Wende Auto-Fixes an...")
        n = apply_auto_fixes(all_modules)
        print(f"✅ {n} Fixes angewendet")
    
    # Zusammenfassung
    total_issues = sum(m["issues_count"] for m in all_modules)
    total_days = sum(m["actual_days"] for m in all_modules)
    avg_score = sum(m["avg_score"] for m in all_modules) // len(all_modules)
    total_tokens = sum(m["total_tokens"] for m in all_modules)
    
    print(f"\n{'='*60}")
    print(f"AUDIT ABGESCHLOSSEN in {elapsed:.1f}s")
    print(f"{'='*60}")
    print(f"  Tage analysiert: {total_days}")
    print(f"  Gesamt-Score:    {avg_score}/100")
    print(f"  Probleme:        {total_issues}")
    print(f"  Tokens genutzt:  {total_tokens}")
    print(f"  Report:          audit_report.html")
    
    # Öffne Report im Browser
    os.system(f"explorer.exe '{REPORT_FILE}' 2>/dev/null || xdg-open '{REPORT_FILE}' 2>/dev/null || echo 'Öffne manuell: {REPORT_FILE}'")

if __name__ == "__main__":
    main()

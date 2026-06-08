#!/usr/bin/env python3
"""
API Test Suite — Immobilien Akademie Smart
Testet alle API-Endpoints systematisch
"""
import os
import requests
import json
import sys

ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL") or os.environ.get("B2B_ADMIN_EMAIL") or "alisadgadyri38@gmail.com"
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD") or os.environ.get("B2B_ADMIN_PASSWORD") or "Admin2026!"
PLACEHOLDER_PASSWORDS = {
    "DEIN_PASSWORT", "DEIN_ECHTES_PASSWORT", "DeinEchtesPasswort",
    "dein echtes Passwort", "<test-password>",
}

BASE = "https://immobilien-akademie-smart.de"
session = requests.Session()

results = {"passed": 0, "failed": 0, "errors": []}

def test(name, condition, detail=""):
    if condition:
        results["passed"] += 1
        print(f"  ✅ {name}")
    else:
        results["failed"] += 1
        results["errors"].append(f"{name}: {detail}")
        print(f"  ❌ {name} — {detail}")

print("\n" + "="*60)
print("API TEST SUITE — IMMOBILIEN AKADEMIE SMART")
print("="*60)

# 1. Health Check
print("\n📡 1. HEALTH CHECK")
r = session.get(f"{BASE}/api/health", timeout=10)
test("Server erreichbar", r.status_code == 200)
test("Health Response hat 'ok'", r.json().get("ok") == True)

# 2. Portal Phase
print("\n🔧 2. PORTAL PHASE & FEATURE FLAGS")
r = session.get(f"{BASE}/api/portal-phase", timeout=10)
test("Portal Phase erreichbar", r.status_code == 200)
d = r.json()
test("Phase ist 'A'", d.get("phase") == "A", f"Ist: {d.get('phase')}")
test("Feature Flags vorhanden", "flags" in d)
flags = d.get("flags", {})
test("Onboarding-Wizard aktiv", flags.get("onboardingWizard") == True)
test("Audio-Funktion aktiv", flags.get("audioFunction") == True)
test("KI-Tutor aktiv", flags.get("kiTutor") == True)

# 3. Stripe Produkte
print("\n💳 3. STRIPE PRODUKTE")
r = session.get(f"{BASE}/api/stripe/products", timeout=10)
test("Produkte API erreichbar", r.status_code == 200)
products = r.json()
test("7 Produkte vorhanden", len(products) == 7, f"Gefunden: {len(products)}")
test("Komplett-Paket vorhanden", any(p.get("id") == "modul_komplett" for p in products))
test("Compliance-SKU vorhanden", any(p.get("id") == "compliance_20h" for p in products))
test("Alle Preise > 0", all(p.get("price", 0) > 0 for p in products))

# 4. Authentifizierung
print("\n🔐 4. AUTHENTIFIZIERUNG")
r = session.get(f"{BASE}/api/auth/me", timeout=10)
test("Auth/me ohne Login gibt 401", r.status_code == 401)

# Login (vor Rate-Limit-Test — sonst 429 durch vorherige Audit-Läufe)
login_ok = False
login_body = {}
if ADMIN_PASSWORD in PLACEHOLDER_PASSWORDS:
    print("  ⚠️  Passwort ist Platzhalter — nutze B2B_ADMIN_PASSWORD vom erfolgreichen B2B-Smoke")
    test("Admin-Login erfolgreich", False, "Platzhalter-Passwort")
    test("Login gibt 'ok: true'", False)
    test("Login gibt Role zurück", False)
else:
    r = session.post(f"{BASE}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=10)
    if r.status_code == 429:
        print("  ⚠️  Rate-Limit aktiv (429) — 15 Min. warten oder SKIP_RATE_LIMIT_TEST=1 beim nächsten Lauf")
    login_ok = r.status_code == 200
    login_body = r.json() if login_ok else {}
    test("Admin-Login erfolgreich", login_ok, f"Status {r.status_code}" if not login_ok else "")
    test("Login gibt 'ok: true'", login_body.get("ok") == True)
    test("Login gibt Role zurück", login_body.get("role") == "admin")

# Auth/me nach Login
if login_ok:
    r = session.get(f"{BASE}/api/auth/me", timeout=10)
    test("Auth/me nach Login gibt User", r.status_code == 200)
    user = r.json()
    test("onboardingCompleted Feld vorhanden", "onboardingCompleted" in user)
    test("learningGoal Feld vorhanden", "learningGoal" in user)
else:
    test("Auth/me nach Login gibt User", False, "Login fehlgeschlagen")
    test("onboardingCompleted Feld vorhanden", False, "Login fehlgeschlagen")
    test("learningGoal Feld vorhanden", False, "Login fehlgeschlagen")

# 5. Öffentliche Seiten
print("\n🌐 5. ALLE ÖFFENTLICHEN SEITEN")
pages = ["/", "/kurse", "/lehrplan", "/glossary", "/login", 
         "/impressum", "/datenschutz", "/agb", "/widerruf",
         "/sitemap.xml", "/robots.txt", "/manifest.json"]
for path in pages:
    r = session.get(f"{BASE}{path}", timeout=10)
    test(f"GET {path}", r.status_code == 200, f"Status: {r.status_code}")

# 6. Security Headers
print("\n🔒 6. SECURITY HEADERS")
r = session.get(f"{BASE}/", timeout=10)
headers = {k.lower(): v for k, v in r.headers.items()}
test("HSTS vorhanden", "strict-transport-security" in headers)
test("X-Frame-Options vorhanden", "x-frame-options" in headers)
test("X-Content-Type vorhanden", "x-content-type-options" in headers)
test("CSP vorhanden", "content-security-policy" in headers)

# 7. Rate Limiting (eigene Session — blockiert nicht den Admin-Login oben)
print("\n⚡ 7. RATE LIMITING")
if os.environ.get("SKIP_RATE_LIMIT_TEST") == "1":
    print("  ⏭️  Übersprungen (SKIP_RATE_LIMIT_TEST=1)")
else:
    rate_session = requests.Session()
    failed_attempts = 0
    for i in range(12):
        r = rate_session.post(f"{BASE}/api/auth/login",
            json={"email": "rate-limit-probe@test.de", "password": "WrongPass!"},
            timeout=5)
        if r.status_code == 429:
            failed_attempts = i + 1
            break
    test("Rate Limiting aktiv (429 nach vielen Versuchen)",
         failed_attempts > 0,
         f"Gesperrt nach {failed_attempts} Versuchen" if failed_attempts > 0 else "Nie gesperrt!")

# Ergebnis
print("\n" + "="*60)
print(f"ERGEBNIS: {results['passed']} bestanden | {results['failed']} fehlgeschlagen")
if results["errors"]:
    print("\nFEHLER:")
    for e in results["errors"]:
        print(f"  ❌ {e}")
print("="*60)
sys.exit(0 if results["failed"] == 0 else 1)

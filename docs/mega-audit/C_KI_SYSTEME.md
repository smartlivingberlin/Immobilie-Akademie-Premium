# Teil C — KI-Systeme & KI-Engineering

**Rolle:** KI-Ingenieur  
**Stand:** 2026-06-11

---

## C1. Multi-Provider-Pipeline

### LLM-Aufruf-Stellen (grep 2026-06-11)

| Datei | Provider-Kette | Fallback |
|-------|----------------|----------|
| `server/ragTutor.ts` | Gemini → Groq → Claude | ✅ try/catch Kette :274-293 |
| `server/kursbuchLlm.ts` | Gemini → Groq → Claude | ✅ `askLlmWithContinuation` |
| `server/agent/SuperAgent.ts` | Anthropic + Gemini URLs | ✅ Multi-Provider |
| `server/verwalterRouter.ts` | `askLlmWithContinuation` | ✅ Assistent + ki-brief |
| `server/kursbuchChunkedRouter.ts` | Nur Anthropic direkt | ⚠️ Single-Point |

**Modell RAG-Tutor:** `claude-haiku-4-5` in `ragTutor.ts` (VERBOTEN zu ändern laut AGENTS.md)

### Single-Point-of-Failure

⚠️ `kursbuchChunkedRouter.ts:29` — direkter Anthropic-Fetch ohne Fallback-Kette.

---

## C2. Fair-Use / Cost-Cap

### Abgedeckte Pfade (`shared/kiFairUse.ts:14-19`)

```
/api/ai
/api/verwalter/ki-brief
/api/verwalter/assistent
/api/verwalter/buchungen/vorschlagen
```

Middleware: `server/kiFairUseGate.ts` → `mountKiFairUseGate` in `index.ts:288`

### NICHT per Fair-Use-Pfad-Liste abgedeckt

⚠️ Einzelne `/api/ai/rag-tutor`, `/api/ai/generate-kursbuch` etc. — liegen unter `/api/ai` Prefix → **abgedeckt**.

✅ **Mahnwesen/ETV-Briefe:** Template aus `shared/verwalterVorlagen.ts` — **kein LLM** für Standard-Mahnung Stufe 1 (User-Test 2026-06-10 bestätigt deterministischen Brief-Text).

### Kosten-Hochrechnung (💭 Schätzung)

Annahme: 50 Verwalter × 10 KI-Aktionen/Monat = 500 Calls  
Prompt ~2k + Response ~1k Tokens, Haiku ~$0.001/Call → **~$0.50–2/Monat** bei Haiku.  
⚠️ **ANNAHME** — ohne Live `monitoring_log` Token-Counts nicht verifiziert.

---

## C3. Prompt-Qualität

### Rechtsberatung-Disclaimer

| Stelle | Disclaimer |
|--------|--------------|
| `ragTutor.ts:220` | ✅ "Keine Rechtsberatung" |
| `routers.ts:475` | ✅ Hinweis Fachanwalt |
| `verwalterRouter.ts:845` | ✅ "Keine Rechtsberatung" |
| `agentRoutes.ts:224` | ✅ "Gib keine Rechtsberatung" |

### RAG-Wissensbasis

| Modul | Dateigröße | Letztes Git-Update |
|-------|------------|-------------------|
| modul_1.txt | 31 KB | 🔍 |
| modul_2.txt | 49 KB | 🔍 |
| modul_3.txt | 252 KB | 2026-05-11 |
| modul_4.txt | 55 KB | 🔍 |
| modul_5.txt | 113 KB | 🔍 |

---

## C4. Halluzinations-Risiko Verwalter

### Fristen — KRITISCH

✅ **HARDCODED deterministisch** in `shared/verwalterFristen.ts`:

```typescript
legalBasis: "§ 24 Abs. 2 WEG", durationDays: 21  // ETV-Einladung
legalBasis: "§ 46 Abs. 1 WEG", durationDays: 30  // Anfechtung
```

ETV-Berechnung in `shared/verwalterEtv.ts` — Code-basiert, nicht LLM.

⚠️ **Nicht abgedeckt:** Online-ETV, Umlaufbeschluss — Sonderfristen fehlen in Checkliste.

### Vorlagen §-Verweise

Stichprobe `shared/verwalterVorlagen.ts` — § 24 WEG, § 556 BGB, § 286 BGB referenziert.  
🔍 Aktualität nach WEG-Reform 2020 — **Claude Web-Recherche nötig** (Teil F).

---

## C5. KI-Observability

### monitoring_log
✅ HealthWatcher schreibt Checks — `HealthWatcher.ts:91-94`  
✅ KI-Stats Endpoint: `/api/admin/ki-stats` (Admin-only)

🔍 Ob jeder LLM-Call Tokens/Kosten loggt — **teilweise** über Agent/Infrastruktur; vollständige Abdeckung UNVERIFIZIERT ohne Prod-DB-Query.

---

*Weiter: [E_TESTING_QA.md](./E_TESTING_QA.md)*

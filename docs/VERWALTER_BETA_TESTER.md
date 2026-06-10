# Verwalter Suite — Beta-Tester einladen

**Stand:** 2026-06-10

---

## Was du **jetzt** schicken kannst (ohne Extra-Railway)

| Was | Link / Inhalt |
|-----|----------------|
| **Haupt-URL** | https://immobilien-akademie-smart.de/app/verwalter/objekte |
| **Login** | Tester registriert sich **oder** du erstellst Zugangscode im Admin |
| **GitHub** | **Nicht** mitschicken — Tester brauchen nur die URL |
| **Railway** | **Nicht** nötig — läuft auf dem bestehenden Production-Service |

**Kurztext für E-Mail/WhatsApp:**

> Verwalter-Tools (Beta): https://immobilien-akademie-smart.de/app/verwalter/objekte  
> Bitte registrieren, Objekt anlegen, Buchungen + Assistent testen. Feedback per E-Mail.

---

## Braucht man ein extra Railway-Projekt?

| Phase | Antwort |
|-------|---------|
| **Jetzt (Beta)** | **Nein** — gleiche Domain, gleicher Deploy |
| **Später (Marke)** | **Zweiter Service** im gleichen Railway-Projekt + Subdomain `verwalter.immobilien-akademie-smart.de` |
| **Eigenes Railway-Projekt** | Nur bei Compliance/Isolation — optional, nicht jetzt |

---

## Braucht man ein extra GitHub-Repo?

**Nein.** Monorepo bleibt. Verwalter ist Sub-Produkt unter `/app/verwalter/*`.

Split erst sinnvoll bei separatem Team oder >50 zahlende Verwalter-Kunden.

---

## Empfohlene Reihenfolge

1. **Jetzt:** Features ausbauen + Beta-Tester über Haupt-URL  
2. **Nach MySQL-Migration:** Daten sicher (kein Verlust bei Redeploy)  
3. **Bei Go-to-Market:** Eigene Subdomain + Stripe-Produkt „Verwalter Tools"  
4. **Optional später:** Vollständige Trennung (eigenes Impressum, eigenes Railway-Projekt)

Siehe auch: `docs/VERWALTER_INDEPENDENCE_PLAN.md`

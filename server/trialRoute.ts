import type { Express, Request, Response } from "express";
import { createTransport } from "nodemailer";
import crypto from "crypto";

function generateTrialCode(): string {
  return "TRIAL-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

async function sendTrialEmail(
  name: string,
  email: string,
  code: string,
  expiresHours: number,
  baseUrl: string
): Promise<void> {
  // Resend API
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Immobilien Akademie Smart <noreply@immobilien-akademie-smart.de>",
      to: email,
      subject: `${name}, dein kostenloser Testzugang ist bereit! 🎓`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f8fafc;margin:0;padding:20px">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
  
  <div style="background:#0f1f3d;padding:32px 40px;text-align:center">
    <h1 style="color:#f5c842;margin:0;font-size:24px">Immobilien Akademie Smart</h1>
    <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px">Ihr persönlicher Testzugang</p>
  </div>

  <div style="padding:40px">
    <h2 style="color:#0f1f3d;margin:0 0 16px">Hallo ${name}! 👋</h2>
    <p style="color:#475569;line-height:1.7;margin:0 0 24px">
      Ihr kostenloser <strong>${expiresHours}-Stunden-Testzugang</strong> zum vollständigen Portal ist aktiviert. 
      Sie können jetzt alle 5 Module, den KI-Tutor, die Prüfungssimulation und alle Lerntools in Ruhe testen.
    </p>

    <div style="background:#f1f5f9;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px">
      <p style="color:#64748b;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Ihr persönlicher Zugangscode</p>
      <div style="font-family:monospace;font-size:28px;font-weight:bold;color:#0f1f3d;letter-spacing:3px">${code}</div>
      <p style="color:#94a3b8;font-size:12px;margin:8px 0 0">Gültig für ${expiresHours} Stunden</p>
    </div>

    <div style="text-align:center;margin:0 0 32px">
      <a href="${baseUrl}/code-einloesen?code=${code}" 
         style="display:inline-block;background:#0f1f3d;color:#f5c842;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">
        Jetzt Portal öffnen →
      </a>
    </div>

    <div style="border-top:1px solid #e2e8f0;padding-top:24px">
      <p style="color:#475569;font-size:14px;margin:0 0 12px"><strong>Was Sie testen können:</strong></p>
      <ul style="color:#64748b;font-size:14px;line-height:1.8;margin:0;padding-left:20px">
        <li>📖 Alle 5 Module mit Lerntagen</li>
        <li>🤖 KI-Tutor (Gemini 2.5 Flash)</li>
        <li>🎓 Prüfungs-Simulation (810 Fragen)</li>
        <li>🔢 10 Praxis-Rechner</li>
        <li>🃏 Lernkarten & Fallstudien</li>
        <li>📊 Gamification & Fortschritt</li>
      </ul>
    </div>

    <div style="background:#fffbeb;border-left:4px solid #f5c842;padding:16px;margin:24px 0;border-radius:0 8px 8px 0">
      <p style="color:#92400e;font-size:13px;margin:0">
        <strong>💡 Tipp:</strong> Benutzen Sie den Onboarding-Assistenten direkt nach dem Login — 
        er zeigt Ihnen in 5 Minuten alles was wichtig ist.
      </p>
    </div>
  </div>

  <div style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0">
    <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0">
      Immobilien Akademie Smart · Durlacher Str. 36, 10715 Berlin<br>
      Tel: +49 171 1526327 · <a href="mailto:alisadgadyri38@gmail.com" style="color:#94a3b8">alisadgadyri38@gmail.com</a>
    </p>
  </div>

</div>
</body>
</html>`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend Fehler: ${err}`);
  }
}

export function registerTrialRoutes(app: Express, db: any) {
  // POST /api/trial/request — Neuen Trial-Code anfordern
  app.post("/api/trial/request", async (req: Request, res: Response) => {
    const { name, email, moduleInterest } = req.body ?? {};

    if (!name || !email || !email.includes("@")) {
      return res.status(400).json({ error: "Name und gültige E-Mail erforderlich." });
    }

    const nameClean = name.trim().slice(0, 100);
    const emailClean = email.toLowerCase().trim();

    try {
      // Prüfen ob bereits ein aktiver Code existiert
      const [existing] = await db.query(
        "SELECT id, code, expiresAt, extensionCount FROM trial_leads WHERE email = ? LIMIT 1",
        [emailClean]
      );

      if (existing) {
        const now = new Date();
        const expires = new Date(existing.expiresAt);
        const stillActive = expires > now;

        if (stillActive) {
          // Code verlängern wenn bereits vorhanden
          if (existing.extensionCount >= 2) {
            return res.status(429).json({
              error: "Sie haben bereits 2 Verlängerungen erhalten. Bitte kaufen Sie einen Kurs.",
              alreadyExtended: true,
            });
          }

          const newExpiry = new Date(expires.getTime() + 24 * 60 * 60 * 1000);
          await db.query(
            "UPDATE trial_leads SET expiresAt = ?, extended = 1, extensionCount = extensionCount + 1 WHERE email = ?",
            [newExpiry, emailClean]
          );

          const baseUrl = process.env.PUBLIC_URL || "https://immobilie-akademie-production.up.railway.app";
          await sendTrialEmail(nameClean, emailClean, existing.code, 48, baseUrl);

          return res.json({
            ok: true,
            extended: true,
            message: "Ihr Testzugang wurde um weitere 24 Stunden verlängert. Bitte prüfen Sie Ihre E-Mails.",
          });
        }
      }

      // Neuen Code generieren
      const code = generateTrialCode();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      if (existing) {
        // Update existing record
        await db.query(
          "UPDATE trial_leads SET name = ?, code = ?, moduleInterest = ?, expiresAt = ?, usedAt = NULL, extended = 0, extensionCount = 0 WHERE email = ?",
          [nameClean, code, moduleInterest || null, expiresAt, emailClean]
        );
      } else {
        // Neuer Eintrag
        await db.query(
          "INSERT INTO trial_leads (name, email, code, moduleInterest, expiresAt) VALUES (?, ?, ?, ?, ?)",
          [nameClean, emailClean, code, moduleInterest || null, expiresAt]
        );
      }

      // access_codes Tabelle für RedeemCode-Seite befüllen
      await db.query(
        `INSERT INTO access_codes (code, note, modules, role, max_uses, used_count, is_active) VALUES (?, ?, ?, 'user', 1, 0, 1) ON DUPLICATE KEY UPDATE is_active = 1, used_count = 0`,
        [code, `Trial für ${emailClean}`, JSON.stringify([1,2,3,4,5])]
      ).catch(() => null); // Falls Tabelle andere Struktur hat

      const baseUrl = process.env.PUBLIC_URL || "https://immobilie-akademie-production.up.railway.app";
      await sendTrialEmail(nameClean, emailClean, code, 24, baseUrl);

      return res.json({
        ok: true,
        message: "Ihr persönlicher Testzugang wurde per E-Mail versendet. Bitte prüfen Sie Ihren Posteingang (auch Spam).",
      });
    } catch (err: any) {
      console.error("[Trial] Fehler:", err);
      return res.status(500).json({ error: "Fehler beim Erstellen des Testzugangs. Bitte versuchen Sie es erneut." });
    }
  });

  // GET /api/trial/validate/:code — Code-Gültigkeit prüfen
  app.get("/api/trial/validate/:code", async (req: Request, res: Response) => {
    const { code } = req.params;
    const [trial] = await db.query(
      "SELECT id, name, email, expiresAt FROM trial_leads WHERE code = ? LIMIT 1",
      [code]
    ).catch(() => [null]);

    if (!trial) return res.status(404).json({ valid: false, error: "Code nicht gefunden." });

    const valid = new Date(trial.expiresAt) > new Date();
    return res.json({ valid, expiresAt: trial.expiresAt, name: trial.name });
  });

  // Admin: alle Trial-Leads anzeigen
  app.get("/api/admin/trial-leads", async (req: Request, res: Response) => {
    const sess = (req as any).session || {};
    if (!sess.openId) return res.status(401).json({ error: "Nicht eingeloggt" });

    const leads = await db.query(
      "SELECT id, name, email, moduleInterest, code, expiresAt, usedAt, extended, extensionCount, createdAt, convertedAt FROM trial_leads ORDER BY createdAt DESC LIMIT 200"
    ).catch(() => []);

    return res.json({ leads, total: leads.length });
  });
}

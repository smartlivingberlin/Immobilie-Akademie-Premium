import type { Express, Request, Response } from "express";
import { requireAdmin } from "./authMiddleware";
import { logger } from "./_core/logger";
import crypto from "crypto";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { Resend } from "resend";

function createResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

function generateTrialCode(): string {
  return "TRIAL-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

async function sendTrialEmail(name: string, email: string, code: string, hours: number): Promise<void> {
  const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
  const resend = createResend();
  resend.emails.send({
    from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
    to: email,
    subject: `${name}, dein kostenloser Testzugang wartet! 🎓`,
      html: `
<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f8fafc;margin:0;padding:20px">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
  <div style="background:#0f1f3d;padding:32px 40px;text-align:center">
    <h1 style="color:#f5c842;margin:0;font-size:24px">Immobilien Akademie Smart</h1>
    <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px">Ihr persönlicher Testzugang</p>
  </div>
  <div style="padding:40px">
    <h2 style="color:#0f1f3d;margin:0 0 16px">Hallo ${name}! 👋</h2>
    <p style="color:#475569;line-height:1.7;margin:0 0 24px">
      Ihr <strong>${hours}-Stunden-Testzugang</strong> zum vollständigen Portal ist bereit.
      Alle 5 Module, KI-Tutor, Lernfragen und Praxisfälle — jetzt kostenlos testen.
    </p>
    <div style="background:#f1f5f9;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px">
      <p style="color:#64748b;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Ihr Zugangscode</p>
      <div style="font-family:monospace;font-size:28px;font-weight:bold;color:#0f1f3d;letter-spacing:3px">${code}</div>
      <p style="color:#94a3b8;font-size:12px;margin:8px 0 0">Gültig für ${hours} Stunden</p>
    </div>
    <div style="text-align:center;margin:0 0 32px">
      <a href="${baseUrl}/code-einloesen?code=${code}"
         style="display:inline-block;background:#0f1f3d;color:#f5c842;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">
        Jetzt Portal öffnen →
      </a>
    </div>
    <div style="border-top:1px solid #e2e8f0;padding-top:24px">
      <p style="color:#475569;font-size:14px;margin:0 0 8px"><strong>Was Sie testen können:</strong></p>
      <ul style="color:#64748b;font-size:14px;line-height:2;margin:0;padding-left:20px">
        <li>📖 Alle 5 Module mit 240 Lerntagen</li>
        <li>🤖 KI-Tutor (Gemini 2.5 Flash)</li>
        <li>🎓 Wissenschecks mit Lernfragen und Praxisfällen</li>
        <li>🔢 10 Praxis-Rechner</li>
        <li>🃏 Lernkarten, Fallstudien, Glossar</li>
        <li>📊 Gamification &amp; Zertifikate</li>
      </ul>
    </div>
    <div style="background:#fffbeb;border-left:4px solid #f5c842;padding:16px;margin:24px 0;border-radius:0 8px 8px 0">
      <p style="color:#92400e;font-size:13px;margin:0">
        <strong>💡 Tipp:</strong> Der Onboarding-Assistent beim ersten Login führt Sie in 5 Minuten durch alles Wichtige.
      </p>
    </div>
  </div>
  <div style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0">
    <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0">
      Immobilien Akademie Smart · Durlacher Str. 36, 10715 Berlin<br>
      +49 171 1526327 · info@immobilien-akademie-smart.de
    </p>
  </div>
</div>
</body></html>`,
  });
}

export function registerTrialRoutes(app: Express) {

  // Hilfsfunktion: trialExpiresAt in users-Tabelle setzen
async function setTrialExpiry(db: any, email: string, expiresAt: Date) {
  try {
    await db.execute(
      `UPDATE users SET trialExpiresAt = ? WHERE email = ?`,
      [expiresAt, email]
    );
  } catch (e) {
    logger.error("[Trial] trialExpiresAt setzen fehlgeschlagen", e);
  }
}

// POST /api/trial/request
  app.post("/api/trial/request", async (req: Request, res: Response) => {
    const { name, email, moduleInterest } = req.body ?? {};
    if (!name?.trim() || !email?.trim() || !email.includes("@")) {
      return res.status(400).json({ error: "Name und gültige E-Mail erforderlich." });
    }
    const nameClean = String(name).trim().slice(0, 100);
    const emailClean = String(email).toLowerCase().trim();

    try {
      const db = await getDb();

      // Prüfe ob schon ein Eintrag existiert
      const existing = await db.execute(
        sql`SELECT id, code, expiresAt, extensionCount FROM trial_leads WHERE email = ${emailClean} LIMIT 1`
      ) as any;
      const rows = existing[0] as any[];

      if (rows?.length > 0) {
        const row = rows[0];
        const stillActive = new Date(row.expiresAt) > new Date();
        if (stillActive && row.extensionCount >= 2) {
          return res.status(429).json({
            error: "Sie haben bereits 2 Verlängerungen erhalten. Bitte kaufen Sie einen Kurs für vollen Zugang.",
            alreadyExtended: true,
          });
        }
        if (stillActive) {
          const newExpiry = new Date(new Date(row.expiresAt).getTime() + 24 * 60 * 60 * 1000);
          await db.execute(
            sql`UPDATE trial_leads SET expiresAt = ${newExpiry}, extended = 1, extensionCount = extensionCount + 1 WHERE email = ${emailClean}`
        );
        // presentation_codes auch verlängern
        await db.execute(
          sql`UPDATE presentation_codes SET expiresAt = ${newExpiry}, usageCount = 0 WHERE code = ${row.code}`
          );
          await sendTrialEmail(nameClean, emailClean, row.code, 48).catch((e) => logger.error("[Trial] E-Mail Fehler (Verlängerung)", e));
          return res.json({ ok: true, extended: true, message: "Ihr Testzugang wurde um 24 Stunden verlängert. Bitte prüfen Sie Ihre E-Mails." });
        }
      }

      // Neuen Code erstellen
      const code = generateTrialCode();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      if (rows?.length > 0) {
        await db.execute(
          sql`UPDATE trial_leads SET name = ${nameClean}, code = ${code}, moduleInterest = ${moduleInterest || null}, expiresAt = ${expiresAt}, usedAt = NULL, extended = 0, extensionCount = 0 WHERE email = ${emailClean}`
        );
      } else {
        await db.execute(
          sql`INSERT INTO trial_leads (name, email, code, moduleInterest, expiresAt) VALUES (${nameClean}, ${emailClean}, ${code}, ${moduleInterest || null}, ${expiresAt})`
        );
      }

      // In presentation_codes eintragen — das ist was redeemPresentationCode() liest
      try {
        await db.execute(
          sql`DELETE FROM presentation_codes WHERE code = ${code}`
        );
        await db.execute(
          sql`INSERT INTO presentation_codes (code, label, enabledModules, expiresAt, isActive, maxUsage, usageCount)
              VALUES (${code}, ${"Trial " + emailClean}, ${"1,2,3,4,5"}, ${expiresAt}, ${1}, ${3}, ${0})`
        );
        logger.info("[Trial] presentation_codes OK", { code });
      } catch (e: any) {
        logger.error("[Trial] presentation_codes Fehler", e);
      }

      await sendTrialEmail(nameClean, emailClean, code, 24).catch((e) => logger.error("[Trial] E-Mail Fehler", e));
      return res.json({ ok: true, message: "Ihr Testzugang wurde per E-Mail versendet. Bitte prüfen Sie Ihren Posteingang (auch Spam-Ordner)." });

    } catch (err: any) {
      logger.error("[Trial] Fehler", err);
      return res.status(500).json({ error: "Fehler. Bitte versuchen Sie es erneut." });
    }
  });

  // GET /api/trial/validate/:code
  app.get("/api/trial/validate/:code", async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      const result = await db.execute(
        sql`SELECT id, name, email, expiresAt FROM trial_leads WHERE code = ${req.params.code} LIMIT 1`
      ) as any;
      const rows = result[0] as any[];
      if (!rows?.length) return res.status(404).json({ valid: false });
      const valid = new Date(rows[0].expiresAt) > new Date();
      return res.json({ valid, expiresAt: rows[0].expiresAt, name: rows[0].name });
    } catch {
      return res.status(500).json({ valid: false });
    }
  });

  // GET /api/admin/trial-leads
  app.get("/api/admin/trial-leads", requireAdmin, async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      const result = await db.execute(
        sql`SELECT id, name, email, moduleInterest, code, expiresAt, usedAt, extended, extensionCount, createdAt FROM trial_leads ORDER BY createdAt DESC LIMIT 200`
      ) as any;
      const leads = result[0] as any[];
      return res.json({ leads: leads || [], total: leads?.length || 0 });
    } catch (err) {
      return res.status(500).json({ error: "DB-Fehler" });
    }
  });
}

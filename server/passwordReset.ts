import { Resend } from "resend";
import crypto from "crypto";
import type { Express, Request, Response } from "express";
import { hashPassword } from "./_core/auth-local";

// Lazy init - verhindert Crash beim Start ohne API-Key

export function registerPasswordResetRoutes(app: Express) {
  // Schritt 1: Reset anfordern
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ error: "E-Mail erforderlich." });

    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar." });

      const { users, passwordResetTokens } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");

      // Prüfen ob User existiert
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user.length) {
        // Sicherheit: kein Hinweis ob E-Mail existiert
        return res.json({ ok: true });
      }

      // Token generieren
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 Stunde

      await db.insert(passwordResetTokens).values({ email, token, expiresAt });

      const domain = process.env.APP_URL ? process.env.APP_URL.replace("https://","") : "immobilien-akademie-smart.de";
      const resetUrl = `https://${domain}/reset-password?token=${token}`;

      const resend = new Resend(process.env.RESEND_API_KEY || "");
      await resend.emails.send({
        from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
        to: email,
        subject: "Passwort zurücksetzen",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
            <h2 style="color:#1e3a5f">Passwort zurücksetzen</h2>
            <p>Du hast eine Passwort-Zurücksetzung angefordert.</p>
            <a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0">
              Passwort zurücksetzen
            </a>
            <p style="color:#64748b;font-size:14px">Dieser Link ist 1 Stunde gültig.</p>
            <p style="color:#64748b;font-size:14px">Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin-top:24px"/>
            <p style="color:#94a3b8;font-size:12px">Immobilien Akademie Smart · immobilien-akademie-smart.de</p>
          </div>
        `,
      });

      return res.json({ ok: true });
    } catch (error) {
      console.error("[Reset] Fehler:", error);
      return res.status(500).json({ error: "Fehler beim Senden." });
    }
  });

  // Schritt 2: Neues Passwort setzen
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    const { token, newPassword } = req.body ?? {};
    if (!token || !newPassword) return res.status(400).json({ error: "Token und Passwort erforderlich." });
    if (newPassword.length < 8) return res.status(400).json({ error: "Passwort mindestens 8 Zeichen." });

    try {
      const { getDb, savePasswordHash } = await import("./db");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar." });

      const { passwordResetTokens, users } = await import("../drizzle/schema");
      const { eq, and, isNull, gt } = await import("drizzle-orm");

      const resetToken = await db.select().from(passwordResetTokens)
        .where(and(
          eq(passwordResetTokens.token, token),
          isNull(passwordResetTokens.usedAt),
          gt(passwordResetTokens.expiresAt, new Date())
        )).limit(1);

      if (!resetToken.length) return res.status(400).json({ error: "Token ungültig oder abgelaufen." });

      const email = resetToken[0].email;
      const openId = `local:${email.toLowerCase().trim()}`;

      // Neues Passwort hashen
      const { hash, salt } = hashPassword(newPassword);
      await savePasswordHash(openId, hash, salt);

      // Token als benutzt markieren
      await db.update(passwordResetTokens)
        .set({ usedAt: new Date() })
        .where(eq(passwordResetTokens.token, token));

      return res.json({ ok: true, message: "Passwort erfolgreich geändert." });
    } catch (error) {
      console.error("[Reset] Fehler:", error);
      return res.status(500).json({ error: "Fehler beim Zurücksetzen." });
    }
  });
}

import { Resend } from "resend";
import crypto from "crypto";
import type { Express, Request, Response } from "express";

const resend = new Resend(process.env.RESEND_API_KEY);

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

      const domain = process.env.RAILWAY_PUBLIC_DOMAIN ?? "immobilie-akademie-production.up.railway.app";
      const resetUrl = `https://${domain}/reset-password?token=${token}`;

      await resend.emails.send({
        from: "Immobilien-Akademie <noreply@immobilien-akademie.de>",
        to: email,
        subject: "Passwort zurücksetzen",
        html: `
          <h2>Passwort zurücksetzen</h2>
          <p>Du hast eine Passwort-Zurücksetzung angefordert.</p>
          <p><a href="${resetUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Passwort zurücksetzen</a></p>
          <p>Dieser Link ist 1 Stunde gültig.</p>
          <p>Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.</p>
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
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = await new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(newPassword, salt, 100000, 64, "sha512", (err, key) => {
          if (err) reject(err);
          else resolve(key.toString("hex"));
        });
      });

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

/**
 * 2FA via E-Mail OTP — Immobilien Akademie Smart
 * Für Admin/Owner: nach Login kommt 6-stelliger Code per E-Mail
 */
import { randomInt } from "crypto";
import { logger } from "./_core/logger";
import { sql } from "drizzle-orm";

// Generiert 6-stelligen Code für email
export async function generateOTP(email: string): Promise<string> {
  const { getDb } = await import("./db");
  const db = await getDb();

  // Cleanup alter Codes
  await db.execute(sql`DELETE FROM otp_tokens WHERE expiresAt < NOW()`);

  const code = String(randomInt(100000, 999999));
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await db.execute(sql`
    INSERT INTO otp_tokens (email, code, expiresAt)
    VALUES (${email}, ${code}, ${expiresAt})
  `);

  if (process.env.NODE_ENV !== 'production') {
    logger.info(`[2FA] OTP generiert für ${email} (Dev-Modus)`);
  }
  return code;
}

// Verifiziert OTP
export async function verifyOTP(email: string, code: string): Promise<{ ok: boolean; error?: string }> {
  const { getDb } = await import("./db");
  const db = await getDb();
  
  // Finde gültigen OTP für diese E-Mail (nicht verwendet, nicht abgelaufen, neueste zuerst)
  const rows = await db.execute(sql`
    SELECT id, code, attempts FROM otp_tokens
    WHERE email = ${email} AND used = 0 AND expiresAt > NOW()
    ORDER BY createdAt DESC
    LIMIT 1
  `) as any;
  
  const entries = rows.rows || rows;
  if (!entries || entries.length === 0) {
    return { ok: false, error: "Kein gültiger Code. Bitte neu anfordern." };
  }
  
  const entry = entries[0];
  
  // Max 3 Versuche
  if (entry.attempts >= 3) {
    await db.execute(sql`DELETE FROM otp_tokens WHERE id = ${entry.id}`);
    return { ok: false, error: "Zu viele Versuche. Code gesperrt." };
  }
  
  if (entry.code !== code.trim()) {
    const newAttempts = entry.attempts + 1;
    await db.execute(sql`UPDATE otp_tokens SET attempts = ${newAttempts} WHERE id = ${entry.id}`);
    return { ok: false, error: `Falscher Code. Noch ${3 - newAttempts} Versuche.` };
  }
  
  // Code korrekt → als verwendet markieren
  await db.execute(sql`UPDATE otp_tokens SET used = 1 WHERE id = ${entry.id}`);
  return { ok: true };
}

// E-Mail senden (über bestehende Nodemailer-Config oder Console-Log als Fallback)
export async function sendOTPEmail(email: string, code: string, name: string): Promise<boolean> {
  // Resend API (Railway-kompatibel)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
        to: email,
        subject: `Ihr Login-Code: ${code}`,
        html: `
          <div style="font-family:Arial;max-width:400px;margin:0 auto;padding:20px">
            <h2 style="color:#2563eb">Admin Login — Sicherheitscode</h2>
            <p>Hallo ${name},</p>
            <p>Ihr Einmal-Code für den Admin-Zugang:</p>
            <div style="background:#f0f9ff;border:2px solid #2563eb;border-radius:8px;padding:20px;text-align:center;margin:20px 0">
              <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#1e40af">${code}</span>
            </div>
            <p style="color:#64748b;font-size:13px">Gültig für 10 Minuten. Nicht weitergeben.</p>
            <hr style="border:none;border-top:1px solid #e2e8f0">
            <p style="color:#94a3b8;font-size:11px">Immobilien Akademie Smart · immobilien-akademie-smart.de</p>
          </div>
        `,
      });
      logger.info(`[2FA] E-Mail gesendet an ${email}`);
      return true;
    } catch (e) {
      console.error("[2FA] E-Mail Fehler:", e);
    }
  }
  
  // Fallback: Code im Server-Log (für Entwicklung)
  logger.info(`\n${"=".repeat(50)}`);
  logger.info(`[2FA] CODE FÜR ${email}: ${code}`);
  logger.info(`[2FA] (Railway Logs → Deployments → Deploy Logs)`);
  logger.info(`${"=".repeat(50)}\n`);
  return true;
}

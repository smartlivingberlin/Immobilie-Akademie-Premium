/**
 * 2FA via E-Mail OTP — Immobilien Akademie Smart
 * Für Admin/Owner: nach Login kommt 6-stelliger Code per E-Mail
 */
import { randomInt } from "crypto";
import { logger } from "./_core/logger";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const OTP_STORE = join(process.cwd(), "server/agent/otp_store.json");

interface OTPEntry {
  code: string;
  email: string;
  expiresAt: number;
  used: boolean;
  attempts: number;
}

function loadStore(): Record<string, OTPEntry> {
  try {
    if (existsSync(OTP_STORE)) return JSON.parse(readFileSync(OTP_STORE, "utf-8"));
  } catch (e) { /* OTP-Store nicht lesbar — leerer Store als Fallback */ }
  return {};
}

function saveStore(store: Record<string, OTPEntry>) {
  try { writeFileSync(OTP_STORE, JSON.stringify(store, null, 2)); } catch (e) { /* OTP-Store Schreibfehler — nicht kritisch */ }
}

// Generiert 6-stelligen Code für email
export function generateOTP(email: string): string {
  const code = String(randomInt(100000, 999999));
  const store = loadStore();
  // Cleanup alter Codes
  const now = Date.now();
  for (const [k, v] of Object.entries(store)) {
    if (v.expiresAt < now) delete store[k];
  }
  const key = `${email}_${now}`;
  store[key] = { code, email, expiresAt: now + 10 * 60 * 1000, used: false, attempts: 0 };
  saveStore(store);
  if (process.env.NODE_ENV !== 'production') { logger.info(`[2FA] OTP generiert für ${email} (Dev-Modus)`); }
  return code;
}

// Verifiziert OTP
export function verifyOTP(email: string, code: string): { ok: boolean; error?: string } {
  const store = loadStore();
  const now = Date.now();
  
  // Finde gültigen OTP für diese E-Mail
  const entries = Object.entries(store)
    .filter(([_, v]) => v.email === email && !v.used && v.expiresAt > now)
    .sort(([_, a], [__, b]) => b.expiresAt - a.expiresAt);
  
  if (entries.length === 0) {
    return { ok: false, error: "Kein gültiger Code. Bitte neu anfordern." };
  }
  
  const [key, entry] = entries[0];
  
  // Max 3 Versuche
  if (entry.attempts >= 3) {
    delete store[key];
    saveStore(store);
    return { ok: false, error: "Zu viele Versuche. Code gesperrt." };
  }
  
  if (entry.code !== code.trim()) {
    store[key].attempts++;
    saveStore(store);
    return { ok: false, error: `Falscher Code. Noch ${3 - entry.attempts} Versuche.` };
  }
  
  // Code korrekt → als verwendet markieren
  store[key].used = true;
  saveStore(store);
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
        from: "Immobilien Akademie Smart <premium@immobilien-akademie-smart.de>",
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

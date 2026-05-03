import { createRequire } from "module";
import QRCode from "qrcode";
import { logger } from "./_core/logger";

const require = createRequire(import.meta.url);
const speakeasy = require("speakeasy");

const APP_NAME = "Immobilien Akademie Smart";

export function getTotpSecret(): string | null {
  return process.env.OWNER_TOTP_SECRET || null;
}

export function generateTotpSecret(): string {
  const secret = speakeasy.generateSecret({ name: APP_NAME, length: 20 });
  return secret.base32;
}

export async function generateQRCode(secret: string): Promise<string> {
  const otpauth = speakeasy.otpauthURL({
    secret,
    label: "owner@immobilien-akademie-smart.de",
    issuer: APP_NAME,
    encoding: "base32",
  });
  return QRCode.toDataURL(otpauth);
}

export function verifyTotp(token: string, secret: string): boolean {
  try {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token: token.trim(),
      window: 1,
    });
  } catch (e) {
    logger.warn("[TOTP] Verifikationsfehler:", e);
    return false;
  }
}

export type TwoFAMethod = "none" | "email" | "totp" | "both";
export function getOwner2FAMethod(): TwoFAMethod {
  const method = (process.env.OWNER_2FA_METHOD || "none").toLowerCase();
  if (["none", "email", "totp", "both"].includes(method)) return method as TwoFAMethod;
  return "none";
}

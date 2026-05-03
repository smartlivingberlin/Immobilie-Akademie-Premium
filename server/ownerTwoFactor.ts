import { createRequire } from "module";
import QRCode from "qrcode";
import { logger } from "./_core/logger";

const require = createRequire(import.meta.url);
const otplib = require("otplib");
const authenticator = otplib.authenticator || otplib.default?.authenticator || otplib;

const APP_NAME = "Immobilien Akademie Smart";
const OWNER_ACCOUNT = "owner@immobilien-akademie-smart.de";

export function getTotpSecret(): string | null {
  return process.env.OWNER_TOTP_SECRET || null;
}

export function generateTotpSecret(): string {
  return authenticator.generateSecret();
}

export async function generateQRCode(secret: string): Promise<string> {
  const otpauth = authenticator.keyuri(OWNER_ACCOUNT, APP_NAME, secret);
  return QRCode.toDataURL(otpauth);
}

export function verifyTotp(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token: token.trim(), secret });
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

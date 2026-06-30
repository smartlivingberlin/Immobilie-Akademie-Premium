import { SignJWT, jwtVerify } from "jose";

export const EMAIL_VERIFICATION_GRACE_DAYS = 7;
export const EMAIL_VERIFICATION_REQUIRED_MSG =
  "Bitte E-Mail bestätigen um fortzufahren";

type VerificationUser = {
  role: string;
  emailVerifiedAt: Date | string | null;
  createdAt: Date | string;
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET nicht gesetzt");
  }
  return new TextEncoder().encode(secret);
}

export function isEmailVerificationBlocked(user: VerificationUser): boolean {
  if (user.role === "admin") return false;
  if (user.emailVerifiedAt) return false;
  const created =
    user.createdAt instanceof Date
      ? user.createdAt.getTime()
      : new Date(user.createdAt).getTime();
  const graceMs = EMAIL_VERIFICATION_GRACE_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - created >= graceMs;
}

export async function createEmailVerificationToken(openId: string): Promise<string> {
  return new SignJWT({ openId, purpose: "email-verify" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("14d")
    .sign(getSecret());
}

export async function parseEmailVerificationToken(
  token: string,
): Promise<{ openId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (payload.purpose !== "email-verify") return null;
    const openId = payload.openId as string;
    if (!openId) return null;
    return { openId };
  } catch {
    return null;
  }
}

export async function getUserVerificationRow(
  db: { $client: { query: (sql: string, params?: unknown[]) => unknown } },
  userId: number,
): Promise<VerificationUser | null> {
  const result = (await db.$client.query(
    "SELECT role, emailVerifiedAt, createdAt FROM users WHERE id = ? LIMIT 1",
    [userId],
  )) as [Array<{ role: string; emailVerifiedAt: Date | null; createdAt: Date }>, unknown];
  return result[0]?.[0] ?? null;
}

export async function markEmailVerifiedByOpenId(
  db: { $client: { query: (sql: string, params?: unknown[]) => unknown } },
  openId: string,
): Promise<boolean> {
  const result = (await db.$client.query(
    "UPDATE users SET emailVerifiedAt = CURRENT_TIMESTAMP WHERE openId = ? AND emailVerifiedAt IS NULL",
    [openId],
  )) as [{ affectedRows?: number }, unknown];
  return Number((result[0] as { affectedRows?: number })?.affectedRows ?? 0) > 0;
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const appUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
  const link = `${appUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY ?? "");
  await resend.emails.send({
    from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
    to: email.toLowerCase().trim(),
    subject: "Bitte bestätigen Sie Ihre E-Mail-Adresse",
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#0f172a;">E-Mail bestätigen</h2>
      <p style="color:#475569;line-height:1.6;">Vielen Dank für Ihre Registrierung. Bitte bestätigen Sie Ihre E-Mail-Adresse innerhalb von ${EMAIL_VERIFICATION_GRACE_DAYS} Tagen, um den Zugang dauerhaft zu behalten.</p>
      <a href="${link}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">E-Mail jetzt bestätigen</a>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Falls der Button nicht funktioniert: ${link}</p>
    </div>`,
  });
}

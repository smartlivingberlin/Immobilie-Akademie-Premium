import { logger } from "./_core/logger";
import { columnExists } from "./accessExpiry";
import { RENEWAL_YEARLY_EUR, RENEWAL_MONTHLY_EUR } from "../shared/accessPolicy";

const REMINDER_DAYS = [30, 7, 1] as const;

async function tableExists(db: { $client: { query: Function } }, table: string): Promise<boolean> {
  try {
    const [rows] = await db.$client.query(
      `SELECT COUNT(*) as c FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [table],
    ) as any;
    return Number((rows as any[])[0]?.c) > 0;
  } catch {
    return false;
  }
}

async function sendReminderEmail(
  email: string,
  name: string,
  daysLeft: number,
  expiryDate: string,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    logger.warn("[AccessReminder] RESEND_API_KEY fehlt", { email, daysLeft });
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
  const urgency = daysLeft <= 1 ? "Letzter Tag" : daysLeft <= 7 ? "Nur noch wenige Tage" : "Bald ablaufend";

  await resend.emails.send({
    from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
    to: email,
    subject: `${urgency}: Ihr Portalzugang endet in ${daysLeft} Tag${daysLeft === 1 ? "" : "en"}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="color:#0f172a">Ihr Lernzugang läuft ab</h2>
      <p>Hallo ${name || "Lernender"},</p>
      <p>Ihr Zugang zur Immobilien Akademie Smart endet am <strong>${expiryDate}</strong>
         (noch <strong>${daysLeft} Tag${daysLeft === 1 ? "" : "e"}</strong>).</p>
      <p>Verlängern Sie jetzt und behalten Sie Rechner, KI-Tutor, Rechenpraxis und alle gekauften Module:</p>
      <ul>
        <li><strong>${RENEWAL_YEARLY_EUR} €/Jahr</strong> (empfohlen)</li>
        <li><strong>${RENEWAL_MONTHLY_EUR} €/Monat</strong></li>
      </ul>
      <a href="${baseUrl}/statistiken" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:12px">
        Jetzt verlängern →
      </a>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">Immobilien Akademie Smart · Berlin</p>
    </div>`,
  });
}

export async function runAccessExpiryReminders(): Promise<number> {
  const url = process.env.DATABASE_URL;
  if (!url) return 0;
  if (!(await import("mysql2/promise")).default) return 0;

  const mysql = (await import("mysql2/promise")).default;
  const conn = await mysql.createConnection({ uri: url, connectTimeout: 15000 });
  const db = { $client: { query: conn.query.bind(conn) } };

  if (!(await columnExists(db, "accessExpiresAt"))) {
    await conn.end();
    return 0;
  }
  if (!(await tableExists(db, "access_expiry_reminders"))) {
    await conn.end();
    return 0;
  }

  let sent = 0;
  try {
    for (const days of REMINDER_DAYS) {
      const [rows] = await conn.query(
        `SELECT u.id, u.email, u.name, u.accessExpiresAt
         FROM users u
         WHERE u.email IS NOT NULL AND u.email != ''
           AND u.accessExpiresAt IS NOT NULL
           AND u.enabledModules IS NOT NULL AND u.enabledModules != ''
           AND DATE(u.accessExpiresAt) = DATE(DATE_ADD(CURDATE(), INTERVAL ? DAY))
           AND NOT EXISTS (
             SELECT 1 FROM access_expiry_reminders r
             WHERE r.userId = u.id
               AND r.accessExpiresAt = DATE(u.accessExpiresAt)
               AND r.reminderDays = ?
           )`,
        [days, days],
      ) as any[];

      for (const row of rows as any[]) {
        const expiry = new Date(row.accessExpiresAt).toLocaleDateString("de-DE");
        try {
          await sendReminderEmail(row.email, row.name || "", days, expiry);
          await conn.query(
            `INSERT INTO access_expiry_reminders (userId, accessExpiresAt, reminderDays)
             VALUES (?, DATE(?), ?)`,
            [row.id, row.accessExpiresAt, days],
          );
          sent++;
          logger.info("[AccessReminder] Gesendet", { userId: row.id, days, email: row.email });
        } catch (e: any) {
          logger.error("[AccessReminder] Fehler", { userId: row.id, error: e.message });
        }
      }
    }
  } finally {
    await conn.end();
  }
  return sent;
}

/** Täglich um 08:00 UTC */
export function startAccessExpiryReminders(): void {
  const HOUR_MS = 60 * 60 * 1000;

  async function tick() {
    try {
      const n = await runAccessExpiryReminders();
      if (n > 0) logger.info("[AccessReminder] Lauf abgeschlossen", { sent: n });
    } catch (e: any) {
      logger.error("[AccessReminder] Cron-Fehler", e);
    }
  }

  const schedule = () => {
    const now = new Date();
    const next = new Date(now);
    next.setUTCHours(8, 0, 0, 0);
    if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
    const delay = next.getTime() - now.getTime();
    setTimeout(() => {
      tick();
      setInterval(tick, 24 * HOUR_MS);
    }, delay);
  };

  schedule();
  logger.info("[AccessReminder] Scheduler gestartet (täglich 08:00 UTC)");
}

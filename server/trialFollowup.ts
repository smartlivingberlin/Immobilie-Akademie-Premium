import nodemailer from "nodemailer";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

const BASE_URL = process.env.PUBLIC_URL || 
  "https://immobilie-akademie-production.up.railway.app";
const RESEND_KEY = process.env.RESEND_API_KEY || "";

async function sendFollowupEmail(
  name: string, email: string, code: string, hoursLeft: number
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: "alisadgadyri38@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  // fire-and-forget mit catch
  transporter.sendMail({
    from: '"Immobilien Akademie Smart" <alisadgadyri38@gmail.com>',
    to: email,
    subject: `${name}, dein Testzugang läuft in ${hoursLeft}h ab ⏰`,
      html: `
<!DOCTYPE html><html lang="de"><body style="font-family:Arial,sans-serif;background:#f8fafc;padding:20px">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
  <div style="background:#0f1f3d;padding:28px 36px">
    <h1 style="color:#f5c842;margin:0;font-size:22px">Immobilien Akademie Smart</h1>
  </div>
  <div style="padding:36px">
    <h2 style="color:#0f1f3d;margin:0 0 16px">Hallo ${name}! ⏰</h2>
    <p style="color:#475569;line-height:1.7;margin:0 0 20px">
      Dein kostenloser Testzugang läuft in <strong>${hoursLeft} Stunden</strong> ab.
      Hast du schon alles gesehen was du dir vorgenommen hattest?
    </p>
    <div style="background:#fffbeb;border:1px solid #f5c842;border-radius:8px;padding:20px;margin:0 0 24px">
      <p style="color:#92400e;margin:0 0 8px;font-weight:bold">Was du noch testen solltest:</p>
      <ul style="color:#92400e;margin:0;padding-left:20px;line-height:2">
        <li>🤖 KI-Tutor: Stelle eine Frage zu §34c GewO</li>
        <li>🎓 Prüfungs-Simulation: Wie gut bist du schon?</li>
        <li>🔢 Praxis-Rechner: Berechne eine Makler-Provision</li>
      </ul>
    </div>
    <p style="color:#475569;line-height:1.7;margin:0 0 24px">
      Wenn du überzeugt bist — sichere dir jetzt deinen dauerhaften Zugang.
      <strong>Modul 1 bereits ab 149 EUR.</strong>
    </p>
    <div style="text-align:center;margin:0 0 20px">
      <a href="${BASE_URL}/kurse" 
         style="display:inline-block;background:#0f1f3d;color:#f5c842;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">
        Jetzt dauerhaft freischalten →
      </a>
    </div>
    <div style="text-align:center">
      <a href="${BASE_URL}/code-einloesen?code=${code}"
         style="color:#64748b;font-size:13px">
        Noch ${hoursLeft}h testen
      </a>
    </div>
  </div>
  <div style="background:#f8fafc;padding:16px 36px;border-top:1px solid #e2e8f0">
    <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0">
      Immobilien Akademie Smart · +49 171 1526327 · alisadgadyri38@gmail.com
    </p>
  </div>
</div>
</body></html>`,
  }).catch((e: any) => console.log("[FollowupEmail] Fehler:", e.message));
}

// Diese Funktion wird als Cron-Job aufgerufen
export async function runTrialFollowupCron(): Promise<void> {
  if (!RESEND_KEY) return;
  
  const db = await getDb();
  
  // Leads die vor 20-22h angelegt wurden und noch KEINE Follow-up bekommen haben
  const result = await db.execute(sql`
    SELECT name, email, code, expiresAt 
    FROM trial_leads 
    WHERE 
      usedAt IS NULL AND
      extended = 0 AND
      createdAt BETWEEN NOW() - INTERVAL 22 HOUR AND NOW() - INTERVAL 20 HOUR AND
      expiresAt > NOW()
    LIMIT 50
  `) as any;
  
  const leads = result[0] as any[];
  console.log(`[TrialFollowup] ${leads?.length || 0} Leads für Follow-up`);
  
  for (const lead of leads || []) {
    const hoursLeft = Math.round(
      (new Date(lead.expiresAt).getTime() - Date.now()) / 3600000
    );
    try {
      await sendFollowupEmail(lead.name, lead.email, lead.code, hoursLeft);
      // Als "Follow-up gesendet" markieren
      await db.execute(sql`
        UPDATE trial_leads SET extended = -1 WHERE email = ${lead.email}
      `);
      console.log(`[TrialFollowup] ✅ ${lead.email}`);
    } catch(e) {
      console.error(`[TrialFollowup] ❌ ${lead.email}:`, e);
    }
  }
}

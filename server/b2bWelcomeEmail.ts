import { Resend } from "resend";
import { logger } from "./_core/logger";
import { getB2bPlan } from "../shared/b2bPlans";

export async function sendB2bWelcomeEmail(opts: {
  email: string;
  name?: string | null;
  companyName: string;
  planId: string;
  tenantSlug?: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("[B2B] RESEND_API_KEY fehlt — Willkommens-E-Mail übersprungen", { email: opts.email });
    return;
  }

  const plan = getB2bPlan(opts.planId);
  const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
    to: opts.email,
    subject: `Willkommen — ${opts.companyName} ist eingerichtet`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="color:#0f172a">Ihr White-Label-Portal ist aktiv</h2>
      <p>Hallo ${opts.name || "Team"},</p>
      <p>vielen Dank für Ihr <strong>${plan?.name ?? opts.planId}</strong>-Abo für <strong>${opts.companyName}</strong>.</p>
      <ul style="color:#475569;line-height:1.7">
        <li>Bis zu <strong>${plan?.maxUsers ?? "—"} Nutzer</strong></li>
        <li>Module: <strong>${plan?.enabledModules ?? "—"}</strong></li>
        <li>Rechenpraxis, KI-Tutor und Lerninhalte für Ihr Team</li>
      </ul>
      <p><strong>Nächste Schritte:</strong></p>
      <ol style="color:#475569;line-height:1.7">
        <li>Einrichtungs-Assistent: <a href="${baseUrl}/b2b-einrichtung">B2B-Einrichtung starten</a></li>
        <li>Branding & Team-Codes: <a href="${baseUrl}/b2b-einrichtung">Schritt 2–3 im Assistenten</a></li>
        <li>Lernbereich für Ihr Team: <a href="${baseUrl}/statistiken">Zum Portal</a></li>
      </ol>
      ${opts.tenantSlug ? `<p style="font-size:12px;color:#94a3b8">Tenant: ${opts.tenantSlug}</p>` : ""}
      <p style="margin-top:24px;color:#64748b;font-size:13px">Bei Fragen: info@immobilien-akademie-smart.de</p>
    </div>`,
  });

  logger.info("[B2B] Welcome email sent", { email: opts.email, planId: opts.planId });
}

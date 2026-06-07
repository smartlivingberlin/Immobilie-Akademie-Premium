import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { ensureReferralCode, attributeReferral } from "./referralRewards";
import { REFERRAL_PROGRAM_SUMMARY } from "../shared/referral";

export const referralRouter = Router();

referralRouter.get("/api/referral/info", requireAuth, async (req: any, res) => {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const userId = req.currentUser.id;
    const email = req.currentUser.email || "";
    const code = await ensureReferralCode(db, userId, email);
    const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
    res.json({
      code,
      link: `${baseUrl}/login?ref=${encodeURIComponent(code)}`,
      summary: REFERRAL_PROGRAM_SUMMARY,
      rewards: {
        referrerDays: 30,
        referredDays: 14,
      },
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

referralRouter.post("/api/referral/apply", requireAuth, async (req: any, res) => {
  try {
    const { code } = req.body ?? {};
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Empfehlungscode erforderlich" });
    }
    const { getDb } = await import("./db");
    const db = await getDb();
    const ok = await attributeReferral(db, req.currentUser.id, code);
    if (!ok) return res.status(404).json({ error: "Code ungültig oder bereits zugeordnet" });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

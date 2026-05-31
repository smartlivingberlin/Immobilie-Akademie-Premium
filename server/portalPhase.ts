/**
 * Portal-Phasen-System
 * Phase A: Selbstlernportal (sofort, ohne Genehmigung)
 * Phase B: Fernlehrgang (nach ZFU-Zulassung)
 * Phase C: AZAV-zertifiziert (nach Akkreditierung, Förderung nur nach Zulassung)
 * Phase D: Vollzertifiziert (ZFU + AZAV + IHK-Kooperation)
 */

import type { Express, Request, Response } from "express";
import { requireAdmin } from "./authMiddleware";

export type Phase = "A" | "B" | "C" | "D";

// Feature Flags — können unabhängig von Phase ein/aus geschaltet werden
export interface FeatureFlags {
  // Compliance
  consentCheckboxRequired: boolean;    // DSGVO-Checkbox beim Wizard
  agbCheckboxRequired: boolean;        // AGB-Zustimmung beim Wizard
  azavAttendanceNotice: boolean;       // AZAV Anwesenheitshinweis
  widerrufsbelehrungPopup: boolean;    // Widerrufsbelehrung beim Kauf

  // Features
  onboardingWizard: boolean;          // Onboarding-Wizard an/aus
  audioFunction: boolean;             // Text-to-Speech an/aus
  gamification: boolean;              // Punkte/Badges an/aus
  kiTutor: boolean;                   // KI-Tutor an/aus
  liveWebinare: boolean;              // Live-Webinare (zukünftig)
  b2bWhiteLabel: boolean;             // White-Label B2B an/aus
  
  // Marketing
  googleAnalytics: boolean;           // Google Analytics an/aus
  cookieBanner: boolean;              // Cookie-Banner an/aus
  
  // Zahlungen
  stripeActive: boolean;              // Stripe Zahlungen an/aus
  automaticInvoicing: boolean;        // Automatische Rechnungen
}

// Standard-Flags (Phase A — Minimal)
export const DEFAULT_FLAGS: FeatureFlags = {
  consentCheckboxRequired: false,
  agbCheckboxRequired: false,
  azavAttendanceNotice: false,
  widerrufsbelehrungPopup: false,
  onboardingWizard: true,
  audioFunction: true,
  gamification: true,
  kiTutor: true,
  liveWebinare: false,
  b2bWhiteLabel: false,
  googleAnalytics: false,
  cookieBanner: true,
  stripeActive: false,
  automaticInvoicing: false,
};

// Flags für Phase B (ZFU)
export const FLAGS_PHASE_B: Partial<FeatureFlags> = {
  consentCheckboxRequired: true,
  agbCheckboxRequired: true,
  widerrufsbelehrungPopup: true,
  stripeActive: true,
  automaticInvoicing: true,
};

// Flags für Phase C (AZAV)
export const FLAGS_PHASE_C: Partial<FeatureFlags> = {
  ...FLAGS_PHASE_B,
  azavAttendanceNotice: true,
};

// Flags für Phase D (Vollzertifiziert)
export const FLAGS_PHASE_D: Partial<FeatureFlags> = {
  ...FLAGS_PHASE_C,
  liveWebinare: true,
  b2bWhiteLabel: true,
  googleAnalytics: true,
};

// Aktive Flags basierend auf Phase berechnen
export function getFlagsForPhase(phase: Phase): FeatureFlags {
  const overrides = phase === "B" ? FLAGS_PHASE_B :
                    phase === "C" ? FLAGS_PHASE_C :
                    phase === "D" ? FLAGS_PHASE_D : {};
  return { ...DEFAULT_FLAGS, ...overrides };
}

export interface PhaseConfig {
  id: Phase;
  name: string;
  description: string;
  badges: {
    azav: boolean;
    zfu: boolean;
    ihk: boolean;
    bgs: boolean;
  };
  labels: {
    productType: string;
    certificationNote: string;
    faqCertAnswer: string;
    footerBadge1: string;
    footerBadge2: string;
  };
  canSell: boolean;
  requirements: string[];
  unlocked: boolean;
}

export const PHASES: Record<Phase, PhaseConfig> = {
  A: {
    id: "A",
    name: "Selbstlernportal",
    description: "Digitales Selbstlernmaterial zu Immobilienpraxis und Rechtsgrundlagen. Keine externe Zertifizierung.",
    badges: { azav: false, zfu: false, ihk: false, bgs: false },
    labels: {
      productType: "Digitales Lernmaterial",
      certificationNote: "Praxisorientiertes Selbstlernportal",
      faqCertAnswer: "Unsere Lerninhalte vermitteln praxisorientiertes Immobilienwissen. Die Zertifikate dokumentieren ausschließlich portalinterne Lernleistungen.",
      footerBadge1: "Praxiswissen",
      footerBadge2: "Qualitätsgesichert",
    },
    canSell: true,
    requirements: [],
    unlocked: true,
  },
  B: {
    id: "B",
    name: "Fernlehrgang (ZFU-zugelassen)",
    description: "Geplanter Fernlehrgang nur nach Zulassung nach FernUSG. Offizieller ZFU-Status.",
    badges: { azav: false, zfu: true, ihk: false, bgs: false },
    labels: {
      productType: "Geplanter Fernlehrgang nur nach Zulassung",
      certificationNote: "ZFU-zugelassen",
      faqCertAnswer: "Diese Phase darf erst nach vorliegender ZFU-Zulassung öffentlich genutzt werden. Bis dahin keine Aussage über staatliche Zulassung oder Anerkennung.",
      footerBadge1: "ZFU-zugelassen",
      footerBadge2: "Praxiswissen",
    },
    canSell: true,
    requirements: ["ZFU-Zulassung vorliegend", "FernUSG-konformer Vertrag aktiv"],
    unlocked: false,
  },
  C: {
    id: "C",
    name: "AZAV angestrebt (nicht aktiv)",
    description: "AZAV-Akkreditierung ist nur als mögliche spätere Ausbaustufe vorgesehen. Aktuell besteht daraus kein Förderanspruch.",
    badges: { azav: true, zfu: true, ihk: false, bgs: true },
    labels: {
      productType: "Geplante AZAV-Ausbaustufe",
      certificationNote: "AZAV und ZFU nur nach Freigabe",
      faqCertAnswer: "Diese Phase ist eine interne Roadmap. Bildungsgutscheine, AZAV- oder ZFU-Aussagen sind erst nach nachweisbarer Zulassung zulässig.",
      footerBadge1: "AZAV-zertifiziert",
      footerBadge2: "Förderung nur nach Zulassung",
    },
    canSell: true,
    requirements: ["AZAV-Akkreditierung vorliegend", "ZFU-Zulassung vorliegend", "Anwesenheitsnachweise aktiv"],
    unlocked: false,
  },
  D: {
    id: "D",
    name: "Vollzertifiziert",
    description: "ZFU + AZAV + IHK-Kooperation. Maximale Reichweite und Förderoptionen.",
    badges: { azav: true, zfu: true, ihk: true, bgs: true },
    labels: {
      productType: "Praxisorientierter Fernlehrgang",
      certificationNote: "ZFU und AZAV nur nach Freigabe",
      faqCertAnswer: "Diese Phase ist eine interne Roadmap und darf erst nach schriftlicher Freigabe und nachweisbaren Zulassungen öffentlich genutzt werden.",
      footerBadge1: "Roadmap: AZAV · ZFU",
      footerBadge2: "Förderung nur nach Zulassung",
    },
    canSell: true,
    requirements: ["AZAV-Akkreditierung", "ZFU-Zulassung", "IHK-Kooperationsvertrag"],
    unlocked: false,
  },
};

// In-Memory Fallback (wird durch DB überschrieben)
let _currentPhase: Phase = "A";

export async function getCurrentPhase(db?: any): Promise<Phase> {
  if (!db) return _currentPhase;
  try {
    const result = await db.execute(
      `SELECT value FROM portal_settings WHERE key_name = 'portal_phase' LIMIT 1`
    );
    const rows = result[0] as any[];
    if (rows && rows.length > 0) {
      const phase = rows[0].value as Phase;
      if (["A","B","C","D"].includes(phase)) {
        _currentPhase = phase;
        return phase;
      }
    }
  } catch {
    // Tabelle existiert noch nicht — wird beim ersten Set angelegt
  }
  return _currentPhase;
}

export async function setCurrentPhase(phase: Phase, db?: any): Promise<void> {
  _currentPhase = phase;
  if (!db) return;
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS portal_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        key_name VARCHAR(100) UNIQUE NOT NULL,
        value VARCHAR(500) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await db.execute(`
      INSERT INTO portal_settings (key_name, value)
      VALUES ('portal_phase', ?)
      ON DUPLICATE KEY UPDATE value = ?
    `, [phase, phase]);
  } catch (err) {
    console.error("[PortalPhase] DB write error:", err);
  }
}

export function registerPortalPhaseRoutes(app: Express) {
  // GET /api/portal-phase — öffentlich
  app.get("/api/portal-phase", async (_req: Request, res: Response) => {
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const phase = await getCurrentPhase(db);
      const flags = getFlagsForPhase(phase);
      res.json({ phase, config: PHASES[phase], flags });
    } catch {
      res.json({ phase: _currentPhase, config: PHASES[_currentPhase] });
    }
  });

  // POST /api/admin/portal-phase — nur Admin
  app.post("/api/admin/portal-phase", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { phase } = req.body;
      if (!["A","B","C","D"].includes(phase)) return res.status(400).json({ error: "Ungültige Phase" });

      const { getDb } = await import("./db");
      const db = await getDb();
      await setCurrentPhase(phase as Phase, db);
      res.json({ ok: true, phase, config: PHASES[phase as Phase] });
    } catch (err) {
      console.error("[PortalPhase] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });
}

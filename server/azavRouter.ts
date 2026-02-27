/**
 * azavRouter.ts – tRPC-Endpunkte für AZAV-Compliance
 *
 * Deckt ab:
 * - Aktivitäts-Heartbeat (Anwesenheitsnachweis)
 * - Lernfortschritt öffnen/schließen (server-seitige Speicherung)
 * - Feedback (QM-Pflicht AZAV §3)
 * - Beschwerdemanagement (QM-Pflicht AZAV §3)
 * - DSGVO-Einwilligungen (Art. 7 DSGVO)
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  saveHeartbeat,
  openLearningLog,
  closeLearningLog,
  getCompletedDays,
  writeExamAuditLog,
  saveFeedback,
  getFeedbackStats,
  createComplaint,
  getOpenComplaints,
  updateComplaintStatus,
  logConsent,
  getUserConsents,
} from "./db";
import { TRPCError } from "@trpc/server";

export const azavRouter = router({

  // ── Heartbeat ────────────────────────────────────────────────────────────
  /**
   * Browser sendet alle 60 Sek ein Signal, solange Nutzer aktiv lernt.
   * Speichert Zeitstempel + aktualisiert learningLogs.heartbeatCount.
   */
  heartbeat: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1).max(10),
      dayId: z.number().int().min(1),
      logId: z.number().int().optional(), // Wenn vorhanden: update statt insert
    }))
    .mutation(async ({ ctx, input }) => {
      await saveHeartbeat(ctx.user.id, input.moduleId, input.dayId);
      return { ok: true, timestamp: new Date().toISOString() };
    }),

  // ── Learning Log ─────────────────────────────────────────────────────────
  /** Lerneinheit öffnen – gibt logId zurück (für späteres Schließen) */
  openDay: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1),
      dayId: z.number().int().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const logId = await openLearningLog(ctx.user.id, input.moduleId, input.dayId);
      return { logId };
    }),

  /** Lerneinheit schließen – Dauer und Abschluss setzen */
  closeDay: protectedProcedure
    .input(z.object({
      logId: z.number().int(),
      durationSeconds: z.number().int().min(0),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await closeLearningLog(input.logId, input.durationSeconds, input.completed);
      return { ok: true };
    }),

  /** Abgeschlossene Lerntage des Nutzers abrufen */
  getProgress: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const days = await getCompletedDays(ctx.user.id, input.moduleId);
      return { days };
    }),

  // ── Feedback ─────────────────────────────────────────────────────────────
  /** Nutzerfeedback für Modul/Tag einreichen */
  submitFeedback: protectedProcedure
    .input(z.object({
      moduleId: z.number().int().min(1),
      dayId: z.number().int().optional(),
      rating: z.number().int().min(1).max(5),
      comment: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await saveFeedback({
        userId: ctx.user.id,
        moduleId: input.moduleId,
        dayId: input.dayId,
        rating: input.rating,
        comment: input.comment,
      });
      return { ok: true };
    }),

  /** Feedback-Statistiken (nur Admin) */
  getFeedbackStats: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Feedback-Statistiken abrufen" });
      }
      return await getFeedbackStats();
    }),

  // ── Beschwerden ───────────────────────────────────────────────────────────
  /** Beschwerde einreichen */
  submitComplaint: protectedProcedure
    .input(z.object({
      subject: z.string().min(5).max(255),
      description: z.string().min(20).max(5000),
    }))
    .mutation(async ({ ctx, input }) => {
      await createComplaint({
        userId: ctx.user.id,
        subject: input.subject,
        description: input.description,
        status: "open",
      });
      return { ok: true, message: "Ihre Beschwerde wurde erfolgreich eingereicht. Wir melden uns innerhalb von 5 Werktagen." };
    }),

  /** Offene Beschwerden abrufen (nur Admin) */
  getComplaints: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Beschwerden einsehen" });
      }
      return await getOpenComplaints();
    }),

  /** Beschwerde-Status aktualisieren (nur Admin) */
  updateComplaint: protectedProcedure
    .input(z.object({
      id: z.number().int(),
      status: z.enum(["open", "in_progress", "resolved", "closed"]),
      adminNote: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Nur Admins können Beschwerden aktualisieren" });
      }
      await updateComplaintStatus(input.id, input.status, input.adminNote);
      return { ok: true };
    }),

  // ── DSGVO-Einwilligungen ─────────────────────────────────────────────────
  /** Einwilligung protokollieren */
  logConsent: protectedProcedure
    .input(z.object({
      consentType: z.enum([
        "terms", "privacy", "ai_assistant", "marketing",
        "revoked_terms", "revoked_privacy", "revoked_ai", "revoked_marketing"
      ]),
      consentVersion: z.string().default("2026-03"),
    }))
    .mutation(async ({ ctx, input }) => {
      await logConsent({
        userId: ctx.user.id,
        consentType: input.consentType,
        consentVersion: input.consentVersion,
      });
      return { ok: true };
    }),

  /** Eigene Einwilligungen abrufen */
  getMyConsents: protectedProcedure
    .query(async ({ ctx }) => {
      return await getUserConsents(ctx.user.id);
    }),
});

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  createCertificate,
  getUserCertificates,
  getCertificateByExamSession,
} from "./certificates";

export const certificateRouter = router({
  /**
   * Generate certificate for a completed exam session
   * Only works if score >= 70%
   */
  generateCertificate: protectedProcedure
    .input(
      z.object({
        examSessionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createCertificate(ctx.user.id, input.examSessionId);

      if (!result) {
        return {
          success: false,
          message: "Zertifikat kann nur für bestandene Prüfungen (≥70%) erstellt werden.",
        };
      }

      return {
        success: true,
        certificateId: result.certificateId,
        pdfUrl: result.pdfUrl,
      };
    }),

  /**
   * Get all certificates for the current user
   */
  getUserCertificates: protectedProcedure.query(async ({ ctx }) => {
    return getUserCertificates(ctx.user.id);
  }),

  /**
   * Get certificate for a specific exam session
   */
  getCertificateByExamSession: protectedProcedure
    .input(
      z.object({
        examSessionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return getCertificateByExamSession(input.examSessionId);
    }),
});

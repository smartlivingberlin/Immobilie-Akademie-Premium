import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getExamSession, getWeakTopics, getExamQuestions } from "./db";
import { jsPDF } from "jspdf";

export const pdfRouter = router({
  generateExamResultPDF: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { sessionId } = input;

      // Get exam session data
      const session = await getExamSession(sessionId);
      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Exam session not found",
        });
      }

      // Check ownership
      if (session.userId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to access this exam result.",
        });
      }

      // Get exam questions
      const questions = await getExamQuestions(sessionId);
      
      // Get weak topics
      const weakTopics = await getWeakTopics(session.userId);

      // Create PDF
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Prüfungsergebnis", 105, 20, { align: "center" });
      
      // Session Info
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Modul: ${session.moduleId}`, 20, 40);
      pdf.text(`Datum: ${new Date(session.createdAt).toLocaleDateString("de-DE")}`, 20, 48);
      const durationMinutes = session.completedAt 
        ? Math.floor((new Date(session.completedAt).getTime() - new Date(session.createdAt).getTime()) / 60000)
        : 0;
      pdf.text(`Dauer: ${durationMinutes} Minuten`, 20, 56);

      // Score
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      const scoreColor: [number, number, number] = session.score >= 70 ? [0, 128, 0] : [255, 0, 0];
      pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      pdf.text(`Ergebnis: ${session.score}%`, 20, 70);
      
      const passed = session.score >= 70;
      pdf.setFontSize(14);
      pdf.text(passed ? "✓ Bestanden" : "✗ Nicht bestanden", 20, 80);
      pdf.setTextColor(0, 0, 0);

      // Questions Summary
      pdf.setFont("helvetica", "bold");
      pdf.text("Fragenübersicht", 20, 100);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      
      const correctCount = questions.filter((q: any) => q.isCorrect).length;
      const incorrectCount = questions.length - correctCount;
      
      pdf.text(`Richtig beantwortet: ${correctCount} / ${questions.length}`, 20, 110);
      pdf.text(`Falsch beantwortet: ${incorrectCount} / ${questions.length}`, 20, 118);

      // Weak Topics
      if (weakTopics && weakTopics.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Identifizierte Wissenslücken", 20, 138);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        
        let yPos = 148;
        weakTopics.slice(0, 10).forEach((topic, index) => {
          pdf.text(`${index + 1}. ${topic.topic} (${topic.incorrectCount}x falsch)`, 20, yPos);
          yPos += 8;
        });
      }

      // Recommendations
      const recYPos = weakTopics && weakTopics.length > 0 ? 230 : 158;
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Empfehlungen", 20, recYPos);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      
      let recommendations: string[] = [];
      if (session.score < 50) {
        recommendations = [
          "• Wiederholen Sie die Grundlagen des Moduls gründlich",
          "• Nutzen Sie die Lernkarten für tägliches Training",
          "• Schauen Sie sich die Video-Tutorials erneut an",
          "• Konsultieren Sie den KI-Tutor bei Verständnisfragen"
        ];
      } else if (session.score < 70) {
        recommendations = [
          "• Fokussieren Sie sich auf die identifizierten Wissenslücken",
          "• Lösen Sie weitere Übungsquizze zu den Schwachstellen",
          "• Vertiefen Sie Ihr Wissen mit den Modulinhalten",
          "• Wiederholen Sie die Prüfung nach gezieltem Lernen"
        ];
      } else if (session.score < 85) {
        recommendations = [
          "• Sehr gute Leistung! Vertiefen Sie die letzten Wissenslücken",
          "• Versuchen Sie den Schwierigkeitsgrad 'Schwer'",
          "• Bereiten Sie sich auf das nächste Modul vor",
          "• Nutzen Sie den Prüfungsmodus regelmäßig"
        ];
      } else {
        recommendations = [
          "• Exzellente Leistung! Sie beherrschen das Modul sehr gut",
          "• Versuchen Sie den IHK-Simulationsmodus",
          "• Teilen Sie Ihr Wissen mit anderen Lernenden",
          "• Fahren Sie mit dem nächsten Modul fort"
        ];
      }

      let recTextYPos = recYPos + 10;
      recommendations.forEach((rec) => {
        pdf.text(rec, 20, recTextYPos);
        recTextYPos += 8;
      });

      // Generate PDF base64
      const pdfBase64 = pdf.output("dataurlstring").split(",")[1];

      return {
        pdf: pdfBase64,
        filename: `Pruefungsergebnis_Modul${session.moduleId}_${new Date().toISOString().split("T")[0]}.pdf`,
      };
    }),
});

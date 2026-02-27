/**
 * FeedbackWidget.tsx
 *
 * Feedback-Formular für Lerneinheiten (QM-Pflicht nach AZAV §3).
 * Nutzer können jede Lerneinheit mit 1–5 Sternen bewerten + Kommentar.
 * Zeigt nach Absenden eine Bestätigung.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

interface FeedbackWidgetProps {
  moduleId: number;
  dayId?: number;
  onSubmitted?: () => void;
}

export default function FeedbackWidget({ moduleId, dayId, onSubmitted }: FeedbackWidgetProps) {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = trpc.azav.submitFeedback.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSubmitted?.();
    },
  });

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-700 font-semibold">✅ Vielen Dank für Ihr Feedback!</p>
        <p className="text-green-600 text-sm mt-1">Ihre Bewertung hilft uns, die Lerneinheiten kontinuierlich zu verbessern.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <h4 className="font-semibold text-slate-800 mb-3 text-sm">
        📊 Wie war diese Lerneinheit?
      </h4>

      {/* Sterne-Bewertung */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-1 transition-transform hover:scale-110"
            aria-label={`${star} Stern${star > 1 ? "e" : ""}`}
          >
            <Star
              size={24}
              className={
                star <= (hovered || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-slate-600 self-center">
            {["", "Schlecht", "Verbesserungswürdig", "Okay", "Gut", "Ausgezeichnet"][rating]}
          </span>
        )}
      </div>

      {/* Optionaler Kommentar */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optionaler Kommentar (Was war gut? Was kann verbessert werden?)"
        className="w-full text-sm border border-slate-200 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        maxLength={2000}
      />

      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-slate-400">{comment.length}/2000</span>
        <button
          type="button"
          disabled={rating === 0 || submitFeedback.isPending}
          onClick={() =>
            submitFeedback.mutate({ moduleId, dayId, rating, comment: comment || undefined })
          }
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
        >
          {submitFeedback.isPending ? "Wird gesendet…" : "Feedback absenden"}
        </button>
      </div>
    </div>
  );
}

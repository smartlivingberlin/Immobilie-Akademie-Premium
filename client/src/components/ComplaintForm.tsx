/**
 * ComplaintForm.tsx
 *
 * Formalisiertes Beschwerde-Formular (QM-Pflicht nach AZAV §3).
 * Beschwerden werden mit Status-Tracking gespeichert.
 * Nutzer erhalten Bestätigung und Info über Bearbeitungszeit.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { AlertCircle } from "lucide-react";

export default function ComplaintForm() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitComplaint = trpc.azav.submitComplaint.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  if (submitted) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-lg mx-auto">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="text-blue-600" size={24} />
        </div>
        <h3 className="font-semibold text-blue-900 mb-2">Beschwerde eingereicht</h3>
        <p className="text-blue-700 text-sm">
          Ihre Beschwerde wurde erfolgreich aufgenommen. Wir melden uns innerhalb von
          5 Werktagen bei Ihnen. Gemäß unserem Qualitätsmanagement-System werden alle
          Beschwerden dokumentiert und bearbeitet.
        </p>
        <p className="text-blue-500 text-xs mt-3">
          Rechtsgrundlage: AZAV §3 Abs. 4 – Beschwerdemanagement
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Beschwerde einreichen</h3>
            <p className="text-xs text-slate-500">Bearbeitung innerhalb von 5 Werktagen</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Betreff *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Kurze Zusammenfassung der Beschwerde"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={255}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Beschreibung *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bitte beschreiben Sie Ihre Beschwerde so detailliert wie möglich (mindestens 20 Zeichen)."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={5}
              maxLength={5000}
            />
            <div className="text-xs text-slate-400 text-right mt-1">{description.length}/5000</div>
          </div>

          {submitComplaint.error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
              {submitComplaint.error.message}
            </div>
          )}

          <button
            type="button"
            disabled={subject.length < 5 || description.length < 20 || submitComplaint.isPending}
            onClick={() => submitComplaint.mutate({ subject, description })}
            className="w-full py-2 bg-red-600 text-white font-medium rounded-lg disabled:opacity-50 hover:bg-red-700 transition-colors text-sm"
          >
            {submitComplaint.isPending ? "Wird eingereicht…" : "Beschwerde einreichen"}
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Ihre Beschwerde wird vertraulich behandelt und gemäß AZAV §3 dokumentiert.
        </p>
      </div>
    </div>
  );
}

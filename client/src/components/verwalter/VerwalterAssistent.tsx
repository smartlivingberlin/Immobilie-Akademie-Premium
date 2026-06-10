import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssistentVorschlaege } from "@shared/verwalterAssistentKnowledge";

type Nachricht = { rolle: "user" | "assistant"; text: string };

const WELCOME =
  "Hallo! Ich bin Ihr **Verwalter-Assistent**.\n\nIch kenne Ihre Objekte, Vorgänge und Buchungen — erkläre SKR-Konten **Schritt für Schritt** und helfe bei Unsicherheiten.\n\nTipp: Unter **Buchungen** können Sie auch in eigenen Worten tippen (z. B. „250€ Hausgeld WE 3“) — das System schlägt die Konten vor.\n\nStellen Sie eine Frage oder wählen Sie einen Vorschlag.";

export function VerwalterAssistent() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [nachrichten, setNachrichten] = useState<Nachricht[]>([
    { rolle: "assistant", text: WELCOME },
  ]);
  const [eingabe, setEingabe] = useState("");
  const [laden, setLaden] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const vorschlaege = getAssistentVorschlaege(location);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [nachrichten, open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("verwalter-assistent-open", handler);
    return () => window.removeEventListener("verwalter-assistent-open", handler);
  }, []);

  const senden = async (frage?: string) => {
    const text = (frage || eingabe).trim();
    if (!text || laden) return;
    setEingabe("");
    const next: Nachricht[] = [...nachrichten, { rolle: "user", text }];
    setNachrichten(next);
    setLaden(true);
    try {
      const res = await fetch("/api/verwalter/assistent", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frage: text,
          seite: location,
          nachrichten: next.filter((n) => n.text !== WELCOME),
        }),
      });
      const data = await res.json();
      const antwort =
        res.ok && data.answer
          ? data.answer
          : data.error || "Entschuldigung, ich konnte gerade nicht antworten. Bitte erneut versuchen.";
      setNachrichten((prev) => [...prev, { rolle: "assistant", text: antwort }]);
    } catch {
      setNachrichten((prev) => [
        ...prev,
        { rolle: "assistant", text: "Verbindungsfehler. Bitte Internet prüfen und erneut versuchen." },
      ]);
    } finally {
      setLaden(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          id="assistent"
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex min-h-[52px] items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-700 md:bottom-6 md:right-6"
          aria-label="Verwalter-Assistent öffnen"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Assistent</span>
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-0 right-0 z-50 flex h-[min(85vh,32rem)] w-full flex-col border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:bottom-6 sm:right-6 sm:w-[min(100vw-2rem,24rem)] sm:rounded-xl"
          role="dialog"
          aria-label="Verwalter-Assistent"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold text-sm">Verwalter-Assistent</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {nachrichten.map((n, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-sm ${
                  n.rolle === "user"
                    ? "ml-6 bg-emerald-600 text-white"
                    : "mr-4 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{n.text}</div>
              </div>
            ))}
            {laden && (
              <p className="text-xs text-slate-500 animate-pulse">Denke nach…</p>
            )}
            <div ref={endRef} />
          </div>

          {nachrichten.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
              {vorschlaege.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => senden(v)}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-700">
            <Input
              value={eingabe}
              onChange={(e) => setEingabe(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && senden()}
              placeholder="Frage zu Konten, Buchungen, Fristen…"
              className="min-h-[44px] flex-1 text-sm"
              disabled={laden}
            />
            <Button onClick={() => senden()} disabled={laden || !eingabe.trim()} className="min-h-[44px] min-w-[44px] shrink-0" aria-label="Senden">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="px-3 pb-2 text-[10px] text-slate-400">
            Keine Rechts- oder Steuerberatung · Konten mit Steuerberater abstimmen
          </p>
        </div>
      )}
    </>
  );
}

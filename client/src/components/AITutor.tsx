import { useState, useRef, useEffect } from "react";
import { useInspectReadOnly } from "@/hooks/useInspectReadOnly";
import { X, Send, Bot, User, Sparkles, Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isBrowserSpeechSupported, speakBrowserText, stopBrowserSpeech } from "@/lib/speakBrowser";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AITutorProps {
  isOpen: boolean;
  onClose: () => void;
  moduleContext?: string;
  moduleId?: number;
}

const SUGGESTED: Record<number, string[]> = {
  1: ["Was ist §34c GewO?", "Was steht im Grundbuch?", "Erkläre Wohnungseigentum"],
  2: ["Wie berechne ich die Maklercourtage?", "Was ist ein Alleinauftrag?", "Was ist das Bestellerprinzip?"],
  3: ["Wie funktioniert eine Eigentümerversammlung?", "Was sind Betriebskosten?", "Wie kündige ich einen Mietvertrag?"],
  4: ["Erkläre das Ertragswertverfahren", "Was ist der Liegenschaftszinssatz?", "Wie berechne ich den Sachwert?"],
  5: ["Was ist ein Annuitätendarlehen?", "Was ist das ESIS-Merkblatt?", "Erkläre KfW-Förderung 124"],
};

const DEFAULT_SUGGESTED = [
  "Was ist §34c GewO?",
  "Wie berechne ich die Maklercourtage?",
  "Was ist eine Eigentümerversammlung?",
  "Erkläre das Ertragswertverfahren",
];

export function AITutor({ isOpen, onClose, moduleContext, moduleId }: AITutorProps) {
  const { isReadOnly: isInspectReadOnly } = useInspectReadOnly();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hallo! 👋 Ich bin Ihr KI-Tutor — powered by Gemini.\n\nIch beantworte Ihre Fragen zu allen 5 Immobilien-Modulen direkt aus den Lerninhalten:\n\n• **§34c/§34i GewO** — Makler & Darlehensvermittler\n• **WEG & Mietrecht** — Verwaltung\n• **ImmoWertV** — Bewertung & Gutachten\n• **Berechnungen** mit vollständigem Lösungsweg\n\nStellen Sie mir eine Frage!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<MediaRecorder | null>(null);
  const { data: me } = trpc.auth.me.useQuery();
  const kiQuota = (me as { kiQuota?: { limit: number | null; used: number; remaining: number | null } } | null)?.kiQuota;

  const suggested = moduleId ? (SUGGESTED[moduleId] || DEFAULT_SUGGESTED) : DEFAULT_SUGGESTED;

  const pickAudioMimeType = (): string => {
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    return candidates.find((t) => MediaRecorder.isTypeSupported(t)) || "";
  };

  const startVoice = async () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    if (isInspectReadOnly) {
      toast({
        title: "Inspect-Modus",
        description: "Spracheingabe ist im Inspect-Modus deaktiviert.",
        variant: "destructive",
      });
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      toast({
        title: "Spracheingabe nicht unterstützt",
        description: "Ihr Browser unterstützt keine Audioaufnahme.",
        variant: "destructive",
      });
      return;
    }
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickAudioMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      const chunks: Blob[] = [];
      const recordedType = mimeType || recorder.mimeType || "audio/webm";
      recognitionRef.current = recorder;
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = async () => {
        stream?.getTracks().forEach((t) => t.stop());
        stream = null;
        setListening(false);
        const blob = new Blob(chunks, { type: recordedType });
        setIsLoading(true);
        try {
          const res = await fetch("/api/ai/transcribe", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": recordedType },
            body: blob,
          });
          const data = await res.json();
          if (data.transcript) {
            setInput(data.transcript);
            setTimeout(() => handleSend(data.transcript), 100);
          } else {
            toast({
              title: "Spracherkennung fehlgeschlagen",
              description: data.error || "Bitte erneut versuchen.",
              variant: "destructive",
            });
            setIsLoading(false);
          }
        } catch {
          toast({
            title: "Verbindungsfehler",
            description: "Spracherkennung nicht erreichbar.",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      };
      recorder.start();
      setListening(true);
      setTimeout(() => { if (recorder.state === "recording") recorder.stop(); }, 10000);
    } catch (err) {
      stream?.getTracks().forEach((t) => t.stop());
      const message = err instanceof Error ? err.message : String(err);
      toast({
        title: "Mikrofon nicht verfügbar",
        description: message.includes("Permission") || message.includes("NotAllowed")
          ? "Bitte Mikrofon im Browser erlauben und Seite neu laden."
          : message,
        variant: "destructive",
      });
    }
  };

  const handleSpeak = (text: string) => {
    if (speaking) {
      stopBrowserSpeech();
      setSpeaking(false);
      return;
    }
    if (!isBrowserSpeechSupported()) {
      toast({ title: "Vorlesen nicht unterstützt", variant: "destructive" });
      return;
    }
    const clean = text.replace(/\*\*/g, "").replace(/[*`]/g, "").slice(0, 5000).trim();
    const ok = speakBrowserText(clean, {
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
    if (ok) setSpeaking(true);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (question?: string) => {
    const userMessage = question || input.trim();
    if (!userMessage || isLoading) return;
    if (isInspectReadOnly) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_inspect",
          role: "assistant",
          content: "Im Inspect-Modus ist der KI-Tutor deaktiviert — Inhalte und Navigation können Sie frei ansehen.",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Gesprächskontext für RAG mitgeben (letzte 6 Nachrichten)
      const context = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai/rag-tutor", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          moduleId: moduleId || null,
          context,
        }),
      });

      const data = await res.json();
      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "_quota",
            role: "assistant",
            content: data.error || "KI-Tageslimit erreicht. Morgen wieder verfügbar oder Modulkauf für Vollzugang.",
            timestamp: new Date(),
          },
        ]);
        return;
      }
      const answer = data.answer || data.error || "Keine Antwort erhalten.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_ai",
          role: "assistant",
          content: answer,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          role: "assistant",
          content: "⚠️ Verbindungsfehler. Bitte versuchen Sie es erneut.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">KI-Tutor</div>
          <div className="text-xs text-blue-200">
            {moduleId ? `Modul ${moduleId} · ` : ""}Gemini 2.5 Flash · RAG
          </div>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {kiQuota?.limit != null && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 text-xs text-amber-800">
          KI heute: {kiQuota.used}/{kiQuota.limit}
          {kiQuota.remaining === 0 ? " — Limit erreicht" : ` — noch ${kiQuota.remaining}`}
        </div>
      )}

      {/* Messages */}
      <ScrollArea aria-live="polite" aria-atomic="false" aria-label="KI-Tutor Antworten" className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === "assistant" ? "bg-blue-100" : "bg-slate-100"
              }`}>
                {msg.role === "assistant"
                  ? <Bot className="w-3 h-3 text-blue-600" />
                  : <User className="w-3 h-3 text-slate-600" />
                }
              </div>
              <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-700 border border-slate-100"
              }`}>
                {msg.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                    {i < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
                {msg.role === "assistant" && msg.id !== "welcome" && (
                  <button
                    type="button"
                    aria-label="Text vorlesen"
                    onClick={() => handleSpeak(msg.content)}
                    className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    {speaking ? "Stop" : "Vorlesen"}
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Vorschläge */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1">
          {suggested.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-slate-100 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Frage stellen..."
          className="text-xs"
          disabled={isLoading}
        />
        <Button
          type="button"
          onClick={startVoice}
          disabled={isLoading || isInspectReadOnly}
          size="sm"
          variant="outline"
          title={isInspectReadOnly ? "Spracheingabe im Inspect-Modus deaktiviert" : listening ? "Aufnahme stoppen" : "Spracheingabe"}
          className={listening ? "border-red-300 text-red-600" : ""}
        >
          {listening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
        </Button>
        <Button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 px-3"
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

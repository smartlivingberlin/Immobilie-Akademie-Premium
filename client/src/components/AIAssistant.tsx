import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Sparkles, Bot, User, Loader2 } from "lucide-react";

interface AIAssistantProps {
  moduleContext?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK = [
  "Was ist der Unterschied zwischen WEG und Mietrecht?",
  "Erkläre mir §34c GewO",
  "Welche Pflichten hat ein Immobilienverwalter?",
  "Was muss ich für die Sachkundeprüfung wissen?",
];

export default function AIAssistant({ moduleContext, isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const moduleId = moduleContext
    ? parseInt(moduleContext.replace(/[^0-9]/g, "")) || null
    : null;

  const send = async (text?: string) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: q };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);
    try {
      const context = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/ai/rag-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, moduleId, context }),
      });
      const data = await res.json();
      setMessages((p) => [
        ...p,
        { id: Date.now().toString() + "_a", role: "assistant", content: data.answer || data.error || "Keine Antwort." },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { id: Date.now().toString() + "_e", role: "assistant", content: "⚠️ Verbindungsfehler. Bitte erneut versuchen." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl flex flex-col shadow-2xl" style={{ height: "65vh" }}>
        <CardHeader className="border-b flex-shrink-0 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">KI-Lern-Assistent</CardTitle>
              {moduleContext && <span className="text-xs text-slate-400">· {moduleContext}</span>}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-500 text-center py-4">
                  Ich helfe bei Fragen zu WEG-Recht, Mietrecht, Maklerrecht und der Sachkundeprüfung.
                </p>
                <p className="text-xs font-medium text-slate-600">Beliebte Fragen:</p>
                {QUICK.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-2 px-3 text-sm whitespace-normal"
                    onClick={() => send(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <div className="bg-blue-100 rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                      m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                    }`}>
                      {m.content}
                    </div>
                    {m.role === "user" && (
                      <div className="bg-blue-600 rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 justify-start">
                    <div className="bg-blue-100 rounded-full h-7 w-7 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-slate-100 rounded-xl px-3 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-3 flex-shrink-0 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
                placeholder="Stelle eine Frage..."
                disabled={loading}
                className="flex-1"
                autoFocus
              />
              <Button onClick={() => send()} disabled={!input.trim() || loading} size="icon" className="bg-blue-600 hover:bg-blue-700">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-1 text-center">Claude Haiku · Immobilien-Akademie Smart</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

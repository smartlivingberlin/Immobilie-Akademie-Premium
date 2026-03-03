import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, BookOpen, Calculator, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";

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
}

export function AITutor({ isOpen, onClose, moduleContext }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hallo! 👋 Ich bin Ihr KI-Tutor für das Immobilien-Bildungsportal.\n\nIch kann Ihnen helfen bei:\n- **Fachbegriffen** aus dem Glossar (100+ Begriffe)\n- **Gesetzlichen Grundlagen** (§34c, §34i, WEG, BGB, etc.)\n- **Modulinhalten** (alle 5 Module, 220 Tage)\n- **Berechnungen** (Courtage, Hausgeld, Rendite)\n\nStellen Sie mir einfach eine Frage!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const createConversation = trpc.aiAssistant.createConversation.useMutation();
  const sendMessage = trpc.aiAssistant.sendMessage.useMutation();

  // Suggested questions
  const suggestedQuestions = [
    "Was ist §34c GewO?",
    "Wie berechnet man die Maklercourtage?",
    "Was ist eine WEG-Verwaltung?",
    "Erkläre mir das Bestellerprinzip",
    "Was ist eine Instandhaltungsrücklage?",
    "Wie funktioniert die Wertermittlung?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (question?: string) => {
    const userMessage = question || input.trim();
    if (!userMessage) return;

    // Nutzer-Nachricht sofort anzeigen
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Konversation erstellen falls noch nicht vorhanden
      let convId = conversationId;
      if (!convId) {
        const conv = await createConversation.mutateAsync({
          moduleContext: moduleContext,
        });
        convId = conv.id;
        setConversationId(convId);
      }

      // Gemini via tRPC aufrufen
      const result = await sendMessage.mutateAsync({
        conversationId: convId,
        message: userMessage,
        moduleContext: moduleContext,
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

    } catch (error) {
      // Offline oder Fehler — ehrliche Meldung
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ **KI-Tutor momentan nicht verfügbar.**

Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.

Alternativ:
- 📚 Nutzen Sie das **Glossar** für Fachbegriffe
- 📖 Lesen Sie die **Modulinhalte** direkt
- 🧮 Nutzen Sie die **Praxisrechner**",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">KI-Tutor</h2>
              <p className="text-sm text-blue-100">
                Powered by Gemini 2.5 Flash • Immobilien-Experte
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] overflow-hidden break-words rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Streamdown className="text-sm leading-relaxed">
                      {message.content}
                    </Streamdown>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user" ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="bg-blue-600 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-600 mb-2 font-medium">Vorgeschlagene Fragen:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Stellen Sie eine Frage..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>Glossar</span>
            </div>
            <div className="flex items-center gap-1">
              <Gavel className="w-3 h-3" />
              <span>Gesetze</span>
            </div>
            <div className="flex items-center gap-1">
              <Calculator className="w-3 h-3" />
              <span>Rechner</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>5 Module</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

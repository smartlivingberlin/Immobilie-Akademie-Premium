import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, MessageCircle, X, Sparkles } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

interface AIAssistantProps {
  moduleContext?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ moduleContext, isOpen, onClose }: AIAssistantProps) {
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages, refetch: refetchMessages } = trpc.aiAssistant.getMessages.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId }
  );

  const createConversation = trpc.aiAssistant.createConversation.useMutation({
    onSuccess: (data) => {
      if (data) {
        setConversationId(data.id);
      }
    },
    onError: () => {
      toast.error("Fehler beim Erstellen der Konversation");
    },
  });

  const sendMessage = trpc.aiAssistant.sendMessage.useMutation({
    onSuccess: () => {
      refetchMessages();
      setMessage("");
    },
    onError: () => {
      toast.error("Fehler beim Senden der Nachricht");
    },
  });

  // Create conversation on mount if not exists
  useEffect(() => {
    if (isOpen && !conversationId) {
      createConversation.mutate({ moduleContext });
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !conversationId) return;

    sendMessage.mutate({
      conversationId,
      message: message.trim(),
      moduleContext,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Was ist der Unterschied zwischen WEG und Mietrecht?",
    "Erkläre mir §34c GewO",
    "Welche Pflichten hat ein Immobilienverwalter?",
    "Was muss ich für die Sachkundeprüfung wissen?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl">
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <CardTitle>KI-Lern-Assistent</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          {moduleContext && (
            <p className="text-sm text-slate-500 mt-1">Kontext: {moduleContext}</p>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            {!messages || messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <MessageCircle className="w-16 h-16 text-slate-300" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Willkommen beim KI-Lern-Assistenten!
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Ich helfe dir bei Fragen zu WEG-Recht, Mietrecht, Maklerrecht und der Sachkundeprüfung.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-2">
                  <p className="text-sm font-medium text-slate-600">Beliebte Fragen:</p>
                  {quickQuestions.map((q, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal"
                      onClick={() => {
                        setMessage(q);
                        setTimeout(() => handleSend(), 100);
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Streamdown>{msg.content}</Streamdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {sendMessage.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-lg p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Stelle eine Frage..."
                disabled={sendMessage.isPending || !conversationId}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!message.trim() || sendMessage.isPending || !conversationId}
                size="icon"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

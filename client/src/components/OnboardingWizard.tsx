import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OnboardingData {
  learningGoal: string;
  dailyMinutes: number;
  preferredTime: string;
  experienceLevel: string;
}

const STEPS = [
  {
    id: "goal",
    emoji: "🎯",
    title: "Was ist dein Ziel?",
    subtitle: "Wähle deinen gewünschten Abschluss",
    field: "learningGoal",
    options: [
      { value: "makler", label: "Immobilienmakler werden", desc: "§34c GewO — Modul 1+2", emoji: "🏠" },
      { value: "verwalter", label: "WEG-Verwalter werden", desc: "Modul 1+3", emoji: "🏢" },
      { value: "gutachter", label: "Gutachter / Sachverständiger", desc: "Modul 1+4", emoji: "📊" },
      { value: "alle", label: "Alle Abschlüsse", desc: "Komplettpaket — alle 5 Module", emoji: "⭐" },
    ],
  },
  {
    id: "time",
    emoji: "⏰",
    title: "Wie viel Zeit hast du täglich?",
    subtitle: "Sei ehrlich — lieber weniger und regelmäßig",
    field: "dailyMinutes",
    options: [
      { value: 15, label: "15 Minuten", desc: "Gemütliches Tempo — ca. 12 Monate", emoji: "🐢" },
      { value: 30, label: "30 Minuten", desc: "Normales Tempo — ca. 6 Monate", emoji: "🚶" },
      { value: 60, label: "1 Stunde", desc: "Schnelles Tempo — ca. 3 Monate", emoji: "🏃" },
      { value: 120, label: "Mehr als 1 Stunde", desc: "Vollgas — ca. 6 Wochen", emoji: "🚀" },
    ],
  },
  {
    id: "when",
    emoji: "🌅",
    title: "Wann lernst du am liebsten?",
    subtitle: "Wir erinnern dich zur richtigen Zeit",
    field: "preferredTime",
    options: [
      { value: "morning", label: "Morgens", desc: "Vor der Arbeit, frischer Kopf", emoji: "☀️" },
      { value: "noon", label: "Mittags", desc: "In der Mittagspause", emoji: "🌤️" },
      { value: "evening", label: "Abends", desc: "Nach der Arbeit, entspannt", emoji: "🌙" },
      { value: "weekend", label: "Wochenende", desc: "Samstag oder Sonntag", emoji: "📅" },
    ],
  },
  {
    id: "experience",
    emoji: "📚",
    title: "Hast du schon Erfahrung mit Immobilien?",
    subtitle: "Damit wir die Erklärungen anpassen können",
    field: "experienceLevel",
    options: [
      { value: "none", label: "Kein Vorwissen", desc: "Kompletter Neueinsteiger — alles wird erklärt", emoji: "🌱" },
      { value: "little", label: "Wenig Erfahrung", desc: "Ich bin Mieter oder Eigentümer", emoji: "🌿" },
      { value: "some", label: "Etwas Erfahrung", desc: "Ich arbeite bereits in der Branche", emoji: "🌳" },
      { value: "expert", label: "Viel Erfahrung", desc: "Ich brauche nur den formalen Abschluss", emoji: "🎓" },
    ],
  },
];

export default function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    learningGoal: "",
    dailyMinutes: 30,
    preferredTime: "",
    experienceLevel: "",
  });

  const completeOnboarding = trpc.auth.completeOnboarding.useMutation({
    onSuccess: () => onComplete(),
    onError: (err) => {
      alert("Fehler: " + err.message + " — Bitte Seite neu laden und erneut versuchen.");
    },
  });

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;
  const currentValue = data[currentStep.field as keyof OnboardingData];
  const isSelected = (val: string | number) => String(currentValue) === String(val);

  const handleSelect = (value: string | number) => {
    setData(prev => ({ ...prev, [currentStep.field]: value }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      completeOnboarding.mutate(data);
    }
  };

  const goalLabels: Record<string, string> = {
    makler: "Immobilienmakler", verwalter: "WEG-Verwalter",
    gutachter: "Gutachter", alle: "alle Abschlüsse"
  };
  const timeLabels: Record<number, string> = {
    15: "15 Min/Tag", 30: "30 Min/Tag", 60: "1h/Tag", 120: "2h+/Tag"
  };

  if (step === STEPS.length) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full text-center shadow-2xl">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Perfekt, los geht's!</h2>
            <p className="text-muted-foreground mb-6">Dein persönlicher Lernplan ist bereit.</p>
            <div className="bg-blue-50 rounded-xl p-4 text-left space-y-2 mb-6">
              <p className="font-medium">📋 Dein Plan:</p>
              <p>🎯 Ziel: {goalLabels[data.learningGoal] || data.learningGoal}</p>
              <p>⏰ Tempo: {timeLabels[data.dailyMinutes as number] || data.dailyMinutes + " Min/Tag"}</p>
              <p>📅 Lernzeit: {data.preferredTime === "morning" ? "Morgens" : data.preferredTime === "noon" ? "Mittags" : data.preferredTime === "evening" ? "Abends" : "Wochenende"}</p>
            </div>
            <Button className="w-full" size="lg" onClick={() => completeOnboarding.mutate(data)}>
              Jetzt mit Tag 1 beginnen →
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50 p-4">
      <div className="max-w-lg w-full space-y-4">
        <div className="text-white text-center mb-2">
          <p className="text-sm opacity-75">Schritt {step + 1} von {STEPS.length}</p>
          <Progress value={progress} className="mt-2 h-2 bg-blue-500" />
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{currentStep.emoji}</div>
              <h2 className="text-xl font-bold">{currentStep.title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{currentStep.subtitle}</p>
            </div>

            <div className="space-y-3">
              {currentStep.options.map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected(opt.value)
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    {isSelected(opt.value) && (
                      <span className="ml-auto text-blue-500 text-lg">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">
                  ← Zurück
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!currentValue}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {step === STEPS.length - 1 ? "Fertig! →" : "Weiter →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

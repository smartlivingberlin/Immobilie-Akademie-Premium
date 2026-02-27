import { useState, useEffect } from "react";
import { Lock, Unlock, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

export function ExpertModeValuation() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if Module 4 Quiz is passed (simulated via localStorage)
    const quizPassed = localStorage.getItem("quiz_modul4_passed") === "true";
    setIsUnlocked(quizPassed);
  }, []);

  const expertCases = [
    {
      title: "Spezialfall: Nießbrauch an Luxusvilla",
      description: "Bewertung eines Nießbrauchsrechts an einer Villa am Starnberger See unter Berücksichtigung steuerlicher Aspekte.",
      difficulty: "Expert",
      time: "45 Min"
    },
    {
      title: "Spezialfall: Altlasten auf Gewerbeareal",
      description: "Wertermittlung eines Industriebrachlandes mit Bodenkontamination und Abrissverpflichtung.",
      difficulty: "Hardcore",
      time: "60 Min"
    },
    {
      title: "Spezialfall: Erbbaurecht im Ertragswert",
      description: "Komplexe Berechnung des Gebäudeertragswerts bei einem Heimfallanspruch.",
      difficulty: "Expert",
      time: "50 Min"
    }
  ];

  if (!isUnlocked) {
    return (
      <Card className="border-slate-200 shadow-md bg-slate-50 opacity-90 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-sm z-10">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200 max-w-md">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Experten-Modus gesperrt</h3>
            <p className="text-slate-500 mb-4">
              Bestehen Sie das Abschluss-Quiz von Modul 4, um Zugriff auf die vertiefenden Fallstudien für Sachverständige zu erhalten.
            </p>
            <Button variant="outline" disabled>Zugriff verweigert</Button>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-400">
            <GraduationCap className="h-5 w-5" />
            Experten-Fallstudien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 filter blur-sm">
            {expertCases.map((c, i) => (
              <div key={i} className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-200 shadow-md bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="border-b border-indigo-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Unlock className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-indigo-900">Experten-Modus: Sachverständiger</CardTitle>
              <CardDescription>Vertiefende Fallstudien für Profis</CardDescription>
            </div>
          </div>
          <Badge className="bg-indigo-600 hover:bg-indigo-700">Freigeschaltet</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {expertCases.map((item, index) => (
            <div key={index} className="group flex items-start justify-between p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {item.title}
                  </h4>
                  <Badge variant="outline" className="text-xs border-indigo-200 text-indigo-600">
                    {item.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 max-w-xl">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                  <span>Dauer: {item.time}</span>
                  <span>•</span>
                  <span>Interaktiv</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-indigo-600 group-hover:bg-indigo-50">
                Starten <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { ExternalLink, Play, Youtube } from "lucide-react";

const MODULE_VIDEOS: Record<number, Array<{title: string, url: string, duration: string, topic: string}>> = {
  1: [
    { title: "Immobilienmarkt Deutschland erklärt", url: "https://www.youtube.com/watch?v=HIER_ID_1", duration: "12 Min", topic: "Marktüberblick" },
    { title: "Grundbuch Aufbau und Abteilungen", url: "https://www.youtube.com/watch?v=HIER_ID_2", duration: "8 Min", topic: "Sachenrecht" },
    { title: "BauGB und Bebauungsplan", url: "https://www.youtube.com/watch?v=HIER_ID_3", duration: "10 Min", topic: "Baurecht" },
    { title: "Grunderwerbsteuer berechnen", url: "https://www.youtube.com/watch?v=HIER_ID_4", duration: "7 Min", topic: "Steuern" },
  ],
  2: [
    { title: "§34c GewO Maklererlaubnis", url: "https://www.youtube.com/watch?v=HIER_ID_5", duration: "11 Min", topic: "Maklerrecht" },
    { title: "Maklervertrag richtig gestalten", url: "https://www.youtube.com/watch?v=HIER_ID_6", duration: "9 Min", topic: "Vertragsrecht" },
    { title: "Bestellerprinzip und Provision", url: "https://www.youtube.com/watch?v=HIER_ID_7", duration: "8 Min", topic: "Provision" },
    { title: "Geldwäschegesetz für Makler", url: "https://www.youtube.com/watch?v=HIER_ID_8", duration: "13 Min", topic: "GwG" },
  ],
  3: [
    { title: "WEG Reform 2020 erklärt", url: "https://www.youtube.com/watch?v=HIER_ID_9", duration: "15 Min", topic: "WEG-Reform" },
    { title: "Hausgeldabrechnung erstellen", url: "https://www.youtube.com/watch?v=HIER_ID_10", duration: "12 Min", topic: "Abrechnung" },
    { title: "Eigentümerversammlung leiten", url: "https://www.youtube.com/watch?v=HIER_ID_11", duration: "18 Min", topic: "Versammlung" },
    { title: "Instandhaltungsrücklage WEG", url: "https://www.youtube.com/watch?v=HIER_ID_12", duration: "7 Min", topic: "Finanzen" },
  ],
  4: [
    { title: "Verkehrswert Immobilien berechnen", url: "https://www.youtube.com/watch?v=HIER_ID_13", duration: "20 Min", topic: "Wertermittlung" },
    { title: "Sachwertverfahren Schritt für Schritt", url: "https://www.youtube.com/watch?v=HIER_ID_14", duration: "16 Min", topic: "Sachwert" },
    { title: "Ertragswertverfahren Erklärung", url: "https://www.youtube.com/watch?v=HIER_ID_15", duration: "18 Min", topic: "Ertragswert" },
    { title: "ImmoWertV Wertermittlung", url: "https://www.youtube.com/watch?v=HIER_ID_16", duration: "11 Min", topic: "ImmoWertV" },
  ],
  5: [
    { title: "§34i GewO Darlehensvermittler", url: "https://www.youtube.com/watch?v=HIER_ID_17", duration: "10 Min", topic: "§34i GewO" },
    { title: "Wohnimmobilienkreditrichtlinie WIKR", url: "https://www.youtube.com/watch?v=HIER_ID_18", duration: "13 Min", topic: "WIKR" },
    { title: "Baufinanzierung Bonitätsprüfung", url: "https://www.youtube.com/watch?v=HIER_ID_19", duration: "9 Min", topic: "Bonität" },
    { title: "ESIS Europäisches Merkblatt", url: "https://www.youtube.com/watch?v=HIER_ID_20", duration: "7 Min", topic: "ESIS" },
  ],
};

interface VideoListProps {
  moduleId: number;
  dayNumber?: number;
}

export function VideoList({ moduleId }: VideoListProps) {
  const videos = MODULE_VIDEOS[moduleId] || [];

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Youtube className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>Keine Videos für dieses Modul verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Youtube className="h-5 w-5 text-red-600" />
        <span className="text-sm text-slate-500">Kuratierte Lernvideos — öffnen auf YouTube</span>
      </div>
      <div className="grid gap-3">
        {videos.map((video, i) => (
          <a
            key={i}
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
              <Play className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 text-sm truncate">{video.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{video.topic}</span>
                <span className="text-xs text-slate-400">{video.duration}</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-red-500 flex-shrink-0" />
          </a>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
        <strong>💡 Tipp:</strong> Eigene Videos werden demnächst direkt hier eingebettet.
        Nutze bis dahin die kuratierten YouTube-Videos als Ergänzung zum Lernstoff.
      </div>
    </div>
  );
}

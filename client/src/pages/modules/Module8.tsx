import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, HeartHandshake, Rocket } from "lucide-react";

export default function Module8() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 8: Langfristiger Karriereweg
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Risikomanagement, Kundenbindung und Zukunftstrends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-red-500" />
              Risikomanagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Haftung, Versicherungen, Konfliktlösung und rechtliche Streitigkeiten.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-pink-500" />
              Kundenbindung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              After-Sales-Service, CRM-Nutzung und langfristiges Beziehungsmanagement.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-cyan-500" />
              Zukunftstrends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              PropTech, KI, Nachhaltigkeit (ESG) und der Wandel zum Berater.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

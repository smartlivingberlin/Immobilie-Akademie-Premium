import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HardHat, Gem } from "lucide-react";

export default function Module7() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 7: Besondere Immobilien
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Neubauprojekte, Luxusimmobilien und Off-Market-Deals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-orange-500" />
              Neubauprojekte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Bauträgergeschäft, MaBV, Planverkauf und Gewährleistung.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Gem className="h-5 w-5 text-purple-500" />
              Luxus & Off-Market
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Diskretion, exklusive Netzwerke, NDAs und High-End-Marketing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

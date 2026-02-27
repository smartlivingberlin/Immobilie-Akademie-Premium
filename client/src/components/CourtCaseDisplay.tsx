import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourtCase } from "@/data/rechtsprechung-modul3";
import { CourtCaseModule2 } from "@/data/rechtsprechung-modul2";
import { CourtCaseModule4 } from "@/data/rechtsprechung-modul4";
import { LegalLink } from "./LegalLink";

interface CourtCaseDisplayProps {
  courtCase: CourtCase | CourtCaseModule2 | CourtCaseModule4;
}

export function CourtCaseDisplay({ courtCase }: CourtCaseDisplayProps) {
  return (
    <Card className="border-l-4 border-l-purple-500 bg-purple-50/30">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                {courtCase.court}
              </Badge>
              <Badge variant="secondary">{courtCase.date}</Badge>
            </div>
            <CardTitle className="text-xl mb-2">{courtCase.title}</CardTitle>
            <CardDescription className="text-sm font-mono text-slate-600">
              Az: {courtCase.reference}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => window.open(courtCase.sourceUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Quelle
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {courtCase.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm mb-2 text-blue-900">Zusammenfassung</h4>
          <p className="text-sm text-slate-700">{courtCase.summary}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              Vollständige Falldarstellung
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Sachverhalt</h4>
                <p className="text-sm text-slate-700">{courtCase.facts}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Rechtsfrage</h4>
                <p className="text-sm text-slate-700">{courtCase.legalIssue}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Entscheidung des BGH</h4>
                <p className="text-sm text-slate-700">{courtCase.decision}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-sm mb-2 text-green-900">Praktische Bedeutung</h4>
          <p className="text-sm text-slate-700 whitespace-pre-line">{courtCase.practicalImplication}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm mb-3">Relevante Rechtsgrundlagen</h4>
          <div className="flex flex-wrap gap-2">
            {courtCase.relatedLaws.map((law, idx) => {
              const lawCode = law.split(" - ")[0];
              return (
                <LegalLink key={idx} law={lawCode} className="text-xs bg-white px-3 py-1.5 rounded border border-slate-200 hover:border-slate-300" />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { FileText, Download, Building, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function AppraisalGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    objektart: "",
    adresse: "",
    baujahr: "",
    flaeche: "",
    verfahren: "",
    verkehrswert: "",
    besonderheiten: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    setIsGenerating(true);
    
    // Simulation der PDF-Generierung
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Gutachten erstellt",
        description: "Das Kurzgutachten wurde erfolgreich als PDF generiert.",
        variant: "default", // Changed from "success" to "default" to match standard toast variants
      });
      
      // In einer echten App würde hier der Download-Link ausgelöst
      console.log("PDF generated with data:", formData);
    }, 2000);
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="bg-slate-50 border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <FileText className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle>Gutachten-Generator</CardTitle>
            <CardDescription>Erstellen Sie ein strukturiertes Kurzgutachten (Entwurf)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Objektart</Label>
              <Select onValueChange={(val) => handleSelectChange("objektart", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efh">Einfamilienhaus</SelectItem>
                  <SelectItem value="mfh">Mehrfamilienhaus</SelectItem>
                  <SelectItem value="etw">Eigentumswohnung</SelectItem>
                  <SelectItem value="gewerbe">Gewerbeobjekt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Adresse des Bewertungsobjekts</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  name="adresse"
                  placeholder="Musterstraße 1, 12345 Musterstadt" 
                  className="pl-9"
                  value={formData.adresse}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Baujahr</Label>
                <Input 
                  name="baujahr"
                  placeholder="z.B. 1985" 
                  value={formData.baujahr}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Wohnfläche (m²)</Label>
                <Input 
                  name="flaeche"
                  placeholder="z.B. 145" 
                  value={formData.flaeche}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gewähltes Verfahren</Label>
              <Select onValueChange={(val) => handleSelectChange("verfahren", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sachwert">Sachwertverfahren</SelectItem>
                  <SelectItem value="ertragswert">Ertragswertverfahren</SelectItem>
                  <SelectItem value="vergleichswert">Vergleichswertverfahren</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ermittelter Verkehrswert (€)</Label>
              <Input 
                name="verkehrswert"
                placeholder="z.B. 450.000" 
                value={formData.verkehrswert}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Besonderheiten / Mängel (boG)</Label>
              <Textarea 
                name="besonderheiten"
                placeholder="z.B. Feuchtigkeit im Keller, Leitungsrecht..." 
                className="h-24 resize-none"
                value={formData.besonderheiten}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={generatePDF} 
            disabled={isGenerating || !formData.objektart || !formData.verkehrswert}
            className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto"
          >
            {isGenerating ? (
              <>Generiere Dokument...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Kurzgutachten als PDF exportieren
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

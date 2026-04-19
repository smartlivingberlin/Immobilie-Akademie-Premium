import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Loader2, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface DocumentGeneratorProps {
  title: string;
  description?: string; // Made optional
  templateType?: "maklervertrag" | "widerrufsbelehrung" | "reservierung" | "summary" | "einladung_etv" | "hausordnung"; // Added new types
  type?: "maklervertrag" | "widerrufsbelehrung" | "reservierung" | "summary" | "einladung_etv" | "hausordnung"; // Alias for templateType
  content?: string; // Optional content for summary generation
}

export function DocumentGenerator({ title, description = "Erstellen Sie ein professionelles Dokument.", templateType, type, content }: DocumentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  // Resolve alias
  const finalType = templateType || type || "summary";
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    propertyId: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    // For interactive forms (not summary), validate input
    if (finalType !== "summary" && (!formData.name || !formData.address)) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const { jsPDF: JsPDF } = await import("jspdf");
    const doc = new JsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text(title, 20, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Erstellt am: ${new Date().toLocaleDateString("de-DE")}`, 20, 30);
      
      // Add content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      let textContent = "";
      
      if (finalType === "summary" && content) {
        textContent = content;
      } else {
        // Generate content based on form data for other templates
        textContent = `
          Vollständiger Name: ${formData.name}
          Anschrift: ${formData.address}
          Objekt-Referenz: ${formData.propertyId}
          Datum: ${formData.date}
          
          Hiermit beauftrage ich, ${formData.name}, den Makler mit dem Nachweis oder der Vermittlung...
        `;
      }
      
      // Split text to fit page width
      const splitText = doc.splitTextToSize(textContent, 170);
      
      // Add text with pagination if needed
      let y = 40;
      const pageHeight = doc.internal.pageSize.height;
      
      splitText.forEach((line: string) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 20, y);
        y += 7;
      });
      
      // Save PDF
      doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
      
      toast({
        title: "Dokument erstellt",
        description: `Das Dokument "${title}" wurde erfolgreich generiert.`,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Fehler",
        description: "Das Dokument konnte nicht erstellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Render simplified button for summary mode
  if (finalType === "summary") {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2" 
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>{isGenerating ? "Erstelle..." : "PDF Zusammenfassung"}</span>
      </Button>
    );
  }

  // Render full card for interactive forms
  return (
    <Card className="w-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Vollständiger Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Max Mustermann" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Anschrift</Label>
            <Input 
              id="address" 
              name="address" 
              placeholder="Musterstraße 1, 12345 Berlin" 
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyId">Objekt-Referenz (Optional)</Label>
            <Input 
              id="propertyId" 
              name="propertyId" 
              placeholder="z.B. WHG-2024-01" 
              value={formData.propertyId}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Datum</Label>
            <Input 
              id="date" 
              name="date" 
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-500 mt-4">
          <div className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <FileText className="w-4 h-4" />
            Vorschau
          </div>
          <p>
            Hiermit beauftrage ich, <strong>{formData.name || "[Name]"}</strong>, den Makler mit dem Nachweis oder der Vermittlung...
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-slate-50/30 pt-4">
        <Button 
          className="w-full sm:w-auto gap-2 ml-auto" 
          onClick={handleGenerate} 
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Erstelle PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Dokument generieren (PDF)
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

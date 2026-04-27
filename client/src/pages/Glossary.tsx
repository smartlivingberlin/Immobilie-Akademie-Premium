import { useState, useEffect } from "react";
import { Link } from "wouter";

type GlossaryTerm = {
  id: number;
  term: string;
  definition: string;
  category: string;
  lawReference?: string;
  lawLink?: string;
};
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Filter, 
  ArrowLeft,
  Gavel,
  Scale
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [allTerms, setAllTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/glossar")
      .then(r => r.json())
      .then(d => { setAllTerms(d.terms || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(allTerms.map(t => t.category))).sort();
  const filteredTerms = allTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group terms by first letter for better readability
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 pl-0 hover:pl-2 transition-all text-slate-500 hover:text-slate-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </div>
</Link>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Wissensdatenbank
              </Badge>
              <span className="text-sm text-slate-500">{allTerms.length} Einträge</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Fachbegriffe & Gesetze
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl text-lg">
              Das umfassende Nachschlagewerk für Ihre Immobilienausbildung. 
              Finden Sie Definitionen, rechtliche Grundlagen und Erklärungen zu allen Fachbegriffen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Begriff suchen (z.B. 'Auflassung')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white h-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-white h-10">
                <Filter className="mr-2 h-4 w-4 text-slate-500" />
                <SelectValue placeholder="Kategorie filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedLetters.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">Keine Begriffe gefunden</h3>
            <p className="text-slate-500">
              Versuchen Sie es mit einem anderen Suchbegriff oder ändern Sie den Filter.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {setSearchQuery(""); setSelectedCategory("all");}}
            >
              Filter zurücksetzen
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedLetters.map((letter) => (
              <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6 sticky top-0 bg-slate-50/95 backdrop-blur py-4 z-10 border-b border-slate-200">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white text-2xl font-bold shadow-sm">
                    {letter}
                  </span>
                  <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedTerms[letter].map((term) => (
                    <div
                      key={term.term}
                      className="group flex flex-col p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                          {term.term}
                        </h4>
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 border-slate-200 shrink-0 ml-2">
                          {term.category}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                        {term.definition}
                      </p>
                      
                      {term.lawReference && (
                        <div className="mt-auto pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                              <Scale className="h-3.5 w-3.5 text-slate-500" />
                              § {term.lawReference}
                            </div>
                            
                            {term.lawLink && (
                              <a
                                href={term.lawLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
                              >
                                Gesetzestext <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Navigation for Letters */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-1 bg-white p-2 rounded-full shadow-lg border border-slate-200 max-h-[80vh] overflow-y-auto custom-scrollbar">
        {sortedLetters.map((letter) => (
          <a
            key={letter}
            href={`#section-${letter}`}
            className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-white hover:bg-blue-600 rounded-full transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>
    </div>
  );
}

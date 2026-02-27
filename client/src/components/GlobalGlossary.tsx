import { useState } from "react";
import { glossaryData, GlossaryTerm } from "@/data/glossary-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Search, ExternalLink, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GlobalGlossary() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(
    new Set(glossaryData.map((term) => term.category))
  ).sort();

  const filteredTerms = glossaryData.filter((term) => {
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 w-full justify-start">
          <BookOpen className="h-4 w-4" />
          <span>Fachbegriffe & Gesetze</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Immobilien-Lexikon & Gesetzesreferenz
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 py-4 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen Sie nach Begriffen (z.B. 'Auflassung', 'MaBV')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Kategorie" />
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

        <ScrollArea className="flex-1 pr-4">
          {sortedLetters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Keine Begriffe gefunden.
            </div>
          ) : (
            <div className="space-y-8 py-4">
              {sortedLetters.map((letter) => (
                <div key={letter} id={`section-${letter}`}>
                  <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2 sticky top-0 bg-background/95 backdrop-blur z-10">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedTerms[letter].map((term) => (
                      <div
                        key={term.term}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{term.term}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {term.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {term.definition}
                        </p>
                        {term.lawReference && (
                          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-dashed">
                            <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                              § {term.lawReference}
                            </span>
                            {term.lawLink && (
                              <a
                                href={term.lawLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1 ml-auto"
                              >
                                Gesetzestext öffnen <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

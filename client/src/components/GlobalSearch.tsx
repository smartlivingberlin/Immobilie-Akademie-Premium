import React, { useState, useEffect } from "react";
import { Search, ArrowRight, BookOpen, Gavel, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import Content Data
import { contentDataModule2 } from "@/pages/modules/Module2Detail";
// import { contentDataModule3 } from "@/pages/modules/Module3Detail"; // Assuming this is exported similarly
// Placeholder for other modules if not yet fully exported in same structure
// In a real scenario, we would import all module contents here.

// Mocking other modules for search demonstration if not fully available in context
const mockModule1 = {
  day_1: { title: "Einführung Immobilienwirtschaft", theory: "Grundlagen...", type: "Theorie" },
  // ...
};

interface GlobalSearchProps {
  collapsed?: boolean;
}

export function GlobalSearch({ collapsed = false }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Combine all content for search
  // In production, this should be optimized (e.g., index on build or server-side search)
  const allContent = [
    { module: 2, data: contentDataModule2 },
    // { module: 3, data: contentDataModule3 },
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: any[] = [];
    const lowerQuery = query.toLowerCase();

    allContent.forEach(({ module, data }) => {
      Object.entries(data).forEach(([key, content]: [string, any]) => {
        if (
          content.title?.toLowerCase().includes(lowerQuery) ||
          content.theory?.toLowerCase().includes(lowerQuery) ||
          content.extendedTheory?.toLowerCase().includes(lowerQuery) ||
          content.law?.some((l: string) => l.toLowerCase().includes(lowerQuery))
        ) {
          searchResults.push({
            module,
            day: key.split("_")[1],
            title: content.title,
            preview: content.theory.substring(0, 100) + "...",
            type: content.type || "Theorie"
          });
        }
      });
    });

    setResults(searchResults);
  }, [query]);

  if (collapsed) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-full h-10 bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
              Suche (⌘K)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[600px] top-[15%] translate-y-0">
          <DialogHeader>
            <DialogTitle>Globale Suche</DialogTitle>
          </DialogHeader>
          <div className="flex items-center border-b px-3 pb-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Suchen Sie nach Begriffen wie 'Widerruf', 'Grundbuch' oder 'Rendite'..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none shadow-none focus-visible:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <ScrollArea className="h-[400px] p-4">
            {results.length === 0 && query.length > 1 && (
              <div className="text-center py-12 text-muted-foreground">
                Keine Ergebnisse gefunden für "{query}".
              </div>
            )}
            {results.length === 0 && query.length <= 1 && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Geben Sie einen Suchbegriff ein, um alle Module zu durchsuchen.</p>
              </div>
            )}
            <div className="space-y-4">
              {results.map((result, idx) => (
                <Link 
                  key={idx} 
                  href={`/modul/${result.module}/tag/${result.day}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {result.type === "Recht" ? <Gavel className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          Modul {result.module} • Tag {result.day}
                        </span>
                        <span className="text-xs text-slate-400 ml-auto">
                          {result.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {result.preview}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 self-center group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground bg-background/50 backdrop-blur-sm border-slate-200 hover:bg-background/80 transition-all">
          <Search className="mr-2 h-4 w-4" />
          <span>Suche im Lehrplan...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto opacity-50">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] top-[15%] translate-y-0">
        <DialogHeader>
          <DialogTitle>Globale Suche</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-3 pb-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Suchen Sie nach Begriffen wie 'Widerruf', 'Grundbuch' oder 'Rendite'..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none shadow-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <ScrollArea className="h-[400px] p-4">
          {results.length === 0 && query.length > 1 && (
            <div className="text-center py-12 text-muted-foreground">
              Keine Ergebnisse gefunden für "{query}".
            </div>
          )}
          {results.length === 0 && query.length <= 1 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Geben Sie einen Suchbegriff ein, um alle Module zu durchsuchen.</p>
            </div>
          )}
          <div className="space-y-4">
            {results.map((result, idx) => (
              <Link 
                key={idx} 
                href={`/modul/${result.module}/tag/${result.day}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {result.type === "Recht" ? <Gavel className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        Modul {result.module} • Tag {result.day}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto">
                        {result.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {result.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {result.preview}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 self-center group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

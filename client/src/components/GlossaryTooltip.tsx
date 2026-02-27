import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { glossaryData } from "@/data/glossary-data";

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
}

export function GlossaryTooltip({ term, children, className = "" }: GlossaryTooltipProps) {
  // Find the glossary entry
  const entry = glossaryData.find(
    (item) => item.term.toLowerCase() === term.toLowerCase()
  );

  if (!entry) {
    // If no glossary entry found, just return the children or term
    return <span className={className}>{children || term}</span>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 cursor-help border-b border-dashed border-blue-400 text-blue-700 hover:text-blue-900 hover:border-blue-600 transition-colors ${className}`}
          >
            {children || term}
            <HelpCircle className="w-3 h-3 inline" />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-sm p-4 bg-white border border-slate-200 shadow-xl"
        >
          <div>
            <h4 className="font-bold text-slate-900 mb-1">{entry.term}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {entry.definition}
            </p>
            {entry.lawReference && (
              <p className="text-xs text-slate-500 mt-2">
                <strong>Rechtsgrundlage:</strong> {entry.lawReference}
              </p>
            )}
            {entry.category && (
              <div className="mt-2 pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Kategorie: {entry.category}
                </p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Auto-link glossary terms in text
 * Usage: <GlossaryText text="Die Maklercourtage ist eine Provision..." />
 */
interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className = "" }: GlossaryTextProps) {
  // Get all glossary terms sorted by length (longest first to avoid partial matches)
  const terms = glossaryData
    .map((item) => item.term)
    .sort((a, b) => b.length - a.length);

  // Split text into parts and identify glossary terms
  let parts: Array<{ text: string; isTerm: boolean; term?: string }> = [
    { text, isTerm: false },
  ];

  for (const term of terms) {
    const newParts: typeof parts = [];

    for (const part of parts) {
      if (part.isTerm) {
        // Already a term, don't process further
        newParts.push(part);
        continue;
      }

      // Split by term (case-insensitive)
      const regex = new RegExp(`\\b(${term})\\b`, "gi");
      const matchesArray = Array.from(part.text.matchAll(regex));
      let lastIndex = 0;
      let foundMatch = false;

      for (const match of matchesArray) {
        foundMatch = true;
        const matchIndex = match.index!;

        // Add text before match
        if (matchIndex > lastIndex) {
          newParts.push({
            text: part.text.slice(lastIndex, matchIndex),
            isTerm: false,
          });
        }

        // Add the matched term
        newParts.push({
          text: match[0],
          isTerm: true,
          term: term,
        });

        lastIndex = matchIndex + match[0].length;
      }

      // Add remaining text
      if (lastIndex < part.text.length) {
        newParts.push({
          text: part.text.slice(lastIndex),
          isTerm: false,
        });
      }

      // If no matches found, keep the original part
      if (!foundMatch) {
        newParts.push(part);
      }
    }

    parts = newParts;
  }

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.isTerm && part.term ? (
          <GlossaryTooltip key={index} term={part.term}>
            {part.text}
          </GlossaryTooltip>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </span>
  );
}

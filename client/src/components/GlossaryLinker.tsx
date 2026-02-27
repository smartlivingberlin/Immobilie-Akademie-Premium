import React, { useMemo } from 'react';
import { Link } from 'wouter';
import { glossaryData, GlossaryTerm } from '@/data/glossary-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen } from 'lucide-react';

interface GlossaryLinkerProps {
  children: string;
  className?: string;
}

/**
 * GlossaryLinker Component
 * 
 * Automatically detects glossary terms in text content and converts them into
 * interactive links with tooltip definitions.
 * 
 * Features:
 * - Intelligent word boundary detection
 * - Case-insensitive matching
 * - Tooltip with definition on hover
 * - Link to full glossary entry
 * - Performance optimized with useMemo
 * - Handles compound terms (e.g., "Wohnungseigentümergemeinschaft")
 */
export function GlossaryLinker({ children, className = '' }: GlossaryLinkerProps) {
  const linkedContent = useMemo(() => {
    if (!children || typeof children !== 'string') {
      return children;
    }

    // Sort terms by length (longest first) to match compound terms before shorter ones
    const sortedTerms = [...glossaryData].sort((a, b) => b.term.length - a.term.length);

    // Create a map for quick lookup
    const termMap = new Map<string, GlossaryTerm>();
    sortedTerms.forEach(term => {
      termMap.set(term.term.toLowerCase(), term);
    });

    // Build regex pattern with word boundaries
    // Escape special regex characters in terms
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = sortedTerms
      .map(term => `\\b${escapeRegex(term.term)}\\b`)
      .join('|');
    
    const regex = new RegExp(pattern, 'gi');

    // Track which terms have already been linked to avoid duplicates
    const linkedTerms = new Set<string>();

    // Split content and replace matches
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = regex.exec(children)) !== null) {
      const matchedText = match[0];
      const matchedTermLower = matchedText.toLowerCase();
      
      // Skip if this term was already linked
      if (linkedTerms.has(matchedTermLower)) {
        continue;
      }

      const term = termMap.get(matchedTermLower);
      if (!term) continue;

      // Add text before match
      if (match.index > lastIndex) {
        parts.push(children.substring(lastIndex, match.index));
      }

      // Add linked term with tooltip
      parts.push(
        <TooltipProvider key={`tooltip-${keyCounter++}`}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Link 
                href="/glossary" 
                className="text-blue-600 hover:text-blue-800 underline decoration-dotted underline-offset-2 cursor-help transition-colors"
              >
                {matchedText}
              </Link>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-sm p-4 bg-slate-900 text-white shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-blue-300">
                  <BookOpen className="h-4 w-4" />
                  {term.term}
                </div>
                <p className="text-sm leading-relaxed">{term.definition}</p>
                {term.lawReference && (
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
                    Rechtsgrundlage: {term.lawReference}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      linkedTerms.add(matchedTermLower);
      lastIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (lastIndex < children.length) {
      parts.push(children.substring(lastIndex));
    }

    return parts.length > 0 ? parts : children;
  }, [children]);

  return <span className={className}>{linkedContent}</span>;
}

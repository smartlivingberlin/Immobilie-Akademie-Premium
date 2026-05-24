import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlossaryLinker } from './GlossaryLinker';

interface SmartContentProps {
  content?: string; // Made optional to support context prop
  topic?: string;
  context?: string;
  level?: string;
}

// Function to process text and inject smart elements
const processText = (text: string) => {
  if (!text) return null;

  // 1. Identify Laws (e.g., "§ 34c GewO", "§ 556 BGB")
  // Regex looks for § followed by numbers/letters and then a law abbreviation
  const lawRegex = /(§+\s*\d+[a-z]*\s*(?:Abs\.\s*\d+\s*)?(?:Satz\s*\d+\s*)?(?:Nr\.\s*\d+\s*)?[A-Za-zäöüÄÖÜ]+)/g;
  const lawRegexTest = /§+\s*\d+[a-z]*\s*(?:Abs\.\s*\d+\s*)?(?:Satz\s*\d+\s*)?(?:Nr\.\s*\d+\s*)?[A-Za-zäöüÄÖÜ]+/;
  
  // Split by laws first
  const parts = text.split(lawRegex);
  
  return parts.map((part, index) => {
    // Check if this part is a law match
    if (lawRegexTest.test(part)) {
      const cleanLaw = part.replace(/§+/g, '').trim();
      // Simple heuristic for law links (this could be refined with a real law API or mapping)
      // Defaulting to gesetze-im-internet search or direct link structure
      const lawQuery = encodeURIComponent(cleanLaw);
      const lawLink = `https://www.gesetze-im-internet.de/cgi-bin/portal.pl?query=${lawQuery}&w=1`;
      
      return (
        <a 
          key={index} 
          href={lawLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 font-medium bg-blue-50 px-1 rounded transition-colors"
          title="Gesetzestext öffnen"
        >
          {part} <ExternalLink className="h-3 w-3" />
        </a>
      );
    }

    // 2. Apply GlossaryLinker to non-law text parts
    return <GlossaryLinker key={index}>{part}</GlossaryLinker>;
  });
};

export const SmartContent: React.FC<SmartContentProps> = ({ content, topic, context, level }) => {
  // If context/topic is provided, render the AI summary card style
  if (topic && context) {
    return (
      <Card className="bg-slate-50 border-slate-200 mt-6 overflow-hidden">
        <CardHeader className="bg-slate-100/50 border-b border-slate-100 pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Smart Context: {topic}
            </CardTitle>
            {level && (
              <Badge variant="outline" className="bg-white text-slate-500 text-xs font-normal">
                {level === 'basic' ? 'Grundlagen' : level === 'intermediate' ? 'Fortgeschritten' : 'Experte'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 text-sm text-slate-600 leading-relaxed">
          <p className="italic text-slate-500 mb-2 text-xs uppercase tracking-wider">Automatische Zusammenfassung</p>
          {processText(context)}
        </CardContent>
      </Card>
    );
  }

  // Otherwise render standard markdown with smart processing
  if (!content) return null;

  return (
    <ReactMarkdown
      components={{
        p: ({children}) => (
          <p className="mb-4 leading-relaxed">
            {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </p>
        ),
        li: ({children}) => (
          <li>
             {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </li>
        ),
        // Add support for headings, blockquotes, etc.
        h1: ({children}) => (
          <h1 className="text-2xl font-bold mb-4 mt-6">
            {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </h1>
        ),
        h2: ({children}) => (
          <h2 className="text-xl font-bold mb-3 mt-5">
            {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </h2>
        ),
        h3: ({children}) => (
          <h3 className="text-lg font-semibold mb-2 mt-4">
            {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </h3>
        ),
        strong: ({children}) => (
          <strong className="font-semibold">
            {React.Children.map(children, child => {
              if (typeof child === 'string') {
                return processText(child);
              }
              return child;
            })}
          </strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

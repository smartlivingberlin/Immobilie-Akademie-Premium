import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

interface SolutionTogglerProps {
  title?: string;
  children?: React.ReactNode;
  solution?: string;
  className?: string;
}

export function SolutionToggler({ 
  title = "Lösung anzeigen", 
  children, 
  solution,
  className 
}: SolutionTogglerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("mt-4 border rounded-lg overflow-hidden shadow-sm bg-white", className)}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 h-auto font-medium hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-slate-700">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </Button>
      
      {isOpen && (
        <div className="p-5 bg-green-50/50 border-t border-green-100 animate-in slide-in-from-top-2 duration-200">
          <div className="prose prose-sm max-w-none prose-slate">
            {solution ? (
              <ReactMarkdown>{solution}</ReactMarkdown>
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </div>
  );
}

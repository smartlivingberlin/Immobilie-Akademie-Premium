import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FullscreenContentProps {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  triggerButton?: React.ReactNode;
}

/**
 * FullscreenContent Component
 * 
 * Provides a TRUE fullscreen experience for content viewing:
 * - Opens in actual fullscreen (100vw x 100vh)
 * - No horizontal scrolling
 * - Optimized text width for readability
 * - Proper spacing and margins
 * - Vertical scrolling only
 */
export function FullscreenContent({ title, content, icon, triggerButton }: FullscreenContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Prevent body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Default trigger button if none provided
  const defaultTrigger = (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleOpen}
      className="gap-2"
    >
      <Maximize2 className="h-4 w-4" />
      Vollbild
    </Button>
  );

  if (!isOpen) {
    return triggerButton ? (
      <div onClick={handleOpen}>
        {triggerButton}
      </div>
    ) : defaultTrigger;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      {/* Header Bar - Fixed at top */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-emerald-600">{icon}</div>}
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
            Schließen
          </Button>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="prose prose-lg prose-slate max-w-none">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FullscreenTrigger Component
 * 
 * A reusable trigger button that can be placed anywhere
 */
interface FullscreenTriggerProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export function FullscreenTrigger({ onClick, className = "", label = "Vollbild" }: FullscreenTriggerProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={`gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 ${className}`}
    >
      <Maximize2 className="h-4 w-4" />
      {label}
    </Button>
  );
}

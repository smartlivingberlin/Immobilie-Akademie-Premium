import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
}

export function BackButton({ label = "Zurück", fallbackHref = "/" }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to provided href or home
      setLocation(fallbackHref);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="mb-4 text-slate-600 hover:text-slate-900 -ml-2"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}

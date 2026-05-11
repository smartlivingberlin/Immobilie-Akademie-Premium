import { useState, useEffect, ReactNode } from "react";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface LoadingHandlerProps {
  isLoading: boolean;
  error?: Error | string | null;
  skeleton: ReactNode;
  children: ReactNode;
  onRetry?: () => void;
  timeoutMs?: number;
}

export function LoadingHandler({
  isLoading,
  error,
  skeleton,
  children,
  onRetry,
  timeoutMs = 10000,
}: LoadingHandlerProps) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setTimedOut(true);
      }, timeoutMs);
    } else {
      setTimedOut(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading, timeoutMs]);

  if (error || timedOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {timedOut ? "Ladezeit überschritten" : "Fehler beim Laden"}
          </AlertTitle>
          <AlertDescription>
            {timedOut
              ? "Die Daten konnten nicht rechtzeitig geladen werden. Bitte prüfen Sie Ihre Internetverbindung."
              : "Es ist ein unerwarteter Fehler aufgetreten."}
          </AlertDescription>
        </Alert>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Erneut versuchen
          </Button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return <>{skeleton}</>;
  }

  return <>{children}</>;
}

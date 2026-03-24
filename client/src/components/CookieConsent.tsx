import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_PREFERENCES_KEY = "cookie-preferences";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Auf Login-Seite keinen Banner zeigen
    if (window.location.pathname === '/login') return;
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Apply preferences (e.g., initialize analytics if enabled)
    if (prefs.analytics) {
      // Initialize analytics here (e.g., Umami)
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
        <Card className="max-w-4xl mx-auto shadow-2xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <CardTitle className="text-xl">Cookie-Einstellungen</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Nutzung unseres 
              Lernportals zu ermöglichen. Notwendige Cookies sind für die Grundfunktionen der Website erforderlich 
              (z.B. Speicherung Ihres Lernfortschritts). Optionale Cookies helfen uns, die Nutzung zu analysieren 
              und das Angebot zu verbessern. Sie können Ihre Einstellungen jederzeit ändern.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Weitere Informationen finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
            <Button
              variant="outline"
              onClick={() => setShowSettings(true)}
              className="w-full sm:w-auto"
            >
              <Settings className="w-4 h-4 mr-2" />
              Einstellungen
            </Button>
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="w-full sm:w-auto"
            >
              Nur Notwendige
            </Button>
            <Button
              onClick={acceptAll}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Alle akzeptieren
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cookie-Einstellungen</DialogTitle>
            <DialogDescription>
              Verwalten Sie Ihre Cookie-Präferenzen. Sie können Ihre Einstellungen jederzeit ändern.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <Label className="text-base font-semibold">Notwendige Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht 
                    deaktiviert werden. Sie speichern z.B. Ihren Lernfortschritt, Ihre Login-Daten und 
                    Ihre Cookie-Präferenzen.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Beispiele:</strong> Sitzungs-ID, Lernfortschritt, Spracheinstellungen
                  </p>
                </div>
                <Switch
                  checked={true}
                  disabled={true}
                  className="ml-4 flex-shrink-0"
                />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <Label className="text-base font-semibold">Analyse-Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren. 
                    Wir verwenden Umami Analytics, eine datenschutzfreundliche Lösung, die keine 
                    personenbezogenen Daten erfasst und keine Cookies setzt.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Beispiele:</strong> Seitenaufrufe, Verweildauer, Herkunftsland (anonymisiert)
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                  className="ml-4 flex-shrink-0"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <Label className="text-base font-semibold">Marketing-Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Diese Cookies werden verwendet, um Ihnen relevante Werbung und Angebote anzuzeigen. 
                    Sie können auch verwendet werden, um die Effektivität von Werbekampagnen zu messen.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Beispiele:</strong> Werbe-IDs, Conversion-Tracking, Retargeting
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked })
                  }
                  className="ml-4 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="w-full sm:w-auto"
            >
              Abbrechen
            </Button>
            <Button
              onClick={saveCustomPreferences}
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Einstellungen speichern
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-4">
            Sie können Ihre Einstellungen jederzeit über den Footer ändern.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Export helper functions to check consent status
export function hasAnalyticsConsent(): boolean {
  const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!preferences) return false;
  const prefs: CookiePreferences = JSON.parse(preferences);
  return prefs.analytics;
}

export function hasMarketingConsent(): boolean {
  const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!preferences) return false;
  const prefs: CookiePreferences = JSON.parse(preferences);
  return prefs.marketing;
}

export function resetCookieConsent(): void {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  localStorage.removeItem(COOKIE_PREFERENCES_KEY);
  window.location.reload();
}

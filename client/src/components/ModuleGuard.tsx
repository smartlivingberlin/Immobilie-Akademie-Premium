/**
 * ModuleGuard.tsx
 * ────────────────────────────────────────────────────────────────────────────
 * Schützt Modul-Routen auf der Frontend-Seite.
 *
 * Logik:
 *  1. Nicht eingeloggt → Login-Seite
 *  2. Admin-Rolle → immer Zugriff (kein Guard nötig)
 *  3. Modul 1 → immer frei (kein Kauf nötig)
 *  4. Module 2–5 → nur wenn enabledModules des Users dieses Modul enthält
 *  5. Kein Zugriff → Weiterleitung zu /kurse mit Hinweis
 *
 * Einbindung in App.tsx:
 *   <ModuleGuard moduleId={2}><Module2Detail /></ModuleGuard>
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { Redirect } from "wouter";

interface ModuleGuardProps {
  moduleId: number;
  children: React.ReactNode;
}

export default function ModuleGuard({ moduleId, children }: ModuleGuardProps) {
  const { user, loading } = useAuth();

  // Ladeanimation während Auth-Status geprüft wird
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
          <p className="text-slate-500 text-sm">Zugriff wird geprüft...</p>
        </div>
      </div>
    );
  }

  // Nicht eingeloggt → zum Login
  if (!user) {
    return <Redirect to="/api/oauth/login" />;
  }

  // Admin und Trainer → immer Zugriff
  if (user.role === "admin" || user.role === "trainer") {
    return <>{children}</>;
  }

  // Modul 1 ist immer kostenlos zugänglich
  if (moduleId === 1) {
    return <>{children}</>;
  }

  // enabledModules aus dem User-Objekt lesen
  // Format in DB: "1,2,3" → Array [1, 2, 3]
  const rawModules = (user as any).enabledModules ?? "1";
  const enabledModules: number[] = String(rawModules)
    .split(",")
    .map((s: string) => parseInt(s.trim(), 10))
    .filter((n: number) => !isNaN(n));

  // Zugriff erlaubt?
  if (enabledModules.includes(moduleId)) {
    return <>{children}</>;
  }

  // Kein Zugriff → zu Kurse-Seite mit Info
  return <Redirect to={`/kurse?gesperrt=${moduleId}`} />;
}

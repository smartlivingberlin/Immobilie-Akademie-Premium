/**
 * useActivityHeartbeat.ts
 *
 * React-Hook der alle 60 Sekunden ein Aktivitätssignal an den Server sendet,
 * solange der Nutzer eine Lerneinheit geöffnet hat.
 *
 * Zweck: AZAV-Anwesenheitsnachweis – nur aktive Lernzeit wird gezählt.
 * Der Hook pausiert automatisch wenn das Tab inaktiv ist.
 */

import { useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";

const HEARTBEAT_INTERVAL_MS = 60_000; // 60 Sekunden
const INACTIVITY_THRESHOLD_MS = 90_000; // 90 Sek Inaktivität → Heartbeat pausieren

interface UseActivityHeartbeatOptions {
  moduleId: number;
  dayId: number;
  enabled?: boolean; // Kann deaktiviert werden (z.B. auf Quiz-Seiten)
}

export function useActivityHeartbeat({
  moduleId,
  dayId,
  enabled = true,
}: UseActivityHeartbeatOptions) {
  const heartbeatMutation = trpc.azav.heartbeat.useMutation();
  const openDayMutation = trpc.azav.openDay.useMutation();
  const closeDayMutation = trpc.azav.closeDay.useMutation();

  const logIdRef = useRef<number | null>(null);
  const openedAtRef = useRef<Date | null>(null);
  const lastActivityRef = useRef<Date>(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Nutzeraktivität tracken
  const updateActivity = useCallback(() => {
    lastActivityRef.current = new Date();
  }, []);

  // Lerneinheit öffnen
  const openLog = useCallback(async () => {
    if (!enabled) return;
    try {
      const result = await openDayMutation.mutateAsync({ moduleId, dayId });
      logIdRef.current = result.logId;
      openedAtRef.current = new Date();
    } catch {
      // Kein kritischer Fehler – localStorage bleibt als Fallback
    }
  }, [moduleId, dayId, enabled]);

  // Lerneinheit schließen
  const closeLog = useCallback(async (completed = false) => {
    if (!logIdRef.current || !openedAtRef.current) return;
    const durationSeconds = Math.floor(
      (Date.now() - openedAtRef.current.getTime()) / 1000
    );
    try {
      await closeDayMutation.mutateAsync({
        logId: logIdRef.current,
        durationSeconds,
        completed,
      });
    } catch {
      // Fehler ignorieren – Client kann offline sein
    }
    logIdRef.current = null;
    openedAtRef.current = null;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Beim Mounten: Log öffnen
    openLog();

    // Aktivitäts-Events tracken
    const activityEvents = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    activityEvents.forEach(evt => window.addEventListener(evt, updateActivity, { passive: true }));

    // Heartbeat-Intervall starten
    intervalRef.current = setInterval(() => {
      const msSinceActivity = Date.now() - lastActivityRef.current.getTime();
      if (msSinceActivity > INACTIVITY_THRESHOLD_MS) {
        // Nutzer inaktiv – kein Heartbeat senden
        return;
      }
      heartbeatMutation.mutate({ moduleId, dayId });
    }, HEARTBEAT_INTERVAL_MS);

    // Beim Verlassen: Log schließen
    const handleBeforeUnload = () => closeLog();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup
      activityEvents.forEach(evt => window.removeEventListener(evt, updateActivity));
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (intervalRef.current) clearInterval(intervalRef.current);
      closeLog();
    };
  }, [moduleId, dayId, enabled]);

  /** Manuell als abgeschlossen markieren (z.B. nach Aufgabe) */
  const markCompleted = useCallback(() => {
    closeLog(true);
  }, [closeLog]);

  return { markCompleted };
}

/**
 * Server-seitiger Lernfortschritt Hook
 * Schreibt in MySQL learning_logs + localStorage als Cache
 */
import { trpc } from "@/lib/trpc";
import { getProgress, markDayCompleted } from "@/lib/progressTracking";

export function useServerProgress() {
  const { data: serverLogs, refetch } = trpc.progress.getProgress.useQuery();

  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayMutation = trpc.progress.completeDay.useMutation();

  const startDay = async (moduleId: number, dayId: number) => {
    try {
      const result = await startDayMutation.mutateAsync({ moduleId, dayId });
      return result.logId;
    } catch (e) {
      console.warn("[Progress] Server nicht erreichbar, nur localStorage", e);
      return null;
    }
  };

  const completeDay = async (
    moduleId: number,
    dayId: number,
    logId: number | null,
    durationSeconds: number,
    heartbeatCount: number
  ) => {
    // Immer localStorage aktualisieren
    markDayCompleted(moduleId, dayId, Math.round(durationSeconds / 60));

    // Server wenn logId vorhanden
    if (logId) {
      try {
        await completeDayMutation.mutateAsync({ logId, durationSeconds, heartbeatCount });
        refetch();
      } catch (e) {
        console.warn("[Progress] Server-Update fehlgeschlagen", e);
      }
    }
  };

  // Fortschritt aus Server + localStorage zusammenführen
  const getCompletedDays = (moduleId: number): number[] => {
    const serverCompleted = (serverLogs ?? [])
      .filter(l => l.moduleId === moduleId && l.completed)
      .map(l => l.dayId);

    const localProgress = getProgress();
    const localCompleted = Object.entries(localProgress.modules[moduleId]?.days ?? {})
      .filter(([, d]) => d.completed)
      .map(([id]) => Number(id));

    return [...new Set([...serverCompleted, ...localCompleted])];
  };

  return { startDay, completeDay, getCompletedDays, serverLogs };
}

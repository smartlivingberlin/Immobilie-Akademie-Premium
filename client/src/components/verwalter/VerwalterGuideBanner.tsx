import { useState } from "react";
import { Link } from "wouter";
import { Lightbulb, X } from "lucide-react";
import { getGuideForPath } from "@shared/verwalterGuideSteps";

export function VerwalterGuideBanner({ path }: { path: string }) {
  const guide = getGuideForPath(path);
  const storageKey = guide ? `verwalter-guide-dismiss-${guide.id}` : "";
  const [dismissed, setDismissed] = useState(() => {
    if (!storageKey) return true;
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  if (!guide || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="border-b border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-900 dark:bg-emerald-950/40 sm:px-4">
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{guide.titel}</p>
          <p className="text-xs text-emerald-800/90 dark:text-emerald-200/90 sm:text-sm">{guide.text}</p>
          {guide.aktion &&
            (guide.aktion.href === "#assistent" ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("verwalter-assistent-open"))}
                className="mt-1 text-xs font-medium text-emerald-700 underline dark:text-emerald-300"
              >
                {guide.aktion.label} →
              </button>
            ) : (
              <Link href={guide.aktion.href}>
                <a className="mt-1 inline-block text-xs font-medium text-emerald-700 underline dark:text-emerald-300">
                  {guide.aktion.label} →
                </a>
              </Link>
            ))}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded p-1 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300"
          aria-label="Hinweis schließen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

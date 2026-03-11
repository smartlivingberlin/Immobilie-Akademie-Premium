/**
 * Service Worker Registration
 * Enables offline functionality and PWA capabilities
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        // Alte SWs unregistrieren — verhindert stale cache
        const existingRegs = await navigator.serviceWorker.getRegistrations();
        for (const reg of existingRegs) { await reg.unregister(); }
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });
        // Sofort auf neue Version wechseln ohne Nutzerbestätigung
        registration.update();

        console.log('[SW] Service Worker registered successfully:', registration.scope);

        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('[SW] New version available! Please refresh.');
              
              // Show update notification to user
              // Automatisch aktualisieren ohne Nutzerbestätigung
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          });
        });

        // Handle controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[SW] Controller changed, reloading page');
          window.location.reload();
        });

      } catch (error) {
        console.error('[SW] Service Worker registration failed:', error);
      }
    });
  } else {
    console.warn('[SW] Service Workers are not supported in this browser');
  }
}

/**
 * Unregister Service Worker (for development/debugging)
 */
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('[SW] Service Worker unregistered');
    }
  }
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Check if app is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Add online/offline event listeners
 */
export function addConnectivityListeners(
  onOnline: () => void,
  onOffline: () => void
) {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

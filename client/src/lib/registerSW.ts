// Immobilien Akademie Smart — SW Registration

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker nicht unterstützt');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none', // Immer auf Updates prüfen
      });

      console.log('[SW] Registriert, Scope:', registration.scope);

      // Update-Erkennung
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] Update verfügbar — wird beim nächsten Laden aktiv');
          }
        });
      });

      // Sofort auf Updates prüfen
      registration.update();

    } catch (error) {
      console.error('[SW] Registrierung fehlgeschlagen:', error);
    }
  });
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister());
    });
  }
}

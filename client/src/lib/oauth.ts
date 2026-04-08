// OAuth Google Login — BEREIT für Aktivierung
// Einrichten: console.cloud.google.com → Neue App → OAuth 2.0 Client ID
//
// Aktivierung in 3 Schritten:
// 1. Google Cloud Console: OAuth Client ID erstellen
//    → Authorized origins: https://immobilien-akademie-smart.de
//    → Authorized redirect URIs: https://immobilien-akademie-smart.de/auth/google/callback
// 2. In Railway setzen:
//    GOOGLE_CLIENT_ID=xxx
//    GOOGLE_CLIENT_SECRET=xxx
//    VITE_GOOGLE_CLIENT_ID=xxx
// 3. In LoginPage.tsx den Button einkommentieren

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export function isOAuthEnabled(): boolean {
  return !!GOOGLE_CLIENT_ID;
}

// Google OAuth URL generieren
export function getGoogleOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

// Google Login Button — sofort einsetzbar
export function handleGoogleLogin() {
  if (!isOAuthEnabled()) {
    console.warn("[OAuth] VITE_GOOGLE_CLIENT_ID nicht gesetzt");
    return;
  }
  window.location.href = getGoogleOAuthUrl();
}

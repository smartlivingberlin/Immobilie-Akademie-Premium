export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Login-URL: Manus OAuth wenn konfiguriert, sonst lokale Login-Seite
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  // Manus OAuth: nur wenn beide Variablen gesetzt sind
  if (oauthPortalUrl && appId) {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  }

  // Lokale Login-Seite (universell)
  return "/login";
};

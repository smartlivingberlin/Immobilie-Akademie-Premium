/** Sichere Weiterleitung nach Login — nur interne Pfade erlaubt. */
export function resolvePostLoginRedirect(
  fallback = "/modul/1",
  search = typeof window !== "undefined" ? window.location.search : "",
): string {
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect")?.trim();
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return fallback;
  }
  return redirect;
}

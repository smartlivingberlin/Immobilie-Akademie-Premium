export function isVerwalterPortal(): boolean {
  if (typeof window !== "undefined" && (window as any).__PORTAL_MODE__) {
    return (window as any).__PORTAL_MODE__ === "verwalter";
  }
  return import.meta.env.VITE_PORTAL_MODE === "verwalter";
}

export function applyPortalMetaTags(): void {
  if (isVerwalterPortal()) {
    const appleTitle = document.querySelector(
      'meta[name="apple-mobile-web-app-title"]',
    );
    if (appleTitle) {
      appleTitle.setAttribute("content", "Verwalter-Suite");
    }
    document.title = "Verwalter-Suite";
  }
}

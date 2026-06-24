export function isVerwalterPortal(): boolean {
  if (typeof window !== "undefined" && (window as any).__PORTAL_MODE__) {
    return (window as any).__PORTAL_MODE__ === "verwalter";
  }
  return import.meta.env.VITE_PORTAL_MODE === "verwalter";
}

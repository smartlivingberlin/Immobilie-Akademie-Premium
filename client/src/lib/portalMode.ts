export function isVerwalterPortal(): boolean {
  return import.meta.env.VITE_PORTAL_MODE === "verwalter";
}

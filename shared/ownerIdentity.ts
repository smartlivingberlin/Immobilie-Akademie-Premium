/** Platform owner identity — single source for Owner API + UI gates. */

const DEFAULT_OWNER_EMAIL = "alisadgadyri38@gmail.com";

export function resolveOwnerOpenId(opts?: {
  ownerOpenId?: string | null;
  ownerEmail?: string | null;
}): string {
  const explicit = opts?.ownerOpenId?.trim();
  if (explicit) return explicit;
  const email = (opts?.ownerEmail?.trim() || DEFAULT_OWNER_EMAIL).toLowerCase();
  return `local:${email}`;
}

export function isPlatformOwnerOpenId(
  openId: string | null | undefined,
  opts?: { ownerOpenId?: string | null; ownerEmail?: string | null },
): boolean {
  if (!openId) return false;
  return openId === resolveOwnerOpenId(opts);
}

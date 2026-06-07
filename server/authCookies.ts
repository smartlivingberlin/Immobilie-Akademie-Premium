import type { Request, Response } from "express";
import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";

type CookieResponse = Pick<Response, "clearCookie">;

function baseClearOpts(req: Request) {
  const cookieOptions = getSessionCookieOptions(req);
  return {
    path: "/",
    sameSite: cookieOptions.sameSite,
    secure: cookieOptions.secure,
    httpOnly: true,
  } as const;
}

/** Clears inspect preview cookies (server-side). */
export function clearInspectCookies(req: Request, res: CookieResponse): void {
  const opts = baseClearOpts(req);
  res.clearCookie("inspect_mode", opts);
  res.clearCookie("inspect_mode_expires_at", opts);
}

/** Clears owner 2FA and tester auxiliary cookies. */
export function clearAuxAuthCookies(req: Request, res: CookieResponse): void {
  const opts = baseClearOpts(req);
  res.clearCookie("owner_2fa_ok", opts);
  res.clearCookie("tester_expires", opts);
}

/** Clears the main session JWT cookie. */
export function clearSessionCookie(req: Request, res: CookieResponse): void {
  const cookieOptions = getSessionCookieOptions(req);
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
}

/**
 * Full logout: session + inspect + owner 2FA + tester.
 * Prevents mixed modes (inspect + owner + normal login) in one browser.
 */
export function clearAllAuthCookies(req: Request, res: CookieResponse): void {
  clearSessionCookie(req, res);
  clearInspectCookies(req, res);
  clearAuxAuthCookies(req, res);
}

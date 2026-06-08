import type { Request } from "express";
import { ENV } from "./_core/env";

export type AccessCodeRedeemResult =
  | { success: true; enabledModules: string; tenantId: number | null }
  | { success: false; message: string };

type AccessCodeRow = {
  id: number;
  code: string;
  modules: string;
  max_uses: number;
  used_count: number;
  is_active: boolean | number;
  created_by_user_id: number | null;
};

export async function getOptionalUserIdFromRequest(req: Request): Promise<number | null> {
  try {
    const { parse: parseCookie } = await import("cookie");
    const rawCookies = parseCookie(req.headers.cookie ?? "");
    const token =
      rawCookies["app_session_id"] || rawCookies["session"] || rawCookies["auth_token"];
    if (!token) return null;

    const { jwtVerify } = await import("jose");
    const secret = new TextEncoder().encode(ENV.cookieSecret || "");
    if (!ENV.cookieSecret) return null;

    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    const openId = payload.openId as string | undefined;
    if (!openId) return null;

    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    return user?.id ?? null;
  } catch {
    return null;
  }
}

async function findActiveAccessCode(
  db: { $client: { query: Function } },
  code: string,
): Promise<AccessCodeRow | null> {
  const [rows] = (await db.$client.query(
    `SELECT id, code, modules, max_uses, used_count, is_active, created_by_user_id
     FROM access_codes
     WHERE code = ? AND is_active = 1
     LIMIT 1`,
    [code],
  )) as [AccessCodeRow[], unknown];
  return rows[0] ?? null;
}

export async function redeemAccessCodeForUser(
  userId: number,
  code: string,
): Promise<AccessCodeRedeemResult> {
  const { getDb, assignUserToTenant } = await import("./db");
  const db = await getDb();
  const normalized = code.trim().toUpperCase();
  const row = await findActiveAccessCode(db, normalized);
  if (!row) return { success: false, message: "Code nicht gefunden oder deaktiviert" };

  const maxUses = Number(row.max_uses ?? 1);
  const usedCount = Number(row.used_count ?? 0);
  if (maxUses > 0 && usedCount >= maxUses) {
    return { success: false, message: "Maximale Nutzungsanzahl erreicht" };
  }

  const rawModules = String(row.modules ?? "").trim();
  if (!rawModules) return { success: false, message: "Dieser Code hat keine Module hinterlegt" };

  const codeModules = rawModules
    .split(",")
    .map((x) => parseInt(x.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!codeModules.length) {
    return { success: false, message: "Dieser Code enthält keine gültigen Modul-Nummern" };
  }

  const [userRows] = (await db.$client.query(
    "SELECT enabledModules, tenantId FROM users WHERE id = ? LIMIT 1",
    [userId],
  )) as any;
  const userRow = userRows[0];
  if (!userRow) return { success: false, message: "Nutzer nicht gefunden" };

  const current = String(userRow.enabledModules ?? "")
    .split(",")
    .map((x) => parseInt(x.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  const merged = Array.from(new Set([...current, ...codeModules])).sort((a, b) => a - b);
  const mergedStr = merged.join(",");

  let tenantId: number | null = userRow.tenantId ?? null;
  if (row.created_by_user_id) {
    const [creatorRows] = (await db.$client.query(
      "SELECT tenantId FROM users WHERE id = ? LIMIT 1",
      [row.created_by_user_id],
    )) as any;
    const creatorTenantId = (creatorRows as any[])[0]?.tenantId ?? null;
    if (creatorTenantId) {
      tenantId = creatorTenantId;
      await assignUserToTenant(userId, creatorTenantId);
    }
  }

  await db.$client.query("UPDATE users SET enabledModules = ? WHERE id = ?", [mergedStr, userId]);
  await db.$client.query("UPDATE access_codes SET used_count = used_count + 1 WHERE id = ?", [
    row.id,
  ]);

  return { success: true, enabledModules: mergedStr, tenantId };
}

export async function redeemAccessCodePublic(
  code: string,
): Promise<AccessCodeRedeemResult & { openId?: string }> {
  const normalized = code.trim().toUpperCase();
  const { getDb, upsertUser, assignUserToTenant } = await import("./db");
  const db = await getDb();
  const row = await findActiveAccessCode(db, normalized);
  if (!row) return { success: false, message: "Code nicht gefunden oder deaktiviert" };

  const maxUses = Number(row.max_uses ?? 1);
  const usedCount = Number(row.used_count ?? 0);
  if (maxUses > 0 && usedCount >= maxUses) {
    return { success: false, message: "Maximale Nutzungsanzahl erreicht" };
  }

  const enabledStr = String(row.modules ?? "").trim();
  if (!enabledStr) return { success: false, message: "Dieser Code hat keine Module hinterlegt" };

  const openId = `access:${normalized}`;
  await upsertUser({
    openId,
    name: "Team-Mitglied",
    role: "user",
    enabledModules: enabledStr,
  });

  const { getUserByOpenId } = await import("./db");
  const user = await getUserByOpenId(openId);
  if (!user) return { success: false, message: "Nutzer konnte nicht angelegt werden" };

  if (row.created_by_user_id) {
    const [creatorRows] = (await db.$client.query(
      "SELECT tenantId FROM users WHERE id = ? LIMIT 1",
      [row.created_by_user_id],
    )) as any;
    const creatorTenantId = (creatorRows as any[])[0]?.tenantId ?? null;
    if (creatorTenantId) {
      await assignUserToTenant(user.id, creatorTenantId);
    }
  }

  await db.$client.query("UPDATE access_codes SET used_count = used_count + 1 WHERE id = ?", [
    row.id,
  ]);

  return {
    success: true,
    enabledModules: enabledStr,
    tenantId: user.tenantId ?? null,
    openId,
  };
}

import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { parse as parseCookie } from "cookie";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";
import { ENV } from "./env";

// Versuche Manus SDK – falls nicht konfiguriert, nutze lokales Auth
async function tryManusAuth(req: CreateExpressContextOptions["req"]): Promise<User | null> {
  if (!ENV.oAuthServerUrl) return null;
  try {
    const { sdk } = await import("./sdk");
    return await sdk.authenticateRequest(req) ?? null;
  } catch {
    return null;
  }
}

async function tryLocalAuth(req: CreateExpressContextOptions["req"]): Promise<User | null> {
  try {
    const { verifySessionToken } = await import("./auth-local");
    const cookies = parseCookie(req.headers.cookie ?? "");
    const token = cookies[COOKIE_NAME];
    const session = await verifySessionToken(token);
    if (!session) return null;
    return await db.getUserByOpenId(session.openId) ?? null;
  } catch {
    return null;
  }
}

import { drizzle } from "drizzle-orm/mysql2";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  db: ReturnType<typeof drizzle>;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;
  const database = await db.getDb();

  try {
    // Manus hat Priorität wenn konfiguriert, sonst lokales Auth
    if (ENV.oAuthServerUrl) {
      user = await tryManusAuth(opts.req);
    } else {
      user = await tryLocalAuth(opts.req);
    }
  } catch {
    user = null;
  }

  return { req: opts.req, res: opts.res, user, db: database };
}

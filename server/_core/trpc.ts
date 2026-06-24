import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import type { TrpcContext } from "./context";
import {
  INSPECT_FORBIDDEN_MSG,
  INSPECT_PREVIEW_USER,
  isInspectModeActive,
} from "../inspectMode";

const t = initTRPC.context<TrpcContext>().create({});

const blockInspectMutations = t.middleware(async ({ ctx, type, next }) => {
  if (type === "mutation" && isInspectModeActive(ctx.req)) {
    throw new TRPCError({ code: "FORBIDDEN", message: INSPECT_FORBIDDEN_MSG });
  }
  return next();
});

/** Blocks all admin/owner tRPC access during inspect (queries and mutations). */
const blockInspectPrivilegedProcedures = t.middleware(async ({ ctx, next }) => {
  if (isInspectModeActive(ctx.req)) {
    throw new TRPCError({ code: "FORBIDDEN", message: INSPECT_FORBIDDEN_MSG });
  }
  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure.use(blockInspectMutations);

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (isInspectModeActive(ctx.req)) {
    return next({
      ctx: {
        ...ctx,
        user: INSPECT_PREVIEW_USER,
      },
    });
  }

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  if (ctx.user.id) {
    const { getDb } = await import("../db");
    const dbConn = await getDb();
    const {
      getUserVerificationRow,
      isEmailVerificationBlocked,
      EMAIL_VERIFICATION_REQUIRED_MSG,
    } = await import("../emailVerification");
    const verification = await getUserVerificationRow(dbConn, ctx.user.id);
    if (verification && isEmailVerificationBlocked(verification)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: EMAIL_VERIFICATION_REQUIRED_MSG,
      });
    }
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(blockInspectMutations).use(requireUser);

export const adminProcedure = protectedProcedure
  .use(({ ctx, next }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({ ctx });
  })
  .use(blockInspectPrivilegedProcedures);

export const ownerProcedure = protectedProcedure
  .use(({ ctx, next }) => {
    const role = ctx.user.role as string;
    if (role !== "owner" && role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({ ctx });
  })
  .use(blockInspectPrivilegedProcedures);

import { protectedProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Nur Administratoren haben Zugriff auf diese Funktion.' });
  }
  return next({ ctx });
});

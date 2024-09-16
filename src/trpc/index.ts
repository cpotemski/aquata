import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "@/trpc/context";

export const t = initTRPC.context<Context>().create();
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const router = t.router;
// procedure that asserts that the user is logged in
export const protectedProcedure = t.procedure.use(
  async function isAuthenticated(opts) {
    const { ctx } = opts;

    if (!ctx.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
      ctx: {
        userId: ctx.userId,
      },
    });
  }
);

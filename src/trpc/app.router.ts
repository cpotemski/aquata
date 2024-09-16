import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { protectedProcedure, t } from "@/trpc/index";
import { shipRouter } from "@/game/ship/ship.router";
import { authRouter } from "@/lib/auth/auth.router";

export const appRouter = t.router({
  getResources: protectedProcedure.query(async ({ ctx }) => {
    const station = await db.station.findUniqueOrThrow({
      where: { ownerId: ctx.userId },
      include: { resources: true },
    });
    return station.resources;
  }),
  incrementResources: protectedProcedure.mutation(async ({ ctx }) => {
    const { resourcesId } = await db.station.findUniqueOrThrow({
      where: { ownerId: ctx.userId },
      select: { resourcesId: true },
    });
    return db.resource.update({
      where: { id: resourcesId },
      data: {
        aluminium: { increment: 123 },
        steel: { increment: 312 },
        plutonium: { increment: 213 },
      },
    });
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = db.user.findUniqueOrThrow({
      where: { id: ctx.userId },
      include: { station: true },
    });
    if (!user.station) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No station found for user ${ctx.userId}`,
      });
    }
    return user;
  }),
  auth: authRouter,
  ship: shipRouter,
});

export type AppRouter = typeof appRouter;

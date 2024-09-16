import { db } from "@/lib/db"
import { z } from "zod"
import { SHIP_DATA } from "@/game/ship/ship.data"
import { protectedProcedure } from "@/trpc"

const buildShipsInput = z.object({
  what: z.enum([
    "Piranha",
    "Jellyfish",
    "Shark",
    "HackBoat",
    "Taifun",
    "Blizzard",
    "Hurricane",
    "Tsunami",
    "Enterprise",
    "Bermuda",
    "KittyHawk",
    "Atlantis",
  ]),
  amount: z.number(),
});

export const shipRouter = {
  getShipBuildJobs: protectedProcedure.query(async ({ ctx }) => {
    return db.buildJob.findMany({
      where: { ownerId: ctx.userId, type: "Ship" },
      select: { id: true, what: true, amount: true, remainingTime: true },
    }) ?? [];
  }),
  buildShips: protectedProcedure
    .input(buildShipsInput)
    .mutation(async ({ ctx, input }) => {
      const ship = SHIP_DATA.find((ship) => ship.name === input.what);
      if (!ship) {
        throw new Error(`Could not find ship ${input.what}`);
      }

      const aluminiumNeeded = (ship.costs.aluminium ?? 0) * input.amount;
      const steelNeeded = (ship.costs.steel ?? 0) * input.amount;
      const { resources } = await db.station.findUniqueOrThrow({
        where: { ownerId: ctx.userId },
        select: { resources: true },
      });

      if (
        aluminiumNeeded > resources.aluminium ||
        steelNeeded > resources.steel
      ) {
        throw new Error(
          `Not enough resources to build ${input.amount}x ${input.what}`
        );
      }

      return db.buildJob.upsert({
        where: {
          buildJobPerTypeAndTick: {
            ownerId: ctx.userId,
            type: "Ship",
            what: input.what,
            remainingTime: ship.buildTime,
          },
        },
        create: {
          type: "Ship",
          what: input.what,
          amount: input.amount,
          ownerId: ctx.userId,
          remainingTime: ship.buildTime,
        },
        update: {
          amount: {
            increment: input.amount,
          },
        },
      });
    }),
  cancelBuildJob: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.buildJob
        .findUniqueOrThrow({
          where: { ownerId: ctx.userId, type: "Ship", id: input.id },
        })
        .catch(() => {
          throw new Error(
            `Could not find buildJob ${input.id} or it does not belong to user ${ctx.userId}`
          );
        });
      return db.buildJob.delete({ where: { id: input.id } });
    }),
};

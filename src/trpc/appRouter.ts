import { initTRPC } from "@trpc/server"
import { getUser } from "@/lib/auth/getUser"
import { db } from "@/lib/db"
import { Context } from "@/trpc/context"


const t = initTRPC.context<Context>().create()
export const baseProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory

export const appRouter = t.router({
  getResources: baseProcedure.query(async () => {
    const user = await getUser()
    const station = await db.station.findUniqueOrThrow({ where: { ownerId: user.id }, include: { resources: true } })
    return station.resources
  }),
  incrementResources: baseProcedure
    .mutation(async () => {
      const user = await getUser()
      const {resourcesId} = await db.station.findUniqueOrThrow({ where: { ownerId: user.id }, select:{resourcesId: true} })
      return db.resource.update({
        where: { id: resourcesId },
        data: { aluminium: { increment: 123 }, steel: { increment: 312 }, plutonium: { increment: 213 } }
      })
    })
})

export type AppRouter = typeof appRouter;

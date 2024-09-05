"use server"

import { db } from "@/lib/db"
import { getUser } from "@/lib/auth/getUser"

export async function incrementResourceAction() {
  const user = await getUser()
  const station = await db.station.findUnique({ where: { ownerId: user.id } })
  await db.resource.update({
    where: { id: station?.resourcesId },
    data: { aluminium: { increment: 123 }, steel: { increment: 312 }, plutonium: { increment: 213 } }
  })
}

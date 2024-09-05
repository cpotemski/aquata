import { getUser } from "@/lib/auth/getUser"
import { db } from "@/lib/db"
import ResourceIncrementButton from "@/components/resourceIncrementButton"
import { incrementResourceAction } from "@/game/resource/incrementResource"

export default async function Game() {
  const user = await getUser()
  const resources = await db.resource.findUniqueOrThrow({ where: { id: user.station?.resourcesId } })

  return (
    <main>
      <h1>You are in game {user.name}</h1>
      <div>
        Aluminium: {resources.aluminium}
        Stahl: {resources.steel}
        Plutonium: {resources.plutonium}
      </div>

      <ResourceIncrementButton incrementResourceAction={incrementResourceAction} />
    </main>

  )
}

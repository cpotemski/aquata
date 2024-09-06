import ResourceIncrementButton from "@/components/resourceIncrementButton"
import Resources from "@/components/resources"
import { HydrateClient } from "@/trpc/server"

export default async function Game() {

  return (
    <HydrateClient>
      <main>
        <h1>You are in game</h1>
        <Resources />

        <ResourceIncrementButton />
      </main>
    </HydrateClient>
  )
}

import { HydrateClient } from "@/trpc/server"

export default async function Build() {

  return (
    <HydrateClient>
      <main>
        <h1>Schiffe bauen</h1>
      </main>
    </HydrateClient>
  )
}

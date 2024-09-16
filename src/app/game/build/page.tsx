import { HydrateClient } from "@/trpc/server"
import BuildQueue from "@/components/buildQueue"
import BuildForm from "@/components/buildForm"

export default async function Build() {
  return (
    <HydrateClient>
      <main>
        <h1>Schiffe bauen</h1>
        <BuildForm />
        <BuildQueue />
      </main>
    </HydrateClient>
  )
}

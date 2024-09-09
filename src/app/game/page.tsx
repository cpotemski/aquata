import ResourceIncrementButton from "@/components/resourceIncrementButton"
import Resources from "@/components/resources"
import { HydrateClient } from "@/trpc/server"
import { signOut } from "@/auth"
import Link from "next/link"

export default async function Game() {
  // const ships = trpc.


  return (
    <HydrateClient>
      <main>
        <h1>You are in game</h1>
        <nav>
          <ul>
            <li>
              <Link href="/game/build">Schiffe</Link>
            </li>
          </ul>
        </nav>
        <Resources />

        <ResourceIncrementButton />

        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </main>
    </HydrateClient>
  )
}

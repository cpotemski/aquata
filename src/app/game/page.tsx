import { useUser } from "@/lib/auth/useUser"
import { signOut } from "@/auth"

export default async function Game() {
  const user = await useUser()

  return (
    <main>
      <h1>You are in game {user.name}</h1>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </main>

  )
}

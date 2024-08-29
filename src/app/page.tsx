import { auth, signIn } from "@/auth"
import { db } from "@/lib/db"
import { register } from "@/lib/auth/register"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session?.user?.id) {
    // not logged in
    return <main>
      <h1>du bist nicht eingeloggt</h1>
      <form
        action={async () => {
          "use server"
          await signIn("auth0")
        }}
      >
        <button type="submit">Login</button>
      </form>
    </main>
  }
  //you are logged in

  const user = await db.user.findFirst({ where: { id: session.user.id } })
  console.log(user, session)
  if (!user) {
    // did not finish registration
    return <main>
      <h1>We need some more information from you</h1>
      <form
        action={async (formData) => {
          "use server"
          await register(formData)
        }}
      >
        <label>Username:</label>
        <input type="text" name="username" /><br />
        <label>Station:</label>
        <input type="text" name="stationname" /><br />
        {
          // more to come
        }
        <button type="submit">Speichern</button>
      </form>
    </main>
  }

  redirect("/game")
}

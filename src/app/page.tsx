import { signIn, signOut } from "@/auth"
import { register } from "@/lib/auth/register"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth/getUser"

export default async function Home() {
  const user = await getUser()

  if (!user) {
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
  if (!user.station) {
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

      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </main>
  }

  redirect("/game")
}

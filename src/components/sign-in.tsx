import { auth, signIn } from "@/auth"

export default async function SignIn() {
  const session = await auth()

  if (session) {
    return (
      <>
        Signed in as {session.userId} <br />
        <form
          action={async () => {
            "use server"
            await signIn("auth0")
          }}
        >
          <button type="submit">Signout</button>
        </form>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <form
        action={async () => {
          "use server"
          await signIn("auth0")
        }}
      >
        <button type="submit">Signin</button>
      </form>
    </>
  )
}

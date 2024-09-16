import { signIn } from "@/lib/auth";

export default async function Login() {
  return (
    <main>
      <h1>du bist nicht eingeloggt</h1>
      <form
        action={async () => {
          "use server";
          await signIn("auth0");
        }}
      >
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

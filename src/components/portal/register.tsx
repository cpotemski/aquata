import { register } from "@/lib/auth/register";
import { signOut } from "@/lib/auth";

export default async function Register() {
  return (
    <main>
      <h1>We need some more information from you</h1>
      <form
        action={async (formData) => {
          "use server";
          await register(formData);
        }}
      >
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Station:</label>
        <input type="text" name="stationname" />
        <br />
        {
          // more to come
        }
        <button type="submit">Speichern</button>
      </form>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}

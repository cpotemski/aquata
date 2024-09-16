import ResourceIncrementButton from "@/components/resourceIncrementButton";
import Resources from "@/components/resources";
import { HydrateClient, trpc } from "@/trpc/server";
import { signOut } from "@/lib//auth";

export default async function Game() {
  const user = await trpc.getUser();

  return (
    <HydrateClient>
      <main>
        <h1>
          Moin {user.name} von {user.station?.name}
        </h1>
        <Resources />

        <ResourceIncrementButton />

        <form
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/",
            });
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </main>
    </HydrateClient>
  );
}

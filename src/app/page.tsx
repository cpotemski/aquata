import { redirect } from "next/navigation";
import { trpc } from "@/trpc/server";
import Register from "@/components/portal/register";
import Login from "@/components/portal/login";

export default async function Home() {
  const user = await trpc.auth.isLoggedIn();
  if (user?.station) {
    redirect("/game");
  }
  if (user) {
    return <Register />;
  }

  return <Login />;
}

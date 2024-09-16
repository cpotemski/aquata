import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const isAuthenticated = async () => {
  const session = await auth();
  console.log("session", session);
  if (!session?.user?.id) {
    return false;
  }
  const user = await db.user.findFirst({ where: { id: session.user.id } });
  return user !== null;
};

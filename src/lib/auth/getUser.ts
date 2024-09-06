import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export const getUser = async () => {
  const session = await auth()
  if (!session?.user?.id) {
    // redirect("/")
    return null;
  }
  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id }, include: {station: true} })
  if (!user) {
    redirect("/")
  }

  return user
}

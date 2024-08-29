import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export const useUser = async () => {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/")
  }
  const user = await db.user.findFirst({ where: { id: session.user.id } })
  if (!user) {
    redirect("/")
  }

  return user
}

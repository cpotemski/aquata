import { auth } from "@/auth"
import { db } from "@/lib/db"

export const isAuthenticated = async () => {
  const session = await auth()
  if (!session?.user?.id) {
    return false
  }
  const user = await db.user.findFirst({ where: { id: session.user.id } })
  return user !== null
}

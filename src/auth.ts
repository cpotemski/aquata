import NextAuth from "next-auth"
import Auth0 from "@auth/core/providers/auth0"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Auth0({
    clientId: process.env.AUTH_AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH_AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH_AUTH0_ISSUER,
  })],
})

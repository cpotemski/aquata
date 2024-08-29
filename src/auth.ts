import NextAuth from "next-auth"
import Auth0 from "@auth/core/providers/auth0"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Auth0({
    clientId: process.env.AUTH_AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH_AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH_AUTH0_ISSUER,
  })],
  callbacks: {
    session({session, token}) {
      console.log(session, token)
      return {
        user: {
          id: token.sub,
          email: session.user.email
        },
        expires: session.expires
      }
    },
  }
})

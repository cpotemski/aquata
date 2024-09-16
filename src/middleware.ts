import type { NextRequest } from "next/server"

const loggedInRoutes = ["/game"];

export default function middleware(req: NextRequest) {
  //TODO: fix check if still logged in
  // if (!isAuthenticated() && loggedInRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/", req.nextUrl.origin)
  //   return NextResponse.redirect(absoluteURL.toString())
  // }
}

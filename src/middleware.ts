import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth/isAuthenticated"

const loggedInRoutes = ["/game"]

export default function middleware(req: NextRequest) {
  if (!isAuthenticated && loggedInRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}

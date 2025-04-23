import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/profile", "/connections", "/create-card", "/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtectedRoute) {
    // Check for any Supabase auth cookie (they follow the pattern sb-*-auth-token)
    // Also check for our demo auth cookie
    const hasAuthCookie = Array.from(request.cookies.getAll()).some(
      (cookie) =>
        (cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")) || cookie.name === "sb-demo-auth-token",
    )

    // Debug cookie information
    console.log("Checking auth cookies for path:", pathname)
    console.log("Auth cookie found:", hasAuthCookie)
    console.log(
      "Cookies:",
      Array.from(request.cookies.getAll()).map((c) => c.name),
    )

    // If no auth cookie, redirect to login
    if (!hasAuthCookie) {
      console.log("No auth cookie found, redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - login (login page)
     * - signup (signup page)
     * - forgot-password (forgot password page)
     * - reset-password (reset password page)
     * - auth (auth callback routes)
     * - auth-redirect (our new redirect page)
     * - api (API routes)
     * - debug (debug pages)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|login|signup|forgot-password|reset-password|auth|auth-redirect|api|debug).*)",
  ],
}

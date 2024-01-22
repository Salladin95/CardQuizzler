import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	if (!request.cookies.has("accessToken") || !request.cookies.has("refreshToken")) {
		return NextResponse.redirect(new URL("/auth", request.url))
	}
}

// See "Matching Paths" below to learn more
export const config = {
	// matcher: ["/", "module/:path", "folder/:path"],
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - auth (AUTH routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
	],
}

import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!sessionCookie;

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only these paths run through the middleware above.
// - /add-idea, /my-ideas, /my-interactions, /profile -> whole page is private
// - /ideas/:path+ -> only idea DETAILS (e.g. /ideas/123), NOT the public /ideas listing
export const config = {
  matcher: [
    "/add-idea/:path*",
    "/my-ideas/:path*",
    "/my-interactions/:path*",
    "/profile/:path*",
    "/ideas/:path+",
  ],
};
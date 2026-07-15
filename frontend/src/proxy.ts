import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("activity_token")?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register");
  const isDashboardRoute = 
    request.nextUrl.pathname.startsWith("/tasks") ||
    request.nextUrl.pathname.startsWith("/habits") ||
    request.nextUrl.pathname.startsWith("/today") ||
    request.nextUrl.pathname.startsWith("/reports") ||
    request.nextUrl.pathname.startsWith("/history") ||
    request.nextUrl.pathname.startsWith("/settings");

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/tasks/:path*",
    "/habits/:path*",
    "/today/:path*",
    "/reports/:path*",
    "/history/:path*",
    "/settings/:path*",
  ],
};

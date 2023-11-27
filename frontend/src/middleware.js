import { NextResponse } from "next/server";

export function middleware(request) {
  //   const isAuthenticated = request.cookies.get('isAuthenticated');
  const accessToken = request.cookies.get("accessToken");
  const url = request.nextUrl.clone();

  if (!accessToken?.value) {
    if (request.nextUrl.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If none of the conditions are met, allow the request to continue
  return NextResponse.next();
}

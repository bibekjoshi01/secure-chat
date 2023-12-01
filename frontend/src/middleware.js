import { NextResponse } from "next/server";

export function middleware(request) {
  //   const isAuthenticated = request.cookies.get('isAuthenticated');
  const accessToken = request.cookies.get("accessToken");
  const roomIdCookie = request.cookies.get("roomId");
  const roomId = roomIdCookie ? roomIdCookie.value : null;
  const url = request.nextUrl.clone();

  if (accessToken?.value) {
    if (request.nextUrl.pathname === "/") {
      const redirectUrl = `/chat/${roomId || ""}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

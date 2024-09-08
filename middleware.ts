import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!/|api).{1,})"],
};

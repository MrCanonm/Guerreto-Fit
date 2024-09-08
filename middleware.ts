import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/pages/404") {
    return NextResponse.redirect(new URL("/pages/404", req.url));
  }

  if (token && pathname === "/pages/404") {
    return NextResponse.redirect(new URL("/pages/404", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!_next|.*\\..*).*)"],
};

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/components/utils/generate-jwt";

export function middleware(req: NextRequest) {
  // Obtener la cookie 'authToken'
  const tokenCookie = req.cookies.get("authToken");
  console.log("Token cookie", tokenCookie);
  // Si no existe la cookie
  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Obtener el valor de la cookie
  const token = tokenCookie.value;

  try {
    verifyToken(token); // Verifica si el token es válido
    return NextResponse.next(); // Permitir el acceso si el token es válido
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirige al login si el token es inválido
  }
}

export const config = {
  matcher: [
    "/home",
    "/customer",
    "/api/stadistics",
    "/api/role",
    "/api/customer/:path*",
  ], // Rutas a proteger
};

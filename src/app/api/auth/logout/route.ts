import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Crear la respuesta y eliminar la cookie 'authToken'
  const response = NextResponse.json(
    { message: "Logout exitoso" },
    { status: 200 }
  );

  response.cookies.set("authToken", "", {
    httpOnly: false, // Cambiar para producción
    secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
    path: "/",
    expires: new Date(0), // Configurar la fecha de expiración en el pasado para eliminar la cookie
  });

  return response;
}

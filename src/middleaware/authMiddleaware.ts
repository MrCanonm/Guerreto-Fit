import { verifyToken } from "@/app/components/utils/generate-jwt";
import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      // Obtener la cookie 'authToken'
      const tokenCookie = req.cookies.get("authToken");

      // Verificar si la cookie está presente
      if (!tokenCookie || !tokenCookie.value) {
        return NextResponse.json(
          { error: "Token no proporcionado" },
          { status: 401 }
        );
      }

      // Obtener el valor de la cookie como string
      const token = tokenCookie.value;

      // Verificar el token
      const decoded = verifyToken(token);
      // Agregar la información decodificada del usuario a la solicitud
      (req as any).user = decoded;
      return handler(req);
    } catch (error) {
      console.error("Authentication error:", error); // Registro del error para depuración
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
  };
}

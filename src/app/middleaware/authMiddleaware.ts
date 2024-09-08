import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../components/utils/generate-jwt";

export function authMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    // Obtener la cookie 'authToken'
    const tokenCookie = req.cookies.get("authToken");

    // Verificar si la cookie está presente
    if (!tokenCookie) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 }
      );
    }

    // Obtener el valor de la cookie como string
    const token = tokenCookie.value;

    try {
      // Verificar el token
      const decoded = verifyToken(token);
      // Agregar la información decodificada del usuario a la solicitud
      (req as any).user = decoded;
      return handler(req);
    } catch (error) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
  };
}

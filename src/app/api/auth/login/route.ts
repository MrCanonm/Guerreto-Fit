import { generateToken } from "@/app/components/utils/generate-jwt";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); // Crear una instancia de la base de datos

export async function POST(request: Request) {
  const body = await request.json();
  const { accessName, password } = body;

  try {
    const appUser = await prisma.appUser.findFirst({
      where: { accessName },
      include: { role: true },
    });

    if (!appUser) {
      return NextResponse.json(
        { error: "Usuario y/o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const validPassword = await compare(password, appUser.accessHash);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Usuario y/o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: appUser.id,
      accessName: appUser.accessName,
      role: appUser.role.name,
    });

    const response = NextResponse.json(
      { message: "Inicio de sesión exitoso" },
      { status: 200 }
    );

    // Establecer la cookie
    response.cookies.set("authToken", token, {
      httpOnly: true, // Cambiar para produccion
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return response;
  } catch (error) {
    console.error("Error authenticating:", error);
    return NextResponse.json(
      { error: "Error en la autenticación" },
      { status: 500 }
    );
  }
}

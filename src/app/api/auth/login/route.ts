import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { generateToken } from "@/app/components/utils/generate-jwt";

const prisma = new PrismaClient();

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

    return NextResponse.json(
      { message: "Inicio de sesión exitoso", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error authenticating:", error);
    return NextResponse.json(
      { error: "Error en la autenticación" },
      { status: 500 }
    );
  }
}

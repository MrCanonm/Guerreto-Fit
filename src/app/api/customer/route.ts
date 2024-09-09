import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  CustomerType,
  MembershipStatus,
} from "@/app/components/Customer/customerInterfaces";
import { generateToken } from "@/app/components/utils/generate-jwt";
import { compare } from "bcrypt";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        membership: {
          include: {
            servicePrice: true,
          },
        },
        dailyPass: {
          include: {
            servicePrice: true,
          },
        },
      },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}

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
      httpOnly: true,
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

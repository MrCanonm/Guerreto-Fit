import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { authMiddleware } from "@/middleaware/authMiddleaware";

const prisma = new PrismaClient();

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const appUsers = await prisma.appUser.findMany({
        include: { person: true, role: true },
      });
      return NextResponse.json(appUsers, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching app users" },
        { status: 500 }
      );
    }
  } else if (req.method === "POST") {
    const body = await req.json();
    const {
      name,
      sureName,
      age,
      email,
      phone,
      accessName,
      password,
      roleName,
    } = body;

    try {
      const user = (req as any).user;
      if (user.role !== "Owner") {
        return NextResponse.json(
          { error: "No tienes permisos para crear usuarios" },
          { status: 403 }
        );
      }

      const existingRole = await prisma.role.findFirst({
        where: { name: roleName },
      });
      if (!existingRole) {
        throw new Error("No se encontró el rol.");
      }

      const person = await prisma.person.create({
        data: { name, sureName, age, email, phone },
      });

      const hashedPassword = await hash(password, 10);
      const appUser = await prisma.appUser.create({
        data: {
          accessName,
          accessHash: hashedPassword,
          personId: person.id,
          roleId: existingRole.id,
        },
      });

      return NextResponse.json(appUser, { status: 201 });
    } catch (error) {
      console.error("Error creating app user:", error);
      return NextResponse.json(
        { error: "Error creating app user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const GET = authMiddleware(handler);
export const POST = authMiddleware(handler);

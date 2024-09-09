import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Explicitly define GET method
export const GET = async (req: NextRequest) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

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
};

// Explicitly define POST method
export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();
  const { name, sureName, age, email, phone, accessName, password, roleName } =
    body;

  try {
    // Removed user role check
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
};

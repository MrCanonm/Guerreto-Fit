import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

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

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { accessName, accessHash, person, role } = body;

  try {
    const existingRole = await prisma.role.findFirst({
      where: { name: role.name },
    });
    if (!existingRole) {
      throw new Error("No se encontró el rol.");
    }

    const result = await prisma.$transaction(async (prisma) => {
      const existingPerson = await prisma.person.create({
        data: {
          name: person.name,
          sureName: person.sureName,
          age: parseInt(person.age, 10),
          email: person.email,
          phone: person.phone,
        },
      });
      console.log("Person created:", existingPerson);

      const hashedPassword = await hash(accessHash, 10);

      const existingAppUser = await prisma.appUser.findFirst({
        where: { accessName },
      });
      if (existingAppUser) {
        throw new Error("Username existed");
      }
      const appUser = await prisma.appUser.create({
        data: {
          accessName,
          accessHash: hashedPassword,
          personId: existingPerson.id,
          roleId: existingRole.id,
        },
      });

      console.log("AppUser created:", appUser);

      return appUser;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating app user:", error);
    return NextResponse.json(
      { error: "Error creating app user" },
      { status: 500 }
    );
  }
};

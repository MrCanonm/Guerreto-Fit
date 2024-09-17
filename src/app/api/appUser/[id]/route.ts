import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { AppUserStatus } from "@/app/components/AppUser/app-user-intertace";
import { getLoggedUser } from "@/app/components/utils/getLoggedUser";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;

  const existingUser = await prisma.appUser.findUnique({
    where: { id: String(id) },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(existingUser, { status: 200 });
}

// Pasar usuarios a inactivos
export async function PATCH(request: Request, { params }: Params) {
  const { id } = params;

  const { userId, role } = getLoggedUser();

  if (userId === id) {
    return NextResponse.json(
      { error: "No tienes permiso para hacer esto" },
      { status: 401 }
    );
  }

  if (role !== "Owner") {
    return NextResponse.json(
      { error: "No tienes permiso para hacer esto" },
      { status: 401 }
    );
  }

  const existingUser = await prisma.appUser.findUnique({
    where: { id: String(id), status: AppUserStatus.ACTIVO },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.appUser.update({
    where: { id: String(id) },
    data: {
      status: AppUserStatus.INACTIVO,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

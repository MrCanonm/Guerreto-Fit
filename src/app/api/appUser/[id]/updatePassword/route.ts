import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getLoggedUser } from "@/app/components/utils/getLoggedUser";
import { hash } from "bcrypt";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}
export async function PATCH(request: NextRequest, { params }: Params) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.EDIT_APPUSERS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  const { id } = params;

  const body = await request.json();
  const { accessHash } = body;

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
    where: { id: String(id) },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (!accessHash) {
    return NextResponse.json(
      { error: "No se proporcionó contraseña" },
      { status: 400 }
    );
  }
  const hashedPassword = await hash(accessHash, 10);
  const updatedUser = await prisma.appUser.update({
    where: { id: String(id) },
    data: {
      accessHash: hashedPassword,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

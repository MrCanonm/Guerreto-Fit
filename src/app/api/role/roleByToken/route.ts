import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedUser } from "@/app/components/utils/getLoggedUser";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { userId } = getLoggedUser();

    const userWithRoleAndPermissions = await prisma.appUser.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!userWithRoleAndPermissions) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
      role: userWithRoleAndPermissions.role.name,
      rolePermissions: userWithRoleAndPermissions.role.rolePermissions,
    };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

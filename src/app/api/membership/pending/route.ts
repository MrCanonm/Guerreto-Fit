// /app/api/membership/updateExpired/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_MEMBERSHIPS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  const existingMemberships = await prisma.membership.findMany({
    where: {
      status: MembershipStatus.VENCIDA,
    },
  });

  return NextResponse.json(existingMemberships, { status: 200 });
}

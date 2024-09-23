import { PermissionsDict } from "@/app/config/permissionsDict";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_SERVICEPRICES
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }

  try {
    const existingServicePrice = await prisma.servicePrices.findMany({
      include: { service: true },
    });

    return NextResponse.json(existingServicePrice, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching service prices" },
      { status: 500 }
    );
  }
}

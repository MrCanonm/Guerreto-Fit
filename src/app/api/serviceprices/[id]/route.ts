import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PermissionsDict } from "@/app/config/permissionsDict";
import { checkPermissions } from "@/middleaware/checkPermissions";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = params;

  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.MANAGE_SERVICEPRICES
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  const existingServicePrice = await prisma.servicePrices.findUnique({
    where: { id: Number(id) },
    include: { service: true },
  });

  if (!existingServicePrice) {
    return NextResponse.json(
      { error: "Service Price not found" },
      { status: 404 }
    );
  }
  const updatedServicePrice = {
    ...existingServicePrice,
    service: existingServicePrice.service,
  };

  return NextResponse.json(updatedServicePrice, { status: 200 });
}

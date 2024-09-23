import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();
interface Params {
  params: {
    name: string;
  };
}
export async function GET(request: NextRequest, { params }: Params) {
  const { name } = params;
  const today = new Date();
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_SERVICEPRICES
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }

  try {
    const servicePrice = await prisma.servicePrices.findFirst({
      where: { service: { serviceName: name }, date: { lte: today } },
      orderBy: { date: "desc" },
    });

    if (!servicePrice) {
      throw new Error(`No se encontró un precio de servicio para ${name}.`);
    }

    if (!servicePrice) {
      return NextResponse.json(
        { error: "Service Price not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(servicePrice, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching service price data" },
      { status: 500 }
    );
  }
}

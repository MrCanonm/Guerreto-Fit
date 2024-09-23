import { getLoggedUser } from "@/app/components/utils/getLoggedUser";
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
    const today = new Date();

    const membershipPrice = await prisma.servicePrices.findFirst({
      include: { service: true },
      where: {
        service: { serviceName: "MEMBRESIA" },
        date: { lte: today },
      },
      orderBy: { date: "desc" },
    });

    const dailypassPrice = await prisma.servicePrices.findFirst({
      include: { service: true },
      where: {
        service: { serviceName: "PASEDIARIO" },
        date: { lte: today },
      },
      orderBy: { date: "desc" },
    });

    const response = {
      membershipPrice,
      dailypassPrice,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching service prices" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.MANAGE_SERVICEPRICES
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    const body = await request.json();
    const { serviceId, ammout } = body;

    const { accessName } = getLoggedUser();

    const existingService = await prisma.services.findFirst({
      where: { id: serviceId },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const servicePrice = await prisma.servicePrices.create({
      data: {
        serviceId: existingService.id,
        ammout: parseFloat(ammout),
        created_by: accessName,
      },
    });

    return NextResponse.json(servicePrice, { status: 201 });
  } catch (error) {
    console.error("Error creating service price:", error);

    return NextResponse.json(
      { error: "Error creating service price" },
      { status: 500 }
    );
  }
}

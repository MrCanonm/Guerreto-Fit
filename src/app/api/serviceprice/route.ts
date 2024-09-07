import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = new Date();

    const membershipPrice = await prisma.servicePrices.findFirst({
      include: { service: true },
      where: {
        service: { serviceName: "MEMBRESIA" },
        fecha: { lte: today },
      },
      orderBy: { fecha: "desc" },
    });

    const dailypassPrice = await prisma.servicePrices.findFirst({
      include: { service: true },
      where: {
        service: { serviceName: "PASEDIARIO" },
        fecha: { lte: today },
      },
      orderBy: { fecha: "desc" },
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, monto } = body;

    const existingService = await prisma.services.findFirst({
      where: { id: serviceId },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const servicePrice = await prisma.servicePrices.create({
      data: {
        serviceId: existingService.id,
        monto: parseFloat(monto),
        fecha: new Date(),
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

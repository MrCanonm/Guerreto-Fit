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

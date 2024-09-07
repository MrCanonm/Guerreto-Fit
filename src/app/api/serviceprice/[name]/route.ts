import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface Params {
  params: {
    name: string;
  };
}
export async function GET(request: Request, { params }: Params) {
  const { name } = params;
  const today = new Date();

  try {
    const servicePrice = await prisma.servicePrices.findFirst({
      where: { service: { serviceName: name }, fecha: { lte: today } },
      orderBy: { fecha: "desc" },
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

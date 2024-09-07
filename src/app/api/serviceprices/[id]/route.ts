import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = params;

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

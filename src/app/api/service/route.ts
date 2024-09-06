import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const customers = await prisma.services.findMany({
      include: { servicePrices: true },
      orderBy: { servicePrices: {} },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching service prices" },
      { status: 500 }
    );
  }
}

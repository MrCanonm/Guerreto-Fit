import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const customers = await prisma.servicePrices.findMany({});
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching service prices" },
      { status: 500 }
    );
  }
}

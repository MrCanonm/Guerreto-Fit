import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dailyPass = await prisma.dailyPass.findMany({
      include: {
        customer: true,
        servicePrice: true,
      },
    });
    return NextResponse.json(
      dailyPass.map((dailyPass) => ({
        ...dailyPass.customer,
        dailyPass: {
          accessDate: dailyPass.accessDate,
          servicePrice: dailyPass.servicePrice,
        },
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching daily passes" },
      { status: 500 }
    );
  }
}

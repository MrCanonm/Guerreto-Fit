import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const dailyPass = await prisma.dailyPass.findMany({
      include: {
        customer: true,
      },
    });
    return NextResponse.json(
      dailyPass.map((dailyPass) => ({
        ...dailyPass.customer,
        dailyPass: {
          accessDate: dailyPass.accessDate,
          price: dailyPass.price,
        },
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching dailymember" },
      { status: 500 }
    );
  }
}

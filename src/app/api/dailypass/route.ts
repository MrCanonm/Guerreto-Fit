import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Starting to fetch daily passes...");
    const dailyPass = await prisma.dailyPass.findMany({
      include: {
        customer: true,
        servicePrice: true,
      },
    });
    console.log("Data fetched successfully:", dailyPass);
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
    console.error("Error fetching daily passes:", error);
    return NextResponse.json(
      { error: "Error fetching daily passes" },
      { status: 500 }
    );
  }
}

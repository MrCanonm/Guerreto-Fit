import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const memberships = await prisma.membership.findMany({
      include: {
        customer: true,
      },
    });
    return NextResponse.json(
      memberships.map((membership) => ({
        ...membership.customer,
        membership: {
          startDate: membership.startDate,
          endDate: membership.endDate,
          price: membership.price,
          status: membership.status,
        },
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching memberships" },
      { status: 500 }
    );
  }
}

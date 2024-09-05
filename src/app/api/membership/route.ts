import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const memberships = await prisma.membership.findMany({
      include: {
        customer: true,
        servicePrice: true,
      },
      where: {
        NOT: {
          status: "CANCELADO",
        },
      },
    });
    return NextResponse.json(
      memberships.map((membership) => ({
        ...membership.customer,
        membership: {
          dni: membership.dni,
          email: membership.email,
          phone: membership.phone,
          servicePrice: membership.servicePrice,
          startDate: membership.startDate,
          endDate: membership.endDate,
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

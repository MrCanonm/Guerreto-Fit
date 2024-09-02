// /app/api/membership/updateExpired/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";

const prisma = new PrismaClient();

export async function PATCH() {
  try {
    const today = new Date();

    // Encuentra todas las membresías activas cuyo endDate ha vencido
    const membershipsToUpdate = await prisma.membership.findMany({
      where: {
        status: MembershipStatus.ACTIVO,
        endDate: {
          lt: today,
        },
      },
    });

    if (membershipsToUpdate.length === 0) {
      return NextResponse.json(
        { message: "No memberships to update" },
        { status: 200 }
      );
    }

    // Actualiza el estado de estas membresías a "pendiente"
    await prisma.membership.updateMany({
      where: {
        id: {
          in: membershipsToUpdate.map((membership) => membership.id),
        },
      },
      data: {
        status: MembershipStatus.PENDIENTE,
      },
    });

    return NextResponse.json(
      { message: "Memberships updated to PENDIENTE" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating expired memberships:", error);
    return NextResponse.json(
      { error: "Error updating expired memberships" },
      { status: 500 }
    );
  }
}

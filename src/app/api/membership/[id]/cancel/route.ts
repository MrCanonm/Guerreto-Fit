import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = params; // Esto puede ser el customerId que llega en los params

  try {
    // Actualiza el estado de la membresía a "CANCELADO" basado en customerId
    const updatedMembership = await prisma.membership.updateMany({
      where: { customerId: Number(id) }, // Cambiado a customerId
      data: {
        status: MembershipStatus.CANCELADO, // Asegúrate de que "CANCELADO" es un valor válido en el enum MembershipStatus
      },
    });

    if (updatedMembership.count === 0) {
      return NextResponse.json(
        { error: "No membership found for the given customerId" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMembership, { status: 200 });
  } catch (error) {
    console.error("Error updating membership status:", error);
    return NextResponse.json(
      { error: "Error updating membership status" },
      { status: 500 }
    );
  }
}

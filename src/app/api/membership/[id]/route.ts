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
  console.log("PATCH request received");

  try {
    const body = await request.json();
    const { status, endDate } = body.membership;

    // Verifica si el cliente existe
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: { membership: true }, // Incluye todas las membresías asociadas
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Si el cliente tiene una membresía, actualiza su estado y fecha de vencimiento
    if (customer.membership?.id) {
      const updatedMembership = await prisma.membership.update({
        where: { id: customer.membership.id },
        data: {
          status: status === "cancelado" ? "activo" : status, // Actualiza solo si el estado es cancelado
          endDate: new Date(endDate), // Actualiza la fecha de vencimiento
        },
      });

      console.log("Updated Membership:", updatedMembership);
    }

    return NextResponse.json(
      { message: "Membership updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating membership status and end date:", error);
    return NextResponse.json(
      { error: "Error updating membership status and end date" },
      { status: 500 }
    );
  }
}

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
    // Busca la membresía actual para obtener la fecha de vencimiento actual
    const membership = await prisma.membership.findFirst({
      where: { customerId: Number(id) },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "No membership found for the given customerId" },
        { status: 404 }
      );
    }

    // Suma 30 días a la fecha de vencimiento actual
    const newExpirationDate = new Date(membership.endDate);
    newExpirationDate.setDate(newExpirationDate.getDate() + 30);

    // Actualiza la fecha de vencimiento de la membresía
    const updatedMembership = await prisma.membership.updateMany({
      where: { customerId: Number(id) },
      data: {
        endDate: newExpirationDate,
        status: MembershipStatus.ACTIVO,
      },
    });

    return NextResponse.json(updatedMembership, { status: 200 });
  } catch (error) {
    console.error("Error renewing membership:", error);
    return NextResponse.json(
      { error: "Error renewing membership" },
      { status: 500 }
    );
  }
}

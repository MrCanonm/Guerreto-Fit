import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = params; // Esto puede ser el customerId que llega en los params
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.EDIT_MEMBERSHIPS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    // Busca la membresía actual para obtener la fecha de vencimiento actual y el estado
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

    // Define el nuevo estado basado en el estado actual
    let newStatus = membership.status;
    if (membership.status === MembershipStatus.VENCIDA) {
      newStatus = MembershipStatus.ACTIVO;
    }

    // Actualiza la fecha de vencimiento y el estado de la membresía
    const updatedMembership = await prisma.membership.updateMany({
      where: { customerId: Number(id) },
      data: {
        endDate: newExpirationDate,
        status: newStatus,
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

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_ALLBILLS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: { membership: true },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customer" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.EDIT_MEMBERSHIPS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }

  try {
    const body = await request.json();
    const { name, sureName, customerType, membership } = body;

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

    // Actualiza el cliente
    const updatedCustomer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name,
        sureName,
        customerType,
      },
    });

    // Si se proporciona una membresía, actualízala
    if (membership) {
      const { email, phone, status, servicePrice, monthsToPay } = membership;

      const startDate = new Date(membership.startDate);
      const endDate = new Date(startDate);
      const daysToAdd = monthsToPay * 30;
      endDate.setDate(startDate.getDate() + daysToAdd);

      if (customer.membership?.id) {
        // Actualiza la membresía específica si se proporciona un ID
        await prisma.membership.update({
          where: { id: customer.membership?.id },
          data: {
            email,
            phone,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            servicePriceId: servicePrice.id, // Usa el ID del servicePrice, no el monto
            status,
          },
        });
      }
    }

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    console.error("Error updating customer and membership:", error);
    return NextResponse.json(
      { error: "Error updating customer and membership" },
      { status: 500 }
    );
  }
}

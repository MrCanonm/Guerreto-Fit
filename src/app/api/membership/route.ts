import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_MEMBERSHIPS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
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
          totalAmout: membership.totalAmout,
          monthsToPay: membership.monthsToPay,
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

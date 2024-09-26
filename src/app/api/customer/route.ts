import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  CustomerType,
  MembershipStatus,
} from "@/app/components/Customer/customerInterfaces";
import { getLoggedUser } from "@/app/components/utils/getLoggedUser";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_ALLBILLS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    const customers = await prisma.customer.findMany({
      include: {
        membership: {
          include: {
            servicePrice: true,
          },
        },
        dailyPass: {
          include: {
            servicePrice: true,
          },
        },
      },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.CREATE_BILLS
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    const body = await request.json();
    const { name, sureName, customerType, dailyPass, membership } = body;
    const { accessName } = getLoggedUser();

    console.log("Received payload:", body);

    const result = await prisma.$transaction(async (prisma) => {
      const newCustomer = await prisma.customer.create({
        data: {
          name,
          sureName,
          customerType,
          created_by: accessName,
          updated_by: accessName,
        },
      });
      if (customerType === CustomerType.PASE_DIARIO && dailyPass) {
        console.log("Received payload:", body);
        const servicePrice = await prisma.servicePrices.findFirst({
          where: { service: { serviceName: "PASEDIARIO" } },
        });

        if (!servicePrice) {
          throw new Error(
            "No se encontró un precio de servicio para 'Pase Diario'."
          );
        }

        const currentDate = new Date();

        const createdDailyPass = await prisma.dailyPass.create({
          data: {
            servicePriceId: servicePrice.id, // Usa el ID del servicePrice, no el monto
            accessDate: currentDate,
            customerId: newCustomer.id,
            created_by: accessName,
          },
        });

        console.log("Created DailyPass:", createdDailyPass);
      } else if (customerType === CustomerType.MEMBRESIA && membership) {
        const existingMembership = await prisma.membership.findFirst({
          where: {
            status: MembershipStatus.ACTIVO,
            OR: [
              ...(membership.dni ? [{ dni: membership.dni }] : []), // Solo se incluye si dni no es undefined o null
              ...(membership.email ? [{ email: membership.email }] : []), // Solo se incluye si email no es undefined o null
            ],
          },
        });

        if (existingMembership) {
          throw new Error(
            "Ya existe una membresía activa con el mismo DNI o Correo."
          );
        }

        const servicePrice = await prisma.servicePrices.findFirst({
          where: {
            service: { serviceName: "MEMBRESIA" },
            date: { lt: new Date() },
          },
          orderBy: { date: "desc" },
        });

        if (!servicePrice) {
          throw new Error(
            "No se encontró un precio de servicio para 'Membresía'."
          );
        }

        const startDate = new Date(membership.startDate);
        const endDate = new Date(startDate);
        const daysToAdd = membership.monthsToPay * 30;
        endDate.setDate(startDate.getDate() + daysToAdd);

        const totalAmount =
          Number(membership.monthsToPay) * Number(servicePrice.ammout);

        const createdMembership = await prisma.membership.create({
          data: {
            email: membership.email || undefined,
            phone: membership.phone || undefined,
            dni: membership.dni || undefined,
            servicePriceId: servicePrice.id,
            monthsToPay: membership.monthsToPay,
            totalAmout: totalAmount,
            startDate: startDate,
            endDate: endDate,
            customerId: newCustomer.id,
            created_by: accessName,
            updated_by: accessName,
          },
        });

        console.log("Created Membership:", createdMembership);
        return { ...newCustomer, membership: createdMembership };
      }
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Error creating customer" },
      { status: 500 }
    );
  }
}

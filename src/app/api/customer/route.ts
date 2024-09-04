import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  CustomerType,
  MembershipStatus,
} from "@/app/components/Customer/customerInterfaces";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        membership: true,
        dailyPass: true,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sureName, customerType, dailyPass, membership, monthsToPay } =
      body;

    console.log("Received payload:", body);

    const result = await prisma.$transaction(async (prisma) => {
      const newCustomer = await prisma.customer.create({
        data: {
          name,
          sureName,
          customerType,
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
          },
        });

        console.log("Created DailyPass:", createdDailyPass);
      } else if (customerType === CustomerType.MEMBRESIA && membership) {
        const existingMembership = await prisma.membership.findFirst({
          where: {
            OR: [
              { dni: membership.dni, status: MembershipStatus.ACTIVO },
              { email: membership.email, status: MembershipStatus.ACTIVO },
            ],
          },
        });

        if (existingMembership) {
          throw new Error(
            "Ya existe una membresía activa con el mismo DNI o Correo."
          );
        }

        const servicePrice = await prisma.servicePrices.findFirst({
          where: { service: { serviceName: "MEMBRESIA" } },
        });

        if (!servicePrice) {
          throw new Error(
            "No se encontró un precio de servicio para 'Membresía'."
          );
        }

        const startDate = new Date(membership.startDate);
        const endDate = new Date(startDate);
        const daysToAdd = monthsToPay * 30;
        endDate.setDate(startDate.getDate() + daysToAdd);

        const createdMembership = await prisma.membership.create({
          data: {
            email: membership.email,
            phone: membership.phone,
            dni: membership.dni,
            servicePriceId: servicePrice.id,
            startDate: startDate,
            endDate: endDate,
            customerId: newCustomer.id,
          },
        });

        console.log("Created Membership:", createdMembership);
      }

      return newCustomer;
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

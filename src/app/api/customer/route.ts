import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        dailyPasses: true,
        memberships: true,
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
    const {
      name,
      sureName,
      customerType,
      dailyPass, // Desestructuración condicional
      membership, // Desestructuración condicional
    } = body;

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        sureName,
        customerType,
      },
    });

    const validDate = new Date(dailyPass.accessDate);
    if (isNaN(validDate.getTime())) {
      throw new Error("Invalid date format");
    }
    // Ahora, maneja el tipo específico de cliente
    if (customerType === "PASE_DIARIO" && dailyPass) {
      // Crea el pase diario
      await prisma.dailyPass.create({
        data: {
          accessDate: validDate,
          price: parseFloat(dailyPass.price),
          customerId: newCustomer.id, // Relaciona el pase diario con el cliente
        },
      });
    } else if (customerType === "MEMBRESIA" && membership) {
      // Crea la membresía
      await prisma.membership.create({
        data: {
          email: membership.email,
          phone: membership.phone,
          startDate: new Date(membership.startDate),
          endDate: new Date(membership.endDate),
          price: parseFloat(membership.price),
          customerId: newCustomer.id, // Relaciona la membresía con el cliente
          status: membership.status,
        },
      });
    }

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Error creating customer" },
      { status: 500 }
    );
  }
}

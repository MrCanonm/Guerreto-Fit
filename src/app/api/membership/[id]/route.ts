import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const customer = await prisma.membership.findUnique({
      where: { id: Number(id) },
      include: { customer: true },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Membership not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching membership" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = params;
  console.log("PATCH request received");

  try {
    const body = await request.json();
    const { monthsToPay } = body;

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

    if (customer.membership?.id) {
      const today = new Date();

      // Verificamos si la membresía está vencida
      const isMembershipExpired =
        customer.membership.status === MembershipStatus.VENCIDA;

      // Si la membresía está vencida, empezamos desde hoy; de lo contrario, desde la fecha de finalización anterior
      const oldEndDate = isMembershipExpired
        ? today
        : new Date(customer.membership.endDate);
      const endDate = new Date(oldEndDate);
      const daysToAdd = monthsToPay * 30;
      endDate.setDate(oldEndDate.getDate() + daysToAdd);

      const updatedMembership = await prisma.membership.update({
        where: { id: customer.membership.id },
        data: {
          status: MembershipStatus.ACTIVO,
          endDate: endDate,
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

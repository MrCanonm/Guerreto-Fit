import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
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

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   console.log("PATCH request received");
//   try {
//     const body = await request.json();
//     const { name, sureName, customerType, membership, dailyPasses } = body;

//     // Verifica si el cliente existe
//     const customer = await prisma.customer.findUnique({
//       where: { id: Number(id) },
//       include: { memberships: true }, // Incluye todas las membresías asociadas
//     });

//     if (!customer) {
//       return NextResponse.json(
//         { error: "Customer not found" },
//         { status: 404 }
//       );
//     }

//     // Actualiza el cliente
//     const updatedCustomer = await prisma.customer.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         sureName,
//         customerType,
//       },
//     });

//     // Si se proporciona una membresía, actualízala
//     if (membership) {
//       const {
//         id: membershipId,
//         email,
//         phone,
//         startDate,
//         endDate,
//         price,
//         status,
//       } = membership;

//       // Verifica si el cliente tiene membresías
//       if (customer.memberships.length > 0) {
//         // Si la membresía es para actualizarse y tiene un ID específico
//         if (membershipId) {
//           await prisma.membership.update({
//             where: { id: membershipId },
//             data: {
//               email,
//               phone,
//               startDate: new Date(startDate),
//               endDate: new Date(endDate),
//               price: parseFloat(price),
//               status,
//             },
//           });
//         } else {
//           // Si no se proporciona un ID específico, podrías decidir actualizar la primera membresía o manejarlo de otra manera
//           await prisma.membership.update({
//             where: { id: customer.memberships[0].id },
//             data: {
//               email,
//               phone,
//               startDate: new Date(startDate),
//               endDate: new Date(endDate),
//               price: parseFloat(price),
//               status,
//             },
//           });
//         }
//       }
//     }

//     return NextResponse.json(updatedCustomer, { status: 200 });
//   } catch (error) {
//     console.error("Error updating customer and membership:", error);
//     return NextResponse.json(
//       { error: "Error updating customer and membership" },
//       { status: 500 }
//     );
//   }
// }

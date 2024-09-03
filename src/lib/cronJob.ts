import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";

const prisma = new PrismaClient();

async function updateExpiredMemberships() {
  try {
    const today = new Date();

    // Encuentra todas las membresías activas cuyo endDate ha vencido
    const membershipsToUpdate = await prisma.membership.findMany({
      where: {
        status: MembershipStatus.ACTIVO,
        endDate: {
          lt: today,
        },
      },
    });

    if (membershipsToUpdate.length === 0) {
      console.log("No memberships to update");
      return;
    }

    // Actualiza el estado de estas membresías a "pendiente"
    await prisma.membership.updateMany({
      where: {
        id: {
          in: membershipsToUpdate.map((membership) => membership.id),
        },
      },
      data: {
        status: MembershipStatus.VENCIDA,
      },
    });

    console.log("Memberships updated to PENDIENTE");
  } catch (error) {
    console.error("Error updating expired memberships:", error);
  }
}

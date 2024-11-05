import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await updateExpiredMemberships();
  return new Response(JSON.stringify({ message: "Cron job executed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function updateExpiredMemberships() {
  try {
    const today = new Date();

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

    console.log(
      `Memberships updated to VENCIDA: ${membershipsToUpdate.length}`
    );
  } catch (error) {
    console.error("Error updating expired memberships:", error);
  }
}

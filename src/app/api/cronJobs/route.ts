// pages/api/services/cronJob.ts
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";
import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

let cronJobStarted = false;

export async function POST(request: Request) {
  const today = new Date();
  if (!cronJobStarted) {
    cron.schedule("0 5 * * *", () => {
      console.log(
        `running a task everyday at ${today.getHours()}:${today.getMinutes()}`
      );
      updateExpiredMemberships();
    });
    cronJobStarted = true;
  }

  return new Response(JSON.stringify({ message: "Cron job started" }), {
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
      `Memberships updated to PENDIENTE ${membershipsToUpdate.length}`
    );
  } catch (error) {
    console.error("Error updating expired memberships:", error);
  }
}

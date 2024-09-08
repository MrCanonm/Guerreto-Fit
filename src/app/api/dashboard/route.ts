import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "@/app/middleaware/authMiddleaware";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function handler(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  try {
    const activeMemberships = await prisma.membership.findMany({
      include: { servicePrice: true },
    });

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayDailyPass = await prisma.dailyPass.findMany({
      where: {
        accessDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: { servicePrice: true },
    });

    const totalDailyPass = await prisma.dailyPass.findMany({
      include: { servicePrice: true },
    });

    const totalActiveMemberships = activeMemberships.length;

    const totalDailyPassAmountToday = todayDailyPass.reduce(
      (acc, dailyPass) => acc + (dailyPass.servicePrice?.monto || 0),
      0
    );
    const totalDailyPassAmount = totalDailyPass.reduce(
      (acc, dailyPass) => acc + (dailyPass.servicePrice?.monto || 0),
      0
    );

    const totalMembershipAmount = activeMemberships.reduce(
      (acc, membership) => acc + (membership.servicePrice?.monto || 0),
      0
    );

    const totalAmmout = totalMembershipAmount + totalDailyPassAmount;
    const response = {
      totalActiveMemberships,
      todayDailyPassCount: todayDailyPass.length,
      totalDailyPassCount: totalDailyPass.length,
      totalMembershipAmount,
      totalDailyPassAmountToday,
      totalDailyPassAmount,
      totalAmmout,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export const GET = authMiddleware(handler);

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todas las membresías activas
    const activeMemberships = await prisma.membership.findMany({
      include: { servicePrice: true },
    });

    // Obtener la fecha de hoy para filtrar los DailyPass de hoy
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Inicio del día de hoy
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Fin del día de hoy

    // Obtener el número de personas que han usado el DailyPass hoy
    const todayDailyPass = await prisma.dailyPass.findMany({
      where: {
        accessDate: {
          gte: startOfDay, // Mayor o igual al inicio del día
          lt: endOfDay, // Menor al fin del día
        },
      },
      include: { servicePrice: true },
    });

    // Obtener el total de personas que han usado el DailyPass en general
    const totalDailyPass = await prisma.dailyPass.findMany({
      include: { servicePrice: true },
    });

    // Calcular las cantidades
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
      totalActiveMemberships, // Personas con membresía activa
      todayDailyPassCount: todayDailyPass.length, // Personas con DailyPass hoy
      totalDailyPassCount: totalDailyPass.length, // Total de personas que han usado DailyPass
      totalMembershipAmount, // Monto total de membresías
      totalDailyPassAmountToday, // Monto total de DailyPass de hoy
      totalDailyPassAmount, // Monto total de todos los DailyPass
      totalAmmout, // Monto total combinado
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

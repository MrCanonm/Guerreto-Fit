import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPermissions } from "@/middleaware/checkPermissions";
import { PermissionsDict } from "@/app/config/permissionsDict";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const permissionCheck = await checkPermissions(
    request,
    PermissionsDict.VIEW_DAILYPASSES
  );

  // Asegúrate de que el permiso no este permitido
  if (permissionCheck instanceof NextResponse) {
    return permissionCheck;
  }
  try {
    const dailyPass = await prisma.dailyPass.findMany({
      include: {
        customer: true,
        servicePrice: true,
      },
    });
    return NextResponse.json(
      dailyPass.map((dailyPass) => ({
        ...dailyPass.customer,
        dailyPass: {
          accessDate: dailyPass.accessDate,
          servicePrice: dailyPass.servicePrice,
        },
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching daily passes" },
      { status: 500 }
    );
  }
}

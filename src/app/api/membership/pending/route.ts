// /app/api/membership/updateExpired/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MembershipStatus } from "@/app/components/Customer/customerInterfaces";

const prisma = new PrismaClient();

export async function GET() {
  const existingMemberships = await prisma.membership.findMany({
    where: {
      status: MembershipStatus.VENCIDA,
    },
  });

  return NextResponse.json(existingMemberships, { status: 200 });
}

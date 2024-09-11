import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const existingRole = await prisma.role.findMany();

  if (!existingRole) {
    throw new Error("No se encontró el rol.");
  }
  return NextResponse.json(existingRole, { status: 200 });
}

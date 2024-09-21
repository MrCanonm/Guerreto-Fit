import { getLoggedUser } from "@/app/components/utils/getLoggedUser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const existingService = await prisma.services.findMany({});

    return NextResponse.json(existingService, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching service prices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceName } = body;

  const { accessName } = getLoggedUser();

  const existingService = await prisma.services.findFirst({
    where: { serviceName },
  });

  if (existingService) {
    return NextResponse.json({ error: "Role already exists" }, { status: 400 });
  }

  try {
    const newService = await prisma.services.create({
      data: {
        serviceName,
        created_by: accessName,
        updated_by: accessName,
      },
    });

    return NextResponse.json(newService, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating role" }, { status: 500 });
  }
}

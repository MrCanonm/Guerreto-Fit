import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getLoggedUser } from "@/app/components/utils/getLoggedUser";

const prisma = new PrismaClient();

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: Request) {
  try {
    const { userId } = getLoggedUser();

    const appUser = await prisma.appUser.findUnique({
      where: { id: userId },
      include: { person: true, role: true },
    });

    const data = {
      appUserId: appUser?.id,
      name: appUser?.person.name,
      sureName: appUser?.person.sureName,
      email: appUser?.person.email,
      role: appUser?.role.name,
    };

    if (!appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

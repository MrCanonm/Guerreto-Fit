import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, secretKey);

    const userId = decoded.userId;

    const userWithRole = await prisma.appUser.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!userWithRole) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role: userWithRole.role }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

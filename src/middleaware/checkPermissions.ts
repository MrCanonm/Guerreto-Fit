import { verifyToken } from "@/app/components/utils/generate-jwt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function checkPermissions(
  req: NextRequest,
  requiredPermission: string
) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized No token provided" },
      { status: 401 }
    );
  }

  const decoded: any = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Realizar una consulta a la base de datos para obtener los permisos del usuario
  const userPermissions = await prisma.rolePermission.findMany({
    where: { role: { name: decoded.role } },
    include: { permission: true },
  });

  const hasPermission = userPermissions.some(
    (pm) => pm.permission.name === requiredPermission && pm.allowed
  );

  if (!hasPermission) {
    console.log(`Missing required permission: ${requiredPermission}`);
    return NextResponse.json(
      { error: `Missing required permission: ${requiredPermission}` },
      { status: 403 }
    );
  }

  return true;
}

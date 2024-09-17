import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./generate-jwt";

export const getLoggedUser = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const decoded: any = verifyToken(token);

  return decoded;
};

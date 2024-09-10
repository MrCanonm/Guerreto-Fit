import jwt from "jsonwebtoken";

export function generateToken(payload: any) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET; // Asegúrate de tener esta variable en tu entorno
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest } from "next/server";

export function verifyJWT(req: NextRequest): JwtPayload | null{
  const token = req.headers.get("authorization")?.split(" ")[1];
  if(!token){
    return null;
  }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload  
        return decoded;
    } catch (error) {
        return null;
    }
}

export function verifyAdmin(req: NextRequest): { id: string; role: string } | null {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== "Admin") return null;
    return decoded;
  } catch {
    return null;
  }
}
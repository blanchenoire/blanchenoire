import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: any){
    const decodedUser = verifyJWT(req);
        if (!decodedUser) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = decodedUser.userId
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }, 
            include: {
                orders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({
            success: true,
            message: "User fetched Successfully",
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in fetching user"
        })
    }
}

export async function PATCH(req: NextRequest, {params}: any){
    const decodedUser = verifyJWT(req);
    if (!decodedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = decodedUser.userId
    const body = await req.json();
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: body
        })
        const {password, ...validUpdatedUser} = updatedUser

        return NextResponse.json({
            success: true,
            message: "User Updated Successfully",
            data: validUpdatedUser
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in updating user"
        })
    }
}
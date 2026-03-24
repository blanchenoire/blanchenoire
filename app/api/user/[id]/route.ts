import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: any){
    const {id} = await params
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
    const {id} = await params
    const body = await req.json();
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: body
        })

        return NextResponse.json({
            success: true,
            message: "User Updated Successfully",
            data: updatedUser
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in updating user"
        })
    }
}
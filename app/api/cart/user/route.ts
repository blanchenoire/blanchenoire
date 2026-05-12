import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const decodedUser = verifyJWT(req);
    if (!decodedUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = decodedUser.userId
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId
            },
            include: {
                CartItem: {
                    include: {
                        Product: true
                    }
                }
            }
        })
        if (!cart) {
            return NextResponse.json({
                success: true,
                data: {
                    items: [],
                    totalItems: 0,
                    userId: userId,
                    message: "Cart is Empty"
                }
            })
        }
        return NextResponse.json({
            success: true,
            data: cart,
            message: "Cart fetched Successfully!"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "error in Cart fetching"
        })
    }
}
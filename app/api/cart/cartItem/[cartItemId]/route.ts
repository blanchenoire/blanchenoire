import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
    const { cartItemId } = await params

    try {
        await prisma.cartItem.delete({
            where: {
                id: cartItemId
            }
        })
        return NextResponse.json({
            success: true,
            message: "Item removed from cart"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong while removing item from cart"
        })
    }
}

export async function PATCH(req: NextRequest, { params }: any) {
    const { cartItemId } = await params;
    try {
        const body = await req.json();
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: cartItemId
            },
            data: {
                quantity: body.quantity
            }
        })
        return NextResponse.json({
            success: true,
            message: "cart item updated successfully!",
            data: updatedCartItem
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while updating cart Item"
        })
    }
}
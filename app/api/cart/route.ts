import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId, productId, quantity } = body;

    if (!userId || !productId) {
        return NextResponse.json(
            { success: false, message: "userId and productId are required" },
            { status: 400 }
        );
    }

    try {
        // get or create cart
        const cart = await prisma.cart.upsert({
            where: { userId },
            update: {},
            create: { userId }
        });

        // add or increment item
        const cartItem = await prisma.cartItem.upsert({
            where: { cartId_productId: { cartId: cart.id, productId } },
            update: { quantity: { increment: quantity } },
            create: { cartId: cart.id, productId, quantity: quantity }
        });

        return NextResponse.json({ success: true, data: cartItem });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to add product to cart" },
            { status: 500 }
        );
    }
}
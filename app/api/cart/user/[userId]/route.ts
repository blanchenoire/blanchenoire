import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: any) {
    const body = await req.json();
    const {userId} = await params
    try {
        let cart = await prisma.cart.findFirst({
            where: {
                userId: userId
            }
        })
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId
                }
            })
        }
        const itemExistsInCart = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: body.productId
                }
            }
        })

        if (itemExistsInCart) {
            const updatedItem = await prisma.cartItem.update({
                where: {
                    id: itemExistsInCart.id
                },
                data: {
                    quantity: itemExistsInCart.quantity + 1
                }
            })
            return NextResponse.json({
                success: true,
                data: updatedItem
            });
        }

        const cartItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: body.productId,
                quantity: 1
            }
        })
        return NextResponse.json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to add product to cart"
        });
    }
}

export async function GET(req: NextRequest, {params}: any){
    const {userId} = await params
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
        if(!cart){
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
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
    const { userId } = await params;

    try {
        const body = await req.json();

        if (body.isDefault) {
            await prisma.deliveryDetail.updateMany({
                where: { userId },
                data: { isDefault: false },
            });
        }

        const deliveryDetail = await prisma.deliveryDetail.create({
            data: {
                userId,
                ...body,
            },
        });

        return NextResponse.json({
            success: true,
            data: deliveryDetail,
            message: "Delivery details added successfully",
        });

    } catch (error) {
        console.log("errorrr", error);
        return NextResponse.json({
            success: false,
            message: "something went wrong while adding new delivery details",
        });
    }
}

export async function GET(req: NextRequest, {params}: any) {
    const {userId} = await params
    try {
        const userDeliveryDetails = await prisma.deliveryDetail.findMany({
            where: {
                userId: userId
            }
        })
        return NextResponse.json({
            success: true,
            data: userDeliveryDetails,
            message: "Delivery details fetched successfully"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching delivery details"
        })
    }
}

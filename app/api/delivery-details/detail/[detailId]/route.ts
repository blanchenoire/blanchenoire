import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}: any){
    const {detailId} = await params;
    try {
        await prisma.deliveryDetail.delete({
            where: {
                id: detailId
            }
        })
        return NextResponse.json({
            success: true,
            message: "Delivery details deleted"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while deleting Delivery details"
        })
    }
}
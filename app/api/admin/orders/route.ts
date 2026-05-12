// app/api/admin/orders/route.ts
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: { product: true },
        },
        deliveryDetail: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);

  } catch (error) {
    console.error("Fetch Orders Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
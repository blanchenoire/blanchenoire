// app/api/admin/orders/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { verifyAdmin } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = verifyAdmin(req);
        const { id } = await params
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        const updated = await prisma.order.update({
            where: { id: id },
            data: { status },
        });

        const order = await prisma.order.findUnique({
            where: { id: id },
            include: { user: true },
        });

        await sendEmail(
            order!.user.email,
            `Order ${status}`,
            `
  <div style="font-family: Arial; padding: 20px;">
          <h2 style="color: #6B4F4F;">☕ Coffee Store</h2>
          <h3>Order Confirmed</h3>
        
          <p>Your order has been successfully placed.</p>
        
          <div style="background:#F4F4F4; padding:10px; border-radius:8px;">
            <p><b>Order ID:</b> ${order!.id}</p>
            <p><b>Total:</b> ₹${order!.total}</p>
          </div>
        
          <p style="margin-top:10px;">We’ll keep you updated!</p>
        </div>

  ${status === "Shipped"
                ? "<p>Expected delivery: 3-5 days 🚚</p>"
                : ""
            }
  `
        );

        return NextResponse.json(updated);

    } catch (error: any) {
        console.error("Order Update Error:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
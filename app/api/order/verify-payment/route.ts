import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" });
    }

    // ✅ UPDATE ORDER HERE
    const order = await prisma.order.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id
      },
    });

    // ✅ CLEAR CART
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { CartItem: true },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: order.userId },
    });

    try {
      await sendEmail(
        user!.email,
        "Order Confirmed ☕",
        `
    <h2>Order Confirmed!</h2>
    <p>Your order has been placed successfully.</p>
    <p><b>Order ID:</b> ${order.id}</p>
    <p><b>Total:</b> ₹${order.total}</p>
    <p>We’ll notify you once it's shipped 🚚</p>
    `
      );
    } catch (error) {
      console.log("Email Failed", error)
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified & order updated",
      data: order,
    });

  } catch (error) {
    console.error("Verify Order Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
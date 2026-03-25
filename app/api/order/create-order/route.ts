import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const decodedUser = verifyJWT(req);
  if (!decodedUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = decodedUser.userId

  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: {
      CartItem: {
        include: { Product: true },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ success: false, message: "Cart not found" });
  }

  if (cart.CartItem.length === 0) {
    return NextResponse.json({ success: false, message: "Cart is empty" });
  }

  const total = cart.CartItem.reduce((sum, item) => {
    return sum + Number(item.Product.price) * item.quantity;
  }, 0);

  // Create Razorpay order FIRST
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(total * 100), // paise
    currency: "INR",
    receipt: `r_${Date.now()}`,
  });

  // Save order to DB with razorpayOrderId
  const order = await prisma.order.create({
    data: {
      userId: userId,
      deliveryDetailId: body.deliveryDetailId,
      total: total,
      razorpayOrderId: razorpayOrder.id, // store this for verification later
      paymentStatus: "Pending",          // add this field to your schema
      items: {
        create: cart.CartItem.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.Product.price),
        })),
      },
    },
  });



  return NextResponse.json({
    success: true,
    message: "Order created successfully",
    data: {
      razorpayOrderId: razorpayOrder.id,  // send to frontend to open checkout
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    },
  });
}
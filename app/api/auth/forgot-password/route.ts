import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ success: true, message: "If this email exists, OTP has been sent" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await prisma.user.update({
            where: { email },
            data: { otp, otpExpiry: otpExpiresAt }
        });

        await sendEmail(
            email,
            "Reset Your Password - Blanche Noire",
            `<h2>Password Reset OTP</h2>
             <p>Your OTP is: <b>${otp}</b></p>
             <p>Valid for 10 minutes. Do not share this with anyone.</p>`
        );

        return NextResponse.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
    console.error("FULL ERROR:", JSON.stringify(error, null, 2)); // ✅ see real error
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
}
}
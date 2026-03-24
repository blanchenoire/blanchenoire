import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (user.isEmailVerified) {
            return NextResponse.json({ success: true, alreadyVerified: true });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.user.update({
            where: { id: userId },
            data: { otp: otp, otpExpiry: otpExpiresAt }
        });

        await sendEmail(
            user.email,
            "Your OTP - Blanche Noire",
            `<h2>Your OTP is: ${otp}</h2><p>Valid for 10 minutes.</p>`
        );

        return NextResponse.json({ success: true, alreadyVerified: false });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
    }
}
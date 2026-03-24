import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, otp } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (!user.otp || user.otp !== otp) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        if (user.otpExpiry && user.otpExpiry < new Date()) {
            return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: userId },
            data: { isEmailVerified: true, otp: null, otpExpiry: null }
        });

        return NextResponse.json({ success: true, message: "Email verified" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { email, otp, newPassword } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (!user.otp || user.otp !== otp) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        if (user.otpExpiry && user.otpExpiry < new Date()) {
            return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                otp: null,
                otpExpiry: null
            }
        });

        return NextResponse.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.email || !body.password) {
        return NextResponse.json({
            success: false,
            message: "Email and password are required"
        }, { status: 400 })
    }

    try {
        const user = await prisma.user.findFirst({
            where: { email: body.email }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 })
        }

        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 })
        }

        const token = jwt.sign({
            email: user.email,
            userId: user.id,
            role: user.role
        },
            process.env.JWT_SECRET as string,
            { expiresIn: "30d" }
        )

        return NextResponse.json({
            success: true,
            userId: user.id,
            role: user.role,
            token
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 })
    }
}
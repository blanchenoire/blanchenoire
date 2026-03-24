import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const user = await req.json();

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "Enter some data"
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
        })

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Email already exists"
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: hashedPassword,
                contact: user.contact,
                role: "User"
            }
        })

        return NextResponse.json({
            success: true,
            message: "User created",
            data: {
                id: createdUser.id,
                email: createdUser.email,
                username: createdUser.username,
            } // never return password, even hashed
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 })
    }
}
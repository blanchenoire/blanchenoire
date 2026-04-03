import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export default async function POST(req: NextRequest) {
    const admin = verifyAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const adminBody = await req.json();
    if (!adminBody) {
        return NextResponse.json({
            success: false,
            message: "Enter some data"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(adminBody.password, 10);

        const createdAdmin = await prisma.user.create({
            data: {
                email: adminBody.email,
                username: adminBody.username,
                password: hashedPassword,
                contact: adminBody.contact,
                role: "Admin"
            }
        })

        return NextResponse.json({
            success: true,
            message: "Admin created",
            data: {
                id: createdAdmin.id,
                email: createdAdmin.email,
                username: createdAdmin.username,
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while creating admin"
        }, { status: 500 })
    }
}
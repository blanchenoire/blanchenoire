import { categories } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    return NextResponse.json({
        success: true,
        categories: categories,
        message: "Categories fetched Successfully"
    })
}
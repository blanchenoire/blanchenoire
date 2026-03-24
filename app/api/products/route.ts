import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    const products = await prisma.product.findMany()
    if(!products){
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching the products"
        })
    }
    return NextResponse.json({
        data: products,
        success: true,
        message: "Products fetched Successfully"
    })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productName,
      description,
      price,
      category,
      stock,
      productGallery
    } = body;

    const product = await prisma.product.create({
      data: {
        productName,
        description,
        price,
        category,
        stock,
        productGallery
      }
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error creating product"
    });
  }
}
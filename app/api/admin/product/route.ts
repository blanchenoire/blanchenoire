import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/verify";

import { v2 as cloudinary } from "cloudinary";
import { Category } from "@/app/generated/prisma/enums";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const productName = formData.get("productName") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price") as string;
    const category = formData.get("category") as Category;
    const stockRaw = formData.get("stock") as string;
    const images = formData.getAll("images") as File[];
    const bestSeller = formData.get("bestSeller") === "true";

    const price = parseFloat(priceRaw);
    const stock = parseInt(stockRaw) || 0;

    if (!productName || isNaN(price)) {
      return NextResponse.json(
        { error: "Valid productName and price are required" },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // upload images
    const uploadedUrls = await Promise.all(
      images.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "products",
        });

        return result.secure_url;
      })
    );

    const product = await prisma.product.create({
      data: {
        productName,
        description,
        price,
        category,
        stock,
        bestSeller,
        productGallery: uploadedUrls,
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Create Product Error:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error("Fetch Products Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
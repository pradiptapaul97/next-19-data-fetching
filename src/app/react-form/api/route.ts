import { addProduct } from "@/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, price, description } = body;

        if (!title || !price) {
            return NextResponse.json(
                { message: "Title and price are required." },
                { status: 400 }
            );
        }

        const product = await addProduct({
            title,
            price: parseFloat(price),
            description,
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
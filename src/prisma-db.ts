import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function seedProducts() {
    const productCount = await prisma.product.count();

    if (productCount === 0) {
        await prisma.product.createMany({
            data: [
                {
                    title: "Wireless Headphones",
                    price: 99.99,
                    description: "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
                },
                {
                    title: "Gaming Mouse",
                    price: 49.99,
                    description: "Ergonomic design with customizable DPI and RGB lighting.",
                },
                {
                    title: "Mechanical Keyboard",
                    price: 79.99,
                    description: "Tactile switches and full RGB backlighting.",
                },
                {
                    title: "USB-C Charger",
                    price: 19.99,
                    description: "Fast-charging USB-C wall adapter (20W).",
                },
                {
                    title: "Laptop Stand",
                    price: 29.99,
                    description: "Aluminum stand with adjustable height and angle.",
                },
            ],
        });

        console.log("✅ Seeded initial products.");
    } else {
        console.log("ℹ️ Products already exist, skipping seeding.");
    }
}

seedProducts();

// Get all products
export async function getProducts() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await prisma.product.findMany();
}

// Get a single product by ID
export async function getProduct(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await prisma.product.findUnique({
        where: { id },
    });
}

// Add a new product
export async function addProduct(data: {
    title: string;
    price: number;
    description?: string;
}) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await prisma.product.create({
        data,
    });
}

// Update an existing product
export async function updateProduct(id: number, data: {
    title?: string;
    price?: number;
    description?: string;
}) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await prisma.product.update({
        where: { id },
        data,
    });
}

// Delete a product
export async function deleteProduct(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await prisma.product.delete({
        where: { id },
    });
}

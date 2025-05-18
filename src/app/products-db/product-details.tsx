"use client"
import { removeProduct } from "@/actions/products";
import { getProducts } from "@/prisma-db";
import Link from "next/link";
import { useOptimistic } from "react";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export const ProductsDetails = ({ products }: { products: Product[] }) => {

    const [optimisticProducts, setOptimisticProducts] = useOptimistic(products, (currentProducts, productId) => {
        return currentProducts.filter((product) => product.id !== productId)
    });

    const removeProductById = async (productId: number) => {
        setOptimisticProducts(productId)
        await removeProduct(productId)
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <table className="w-full border border-gray-300 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {optimisticProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2"><Link href={`/products-db/${product.id}`}>{product.id}</Link></td>
                            <td className="border px-4 py-2">{product.title}</td>
                            <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                            <td className="border px-4 py-2">{product.description || "—"}</td>
                            <td className="border px-4 py-2">
                                <form action={removeProductById.bind(null, product.id)}>
                                    <input type="hidden" name="id" value={product.id} />
                                    <button
                                        type="submit"
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
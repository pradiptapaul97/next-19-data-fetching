import { getProducts } from "@/prisma-db";
import Link from "next/link";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function ProductsDBPage() {
    const products: Product[] = await getProducts();

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
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2"><Link href={`/products-db/${product.id}`}>{product.id}</Link></td>
                            <td className="border px-4 py-2">{product.title}</td>
                            <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                            <td className="border px-4 py-2">{product.description || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
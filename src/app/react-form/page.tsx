"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/react-form/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, price, description }),
            });

            if (res.ok) {
                setMessage("✅ Product created!");
                setTitle("");
                setPrice("");
                setDescription("");
                router.push("/products-db");
            } else {
                setMessage("❌ Failed to create product.");
            }
        } catch (error) {
            console.error(`Error:${error}`);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4 p-4 border rounded shadow" >
            <h2 className="text-xl font-semibold" > Create Product </h2>
            < input
                className="w-full border px-3 py-2 rounded"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <input
                className="w-full border px-3 py-2 rounded"
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
            />
            <textarea
                className="w-full border px-3 py-2 rounded"
                placeholder="Description (optional)"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Product"}
            </button>
            {message && <p className="text-sm" > {message} </p>}
        </form>
    );
}
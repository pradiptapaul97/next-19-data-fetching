"use client"
import { Submit } from "@/components/submit";
import { useActionState } from "react";
import { FormState, createProduct } from "@/actions/products";



export default function AddProductPage() {

    const initialState: FormState = {
        errors: {}
    }

    const [state, formAction, isPending] = useActionState(createProduct, initialState)



    return (
        <form action={formAction} className="max-w-md space-y-4 p-4 border rounded shadow" >
            <div>
                <h2 className="text-xl font-semibold" > Create Product </h2>
                < input
                    className="w-full border px-3 py-2 rounded"
                    type="text"
                    name="title"
                    placeholder="Title"
                />
                {
                    state.errors.title && <p className="text-red-500" >{state.errors.title}</p>
                }
            </div>
            <div>
                <input
                    className="w-full border px-3 py-2 rounded"
                    type="number"
                    name="price"
                    placeholder="Price"
                />
                {
                    state.errors.price && <p className="text-red-500" >{state.errors.price}</p>
                }
            </div>
            <div>
                <textarea
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Description (optional)"
                    name="description"
                />
                {
                    state.errors.description && <p className="text-red-500" >{state.errors.description}</p>
                }
            </div >
            {/* <Submit /> */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isPending}
            >
                Submit
            </button>
        </form>
    );
}
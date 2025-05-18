"use client"
import { useFormStatus } from "react-dom"

export const Submit = () => {
    const { pending } = useFormStatus();
    return (
        <>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={pending}
            >
                Submit
            </button>
        </>
    )
}
"use client"
import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default function UsersClient() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
                else {
                    setError("An unknown error occurred")
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <>
                <div>Loading......</div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <div>{error}</div>
            </>
        )
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="w-full border border-gray-300 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );


}


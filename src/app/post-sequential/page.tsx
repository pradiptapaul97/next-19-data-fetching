import { Suspense } from "react";
import Author from "./author";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function PostsSequential() {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await response.json();

    const filteredPosts = posts.filter((post) => post.id % 10 === 1)


    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <div
                        key={post.id}
                        className="border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                            <div className="text-sm text-gray-500">Post ID: {post.id}</div>
                            <Suspense fallback={<div className="text-sm text-gray-400">Loading author...</div>}>
                                <Author userId={post.userId} />
                            </Suspense>
                        </div>

                        <div className="text-lg font-semibold mb-1">{post.title}</div>
                        <div className="text-gray-700">{post.body}</div>
                    </div>
                ))}
            </div>
        </main>

    );


}


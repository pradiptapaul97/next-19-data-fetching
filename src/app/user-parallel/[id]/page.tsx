type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type Album = {
    userId: number;
    id: number;
    title: string;
}

async function getUserPosts(userId: string) {

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.json();

}

async function getUserAlbums(userId: string) {

    await new Promise((resolve) => setTimeout(resolve, 4000));
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    return response.json();

}

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postsData = await getUserPosts(id);
    const albumsData = await getUserAlbums(id);

    const [posts, albums] = await Promise.all([postsData, albumsData]);

    return (
        <main className="p-8 space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-4">User Posts</h2>
                <table className="w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post: Post) => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{post.id}</td>
                                <td className="border px-4 py-2">{post.title}</td>
                                <td className="border px-4 py-2">{post.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">User Albums</h2>
                <table className="w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.map((album: Album) => (
                            <tr key={album.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{album.id}</td>
                                <td className="border px-4 py-2">{album.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
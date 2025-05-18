type Author = {
    id: number;
    name: string;
}

export default async function Author({ userId }: { userId: number }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user: Author = await response.json();


    return (
        <>
            <div className="text-sm text-gray-600">
                Author: <span className="font-medium">{user.name}</span>
            </div>
        </>

    );


}
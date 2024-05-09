import { getAllPosts } from "@/lib/api";

interface Post {
  title: string;
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <div>Hello</div>
      {posts.map((post: Post) => (
        <div key={post.title}>{post.title}</div>
      ))}
    </main>
  );
}

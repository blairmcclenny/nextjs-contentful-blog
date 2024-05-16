import { getAllPosts } from "@/lib/queries/blog";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const post = posts?.[0];

  return (
    <main>
      <div>{post?.slug}</div>
    </main>
  );
}

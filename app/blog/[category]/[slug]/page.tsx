import { getPostBySlug, getAllPosts } from "@/lib/queries/blog";
import { notFound } from "next/navigation";

interface Post {
  category: {
    slug: string;
  };
  slug: string;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: Post) => ({
    category: post.category.slug,
    slug: post.slug,
  }));
}

export default async function BlogPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div>{post?.title}</div>
    </main>
  );
}

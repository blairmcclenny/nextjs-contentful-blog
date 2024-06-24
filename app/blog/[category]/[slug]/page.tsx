import Container from "@/components/layout/container"
import renderRichText from "@/components/layout/richText"
import { getPostBySlug, getAllPosts } from "@/lib/queries/blog"
import { notFound } from "next/navigation"

interface Post {
  category: {
    slug: string
  }
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      url: `blog/${params.category}/${params.slug}`,
      title: post?.title,
      description: post?.description,
      images: post?.featuredImage?.url && [
        {
          url: `${post?.featuredImage?.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: post?.featuredImage?.description,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post: Post) => ({
    category: post.category.slug,
    slug: post.slug,
  }))
}

export default async function BlogPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <Container>{renderRichText(post?.body?.json)}</Container>
}

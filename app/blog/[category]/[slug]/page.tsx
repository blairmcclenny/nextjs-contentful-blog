import Container from "@/components/layout/container"
import renderRichText from "@/components/layout/richText"
import { H1 } from "@/components/layout/typography"
import { getPostBySlug, getAllPosts, BlogPost } from "@/lib/queries/blog"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post: BlogPost = await getPostBySlug(params.slug)

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
  const posts: BlogPost[] = await getAllPosts()

  return posts?.map((post: BlogPost) => ({
    category: post.category.slug,
    slug: post.slug,
  }))
}

export default async function BlogPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post: BlogPost = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Container>
      {post?.featuredImage && (
        <Image
          src={post?.featuredImage?.url}
          alt={post?.featuredImage?.description}
          width={post?.featuredImage?.width}
          height={post?.featuredImage?.height}
          className="rounded-2xl object-cover w-full aspect-video"
        />
      )}
      <H1>{post?.title}</H1>
      {renderRichText(post?.body?.json)}
    </Container>
  )
}

import { getAllPosts } from "@/lib/queries/blog"
import { getSiteSettings } from "@/lib/queries/settings"

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()

  return {
    title: "Blog",
    description: "The most recent blog posts",
    openGraph: {
      url: `blog`,
      title: "Blog",
      description: "The most recent blog posts",
      images: siteSettings?.siteImage?.url && [
        {
          url: `${siteSettings?.siteImage?.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: siteSettings?.siteImage?.description,
        },
      ],
    },
  }
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const post = posts?.[0]

  return (
    <>
      <div>{post?.slug}</div>
    </>
  )
}

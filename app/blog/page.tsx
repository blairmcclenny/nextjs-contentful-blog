import Container from "@/components/container"
import { H1 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardHero, CardTitle } from "@/components/ui/card"
import { BlogPost, getAllPosts } from "@/lib/queries/blog"
import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Link from "next/link"

export async function generateMetadata() {
  const siteSettings: SiteSettings = await getSiteSettings()

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
  const posts: BlogPost[] = await getAllPosts()

  if (!posts) return null

  return (
    <Container>
      <H1>Blog</H1>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {posts?.map((post: BlogPost) => (
          <Card key={post?.sys?.id}>
            <Link href={`blog/${post?.category?.slug}/${post?.slug}`}>
              <CardHero image={post?.featuredImage} />
              <CardHeader>
                <CardTitle>{post?.title}</CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
      <div className="mx-auto w-full mt-8 text-center">
        <Button>Load More</Button>
      </div>
    </Container>
  )
}

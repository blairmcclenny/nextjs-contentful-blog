import Container from "@/components/container"
import {
  Card,
  CardFooter,
  CardHeader,
  CardHero,
  CardTitle,
} from "@/components/ui/card"
import { BlogPost, getAllPosts } from "@/lib/queries/blog"
import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"

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
      <div className="grid grid-cols-3 gap-8">
        {posts?.map((post: BlogPost) => (
          <Card key={post?.sys?.id}>
            <CardHero image={post?.featuredImage} />
            <CardHeader>
              <CardTitle>{post?.title}</CardTitle>
            </CardHeader>
            <CardFooter>{post?.category?.title}</CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  )
}

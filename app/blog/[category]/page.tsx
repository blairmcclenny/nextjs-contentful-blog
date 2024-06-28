import Container from "@/components/container"
import { H1 } from "@/components/typography"
import { Card, CardHeader, CardHero, CardTitle } from "@/components/ui/card"
import {
  BlogCategory as Category,
  getAllCategories,
  getCategoryBySlug,
} from "@/lib/queries/blog"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const category: Category = await getCategoryBySlug(params.category)

  return {
    title: category?.title,
    description: category?.description,
    openGraph: {
      url: `blog/${params?.category}`,
      title: category?.title,
      description: category?.description,
      images: category?.featuredImage?.url && [
        {
          url: `${category?.featuredImage?.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: category?.featuredImage?.description,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const categories: Category[] = await getAllCategories()

  return categories?.map((category: Category) => ({
    category: category.slug,
  }))
}

export default async function BlogCategory({
  params,
}: {
  params: { category: string }
}) {
  const category: Category = await getCategoryBySlug(params.category)

  // TODO:
  // get posts of category

  if (!category) {
    notFound()
  }

  return (
    <Container>
      <H1>{category?.title}</H1>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {/* {posts?.map((post: BlogPost) => (
          <Card key={post?.sys?.id}>
            <CardHero image={post?.featuredImage} />
            <CardHeader>
              <CardTitle>{post?.title}</CardTitle>
            </CardHeader>
          </Card>
        ))} */}
      </div>
    </Container>
  )
}

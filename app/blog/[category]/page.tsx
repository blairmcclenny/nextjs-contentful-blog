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

  if (!category) {
    notFound()
  }

  return (
    <>
      <div>{category?.title}</div>
    </>
  )
}

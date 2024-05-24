import { getPageBySlug, getAllPages } from "@/lib/queries/page"
import { notFound } from "next/navigation"
interface Page {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const page = await getPageBySlug(params.slug)

  return {
    title: page?.title,
    description: page?.description,
    openGraph: {
      url: `/${params.slug}`,
      title: page?.title,
      description: page?.description,
      images: page?.featuredImage?.url && [
        {
          url: `${page?.featuredImage?.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: page?.featuredImage?.description,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const pages = await getAllPages()

  return pages.map((page: Page) => ({
    slug: page.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      <div>{page?.title}</div>
    </main>
  )
}

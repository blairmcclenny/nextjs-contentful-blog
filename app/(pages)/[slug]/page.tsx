import Container from "@/components/container"
import renderRichText from "@/components/richText"
import { H1 } from "@/components/typography"
import {
  getPageBySlug,
  getAllPages,
  Page as GenericPage,
} from "@/lib/queries/page"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const page: GenericPage = await getPageBySlug(params.slug)

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
  const pages: GenericPage[] = await getAllPages()

  return pages?.map((page: GenericPage) => ({
    slug: page.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page: GenericPage = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <Container>
      {page?.featuredImage && (
        <Image
          src={page?.featuredImage?.url}
          alt={page?.featuredImage?.description}
          width={page?.featuredImage?.width}
          height={page?.featuredImage?.height}
          className="rounded-2xl object-cover w-full aspect-video"
        />
      )}
      <H1>{page?.title}</H1>
      {renderRichText(page?.body?.json)}
    </Container>
  )
}

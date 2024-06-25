import Container from "@/components/layout/container"
import renderRichText from "@/components/layout/richText"
import { H1 } from "@/components/layout/typography"
import { getHomePage } from "@/lib/queries/page"
import Image from "next/image"

export async function generateMetadata() {
  const homePage = await getHomePage()

  return {
    description: homePage?.description,
    openGraph: {
      url: `/`,
      description: homePage?.description,
      images: homePage?.siteImage?.url && [
        {
          url: `${homePage?.siteImage?.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: homePage?.siteImage?.description,
        },
      ],
    },
  }
}

export default async function Home() {
  const homePage = await getHomePage()

  return (
    <Container>
      {homePage?.featuredImage && (
        <Image
          src={homePage?.featuredImage?.url}
          alt={homePage?.featuredImage?.description}
          width={homePage?.featuredImage?.width}
          height={homePage?.featuredImage?.height}
          className="rounded-2xl object-cover w-full aspect-video"
        />
      )}
      <H1>{homePage?.title}</H1>
      {renderRichText(homePage?.body?.json)}
    </Container>
  )
}

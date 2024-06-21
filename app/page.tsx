import Container from "@/components/layout/container"
import { H1 } from "@/components/layout/typography"
import { getHomePage } from "@/lib/queries/page"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

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
      <H1>{homePage?.title}</H1>
      {homePage?.body && documentToReactComponents(homePage?.body?.json)}
    </Container>
  )
}

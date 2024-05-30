import { getHomePage } from "@/lib/queries/page"

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
    <>
      <h1>{homePage?.title}</h1>
    </>
  )
}

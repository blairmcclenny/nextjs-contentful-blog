import { getHomePage } from "@/lib/queries/page";

export async function generateMetadata() {
  const homePage = await getHomePage();

  return {
    title: homePage?.title,
    description: homePage?.description,
  };
}

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main>
      <div>{homePage?.title}</div>
    </main>
  );
}

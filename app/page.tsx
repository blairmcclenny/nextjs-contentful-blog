import { getHomePage } from "@/lib/queries/page";

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main>
      <div>{homePage?.title}</div>
    </main>
  );
}

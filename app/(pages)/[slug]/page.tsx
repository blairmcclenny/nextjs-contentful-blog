import { getPageBySlug, getAllPageSlugs } from "@/lib/queries/page";
import { notFound } from "next/navigation";

interface Page {
  slug: string;
}

export async function generateStaticParams() {
  const pages = await getAllPageSlugs();

  return pages.map((page: Page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <div>Page: {page?.title}</div>
    </main>
  );
}

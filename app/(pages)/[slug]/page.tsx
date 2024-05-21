import { getPageBySlug, getAllPages } from "@/lib/queries/page";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Page {
  slug: string;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  const parentPage = (await parent) as Metadata;

  return {
    title: page?.title || parentPage?.title,
    description: page?.description || parentPage?.description,
  };
}

export async function generateStaticParams() {
  const pages = await getAllPages();

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
      <div>{page?.title}</div>
    </main>
  );
}

import { getAllCategories, getCategoryBySlug } from "@/lib/queries/blog";
import { notFound } from "next/navigation";

interface Category {
  slug: string;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category: Category) => ({
    category: category.slug,
  }));
}

export default async function BlogCategory({
  params,
}: {
  params: { category: string };
}) {
  const category = await getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <div>{category.title}</div>
    </main>
  );
}

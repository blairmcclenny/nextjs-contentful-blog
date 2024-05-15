import { fetchGraphQL } from "../api";

export async function getAllPageSlugs() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection {
        items {
          slug
        }
      }
    }
  `
  );

  return entries?.data?.pageCollection?.items;
}

export async function getPageBySlug(slug: string) {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }) {
        items {
          title
        }
      }
    }
  `
  );

  return entries?.data?.pageCollection?.items?.[0];
}

import { fetchGraphQL } from "../api";

export async function getAllPosts() {
  const entries = await fetchGraphQL(
    `query {
        blogPostCollection {
          items {
            slug
            category {
              slug
            }
          }
        }
      }
    `
  );

  return entries?.data?.blogPostCollection?.items;
}

export async function getAllCategories() {
  const entries = await fetchGraphQL(
    `query {
        blogCategoryCollection {
          items {
            slug
          }
        }
      }
    `
  );

  return entries?.data?.blogCategoryCollection?.items;
}

export async function getPostBySlug(slug: string) {
  const entries = await fetchGraphQL(
    `query {
        blogPostCollection(where: { slug: "${slug}" }) {
          items {
            title     
          }
        }
      }
    `
  );

  return entries?.data?.blogPostCollection?.items?.[0];
}

export async function getCategoryBySlug(slug: string) {
  const entries = await fetchGraphQL(
    `query {
        blogCategoryCollection(where: { slug: "${slug}" }) {
          items {
            title
          }
        }
      }
    `
  );

  return entries?.data?.blogCategoryCollection?.items?.[0];
}

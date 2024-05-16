import { fetchGraphQL } from "../api";

const PAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  featuredImage {
    url
    width
    height
  }
  body {
    json
  }
  description
`;

export async function getHomePage() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "home" }, limit: 1) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }
  `
  );

  return entries?.data?.pageCollection?.items?.[0];
}

export async function getAllPages() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_not: "home" }) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
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
      pageCollection(where: { slug: "${slug}", slug_not: "home"}, limit: 1) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }
  `
  );

  return entries?.data?.pageCollection?.items?.[0];
}

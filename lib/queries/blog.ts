import { fetchGraphQL } from "../api"

const BLOG_POST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  author {
    name
    slug
  }
  category {
    title
    slug
  }
  featuredImage {
    url
    width
    height
  }
  body {
    json
  }
  description
`

const BLOG_CATEGORY_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
`

export async function getAllPosts() {
  const entries = await fetchGraphQL(
    `query {
        blogPostCollection {
          items {
            ${BLOG_POST_GRAPHQL_FIELDS}
          }
        }
      }
    `
  )

  return entries?.data?.blogPostCollection?.items
}

export async function getPostBySlug(slug: string) {
  const entries = await fetchGraphQL(
    `query {
        blogPostCollection(where: { slug: "${slug}" }, limit: 1) {
          items {
            ${BLOG_POST_GRAPHQL_FIELDS}
          }
        }
      }
    `
  )

  return entries?.data?.blogPostCollection?.items?.[0]
}

export async function getAllCategories() {
  const entries = await fetchGraphQL(
    `query {
        blogCategoryCollection {
          items {
            ${BLOG_CATEGORY_GRAPHQL_FIELDS}
          }
        }
      }
    `
  )

  return entries?.data?.blogCategoryCollection?.items
}

export async function getCategoryBySlug(slug: string) {
  const entries = await fetchGraphQL(
    `query {
        blogCategoryCollection(where: { slug: "${slug}" }, limit: 1) {
          items {
            ${BLOG_CATEGORY_GRAPHQL_FIELDS}
          }
        }
      }
    `
  )

  return entries?.data?.blogCategoryCollection?.items?.[0]
}

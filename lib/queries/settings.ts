import { fetchGraphQL } from "../api"

const LINK_FIELDS = `
  title
  type
  url
  content {
    ... on BlogCategory {
      __typename
      slug
    }
    ... on BlogPost {
      __typename
      slug
      category {
        slug
      }
    }
    ... on Event {
      __typename
      slug
      category {
        slug
      }
    }
    ... on EventCategory {
      __typename
      slug
    }
    ... on Page {
      __typename
      slug
    }
  }
`

const SITE_SETTINGS_FIELDS = `
  title
  siteName
  siteUrl
  siteDescription
  siteImage {
    description
    url
    width
    height
  }
  headerNavigationCollection(limit: 10) {
    items {
      ${LINK_FIELDS}
    }
  }
  footerNavigationCollection(limit: 10) {
    items {
      ${LINK_FIELDS}
    }
  }
  instagram
  youTube
  tikTok
  copyright

`

export async function getSiteSettings() {
  const entries = await fetchGraphQL(
    `query {
      siteSettingsCollection(limit: 1) {
        items {
          ${SITE_SETTINGS_FIELDS}
        }
      }
    }
  `
  )

  return entries?.data?.siteSettingsCollection?.items?.[0]
}

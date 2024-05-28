import { fetchGraphQL } from "../api"

export interface Link {
  sys: {
    id: string
  }
  title: string
  type: "Url" | "Content"
  url: string
  content: {
    __typename: string
    slug: string
    category?: {
      slug: string
    }
  }
}

export interface SiteSettings {
  title: string
  siteName: string
  siteUrl: string
  siteDescription: string
  siteImage: {
    description: string
    url: string
    width: number
    height: number
  }
  headerNavigationCollection: {
    items: Link[]
  }
  footerNavigationCollection: {
    items: Link[]
  }
  instagram: string
  youTube: string
  tikTok: string
}

const LINK_FIELDS = `
  sys {
    id
  }
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

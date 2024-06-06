import { Link } from "@/lib/queries/settings"

export function getFormattedLink(link: Link) {
  if (!link?.type) return ""

  if (link?.type === "Url") return link?.url

  switch (link?.content?.__typename) {
    case "BlogCategory":
      return `/blog/${link?.content?.slug}`
    case "BlogPost":
      return `/blog/${link?.content?.category?.slug}/${link?.content?.slug}`
    case "EventCategory":
      return `/events/${link?.content?.slug}`
    case "Event":
      return `/events/${link?.content?.slug}`
    case "Page":
      return `/${link?.content?.slug}`
    default:
      return ""
  }
}

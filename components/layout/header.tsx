import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Link from "next/link"

export default async function Header() {
  const siteSettings: SiteSettings = await getSiteSettings()
  const navigation = siteSettings?.headerNavigationCollection?.items

  return (
    <header>
      <h1 className="font-serif">{siteSettings?.siteName}</h1>
      <h2>{siteSettings?.siteDescription}</h2>
      <nav>
        <ul>
          {navigation?.map((item) => (
            <li key={item.sys.id}>
              <Link
                href={
                  item?.type && item?.type === "Url"
                    ? item?.url
                    : item?.content?.slug
                }
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

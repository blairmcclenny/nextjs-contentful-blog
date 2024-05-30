import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import { getFormattedLink } from "@/utils/navigation"
import Link from "next/link"

export default async function Navigation() {
  const siteSettings: SiteSettings = await getSiteSettings()
  const navigation = siteSettings?.headerNavigationCollection?.items

  return (
    <>
      <h1 className="font-serif text-3xl italic font-bold">
        <Link href="/">{siteSettings?.siteName}</Link>
      </h1>
      <nav>
        <ul className="flex gap-6 uppercase">
          {navigation?.map((link) => (
            <li key={link?.sys?.id}>
              <Link href={getFormattedLink(link)}>{link?.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

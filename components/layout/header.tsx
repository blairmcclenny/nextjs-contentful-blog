import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import { getFormattedLink } from "@/utils/navigation"
import Link from "next/link"

export default async function Header() {
  const siteSettings: SiteSettings = await getSiteSettings()
  const navigation = siteSettings?.headerNavigationCollection?.items

  return (
    <header className="p-4 bg-[#ffbe98] flex items-center justify-between gap-6">
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
    </header>
  )
}

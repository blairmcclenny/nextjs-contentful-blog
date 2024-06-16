import { getFormattedLink } from "@/utils/navigation"
import { Link as ContentfulLink } from "@/lib/queries/settings"
import Link from "next/link"

export default function DesktopNavigation({
  siteName,
  navigation,
}: {
  siteName: string
  navigation: Array<ContentfulLink>
}) {
  return (
    <div
      className={`py-4 px-16 bg-[#ffbe98] flex items-center justify-between gap-6 `}
    >
      <h1 className="font-serif text-3xl italic font-bold">
        <Link href="/">{siteName}</Link>
      </h1>
      <nav>
        <ul className="flex gap-6 uppercase">
          {navigation?.map((link: ContentfulLink) => (
            <li key={link?.sys?.id}>
              <Link href={getFormattedLink(link)}>{link?.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

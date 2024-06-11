import { Link as ContentfulLink } from "@/lib/queries/settings"
import { getFormattedLink } from "@/utils/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLockBodyScroll, useToggle } from "react-use"

export default function MobileNavigation({
  siteName,
  navigation,
}: {
  siteName: string
  navigation: Array<ContentfulLink>
}) {
  const [showNav, setShowNav] = useState(false)
  // TODO:
  // fix throttle error on scroll
  // toogle use state correctly
  // animate nav open/close
  // make animated close button x
  // main content is broken using flex here

  const [locked, setLocked] = useToggle(false)

  useLockBodyScroll(locked)

  useEffect(() => {
    showNav ? setLocked(true) : setLocked(false)
  }, [showNav])

  return (
    <div className="">
      <div
        className={`p-4 flex items-center justify-between gap-6 bg-[#ffbe98]`}
      >
        <h1 className="font-serif text-3xl italic font-bold">
          <Link href="/">{siteName}</Link>
        </h1>
        <button onClick={() => setShowNav(!showNav)}>Menu</button>
      </div>
      {showNav && (
        <div className="h-full w-full absolute top-0 p-4 bg-[#ffbe98]">
          <nav>
            <ul className="">
              {navigation?.map((link: ContentfulLink) => (
                <li key={link?.sys?.id} onClick={() => setShowNav(false)}>
                  <Link href={getFormattedLink(link)}>{link?.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

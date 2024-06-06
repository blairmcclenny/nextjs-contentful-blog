"use client"

import useMediaQuery from "@/hooks/useMediaQuery"
import useScrollDirection from "@/hooks/useScrollDirection"
import useScrollPosition from "@/hooks/useScrollPosition"
import { Link as ContentfulLink } from "@/lib/queries/settings"
import { getFormattedLink } from "@/utils/navigation"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

export default function Content({
  siteName,
  navigation,
}: {
  siteName: string
  navigation: Array<ContentfulLink>
}) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isDesktop = useMediaQuery("(min-width: 769px)")

  const scrollDirection = useScrollDirection()
  const { y } = useScrollPosition()
  const { ref, entry } = useInView()

  return (
    <header
      ref={ref}
      className={`sticky inset-0 transition-transform duration-300 ease-in-out ${
        scrollDirection === "down" &&
        entry &&
        y > entry?.boundingClientRect?.height
          ? "-translate-y-full"
          : "translate-y-0"
      }`}
    >
      <div
        className={`py-4 px-16 bg-[#ffbe98] flex items-center justify-between gap-6 `}
      >
        <h1 className="font-serif text-3xl italic font-bold">
          <Link href="/">{siteName}</Link>
        </h1>
        {/* desktop nav */}
        {isDesktop && (
          <nav>
            <ul className="flex gap-6 uppercase">
              {navigation?.map((link: ContentfulLink) => (
                <li key={link?.sys?.id}>
                  <Link href={getFormattedLink(link)}>{link?.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {/* mobile nav */}
      </div>
    </header>
  )
}

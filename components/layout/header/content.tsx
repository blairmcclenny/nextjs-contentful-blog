"use client"

import useScrollDirection from "@/hooks/useScrollDirection"
import useScrollPosition from "@/hooks/useScrollPosition"
import { Link as ContentfulLink } from "@/lib/queries/settings"
import { useInView } from "react-intersection-observer"
import { useMedia } from "react-use"
import DesktopNavigation from "./navigation/desktop"
import MobileNavigation from "./navigation/mobile"

export default function Content({
  siteName,
  navigation,
}: {
  siteName: string
  navigation: Array<ContentfulLink>
}) {
  const isMobile = useMedia("(max-width: 768px)", false)
  const isDesktop = useMedia("(min-width: 769px)", false)

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
      {isDesktop && (
        <DesktopNavigation navigation={navigation} siteName={siteName} />
      )}
      {isMobile && (
        <MobileNavigation
          navigation={navigation}
          siteName={siteName}
          headerHeight={entry?.boundingClientRect?.height || 0}
        />
      )}
    </header>
  )
}

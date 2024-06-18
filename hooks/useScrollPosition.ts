import { isBrowser } from "@/utils/helpers"
import { useEffect, useState } from "react"
import { throttle } from "lodash"

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    if (!isBrowser) return

    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
    }, 100)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollPosition
}

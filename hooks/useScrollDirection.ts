import { isBrowser } from "@/lib/utils/helpers"
import { useEffect, useRef, useState } from "react"
import { throttle } from "lodash"

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up")
  const lastScrollPos = useRef(0)

  useEffect(() => {
    if (!isBrowser) return

    const handleScroll = throttle(() => {
      const st = window.scrollY

      st > lastScrollPos.current
        ? setScrollDirection("down")
        : setScrollDirection("up")

      lastScrollPos.current = st <= 0 ? 0 : st
    }, 100)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollDirection
}

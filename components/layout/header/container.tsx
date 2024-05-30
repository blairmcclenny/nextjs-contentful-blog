"use client"

import { throttle } from "@/utils/helpers"
import { useEffect, useRef, useState } from "react"

export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [scrollDirection, setScrollDirection] = useState("up")
  const lastScrollPos = useRef(0)

  const initialRef: any = null
  const headerRef = useRef(initialRef)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const st = window.scrollY

      st > lastScrollPos.current &&
      st > headerRef.current.getBoundingClientRect().height
        ? setScrollDirection("down")
        : setScrollDirection("up")

      lastScrollPos.current = st <= 0 ? 0 : st
    })

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`py-4 px-16 bg-[#ffbe98] flex items-center justify-between gap-6 sticky inset-0 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      } transition-transform duration-300 ease-in-out`}
    >
      {children}
    </header>
  )
}

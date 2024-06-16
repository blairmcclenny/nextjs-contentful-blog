import { Link as ContentfulLink } from "@/lib/queries/settings"
import { getFormattedLink } from "@/utils/navigation"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useLockBodyScroll, useToggle } from "react-use"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

function MenuButton({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: any
}) {
  // TODO:
  // make accessible
  // setMenuOpen type to something other than any

  const menuButtonRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      tl.current = gsap.timeline({
        paused: true,
        defaults: { duration: 0.2, ease: "power1.out" },
      })

      tl.current
        .to([":nth-child(1)", ":nth-child(3"], {
          y: (i) => (i === 0 ? 6 : -6),
        })
        .to(
          ":nth-child(2)",
          {
            opacity: 0,
          },
          "<"
        )
        .to([":nth-child(1)", ":nth-child(3"], {
          rotate: (i) => (i === 0 ? 45 : 135),
        })
    },
    { scope: menuButtonRef }
  )

  useEffect(() => {
    if (!tl.current) return

    menuOpen
      ? tl.current.timeScale(1).play()
      : tl.current.timeScale(1.5).reverse()
  }, [menuOpen])

  return (
    <button className="p-2" onClick={setMenuOpen}>
      <div ref={menuButtonRef}>
        <span className="block w-6 h-0.5 bg-black" />
        <span className="block w-6 h-0.5 bg-black mt-1" />
        <span className="block w-6 h-0.5 bg-black mt-1" />
      </div>
    </button>
  )
}

function Menu({
  navigation,
  height,
  setMenuOpen,
}: {
  navigation: Array<ContentfulLink>
  height: number
  setMenuOpen: any
}) {
  // TODO:
  // make accessible
  // setMenuOpen type to something other than any
  // animate menu close

  const navRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      tl.current = gsap.timeline({
        defaults: { duration: 0.2, ease: "power1.out" },
      })

      tl.current
        .set(navRef.current, {
          opacity: 0,
        })
        .set("ul li", {
          opacity: 0,
          y: 10,
        })
        .to(navRef.current, {
          opacity: 1,
        })
        .to(
          "ul li",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
          },
          "<"
        )
    },
    { scope: navRef }
  )

  return (
    <nav
      className="h-full w-full absolute top-0 px-4 bg-[#ffbe98]"
      style={{
        height: `calc(100vh - ${height}px)`,
        top: `${height}px`,
      }}
      ref={navRef}
    >
      <ul
        className="flex flex-col text-center gap-8 pb-32 h-full uppercase"
        style={{ paddingTop: `max(${128 - height}px, 32px)` }}
      >
        {navigation?.map((link: ContentfulLink) => (
          <li key={link?.sys?.id} onClick={() => setMenuOpen(false)}>
            <Link href={getFormattedLink(link)}>{link?.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function MobileNavigation({
  siteName,
  navigation,
  headerHeight,
}: {
  siteName: string
  navigation: Array<ContentfulLink>
  headerHeight: number
}) {
  // TODO:
  // fix throttle error on scroll
  // main content ui is broken using flex here

  const [menuOpen, setMenuOpen] = useToggle(false)

  useLockBodyScroll(menuOpen)

  return (
    <>
      <div className="p-4 flex items-center justify-between gap-6 bg-[#ffbe98]">
        <h1 className="font-serif text-3xl italic font-bold">
          <Link href="/">{siteName}</Link>
        </h1>
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      {menuOpen && (
        <Menu
          navigation={navigation}
          height={headerHeight}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  )
}

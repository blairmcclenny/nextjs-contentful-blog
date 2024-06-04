import { useEffect, useState } from "react"

export default function useMediaQuery(query: string = "768px") {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)

    function handleChage(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    matchQueryList.addEventListener("change", handleChage)
    setMatches(matchQueryList.matches)

    return () => {
      matchQueryList.removeEventListener("change", handleChage)
    }
  }, [query])

  return matches
}

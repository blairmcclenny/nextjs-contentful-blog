import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Year from "./year"

export default async function Footer() {
  const siteSettings: SiteSettings = await getSiteSettings()

  return (
    <footer className="py-4 px-16 bg-black text-white flex items-center justify-center">
      <p>
        &copy; <Year /> {siteSettings?.siteName}
      </p>
    </footer>
  )
}

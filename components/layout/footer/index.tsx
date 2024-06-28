import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Year from "./year"
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6"

export default async function Footer() {
  const siteSettings: SiteSettings = await getSiteSettings()

  return (
    <footer className="flex flex-col gap-6 pb-8 items-center">
      <nav>
        <ul className="flex gap-8">
          <li>
            <a href={siteSettings?.instagram} target="_blank">
              <FaInstagram size={24} />
            </a>
          </li>
          <li>
            <a href={siteSettings?.tikTok} target="_blank">
              <FaTiktok size={24} />
            </a>
          </li>
          <li>
            <a href={siteSettings?.youTube} target="_blank">
              <FaYoutube size={24} />
            </a>
          </li>
        </ul>
      </nav>
      <p className="text-muted-foreground text-xs">
        &copy; <Year /> {siteSettings?.siteName}
      </p>
    </footer>
  )
}

import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Content from "./content"

export default async function Header() {
  const siteSettings: SiteSettings = await getSiteSettings()

  const siteName = siteSettings?.siteName
  const navigation = siteSettings?.headerNavigationCollection?.items

  return <Content siteName={siteName} navigation={navigation} />
}

import { Inter } from "next/font/google"
import "./globals.css"
import { getSiteSettings } from "@/lib/queries/settings"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()

  return {
    metadataBase: siteSettings?.siteUrl && new URL(siteSettings?.siteUrl),
    title: siteSettings?.siteName && {
      default: siteSettings?.siteName,
      template: `%s | ${siteSettings?.siteName}`,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

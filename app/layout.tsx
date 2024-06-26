import { Open_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { SiteSettings, getSiteSettings } from "@/lib/queries/settings"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
})

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export async function generateMetadata() {
  const siteSettings: SiteSettings = await getSiteSettings()

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
    <html
      className={`${playfair_display.variable} ${open_sans.variable}`}
      lang="en"
    >
      <body className="font-sans text-foreground bg-background flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

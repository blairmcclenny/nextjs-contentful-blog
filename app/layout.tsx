import { Open_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { getSiteSettings } from "@/lib/queries/settings"
import Header from "@/components/layout/header"

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
    <html
      className={`${playfair_display.variable} ${open_sans.variable}`}
      lang="en"
    >
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <footer className="py-4 px-16 bg-black text-white flex items-center justify-center">
          <p>&copy; 2021 Your Company</p>
        </footer>
      </body>
    </html>
  )
}

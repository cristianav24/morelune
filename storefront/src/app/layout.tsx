import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { Toaster } from "react-hot-toast"
import { medusa } from "@/lib/medusa"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tudominio.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BagsStore Perú | Carteras y Bolsos para Mujer",
    template: "%s | BagsStore Perú",
  },
  description:
    "Las mejores carteras y bolsos para mujer en Perú. Envío a Lima y todo el país. Cuero genuino, bolsos de tela, clutches y mochilas con estilo.",
  keywords: [
    "carteras para mujer Peru",
    "bolsos de mujer Lima",
    "carteras de cuero Peru",
    "bolsos de moda Peru",
    "carteras online Peru",
    "comprar bolsos Peru",
    "carteras baratas Lima",
    "tienda de carteras Peru",
  ],
  authors: [{ name: "BagsStore Perú" }],
  creator: "BagsStore Perú",
  publisher: "BagsStore Perú",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "BagsStore Perú",
    title: "BagsStore Perú | Carteras y Bolsos para Mujer",
    description:
      "Las mejores carteras y bolsos para mujer en Perú. Envío a Lima y todo el país.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BagsStore Perú - Carteras y Bolsos para Mujer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BagsStore Perú | Carteras y Bolsos para Mujer",
    description:
      "Las mejores carteras y bolsos para mujer en Perú. Envío a Lima y todo el país.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "es-PE": siteUrl,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#bfa094",
}

async function getNavCategories() {
  try {
    const { product_categories } = await medusa.store.category.list({})
    return product_categories.map((c) => ({
      label: c.name,
      href: `/categoria/${c.handle}`,
    }))
  } catch {
    return []
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navCategories = await getNavCategories()

  return (
    <html lang="es-PE" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <Navbar categories={navCategories} />
        <main>{children}</main>
        <Footer categories={navCategories} />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { fontFamily: "var(--font-inter)" },
            success: { duration: 3000 },
          }}
        />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              name: "BagsStore Perú",
              url: siteUrl,
              description:
                "Tienda online de carteras y bolsos para mujer en Perú",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PE",
                addressLocality: "Lima",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}

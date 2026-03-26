import type { Metadata } from "next"
import { HeroBanner } from "@/components/home/HeroBanner"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { WhyUs } from "@/components/home/WhyUs"
import { medusa } from "@/lib/medusa"

// Página home con SSG + revalidación cada hora
export const revalidate = 3600

async function getFeaturedProducts() {
  try {
    const { products } = await medusa.store.product.list({
      limit: 8,
      region_id: process.env.NEXT_PUBLIC_REGION_ID,
      fields: "*variants,*variants.calculated_price",
    })
    return products
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    const { product_categories } = await medusa.store.category.list({
      include_descendants_tree: false,
    })
    return product_categories
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  return (
    <>
      <HeroBanner />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={products} />
      <WhyUs />

      {/* Schema.org WebSite para sitelinks search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/tienda?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  )
}

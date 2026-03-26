import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { medusa } from "@/lib/medusa"
import { ProductDetails } from "@/components/products/ProductDetails"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

// ISR — revalida cada 30 minutos, bueno para SEO y stock actualizado
export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try {
    const { products } = await medusa.store.product.list({
      handle: slug,
      region_id: process.env.NEXT_PUBLIC_REGION_ID,
      fields:
        "*variants,*variants.calculated_price,*images,*categories,*options,*options.values",
    })
    return products[0] || null
  } catch {
    return null
  }
}

// Genera metadata dinámica por producto — clave para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return { title: "Producto no encontrado" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  const imageUrl = product.thumbnail || `${siteUrl}/og-default.jpg`

  return {
    title: product.title,
    description:
      product.description?.slice(0, 160) ||
      `Compra ${product.title} en BagsStore Perú. Envío a Lima y todo el país.`,
    alternates: {
      canonical: `/tienda/${slug}`,
    },
    openGraph: {
      title: `${product.title} | BagsStore Perú`,
      description: product.description?.slice(0, 160) || "",
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.title }],
      type: "website",
    },
  }
}

// Genera rutas estáticas en build (SSG) para los productos más importantes
export async function generateStaticParams() {
  try {
    const { products } = await medusa.store.product.list({
      limit: 50,
      fields: "handle",
    })
    return products.map((p) => ({ slug: p.handle || "" }))
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const category = product.categories?.[0]

  // Precio mínimo para schema
  const prices = (product.variants ?? [])
    .flatMap((v) => v.calculated_price?.calculated_amount ? [v.calculated_price.calculated_amount] : [])
  const minPrice = prices.length ? Math.min(...prices) : null

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumb
          items={[
            { label: "Tienda", href: "/tienda" },
            ...(category
              ? [
                  {
                    label: category.name,
                    href: `/categoria/${category.handle}`,
                  },
                ]
              : []),
            { label: product.title, href: `/tienda/${slug}` },
          ]}
        />
        <ProductDetails product={product} />
        <RelatedProducts
          categoryId={category?.id}
          excludeId={product.id}
        />
      </div>

      {/* Schema.org Product — fundamental para rich snippets en Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images?.map((i) => i.url) || [product.thumbnail],
            sku: product.variants?.[0]?.sku,
            brand: {
              "@type": "Brand",
              name: "BagsStore Perú",
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "PEN",
              lowPrice: minPrice ? (minPrice / 100).toFixed(2) : undefined,
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "BagsStore Perú",
              },
            },
            ...(category && {
              category: category.name,
            }),
          }),
        }}
      />
    </>
  )
}

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
  const productUrl = `${siteUrl}/tienda/${slug}`
  const fallbackImage = `${siteUrl}/og-default.jpg`

  const description =
    product.description?.slice(0, 160) ||
    `Compra ${product.title} en Morelune Perú. Envío a Lima y todo el país. Pago seguro con Yape, Plin y tarjetas.`

  // Todas las imágenes del producto para OG (primera = thumbnail)
  const ogImages = [
    ...(product.thumbnail
      ? [{ url: product.thumbnail, width: 800, height: 800, alt: product.title as string }]
      : []),
    ...(product.images
      ?.filter((i) => i.url !== product.thumbnail)
      .map((i, idx) => ({
        url: i.url,
        width: 800,
        height: 800,
        alt: `${product.title} - imagen ${idx + 2}`,
      })) || []),
  ]
  if (!ogImages.length) ogImages.push({ url: fallbackImage, width: 1200, height: 630, alt: product.title as string })

  return {
    title: `Comprar ${product.title} en Perú`,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.title} | Morelune Perú`,
      description,
      url: productUrl,
      siteName: "Morelune Perú",
      locale: "es_PE",
      images: ogImages,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Morelune Perú`,
      description,
      images: [ogImages[0].url],
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  const productUrl = `${siteUrl}/tienda/${slug}`

  // Precios para schema
  const prices = (product.variants ?? [])
    .flatMap((v) => v.calculated_price?.calculated_amount ? [v.calculated_price.calculated_amount] : [])
  const minPrice = prices.length ? Math.min(...prices) : null
  const maxPrice = prices.length ? Math.max(...prices) : null

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

      {/* Schema.org Product — rich snippets: precio, disponibilidad, breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": productUrl,
            url: productUrl,
            name: product.title,
            description: product.description,
            image: [
              ...(product.images?.map((i) => i.url) || []),
              ...(product.thumbnail && !product.images?.find((i) => i.url === product.thumbnail)
                ? [product.thumbnail]
                : []),
            ].filter(Boolean),
            sku: product.variants?.[0]?.sku,
            itemCondition: "https://schema.org/NewCondition",
            brand: {
              "@type": "Brand",
              name: "Morelune Perú",
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "PEN",
              lowPrice: minPrice ? (minPrice / 100).toFixed(2) : undefined,
              highPrice: maxPrice ? (maxPrice / 100).toFixed(2) : undefined,
              offerCount: prices.length || 1,
              availability: "https://schema.org/InStock",
              url: productUrl,
              seller: {
                "@type": "Organization",
                name: "Morelune Perú",
                url: siteUrl,
              },
            },
            ...(category && { category: category.name }),
          }),
        }}
      />

      {/* Schema.org BreadcrumbList — muestra la ruta en los resultados de Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Tienda", item: `${siteUrl}/tienda` },
              ...(category
                ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${siteUrl}/categoria/${category.handle}` },
                   { "@type": "ListItem", position: 4, name: product.title, item: productUrl }]
                : [{ "@type": "ListItem", position: 3, name: product.title, item: productUrl }]),
            ],
          }),
        }}
      />
    </>
  )
}

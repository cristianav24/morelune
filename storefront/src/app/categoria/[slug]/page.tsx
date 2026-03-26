import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { medusa } from "@/lib/medusa"
import { ProductGrid } from "@/components/products/ProductGrid"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const revalidate = 600

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ pagina?: string }>
}

async function getCategory(slug: string) {
  try {
    const { product_categories } = await medusa.store.category.list({
      handle: slug,
      include_descendants_tree: false,
    })
    return product_categories[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return { title: "Categoría no encontrada" }

  return {
    title: `${category.name} | Carteras para Mujer Perú`,
    description:
      category.description ||
      `Explora nuestra colección de ${category.name.toLowerCase()} para mujer en Perú. Envío a Lima y todo el país.`,
    alternates: { canonical: `/categoria/${slug}` },
  }
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { pagina } = await searchParams
  const category = await getCategory(slug)

  if (!category) notFound()

  const page = parseInt(pagina || "1") - 1
  const limit = 12

  let products: any[] = []
  let count = 0
  try {
    const result = await medusa.store.product.list({
      category_id: [category.id],
      limit,
      offset: page * limit,
      fields: "*variants,*variants.calculated_price",
      region_id: process.env.NEXT_PUBLIC_REGION_ID,
    })
    products = result.products
    count = result.count || 0
  } catch (err) {
    console.error("[categoria] Error cargando productos:", err)
  }

  return (
    <div className="container-main py-8">
      <Breadcrumb
        items={[
          { label: "Tienda", href: "/tienda" },
          { label: category.name, href: `/categoria/${slug}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-900">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
        <p className="text-sm text-gray-400 mt-1">{count} productos</p>
      </div>

      <ProductGrid products={products} />

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: process.env.NEXT_PUBLIC_SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tienda",
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/tienda`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: category.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  )
}

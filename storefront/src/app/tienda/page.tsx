import type { Metadata } from "next"
import { ProductGrid } from "@/components/products/ProductGrid"
import { FilterSidebar } from "@/components/products/FilterSidebar"
import { medusa } from "@/lib/medusa"

export const metadata: Metadata = {
  title: "Tienda | Carteras y Bolsos para Mujer",
  description:
    "Explora nuestra colección completa de carteras y bolsos para mujer en Perú. Cuero genuino, bolsos de tela, clutches y mochilas con envío a Lima y todo el país.",
  alternates: {
    canonical: "/tienda",
  },
}

// ISR — revalida cada 10 minutos
export const revalidate = 600

interface Props {
  searchParams: Promise<{
    categoria?: string
    q?: string
    pagina?: string
  }>
}

async function getProducts(params: {
  categoria?: string
  q?: string
  pagina?: string
}) {
  try {
    const page = parseInt(params.pagina || "1") - 1
    const limit = 12

    const { products, count } = await medusa.store.product.list({
      limit,
      offset: page * limit,
      region_id: process.env.NEXT_PUBLIC_REGION_ID,
      category_id: params.categoria ? [params.categoria] : undefined,
      q: params.q,
      fields: "*variants,*variants.calculated_price",
    })
    return { products, count: count || 0 }
  } catch (err) {
    console.error("[tienda] Error cargando productos:", err)
    return { products: [], count: 0 }
  }
}

async function getCategories() {
  try {
    const { product_categories } = await medusa.store.category.list({})
    return product_categories
  } catch {
    return []
  }
}

export default async function TiendaPage({ searchParams }: Props) {
  const params = await searchParams
  const [{ products, count }, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ])

  return (
    <div className="container-main py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif text-gray-900">
          {params.q ? `Resultados para "${params.q}"` : "Todas las Carteras"}
        </h1>
        <p className="text-gray-500 mt-1">{count} productos encontrados</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar categories={categories} />
        </aside>

        <div className="flex-1">
          <ProductGrid products={products} />
          {/* TODO: Paginación */}
        </div>
      </div>
    </div>
  )
}

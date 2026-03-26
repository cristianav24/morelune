import { medusa } from "@/lib/medusa"
import { ProductCard } from "./ProductCard"

interface Props {
  categoryId?: string
  excludeId?: string
}

export async function RelatedProducts({ categoryId, excludeId }: Props) {
  if (!categoryId) return null

  let products: any[] = []
  try {
    const result = await medusa.store.product.list({
      category_id: [categoryId],
      limit: 4,
      fields: "id,title,handle,thumbnail,variants",
    })
    products = result.products.filter((p) => p.id !== excludeId).slice(0, 4)
  } catch {
    return null
  }

  if (!products.length) return null

  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      <h2 className="font-serif text-2xl text-gray-900 mb-6">
        También te puede gustar
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

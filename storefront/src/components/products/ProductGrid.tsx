import type { StoreProduct } from "@medusajs/types"
import { ProductCard } from "./ProductCard"

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

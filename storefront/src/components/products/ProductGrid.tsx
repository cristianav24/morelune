import { ProductCard } from "./ProductCard"

interface Product {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  variants?: any[]
}

export function ProductGrid({ products }: { products: Product[] }) {
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

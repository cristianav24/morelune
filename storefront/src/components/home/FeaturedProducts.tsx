import Link from "next/link"
import { ProductCard } from "@/components/products/ProductCard"

interface Product {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  variants?: any[] | null
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section className="py-16 container-main">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-serif text-3xl text-gray-900">
            Productos Destacados
          </h2>
          <p className="text-gray-500 mt-1">Los más vendidos esta semana</p>
        </div>
        <Link
          href="/tienda"
          className="text-accent text-sm font-medium hover:underline hidden md:block"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-8 md:hidden">
        <Link href="/tienda" className="btn-secondary">
          Ver todos los productos
        </Link>
      </div>
    </section>
  )
}

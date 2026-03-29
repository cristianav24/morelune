import Link from "next/link"
import type { StoreProduct } from "@medusajs/types"
import { ProductCard } from "@/components/products/ProductCard"

export function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  if (!products.length) return null

  return (
    <section className="py-20 bg-brand-50">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow">Destacados</p>
            <h2 className="section-title">Productos Destacados</h2>
            <p className="text-brand-500 mt-2 text-sm font-sans">Los más vendidos esta semana</p>
          </div>
          <Link
            href="/tienda"
            className="hidden md:inline-flex items-center gap-1.5 text-primary text-sm font-medium font-sans hover:gap-3 transition-all duration-200"
          >
            Ver todos <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/tienda" className="btn-secondary">
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  )
}

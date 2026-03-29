"use client"

import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { useCartStore } from "@/lib/cart-store"
import type { StoreProduct } from "@medusajs/types"

interface ProductCardProps {
  product: StoreProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const firstVariant = product.variants?.[0]
  const price = firstVariant?.calculated_price?.calculated_amount

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!firstVariant) return
    try {
      await addItem(firstVariant.id, 1)
      toast.success("Añadido al carrito")
    } catch {
      toast.error("Error al añadir al carrito")
    }
  }

  return (
    <Link
      href={`/tienda/${product.handle}`}
      className="product-card group"
      aria-label={`Ver ${product.title}`}
    >
      {/* Image — portrait ratio for fashion bags */}
      <div className="relative aspect-[3/4] bg-brand-100 overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-300 text-xs font-sans">
            Sin imagen
          </div>
        )}

        {/* Quick-add — slides up on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white/95 backdrop-blur-sm text-brand-900 text-xs font-semibold font-sans py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors duration-150 shadow-sm"
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-sm font-medium font-sans text-brand-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        {price != null && (
          <p className="mt-1.5 text-primary font-semibold font-sans text-sm">
            S/ {(price / 100).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  )
}

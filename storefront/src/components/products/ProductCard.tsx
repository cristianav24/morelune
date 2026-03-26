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
      {/* Imagen */}
      <div className="relative aspect-square bg-brand-50">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-300 text-xs">
            Sin imagen
          </div>
        )}

        {/* Botón agregar rápido */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm
                     text-gray-900 text-xs font-medium py-2 rounded-md
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-accent hover:text-white"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        {price != null && (
          <p className="mt-1 text-accent font-semibold text-sm">
            S/ {(price / 100).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  )
}

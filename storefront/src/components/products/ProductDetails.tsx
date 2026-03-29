"use client"

import { useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import { useCartStore } from "@/lib/cart-store"
import type { StoreProduct } from "@medusajs/types"

interface ProductDetailsProps {
  product: StoreProduct
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants?.[0]?.id || ""
  )
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []),
  ]
  const uniqueImages = allImages.filter(
    (img, i, arr) => arr.findIndex((x) => x.url === img.url) === i
  )

  const selectedVariant = product.variants?.find(
    (v) => v.id === selectedVariantId
  )
  const price = selectedVariant?.calculated_price?.calculated_amount

  const handleAddToCart = async () => {
    console.log("[AddToCart] selectedVariantId:", selectedVariantId)
    console.log("[AddToCart] variants:", product.variants)
    if (!selectedVariantId) {
      toast.error("No hay variante seleccionada")
      return
    }
    try {
      await addItem(selectedVariantId, qty)
      toast.success("¡Añadido al carrito!")
    } catch (err) {
      console.error("[AddToCart] Error:", err)
      toast.error("Error al añadir al carrito")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
      {/* Galería */}
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-50">
          {uniqueImages[selectedImage] ? (
            <Image
              src={uniqueImages[selectedImage].url}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-300">
              Sin imagen
            </div>
          )}
        </div>
        {uniqueImages.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {uniqueImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                  i === selectedImage ? "border-accent" : "border-transparent"
                }`}
              >
                <Image src={img.url} alt={`${product.title} - imagen ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="font-serif text-3xl text-gray-900">{product.title}</h1>

        {price != null && (
          <p className="mt-3 text-2xl font-semibold text-accent">
            S/ {(price / 100).toFixed(2)}
          </p>
        )}

        {/* Opciones / variantes */}
        {product.options?.map((option) => (
          <div key={option.id} className="mt-5">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {option.title}:
            </p>
            <div className="flex flex-wrap gap-2">
              {(option.values ?? []).map((val) => {
                const variant = product.variants?.find(
                  (v) => v.options?.some(
                    (o) => o.option?.title === option.title && o.value === val.value
                  )
                )
                const isSelected = variant?.id === selectedVariantId
                return (
                  <button
                    key={val.value}
                    onClick={() => variant && setSelectedVariantId(variant.id)}
                    disabled={!variant}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-white"
                        : "border-gray-300 text-gray-700 hover:border-accent"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {val.value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Cantidad */}
        <div className="mt-6 flex items-center gap-4">
          <p className="text-sm font-medium text-gray-700">Cantidad:</p>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              −
            </button>
            <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={handleAddToCart} className="btn-primary flex-1">
            Agregar al Carrito
          </button>
        </div>

        {/* Descripción */}
        {product.description && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="font-medium text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {/* Metadata del producto (material, dimensiones, etc.) */}
        {product.metadata && Object.keys(product.metadata).length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h2 className="font-medium text-gray-900 mb-3">Características</h2>
            <dl className="space-y-2">
              {Object.entries(product.metadata).map(([key, value]) => (
                <div key={key} className="flex gap-3 text-sm">
                  <dt className="text-gray-500 capitalize min-w-[100px]">{key}:</dt>
                  <dd className="text-gray-900">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-8 flex gap-4 text-xs text-gray-500">
          <span>✓ Envío seguro</span>
          <span>✓ Devolución gratis</span>
          <span>✓ Pago seguro</span>
        </div>
      </div>
    </div>
  )
}

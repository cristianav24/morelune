"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { medusa } from "@/lib/medusa"

export function CartPage() {
  const { cartId, removeItem, updateItem } = useCartStore()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!cartId) { setLoading(false); return }
    medusa.store.cart
      .retrieve(cartId)
      .then(({ cart }) => setCart(cart))
      .finally(() => setLoading(false))
  }, [cartId])

  if (loading) {
    return <div className="container-main py-20 text-center text-gray-400">Cargando carrito...</div>
  }

  const items = cart?.items || []

  if (!items.length) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-6">Aún no has agregado ningún producto.</p>
        <Link href="/tienda" className="btn-primary">Ver Productos</Link>
      </div>
    )
  }

  return (
    <div className="container-main py-10">
      <h1 className="font-serif text-3xl mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-brand-50 flex-shrink-0">
                {item.thumbnail && (
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="80px" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{item.title}</p>
                {item.variant_title && (
                  <p className="text-sm text-gray-400">{item.variant_title}</p>
                )}
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded text-sm">
                    <button className="px-3 py-1 hover:bg-gray-50"
                      onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}>−</button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button className="px-3 py-1 hover:bg-gray-50"
                      onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-accent">
                  S/ {((item.unit_price * item.quantity) / 100).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  S/ {(item.unit_price / 100).toFixed(2)} c/u
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>S/ {((cart?.subtotal || 0) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Envío</span>
                <span className="text-green-600">Calcular en checkout</span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-accent text-lg">
                S/ {((cart?.total || 0) / 100).toFixed(2)}
              </span>
            </div>
            <Link href="/checkout" className="btn-primary w-full text-center block mt-5">
              Proceder al Pago
            </Link>
            <Link href="/tienda" className="block text-center text-sm text-accent mt-3 hover:underline">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

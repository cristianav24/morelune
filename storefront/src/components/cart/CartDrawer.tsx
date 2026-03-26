"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { medusa } from "@/lib/medusa"
import { XMarkIcon } from "@/components/layout/icons"

export function CartDrawer() {
  const { isOpen, closeCart, cartId, itemCount } = useCartStore()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const refreshCart = async () => {
    if (!cartId) return
    const { cart } = await medusa.store.cart.retrieve(cartId)
    setCart(cart)
  }

  useEffect(() => {
    if (isOpen && cartId) {
      setLoading(true)
      refreshCart().finally(() => setLoading(false))
    }
  }, [isOpen, cartId, itemCount])

  const handleRemove = async (lineItemId: string) => {
    if (!cartId) return
    await medusa.store.cart.deleteLineItem(cartId, lineItemId)
    await refreshCart()
    const updatedCart = await medusa.store.cart.retrieve(cartId)
    const count = updatedCart.cart.items?.reduce((s: number, i: any) => s + i.quantity, 0) || 0
    useCartStore.setState({ itemCount: count })
  }

  const handleUpdate = async (lineItemId: string, quantity: number) => {
    if (!cartId) return
    const { cart: updated } = await medusa.store.cart.updateLineItem(cartId, lineItemId, { quantity })
    setCart(updated)
    const count = updated.items?.reduce((s: number, i: any) => s + i.quantity, 0) || 0
    useCartStore.setState({ itemCount: count })
  }

  const items = cart?.items || []
  const subtotal = cart?.subtotal ?? 0

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-serif text-xl">Mi Carrito</h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-gray-900 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 h-[calc(100%-180px)]">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              Cargando...
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm gap-3">
              <p>Tu carrito está vacío</p>
              <button onClick={closeCart} className="text-accent underline text-xs">
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item: any) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-brand-50 flex-shrink-0">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    {item.variant_title && (
                      <p className="text-xs text-gray-400">{item.variant_title}</p>
                    )}
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded text-xs">
                        <button
                          className="px-2 py-1 hover:bg-gray-50"
                          onClick={() =>
                            item.quantity > 1
                              ? handleUpdate(item.id, item.quantity - 1)
                              : handleRemove(item.id)
                          }
                        >
                          −
                        </button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button
                          className="px-2 py-1 hover:bg-gray-50"
                          onClick={() => handleUpdate(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-accent">
                        S/ {((item.unit_price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>S/ {(subtotal / 100).toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Ir al Checkout
            </Link>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="btn-secondary w-full text-center block text-sm"
            >
              Ver Carrito Completo
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

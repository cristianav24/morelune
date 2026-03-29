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
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-950/50 backdrop-blur-[2px] z-40 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 flex flex-col
                    shadow-2xl transform transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-100">
          <div>
            <h2 className="font-serif text-xl text-brand-950">Mi Carrito</h2>
            {items.length > 0 && (
              <p className="text-xs font-sans text-brand-400 mt-0.5">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-2 text-brand-400 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-all duration-150"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-brand-200 border-t-primary rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4 text-center">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-brand-600 text-sm font-medium">Tu carrito está vacío</p>
                <p className="font-sans text-brand-400 text-xs mt-1">Agrega productos para comenzar</p>
              </div>
              <button
                onClick={closeCart}
                className="text-primary text-sm font-sans font-medium hover:underline underline-offset-4"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item: any) => (
                <li key={item.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-brand-50 flex-shrink-0 ring-1 ring-brand-100">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium font-sans text-brand-900 line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    {item.variant_title && (
                      <p className="text-xs font-sans text-brand-400 mt-0.5">{item.variant_title}</p>
                    )}

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-brand-200 rounded-lg overflow-hidden">
                        <button
                          className="w-8 h-7 flex items-center justify-center text-brand-600 hover:bg-brand-50 text-sm font-medium transition-colors"
                          onClick={() =>
                            item.quantity > 1
                              ? handleUpdate(item.id, item.quantity - 1)
                              : handleRemove(item.id)
                          }
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-medium font-sans text-brand-900 border-x border-brand-200">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-7 flex items-center justify-center text-brand-600 hover:bg-brand-50 text-sm font-medium transition-colors"
                          onClick={() => handleUpdate(item.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold font-sans text-primary">
                        S/ {((item.unit_price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — checkout actions */}
        {items.length > 0 && (
          <div className="border-t border-brand-100 px-6 py-5 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-sm font-sans text-brand-600">Subtotal</span>
              <span className="text-base font-semibold font-sans text-brand-950">
                S/ {(subtotal / 100).toFixed(2)}
              </span>
            </div>
            <p className="text-xs font-sans text-brand-400 -mt-1">
              Envío calculado en el checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center"
            >
              Ir al Checkout
            </Link>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="btn-secondary w-full text-center"
            >
              Ver Carrito Completo
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

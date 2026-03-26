"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingBagIcon, MagnifyingGlassIcon, Bars3Icon } from "./icons"
import { useState, useEffect } from "react"

interface NavCategory {
  label: string
  href: string
}

export function Navbar({ categories = [] }: { categories?: NavCategory[] }) {
  const { itemCount, toggleCart } = useCartStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { cartId, setItemCount } = useCartStore()

  useEffect(() => { setMounted(true) }, [])

  // Sincronizar count cuando cartId esté disponible (después de hidratación)
  useEffect(() => {
    if (!cartId) return
    import("@/lib/medusa").then(({ medusa }) => {
      medusa.store.cart.retrieve(cartId)
        .then(({ cart }) => {
          const count = cart.items?.reduce((s, i) => s + i.quantity, 0) || 0
          setItemCount(count)
        })
        .catch(() => {})
    })
  }, [cartId])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl text-brand-800 hover:text-accent transition-colors"
          >
            BagsStore
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/tienda"
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Tienda
            </Link>
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm text-gray-600 hover:text-accent transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <Link
              href="/tienda"
              aria-label="Buscar productos"
              className="text-gray-600 hover:text-accent transition-colors"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleCart}
              aria-label={`Carrito con ${itemCount} productos`}
              className="relative text-gray-600 hover:text-accent transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
          <nav className="container-main py-4 flex flex-col gap-3">
            <Link href="/tienda" className="text-sm font-medium py-1">
              Toda la Tienda
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm text-gray-600 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

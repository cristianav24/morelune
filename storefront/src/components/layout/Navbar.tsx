"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingBagIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "./icons"
import { useState, useEffect } from "react"

interface NavCategory {
  label: string
  href: string
}

export function Navbar({ categories = [] }: { categories?: NavCategory[] }) {
  const { itemCount, toggleCart } = useCartStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartId, setItemCount } = useCartStore()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
    <>
      {/* Announcement bar */}
      <div className="bg-brand-950 text-brand-200 text-xs text-center py-2 px-4 tracking-wide font-sans">
        Envío gratis desde S/&nbsp;150&nbsp;&nbsp;·&nbsp;&nbsp;Devoluciones gratuitas&nbsp;&nbsp;·&nbsp;&nbsp;Pago 100% seguro
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
          scrolled ? "shadow-md" : "border-b border-brand-100"
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-2xl text-brand-900 hover:text-primary transition-colors duration-200"
            >
              Morelune
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/tienda"
                className="px-3 py-2 text-sm font-medium font-sans text-brand-800 hover:text-primary hover:bg-brand-50 rounded-lg transition-all duration-150"
              >
                Tienda
              </Link>
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-3 py-2 text-sm font-sans text-brand-600 hover:text-primary hover:bg-brand-50 rounded-lg transition-all duration-150"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/tienda"
                aria-label="Buscar productos"
                className="p-2.5 text-brand-600 hover:text-primary hover:bg-brand-50 rounded-lg transition-all duration-150"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Link>

              <button
                onClick={toggleCart}
                aria-label={`Carrito con ${itemCount} productos`}
                className="relative p-2.5 text-brand-600 hover:text-primary hover:bg-brand-50 rounded-lg transition-all duration-150"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold font-sans leading-none px-0.5">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2.5 text-brand-600 hover:text-primary hover:bg-brand-50 rounded-lg transition-all duration-150"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
                aria-expanded={mobileOpen}
              >
                {mobileOpen
                  ? <XMarkIcon className="w-5 h-5" />
                  : <Bars3Icon className="w-5 h-5" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-100 bg-white animate-fade-in">
            <nav className="container-main py-3 flex flex-col gap-1">
              <Link
                href="/tienda"
                className="px-3 py-2.5 text-sm font-medium font-sans text-brand-800 hover:text-primary hover:bg-brand-50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Toda la Tienda
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-3 py-2.5 text-sm font-sans text-brand-600 hover:text-primary hover:bg-brand-50 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

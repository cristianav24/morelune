"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { medusa } from "./medusa"

interface CartState {
  cartId: string | null
  itemCount: number
  isOpen: boolean
  setCartId: (id: string) => void
  setItemCount: (count: number) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  initCart: () => Promise<string>
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateItem: (lineItemId: string, quantity: number) => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      itemCount: 0,
      isOpen: false,

      setCartId: (id) => set({ cartId: id }),
      setItemCount: (count) => set({ itemCount: count }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      initCart: async () => {
        const existing = get().cartId
        if (existing) {
          // Verificar que el cart aún existe en el servidor
          try {
            await medusa.store.cart.retrieve(existing)
            return existing
          } catch {
            // Cart inválido, limpiar y crear uno nuevo
            set({ cartId: null })
          }
        }

        const regionId = process.env.NEXT_PUBLIC_REGION_ID || ""
        console.log("[Cart] Creando carrito con region_id:", regionId)
        const { cart } = await medusa.store.cart.create({
          region_id: regionId,
        })
        console.log("[Cart] Carrito creado:", cart.id)
        set({ cartId: cart.id })
        return cart.id
      },

      addItem: async (variantId, quantity) => {
        console.log("[Cart] Agregando variante:", variantId)
        const cartId = await get().initCart()
        const { cart } = await medusa.store.cart.createLineItem(cartId, {
          variant_id: variantId,
          quantity,
        })
        const count = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
        set({ itemCount: count, isOpen: true })
      },

      removeItem: async (lineItemId) => {
        const cartId = get().cartId
        if (!cartId) return
        await medusa.store.cart.deleteLineItem(cartId, lineItemId)
        const { cart } = await medusa.store.cart.retrieve(cartId)
        const count = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
        set({ itemCount: count })
      },

      updateItem: async (lineItemId, quantity) => {
        const cartId = get().cartId
        if (!cartId) return
        const { cart } = await medusa.store.cart.updateLineItem(
          cartId,
          lineItemId,
          { quantity }
        )
        const count = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
        set({ itemCount: count })
      },
    }),
    {
      name: "bags-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
)

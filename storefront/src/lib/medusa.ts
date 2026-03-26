import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  debug: process.env.NODE_ENV === "development",
})

// Tipos auxiliares para el storefront
export type ProductWithVariants = Awaited<
  ReturnType<typeof medusa.store.product.list>
>["products"][number]

export type CartType = Awaited<
  ReturnType<typeof medusa.store.cart.retrieve>
>["cart"]

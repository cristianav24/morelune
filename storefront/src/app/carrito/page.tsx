import type { Metadata } from "next"
import { CartPage } from "@/components/cart/CartPage"

export const metadata: Metadata = {
  title: "Carrito de Compras",
  robots: { index: false, follow: false },
}

export default function Carrito() {
  return <CartPage />
}

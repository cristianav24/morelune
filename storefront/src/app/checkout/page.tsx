import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"

export const metadata: Metadata = {
  title: "Checkout | Finalizar Compra",
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <div className="container-main py-10">
      <h1 className="text-2xl font-serif mb-8">Finalizar Compra</h1>
      <CheckoutForm />
    </div>
  )
}

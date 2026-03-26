import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "¡Pedido Confirmado!",
  robots: { index: false, follow: false },
}

export default function ConfirmacionPage() {
  return (
    <div className="container-main py-20 text-center max-w-lg mx-auto">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="font-serif text-3xl text-gray-900 mb-3">
        ¡Pedido Confirmado!
      </h1>
      <p className="text-gray-500 mb-6">
        Gracias por tu compra. Te enviamos un email de confirmación con los
        detalles de tu pedido y el número de seguimiento cuando despachemos.
      </p>
      <div className="bg-brand-50 rounded-xl p-5 mb-8 text-sm text-gray-600">
        <p>¿Tienes preguntas sobre tu pedido?</p>
        <a
          href="https://api.whatsapp.com/send?phone=51999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-medium hover:underline"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
      <Link href="/tienda" className="btn-primary">
        Seguir Comprando
      </Link>
    </div>
  )
}

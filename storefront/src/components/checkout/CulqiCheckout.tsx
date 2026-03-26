"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface CulqiCheckoutProps {
  amount: number // en soles
  email: string
  onSuccess: (token: string) => void
}

declare global {
  interface Window {
    Culqi: {
      publicKey: string
      amount: number
      currency: string
      description: string
      email: string
      open: () => void
      close: () => void
      token?: { id: string }
      error?: { user_message: string }
    }
    culqi: () => void
  }
}

export function CulqiCheckout({ amount, email, onSuccess }: CulqiCheckoutProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  useEffect(() => {
    if (!scriptLoaded) return

    // Callback global que Culqi llama cuando el usuario completa el pago
    window.culqi = function () {
      if (window.Culqi.token) {
        setProcessing(true)
        onSuccessRef.current(window.Culqi.token.id)
      } else if (window.Culqi.error) {
        console.error("Culqi error:", window.Culqi.error.user_message)
      }
    }
  }, [scriptLoaded])

  const openCulqi = () => {
    if (!window.Culqi) return
    window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || ""
    window.Culqi.amount = Math.round(amount * 100) // Culqi usa centavos
    window.Culqi.currency = "PEN"
    window.Culqi.description = "Compra en BagsStore Perú"
    window.Culqi.email = email
    window.Culqi.open()
  }

  return (
    <>
      <Script
        src="https://checkout.culqi.com/js/v4"
        onLoad={() => setScriptLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="space-y-4">
        {/* Métodos de pago aceptados */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-3">Métodos aceptados:</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {["Visa", "Mastercard", "American Express", "Yape", "Plin"].map((m) => (
              <span key={m} className="bg-gray-100 px-3 py-1 rounded-full">{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 flex items-start gap-2">
          <span>🔒</span>
          <p>Tu pago está protegido con cifrado SSL. Procesado de forma segura por Culqi.</p>
        </div>

        <button
          onClick={openCulqi}
          disabled={!scriptLoaded || processing}
          className="btn-primary w-full text-lg py-4 disabled:opacity-50"
        >
          {processing ? "Procesando..." : `Pagar S/ ${amount.toFixed(2)}`}
        </button>
      </div>
    </>
  )
}

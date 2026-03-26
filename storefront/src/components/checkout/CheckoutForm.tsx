"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useCartStore } from "@/lib/cart-store"
import { medusa } from "@/lib/medusa"
import { CulqiCheckout } from "./CulqiCheckout"

type Step = "info" | "shipping" | "payment"

export function CheckoutForm() {
  const router = useRouter()
  const { cartId, setItemCount } = useCartStore()
  const [step, setStep] = useState<Step>("info")
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [selectedShipping, setSelectedShipping] = useState<any>(null)

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address_1: "",
    city: "Lima",
    province: "Lima",
    country_code: "pe",
    phone: "",
  })

  useEffect(() => {
    if (!cartId) { setLoading(false); return }
    medusa.store.cart
      .retrieve(cartId)
      .then(({ cart }) => setCart(cart))
      .finally(() => setLoading(false))
  }, [cartId])

  // Cargar opciones de envío reales de Medusa
  const loadShippingOptions = async () => {
    if (!cartId) return
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/shipping-options?cart_id=${cartId}`,
        {
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        }
      )
      const data = await res.json()
      const options = data.shipping_options || []
      setShippingOptions(options)
      if (options.length > 0) setSelectedShipping(options[0])
    } catch {
      toast.error("No se pudieron cargar las opciones de envío")
    }
  }

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cartId) return
    try {
      await medusa.store.cart.update(cartId, {
        email: form.email,
        shipping_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_1: form.address_1,
          city: form.city,
          province: form.province,
          country_code: form.country_code,
          phone: form.phone,
        },
      })
      await loadShippingOptions()
      setStep("shipping")
    } catch {
      toast.error("Error al guardar la dirección")
    }
  }

  const handleShippingSubmit = async () => {
    if (!cartId || !selectedShipping) return
    try {
      const { cart: updated } = await medusa.store.cart.addShippingMethod(cartId, {
        option_id: selectedShipping.id,
      })
      setCart(updated)
      setStep("payment")
    } catch {
      toast.error("Error al seleccionar el envío")
    }
  }

  const handlePaymentSuccess = async (culqiToken: string) => {
    if (!cartId || !cart) return
    try {
      await medusa.store.payment.initiatePaymentSession(cart, {
        provider_id: "pp_culqi_culqi",
      })
      await medusa.store.cart.complete(cartId)
      setItemCount(0)
      toast.success("¡Pago exitoso! Tu pedido ha sido confirmado.")
      router.push("/checkout/confirmacion")
    } catch {
      toast.error("Error al procesar el pago. Intenta de nuevo.")
    }
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Cargando...</div>
  }

  const subtotal = (cart?.subtotal || 0) / 100
  const shippingTotal = (cart?.shipping_total || 0) / 100
  const total = (cart?.total || 0) / 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Formulario */}
      <div className="lg:col-span-2">
        {/* Steps */}
        <div className="flex items-center gap-3 mb-8 text-sm">
          {(["info", "shipping", "payment"] as Step[]).map((s, i) => (
            <span key={s} className={`flex items-center gap-2 ${step === s ? "text-accent font-medium" : "text-gray-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === s ? "bg-accent text-white" : "bg-gray-200"}`}>{i + 1}</span>
              {s === "info" ? "Datos" : s === "shipping" ? "Envío" : "Pago"}
            </span>
          ))}
        </div>

        {step === "info" && (
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <h2 className="font-semibold text-lg mb-4">Información de contacto y envío</h2>
            <input required type="email" placeholder="Email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Nombre" value={form.first_name}
                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input required placeholder="Apellido" value={form.last_name}
                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <input required placeholder="Dirección (Ej: Av. Javier Prado 1234)" value={form.address_1}
              onChange={e => setForm(f => ({ ...f, address_1: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Distrito / Ciudad" value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input required placeholder="Departamento" value={form.province}
                onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <input placeholder="Teléfono / WhatsApp" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <button type="submit" className="btn-primary w-full">
              Continuar →
            </button>
          </form>
        )}

        {step === "shipping" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">Método de envío</h2>
            {shippingOptions.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay opciones de envío disponibles.</p>
            ) : (
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label key={option.id}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                      selectedShipping?.id === option.id ? "border-accent bg-accent/5" : "border-gray-200 hover:border-accent"
                    }`}>
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping?.id === option.id}
                      onChange={() => setSelectedShipping(option)}
                      className="accent-accent"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{option.name}</p>
                    </div>
                    <span className="font-semibold text-sm text-accent">
                      S/ {((option.calculated_price?.calculated_amount || 0) / 100).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            )}
            <button
              className="btn-primary w-full mt-6"
              onClick={handleShippingSubmit}
              disabled={!selectedShipping}
            >
              Continuar al Pago →
            </button>
          </div>
        )}

        {step === "payment" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">Pago seguro con Culqi</h2>
            <CulqiCheckout
              amount={total}
              email={form.email}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}
      </div>

      {/* Resumen */}
      <div className="lg:col-span-1">
        <div className="bg-brand-50 rounded-xl p-5 sticky top-24">
          <h3 className="font-semibold mb-4">Resumen</h3>
          <div className="space-y-2 text-sm">
            {cart?.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{item.title} ×{item.quantity}</span>
                <span className="flex-shrink-0">S/ {((item.unit_price * item.quantity) / 100).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            {shippingTotal > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span>S/ {shippingTotal.toFixed(2)}</span>
              </div>
            )}
            {selectedShipping && shippingTotal === 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span>S/ {((selectedShipping.calculated_price?.calculated_amount || 0) / 100).toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-accent">S/ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

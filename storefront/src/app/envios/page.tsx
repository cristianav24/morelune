import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const metadata: Metadata = {
  title: "Envíos y Devoluciones",
  description:
    "Información sobre envíos a Lima y todo el Perú, tiempos de entrega y política de devoluciones de Morelune Perú.",
}

const sections = [
  {
    title: "Envíos a todo el Perú",
    items: [
      {
        q: "¿A dónde envían?",
        a: "Enviamos a Lima Metropolitana y a todos los departamentos del Perú a través de operadores logísticos nacionales como Olva Courier, Shalom y otros.",
      },
      {
        q: "¿Cuánto demora el envío?",
        a: "Lima Metropolitana: 1 a 2 días hábiles. Provincias: 3 a 5 días hábiles dependiendo de la ubicación.",
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: "El costo de envío se calcula al momento del checkout según tu distrito. Los pedidos con un subtotal mayor a S/ 150 tienen envío GRATIS a Lima Metropolitana.",
      },
      {
        q: "¿Cómo puedo rastrear mi pedido?",
        a: "Una vez despachado tu pedido, te enviaremos por WhatsApp el número de guía y el operador logístico para que puedas rastrearlo en tiempo real.",
      },
    ],
  },
  {
    title: "Devoluciones y cambios",
    items: [
      {
        q: "¿Puedo devolver un producto?",
        a: "Sí. Aceptamos devoluciones dentro de los 7 días calendario desde la recepción del producto, siempre que esté en su estado original, sin uso y con todas sus etiquetas.",
      },
      {
        q: "¿Cómo solicito una devolución?",
        a: "Escríbenos por WhatsApp al +51 934 939 934 indicando tu número de pedido y el motivo. Nuestro equipo te guiará en el proceso.",
      },
      {
        q: "¿Cuándo recibo mi reembolso?",
        a: "Una vez recibido y verificado el producto, procesamos el reembolso en un plazo de 3 a 5 días hábiles al mismo método de pago original.",
      },
      {
        q: "¿Qué productos no tienen devolución?",
        a: "No aceptamos devoluciones en productos en oferta, productos personalizados ni artículos que hayan sido usados o dañados por el cliente.",
      },
    ],
  },
  {
    title: "Productos dañados o incorrectos",
    items: [
      {
        q: "¿Qué hago si recibo un producto dañado?",
        a: "Contáctanos dentro de las 48 horas de recibido el producto con fotos del daño. Coordinaremos el cambio o reembolso sin costo adicional para ti.",
      },
      {
        q: "¿Qué pasa si me enviaron el producto equivocado?",
        a: "Pedimos disculpas por el inconveniente. Escríbenos de inmediato y gestionamos el cambio por el producto correcto asumiendo nosotros el costo del envío.",
      },
    ],
  },
]

export default function EnviosPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-100">
        <div className="container-main py-10">
          <Breadcrumb items={[{ label: "Envíos y Devoluciones", href: "/envios" }]} />
          <h1 className="font-serif text-3xl md:text-4xl text-brand-950">
            Envíos y Devoluciones
          </h1>
          <p className="mt-3 text-brand-500 font-sans text-base max-w-xl">
            Todo lo que necesitas saber sobre los tiempos de entrega, costos y nuestra política de devoluciones.
          </p>
        </div>
      </div>

      {/* Banner envío gratis */}
      <div className="bg-primary/10 border-y border-primary/20">
        <div className="container-main py-4">
          <p className="font-sans text-sm text-primary font-semibold text-center">
            🚚 Envío GRATIS en pedidos mayores a S/ 150 dentro de Lima Metropolitana
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl text-brand-900 mb-6 pb-3 border-b border-brand-200">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.q} className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-brand-100">
                    <h3 className="font-sans font-semibold text-brand-900 mb-2">{item.q}</h3>
                    <p className="font-sans text-brand-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA contacto */}
          <div className="bg-brand-950 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl text-white mb-2">¿Tienes más dudas?</h3>
            <p className="font-sans text-brand-400 text-sm mb-5">
              Nuestro equipo está disponible de lunes a sábado de 9am a 7pm.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=51934939934&text=Hola%2C%20tengo%20una%20consulta%20sobre%20un%20env%C3%ADo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

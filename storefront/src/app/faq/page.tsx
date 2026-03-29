import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Resolvemos tus dudas sobre productos, pagos, envíos y más en Morelune Perú.",
}

const faqs = [
  {
    category: "Productos",
    items: [
      {
        q: "¿Los productos son de cuero genuino?",
        a: "Sí. Todos nuestros bolsos y carteras están fabricados con cuero vacuno genuino de primera capa o cuero vegetal curtido, según el modelo. Cada producto indica el tipo de material en su descripción.",
      },
      {
        q: "¿Las imágenes representan el color real del producto?",
        a: "Hacemos todo lo posible para que las fotos sean lo más fieles posible. Sin embargo, el color puede variar ligeramente según la pantalla de tu dispositivo. Si tienes dudas sobre un color específico, escríbenos por WhatsApp.",
      },
      {
        q: "¿Tienen tienda física?",
        a: "Por ahora somos 100% tienda online, lo que nos permite ofrecerte los mejores precios sin costos de local. Trabajamos con envíos a todo el Perú.",
      },
      {
        q: "¿Puedo ver más fotos de un producto?",
        a: "Escríbenos al WhatsApp +51 934 939 934 con el nombre del producto y te enviamos fotos adicionales con gusto.",
      },
    ],
  },
  {
    category: "Pagos",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de débito y crédito Visa y Mastercard, así como Yape y Plin. Todos los pagos son procesados de forma segura a través de Culqi.",
      },
      {
        q: "¿Es seguro pagar en su tienda?",
        a: "Sí. Utilizamos Culqi como pasarela de pago, una plataforma certificada con encriptación SSL de 256 bits. En ningún momento guardamos los datos de tu tarjeta.",
      },
      {
        q: "¿Puedo pagar contra entrega?",
        a: "Actualmente no ofrecemos pago contra entrega. Todos los pagos deben realizarse al momento de la compra.",
      },
      {
        q: "¿Emiten factura o boleta?",
        a: "Sí. Al finalizar tu compra puedes indicar si deseas boleta o factura. Para factura necesitamos tu RUC y razón social.",
      },
    ],
  },
  {
    category: "Envíos",
    items: [
      {
        q: "¿Cuánto demora el envío a Lima?",
        a: "Los pedidos en Lima Metropolitana llegan en 1 a 2 días hábiles. Los pedidos realizados antes de las 12pm del mismo día se procesan ese día.",
      },
      {
        q: "¿Envían a provincias?",
        a: "Sí, enviamos a todos los departamentos del Perú. El tiempo de entrega en provincias es de 3 a 5 días hábiles dependiendo de la ubicación.",
      },
      {
        q: "¿Cuándo es el envío gratis?",
        a: "El envío es GRATIS para pedidos con subtotal mayor a S/ 150 dentro de Lima Metropolitana.",
      },
      {
        q: "¿Cómo sé dónde está mi pedido?",
        a: "Una vez despachado, te enviamos el número de guía por WhatsApp para que puedas rastrearlo con el operador logístico.",
      },
    ],
  },
  {
    category: "Devoluciones",
    items: [
      {
        q: "¿Puedo cambiar o devolver mi compra?",
        a: "Aceptamos cambios y devoluciones dentro de los 7 días calendario desde la recepción, siempre que el producto esté en su estado original con etiquetas.",
      },
      {
        q: "¿Cómo inicio una devolución?",
        a: "Escríbenos al WhatsApp +51 934 939 934 con tu número de pedido y el motivo de la devolución. Te guiaremos en todo el proceso.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-100">
        <div className="container-main py-10">
          <Breadcrumb items={[{ label: "Preguntas Frecuentes", href: "/faq" }]} />
          <h1 className="font-serif text-3xl md:text-4xl text-brand-950">
            Preguntas Frecuentes
          </h1>
          <p className="mt-3 text-brand-500 font-sans text-base max-w-xl">
            Encuentra respuestas rápidas a las consultas más comunes. Si no encuentras lo que buscas, escríbenos.
          </p>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 className="font-serif text-2xl text-brand-900 mb-6 pb-3 border-b border-brand-200">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white rounded-xl ring-1 ring-brand-100 shadow-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-sans font-semibold text-brand-900 hover:bg-brand-50 transition-colors">
                      <span>{item.q}</span>
                      <span className="text-primary text-lg font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-5 pt-1">
                      <p className="font-sans text-brand-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="bg-brand-950 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl text-white mb-2">¿No encontraste tu respuesta?</h3>
            <p className="font-sans text-brand-400 text-sm mb-5">
              Estamos aquí para ayudarte de lunes a sábado de 9am a 7pm.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=51934939934&text=Hola%2C%20tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

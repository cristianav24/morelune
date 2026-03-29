import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de la tienda online Morelune Perú.",
}

const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al acceder y utilizar el sitio web de Morelune Perú, aceptas quedar vinculado por los presentes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestros servicios.",
  },
  {
    title: "2. Descripción del servicio",
    body: "Morelune Perú es una tienda online dedicada a la venta de carteras, bolsos y accesorios de cuero para mujer. Operamos exclusivamente a través de nuestra plataforma digital y realizamos envíos a todo el territorio peruano.",
  },
  {
    title: "3. Registro y cuenta de usuario",
    body: "Para realizar una compra no es necesario crear una cuenta. Sin embargo, te recomendamos proporcionar datos verídicos y actualizados al completar el formulario de checkout. Eres responsable de mantener la confidencialidad de tus datos de acceso.",
  },
  {
    title: "4. Productos y precios",
    body: "Todos los precios están expresados en Soles Peruanos (S/) e incluyen IGV. Nos reservamos el derecho de modificar precios en cualquier momento sin previo aviso. El precio vigente al momento de confirmar el pedido es el que se aplicará a tu compra.",
  },
  {
    title: "5. Proceso de compra",
    body: "Al confirmar un pedido, declaras que los datos proporcionados son correctos y que aceptas el precio, descripción del producto y condiciones de entrega. Morelune Perú se reserva el derecho de cancelar pedidos en casos de error de precio, agotamiento de stock o indicios de fraude.",
  },
  {
    title: "6. Pagos",
    body: "Los pagos se procesan a través de Culqi, pasarela de pago certificada y segura. Aceptamos tarjetas Visa, Mastercard, Yape y Plin. En ningún caso almacenamos los datos de tu tarjeta.",
  },
  {
    title: "7. Envíos",
    body: "Los plazos de entrega son estimados y pueden variar por factores externos (feriados, condiciones climáticas, huelgas de transportistas). Morelune Perú no se responsabiliza por retrasos causados por terceros operadores logísticos.",
  },
  {
    title: "8. Devoluciones",
    body: "Nuestra política de devoluciones permite la devolución de productos en un plazo de 7 días calendario desde la recepción, siempre que estén en su estado original. Para más detalle, revisa nuestra página de Envíos y Devoluciones.",
  },
  {
    title: "9. Propiedad intelectual",
    body: "Todos los contenidos del sitio (imágenes, textos, logotipos, diseños) son propiedad de Morelune Perú o de sus proveedores y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.",
  },
  {
    title: "10. Limitación de responsabilidad",
    body: "Morelune Perú no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de nuestros productos o servicios. Nuestra responsabilidad máxima no excederá el valor del pedido en cuestión.",
  },
  {
    title: "11. Modificaciones",
    body: "Nos reservamos el derecho de actualizar estos términos en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas en este sitio. El uso continuado de nuestra tienda implica la aceptación de los nuevos términos.",
  },
  {
    title: "12. Ley aplicable",
    body: "Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a la jurisdicción de los tribunales de la ciudad de Lima.",
  },
]

export default function TerminosPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      <div className="bg-white border-b border-brand-100">
        <div className="container-main py-10">
          <Breadcrumb items={[{ label: "Términos y Condiciones", href: "/terminos" }]} />
          <h1 className="font-serif text-3xl md:text-4xl text-brand-950">
            Términos y Condiciones
          </h1>
          <p className="mt-3 text-brand-500 font-sans text-sm">
            Última actualización: marzo 2025
          </p>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl ring-1 ring-brand-100 shadow-sm divide-y divide-brand-100">
            {sections.map((s) => (
              <div key={s.title} className="px-8 py-6">
                <h2 className="font-sans font-semibold text-brand-900 mb-2">{s.title}</h2>
                <p className="font-sans text-brand-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-sans text-xs text-brand-400">
            ¿Tienes preguntas sobre nuestros términos?{" "}
            <a
              href="https://api.whatsapp.com/send?phone=51934939934"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

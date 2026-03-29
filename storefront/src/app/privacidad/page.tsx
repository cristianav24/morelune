import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo Morelune Perú recopila, usa y protege tu información personal.",
}

const sections = [
  {
    title: "1. Responsable del tratamiento",
    body: "Morelune Perú es el responsable del tratamiento de los datos personales recopilados a través de este sitio web. Para cualquier consulta relacionada con tu privacidad, puedes contactarnos al WhatsApp +51 934 939 934.",
  },
  {
    title: "2. Datos que recopilamos",
    body: "Recopilamos los datos que tú mismo nos proporcionas al realizar una compra o contactarnos: nombre completo, dirección de entrega, número de teléfono, correo electrónico y datos necesarios para el procesamiento del pago (gestionados directamente por Culqi). También recopilamos datos de navegación de forma anónima mediante cookies.",
  },
  {
    title: "3. Finalidad del tratamiento",
    body: "Utilizamos tus datos para: (a) procesar y gestionar tus pedidos, (b) enviarte confirmaciones y actualizaciones sobre tu compra, (c) coordinar la entrega con los operadores logísticos, (d) mejorar nuestros servicios y experiencia de compra, (e) cumplir obligaciones legales y tributarias.",
  },
  {
    title: "4. Base legal",
    body: "El tratamiento de tus datos se basa en la ejecución del contrato de compraventa que celebras con nosotros al realizar un pedido, y en el cumplimiento de las obligaciones legales aplicables en el Perú (Ley N° 29733 – Ley de Protección de Datos Personales).",
  },
  {
    title: "5. Compartir datos con terceros",
    body: "Compartimos tus datos únicamente con: (a) operadores logísticos para realizar la entrega de tu pedido, (b) Culqi para el procesamiento seguro de pagos, (c) proveedores de servicios tecnológicos que nos ayudan a operar la tienda. No vendemos ni cedemos tus datos a terceros con fines comerciales.",
  },
  {
    title: "6. Conservación de datos",
    body: "Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades descritas y durante los plazos exigidos por la legislación tributaria y comercial peruana. Los datos de navegación anónimos se conservan por un máximo de 12 meses.",
  },
  {
    title: "7. Tus derechos",
    body: "Como titular de los datos, tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales (derechos ARCO). Para ejercer cualquiera de estos derechos, contáctanos al WhatsApp +51 934 939 934 o al correo hola@morelunepe.com.",
  },
  {
    title: "8. Cookies",
    body: "Utilizamos cookies propias para el funcionamiento básico de la tienda (carrito de compras, sesión) y cookies de terceros para analítica web (Google Analytics). Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.",
  },
  {
    title: "9. Seguridad",
    body: "Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos contra accesos no autorizados, pérdida o alteración. Las transmisiones de datos sensibles se realizan mediante protocolos SSL cifrados.",
  },
  {
    title: "10. Cambios en esta política",
    body: "Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos publicando la nueva versión en esta página con la fecha de actualización correspondiente.",
  },
]

export default function PrivacidadPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      <div className="bg-white border-b border-brand-100">
        <div className="container-main py-10">
          <Breadcrumb items={[{ label: "Política de Privacidad", href: "/privacidad" }]} />
          <h1 className="font-serif text-3xl md:text-4xl text-brand-950">
            Política de Privacidad
          </h1>
          <p className="mt-3 text-brand-500 font-sans text-sm">
            Última actualización: marzo 2025 · Ley N° 29733 – Perú
          </p>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary/8 border border-primary/20 rounded-xl px-6 py-4 mb-8">
            <p className="font-sans text-sm text-brand-800 leading-relaxed">
              <strong>En resumen:</strong> Solo recopilamos los datos necesarios para procesar tu pedido. No vendemos tu información a terceros. Puedes solicitar la eliminación de tus datos en cualquier momento.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-brand-100 shadow-sm divide-y divide-brand-100">
            {sections.map((s) => (
              <div key={s.title} className="px-8 py-6">
                <h2 className="font-sans font-semibold text-brand-900 mb-2">{s.title}</h2>
                <p className="font-sans text-brand-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-sans text-xs text-brand-400">
            ¿Tienes preguntas sobre tu privacidad?{" "}
            <a
              href="https://api.whatsapp.com/send?phone=51934939934"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Escríbenos
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

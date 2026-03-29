import type { Metadata } from "next"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Comunícate con Morelune Perú por WhatsApp, email o redes sociales. Atención de lunes a sábado.",
}

const channels = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+51 934 939 934",
    href: "https://api.whatsapp.com/send?phone=51934939934&text=Hola%2C%20me%20comunico%20desde%20la%20tienda%20Morelune",
    description: "Respuesta rápida · Lun–Sáb 9am–7pm",
    cta: "Abrir chat",
    highlight: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "hola@morelunepe.com",
    href: "mailto:hola@morelunepe.com",
    description: "Respuesta en menos de 24 horas",
    cta: "Enviar email",
    highlight: false,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    value: "@morelunepe",
    href: "https://www.instagram.com/",
    description: "Síguenos para novedades y ofertas",
    cta: "Ver perfil",
    highlight: false,
  },
]

export default function ContactoPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-100">
        <div className="container-main py-10">
          <Breadcrumb items={[{ label: "Contáctanos", href: "/contacto" }]} />
          <h1 className="font-serif text-3xl md:text-4xl text-brand-950">
            Contáctanos
          </h1>
          <p className="mt-3 text-brand-500 font-sans text-base max-w-xl">
            Estamos aquí para ayudarte. Elige el canal que prefieras y te respondemos a la brevedad.
          </p>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {channels.map((ch) => (
              <div
                key={ch.label}
                className={`relative rounded-2xl p-6 flex flex-col gap-4 ${
                  ch.highlight
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white ring-1 ring-brand-100 shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ch.highlight ? "bg-white/20" : "bg-brand-50"}`}>
                  <span className={ch.highlight ? "text-white" : "text-primary"}>
                    {ch.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-sans font-semibold uppercase tracking-widest mb-1 ${ch.highlight ? "text-white/70" : "text-brand-400"}`}>
                    {ch.label}
                  </p>
                  <p className={`font-sans font-semibold text-sm ${ch.highlight ? "text-white" : "text-brand-900"}`}>
                    {ch.value}
                  </p>
                  <p className={`font-sans text-xs mt-1 ${ch.highlight ? "text-white/70" : "text-brand-400"}`}>
                    {ch.description}
                  </p>
                </div>
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium font-sans transition-all duration-150 ${
                    ch.highlight
                      ? "text-white underline underline-offset-4 hover:no-underline"
                      : "text-primary hover:underline underline-offset-4"
                  }`}
                >
                  {ch.cta} →
                </a>
              </div>
            ))}
          </div>

          {/* Horario de atención */}
          <div className="bg-white rounded-2xl ring-1 ring-brand-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-brand-100">
              <h2 className="font-serif text-xl text-brand-900">Horario de atención</h2>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-2 gap-y-3 text-sm font-sans">
                {[
                  ["Lunes – Viernes", "9:00 am – 7:00 pm"],
                  ["Sábado", "9:00 am – 3:00 pm"],
                  ["Domingo", "Cerrado"],
                ].map(([day, hours]) => (
                  <div key={day} className="contents">
                    <span className="text-brand-500">{day}</span>
                    <span className={`font-medium ${hours === "Cerrado" ? "text-brand-300" : "text-brand-900"}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-sans text-brand-400">
                * Respondemos por WhatsApp dentro del horario indicado. Fuera de horario te responderemos el siguiente día hábil.
              </p>
            </div>
          </div>

          {/* Info adicional */}
          <div className="bg-brand-950 rounded-2xl p-8">
            <h3 className="font-serif text-xl text-white mb-3">Ubicación</h3>
            <p className="font-sans text-brand-400 text-sm leading-relaxed">
              Somos una tienda 100% online con despacho desde Lima, Perú.<br />
              Enviamos a todo el territorio nacional.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

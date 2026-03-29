import Link from "next/link"

interface NavCategory {
  label: string
  href: string
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=51999999999" },
]

const infoLinks = [
  { label: "Envíos y Devoluciones", href: "/envios" },
  { label: "Preguntas Frecuentes", href: "/faq" },
  { label: "Términos y Condiciones", href: "/terminos" },
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Contáctanos", href: "/contacto" },
]

export function Footer({ categories = [] }: { categories?: NavCategory[] }) {
  return (
    <footer className="bg-brand-950 text-white">
      {/* Main content */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl text-white mb-4">Morelune</h2>
            <p className="text-brand-400 text-sm leading-relaxed max-w-xs font-sans">
              Carteras y bolsos de calidad para la mujer peruana. Diseños únicos,
              materiales premium y envíos a todo el país.
            </p>
            <div className="mt-6 flex gap-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-white text-sm font-sans transition-colors duration-150 underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-sans font-semibold text-brand-300 uppercase tracking-widest mb-5">
              Categorías
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-brand-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-sans font-semibold text-brand-300 uppercase tracking-widest mb-5">
              Información
            </h3>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-brand-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-900">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs font-sans text-brand-500">
            © {new Date().getFullYear()} Morelune Perú. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/culqi-badge.png" alt="Pago seguro con Culqi" className="h-5 opacity-50" />
            <span className="text-xs font-sans text-brand-500">Pago 100% seguro</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

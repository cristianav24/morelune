import Link from "next/link"

interface NavCategory {
  label: string
  href: string
}

export function Footer({ categories = [] }: { categories?: NavCategory[] }) {
  return (
    <footer className="bg-brand-800 text-white mt-20">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-2xl text-white mb-3">BagsStore</h2>
            <p className="text-brand-200 text-sm leading-relaxed max-w-xs">
              Carteras y bolsos de calidad para la mujer peruana. Envíos a Lima
              y todo el Perú.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-white transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-white transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-brand-200 mb-4">
              Categorías
            </h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-brand-200 mb-4">
              Información
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Envíos y Devoluciones", href: "/envios" },
                { label: "Preguntas Frecuentes", href: "/faq" },
                { label: "Términos y Condiciones", href: "/terminos" },
                { label: "Política de Privacidad", href: "/privacidad" },
                { label: "Contáctanos", href: "/contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-brand-400">
            © {new Date().getFullYear()} BagsStore Perú. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <img src="/culqi-badge.png" alt="Pago seguro con Culqi" className="h-6 opacity-70" />
            <span className="text-xs text-brand-400">Pago 100% seguro</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

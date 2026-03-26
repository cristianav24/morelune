import Link from "next/link"
import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative bg-brand-50 overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[520px] gap-8 py-12">
          {/* Texto */}
          <div className="animate-slide-up">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">
              Nueva Colección 2025
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-900 leading-tight">
              Carteras que{" "}
              <span className="text-accent">cuentan</span>{" "}
              tu historia
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-md">
              Diseños únicos para la mujer peruana moderna. Cuero genuino,
              calidad artesanal y envíos a todo el Perú.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/tienda" className="btn-primary text-center">
                Ver Colección
              </Link>
              <Link href="/categoria/carteras-de-cuero" className="btn-secondary text-center">
                Carteras de Cuero
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <span>✓ Envío gratis desde S/ 150</span>
              <span>✓ Devolución gratuita</span>
            </div>
          </div>

          {/* Imagen hero */}
          <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden">
            <Image
              src="/hero-banner.jpg"
              alt="Colección de carteras y bolsos para mujer en Perú"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

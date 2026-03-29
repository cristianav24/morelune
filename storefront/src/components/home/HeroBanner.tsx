import Link from "next/link"
import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[580px] gap-12 py-16 lg:py-20">

          {/* Text content */}
          <div className="animate-slide-up order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-sans font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
              Nueva Colección 2025
            </span>

            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl text-brand-950 leading-[1.08] tracking-tight">
              Carteras que{" "}
              <em className="text-primary not-italic">cuentan</em>{" "}
              tu historia
            </h1>

            <p className="mt-6 text-brand-600 text-lg leading-relaxed max-w-md font-sans">
              Diseños únicos para la mujer peruana moderna. Cuero genuino,
              calidad artesanal y envíos a todo el Perú.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/tienda" className="btn-primary">
                Ver Colección
              </Link>
              <Link href="/categoria/carteras-de-cuero" className="btn-secondary">
                Carteras de Cuero
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-brand-500 font-sans">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">✓</span>
                Envío gratis desde S/ 150
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">✓</span>
                Devolución gratuita
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-72 sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-banner.jpg"
                alt="Colección de carteras y bolsos para mujer en Perú"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/10 to-transparent" />
            </div>
            {/* Decorative shapes */}
            <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-primary/10 rounded-2xl -z-10 hidden lg:block" />
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-brand-200 rounded-2xl -z-10 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  )
}

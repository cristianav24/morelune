import Link from "next/link"

interface Category {
  id: string
  name: string
  handle: string | null
  description?: string | null
}

const categoryImages: Record<string, string> = {
  "bolsos-crossbody": "/categories/bolsos-crossbody.jpg",
  "tote-bags": "/categories/tote-bags.jpg",
  "bolsos-hombro": "/categories/bolsos-hombro.jpg",
  "bucket-bags": "/categories/bucket-bags.jpg",
  mochilas: "/categories/mochilas.jpg",
}

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null

  return (
    <section className="py-20 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow">Colecciones</p>
            <h2 className="section-title">Explora por Categoría</h2>
          </div>
          <p className="text-brand-400 text-sm font-sans hidden md:block">
            Encuentra la cartera perfecta para cada ocasión
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.handle}`}
              className="group relative rounded-2xl overflow-hidden bg-brand-100"
            >
              <div className="aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/15 to-transparent z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${categoryImages[cat.handle ?? ""] ?? "/categories/default.jpg"})`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                  <p className="text-white font-semibold font-sans text-sm leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5 group-hover:text-white/80 transition-colors duration-200 font-sans">
                    Ver colección →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

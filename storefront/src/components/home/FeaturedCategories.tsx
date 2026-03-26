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
    <section className="py-16 container-main">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-gray-900">
          Explora por Categoría
        </h2>
        <p className="text-gray-500 mt-2">
          Encuentra la cartera perfecta para cada ocasión
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.handle}`}
            className="group relative aspect-square rounded-xl overflow-hidden bg-brand-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${categoryImages[cat.handle || ""] || "/categories/default.jpg"})`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <p className="text-white font-medium text-sm leading-tight">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

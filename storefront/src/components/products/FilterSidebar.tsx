"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface Category {
  id: string
  name: string
  handle: string | null
}

export function FilterSidebar({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("categoria")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wider">
          Categorías
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/tienda"
              className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                !currentCategory
                  ? "text-accent font-medium bg-accent/10"
                  : "text-gray-600 hover:text-accent"
              }`}
            >
              Todas las carteras
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/categoria/${cat.handle}`}
                className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                  pathname === `/categoria/${cat.handle}`
                    ? "text-accent font-medium bg-accent/10"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

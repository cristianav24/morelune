import Link from "next/link"
import { ChevronRightIcon } from "@/components/layout/icons"

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-xs text-gray-400 flex-wrap">
        <li>
          <Link href="/" className="hover:text-accent transition-colors">
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
            {i === items.length - 1 ? (
              <span className="text-gray-700 font-medium line-clamp-1">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

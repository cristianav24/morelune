import type { MetadataRoute } from "next"
import { medusa } from "@/lib/medusa"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tudominio.com"

export const revalidate = 86400 // Regenerar sitemap cada 24 horas

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  // Categorías
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const { product_categories } = await medusa.store.category.list({})
    categoryPages = product_categories.map((cat) => ({
      url: `${siteUrl}/categoria/${cat.handle}`,
      lastModified: new Date(cat.updated_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  } catch {}

  // Productos
  let productPages: MetadataRoute.Sitemap = []
  try {
    const { products } = await medusa.store.product.list({
      limit: 500,
      fields: "handle,updated_at",
    })
    productPages = products
      .filter((p) => p.handle)
      .map((product) => ({
        url: `${siteUrl}/tienda/${product.handle}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  } catch {}

  return [...staticPages, ...categoryPages, ...productPages]
}

/**
 * Seed — BagsStore Perú
 * 30 carteras reales de www.womenbag.com
 * Precio: CNY × 0.48 (tipo cambio) × 5 (markup) = PEN venta
 *
 * Ejecutar: npm run seed
 */
import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

// ─── Configuración de precios ───────────────────────────────────────────────
const CNY_TO_PEN = 0.48
const MARKUP = 3

function toPEN(cny: number): number {
  return Math.round(cny * CNY_TO_PEN * MARKUP)
}
/** Medusa guarda precios en centavos (céntimos) */
function toCents(pen: number): number {
  return pen * 100
}

// ─── Categorías ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: "Bolsos Crossbody",
    handle: "bolsos-crossbody",
    description: "Bolsos de cuero para llevar cruzados, ideales para el día a día",
  },
  {
    name: "Tote Bags",
    handle: "tote-bags",
    description: "Bolsos tipo tote de cuero genuino, amplios y elegantes",
  },
  {
    name: "Bolsos de Hombro",
    handle: "bolsos-hombro",
    description: "Bolsos de hombro de cuero, cómodos y con estilo",
  },
  {
    name: "Bucket Bags",
    handle: "bucket-bags",
    description: "Bolsos cubeta de cuero, modernos y versátiles",
  },
  {
    name: "Mochilas",
    handle: "mochilas",
    description: "Mochilas de cuero genuino para mujer",
  },
]

// ─── Productos (30) ──────────────────────────────────────────────────────────
// ─── Imágenes locales (guardadas en storefront/public/products/) ─────────────
// Usamos solo el path relativo — Next.js las sirve directamente desde /public
const img = (sku: string) => `/products/${sku.toLowerCase()}.jpg`

const PRODUCTS = [
  // ── BOLSOS CROSSBODY (11) ─────────────────────────────────────────────────
  {
    title: "Cartera de Cuero Verano Axila Hombro Crossbody",
    handle: "cartera-cuero-verano-axila-hombro-crossbody",
    description:
      "Elegante cartera de cuero genuino para el verano. Diseño versátil que permite usarla como bolso de axila, hombro o crossbody. Material de cuero vacuno de alta calidad con acabado suave y duradero.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-3328",
    source_url: "https://www.womenbag.com/product_detail/827.html",
    dimensions: "26×5.5×14 cm",
    material: "Cuero vacuno genuino",
    cny_price: 135,
    colors: ["Negro", "Crema", "Caramelo"],
  },
  {
    title: "Bolso Almohada Cuero Suave Crossbody",
    handle: "bolso-almohada-cuero-suave-crossbody",
    description:
      "Bolso almohada de cuero suave con diseño exclusivo y minimalista. Ideal para uso diario y oficina. Disponible en hombro o crossbody.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-3317",
    source_url: "https://www.womenbag.com/product_detail/826.html",
    dimensions: "23×9×14 cm",
    material: "Cuero vacuno genuino",
    cny_price: 135,
    colors: ["Negro", "Café"],
  },
  {
    title: "Cartera Cuero Oil-Wax Hombro Crossbody",
    handle: "cartera-cuero-oil-wax-hombro-crossbody",
    description:
      "Cartera de cuero oil-wax de primera capa. Acabado vintage elegante, perfecta para hombro o crossbody. Gran durabilidad y textura única.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-3309",
    source_url: "https://www.womenbag.com/product_detail/825.html",
    dimensions: "24×9×17 cm",
    material: "Cuero vacuno oil-wax",
    cny_price: 125,
    colors: ["Negro", "Café", "Borgoña", "Blanco"],
  },
  {
    title: "Cartera Patrón Cocodrilo Color-Block",
    handle: "cartera-patron-cocodrilo-color-block",
    description:
      "Cartera con textura de cocodrilo y diseño color-block. Estilo minimalista y moderno, perfecta para destacar en cualquier ocasión.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-3319",
    source_url: "https://www.womenbag.com/product_detail/819.html",
    dimensions: "27×7×21 cm",
    material: "Cuero vacuno genuino",
    cny_price: 135,
    colors: ["Negro", "Crema"],
  },
  {
    title: "Bolso Media Luna Cocodrilo 2026",
    handle: "bolso-media-luna-cocodrilo-2026",
    description:
      "Bolso de media luna con textura de cocodrilo. Diseño casual y elegante, perfecta para el día a día como bolso crossbody o de axila.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-818",
    source_url: "https://www.womenbag.com/product_detail/818.html",
    dimensions: "27×7×17 cm",
    material: "Cuero vacuno genuino",
    cny_price: 125,
    colors: ["Negro", "Café", "Crema"],
  },
  {
    title: "Bolso Media Luna Cuero Premium",
    handle: "bolso-media-luna-cuero-premium",
    description:
      "Bolso media luna de cuero de primera capa. Diseño sofisticado y versátil para hombro o crossbody. Acabado premium de alta calidad.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-817",
    source_url: "https://www.womenbag.com/product_detail/817.html",
    dimensions: "25×6×18 cm",
    material: "Cuero vacuno primera capa",
    cny_price: 145,
    colors: ["Negro", "Café", "Blanco"],
  },
  {
    title: "Bolso Pillow Cuero Vegetal Primavera",
    handle: "bolso-pillow-cuero-vegetal-primavera",
    description:
      "Bolso tipo almohada en cuero vegetal curtido. Suave y duradero, perfecto para primavera y verano. Gran variedad de colores frescos.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-808",
    source_url: "https://www.womenbag.com/product_detail/808.html",
    dimensions: "26×12×17 cm",
    material: "Cuero vegetal curtido",
    cny_price: 118,
    colors: ["Negro", "Café", "Beige", "Gris", "Azul Claro"],
  },
  {
    title: "Cartera Concha Cuero Gran Capacidad",
    handle: "cartera-concha-cuero-gran-capacidad",
    description:
      "Cartera con forma de concha en cuero genuino. Gran capacidad y diseño único, ideal para uso diario como crossbody.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-806",
    source_url: "https://www.womenbag.com/product_detail/806.html",
    dimensions: "32×26×14 cm",
    material: "Cuero vacuno genuino",
    cny_price: 145,
    colors: ["Negro", "Caramelo"],
  },
  {
    title: "Baguette Bag Cuero Vegetal Hombro Crossbody",
    handle: "baguette-bag-cuero-vegetal-hombro-crossbody",
    description:
      "Bolso baguette en cuero vegetal curtido. Diseño clásico y elegante, cómodo para hombro o crossbody. Cierre con hebilla de cuero.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-805",
    source_url: "https://www.womenbag.com/product_detail/805.html",
    dimensions: "34×13×18 cm",
    material: "Cuero vegetal curtido",
    cny_price: 145,
    colors: ["Negro", "Café", "Vino"],
  },
  {
    title: "Bolso Axila Dumpling Gran Capacidad",
    handle: "bolso-axila-dumpling-gran-capacidad",
    description:
      "Bolso de axila estilo dumpling en cuero de primera capa. Gran capacidad con diseño casual y relajado, muy cómodo de llevar.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-804",
    source_url: "https://www.womenbag.com/product_detail/804.html",
    dimensions: "38×35×4 cm",
    material: "Cuero vacuno primera capa",
    cny_price: 118,
    colors: ["Negro", "Café"],
  },
  {
    title: "Cartera Messenger Cuero Diseño Exclusivo",
    handle: "cartera-messenger-cuero-diseno-exclusivo",
    description:
      "Cartera messenger de cuero genuino con diseño exclusivo y minimalista. Perfecta para uso diario y casual. Ligera y práctica.",
    category: "bolsos-crossbody",
    sku_prefix: "WB-798",
    source_url: "https://www.womenbag.com/product_detail/798.html",
    dimensions: "27×6×14 cm",
    material: "Cuero vacuno genuino",
    cny_price: 105,
    colors: ["Negro", "Blanco"],
  },

  // ── TOTE BAGS (7) ─────────────────────────────────────────────────────────
  {
    title: "Tote Canasta Cuero Gran Capacidad 2026",
    handle: "tote-canasta-cuero-gran-capacidad-2026",
    description:
      "Bolso tote tipo canasta de cuero genuino con gran capacidad. Nuevo diseño 2026, perfecto para compras, trabajo o paseos.",
    category: "tote-bags",
    sku_prefix: "WB-3297",
    source_url: "https://www.womenbag.com/product_detail/824.html",
    dimensions: "29×15×26 cm",
    material: "Cuero vacuno genuino",
    cny_price: 165,
    colors: ["Negro", "Castaño"],
  },
  {
    title: "Tote Cuero Arrugado Gran Capacidad",
    handle: "tote-cuero-arrugado-gran-capacidad",
    description:
      "Bolso tote de cuero arrugado con gran capacidad. Diseño 2026 con textura única y elegante, ideal para uso diario.",
    category: "tote-bags",
    sku_prefix: "WB-3321",
    source_url: "https://www.womenbag.com/product_detail/821.html",
    dimensions: "33×24×13 cm",
    material: "Cuero vacuno primera capa",
    cny_price: 155,
    colors: ["Negro", "Café", "Blanco", "Khaki"],
  },
  {
    title: "Tote Vintage Retro Gran Capacidad",
    handle: "tote-vintage-retro-gran-capacidad",
    description:
      "Bolso tote de estilo vintage retro con gran capacidad. Elegante y atemporal, perfecto para trabajo y paseos diarios.",
    category: "tote-bags",
    sku_prefix: "WB-3310",
    source_url: "https://www.womenbag.com/product_detail/816.html",
    dimensions: "33×15×24 cm",
    material: "Cuero vacuno genuino",
    cny_price: 155,
    colors: ["Negro", "Café", "Gris"],
  },
  {
    title: "Tote Cuero Madre-Hijo 2026",
    handle: "tote-cuero-madre-hijo-2026",
    description:
      "Bolso tote grande con bolso interior intercambiable. Gran capacidad y practicidad, ideal para madres activas y el trabajo.",
    category: "tote-bags",
    sku_prefix: "WB-815",
    source_url: "https://www.womenbag.com/product_detail/815.html",
    dimensions: "36×31×10×28 cm",
    material: "Cuero vacuno genuino",
    cny_price: 135,
    colors: ["Negro", "Café"],
  },
  {
    title: "Tote Vintage Commute Hombro Crossbody",
    handle: "tote-vintage-commute-hombro-crossbody",
    description:
      "Bolso tote vintage para uso diario y oficina. Gran capacidad, cómodo de llevar en hombro o crossbody, estilo atemporal.",
    category: "tote-bags",
    sku_prefix: "WB-812",
    source_url: "https://www.womenbag.com/product_detail/812.html",
    dimensions: "34×12.5×29 cm",
    material: "Cuero vacuno genuino",
    cny_price: 155,
    colors: ["Negro", "Café", "Marrón"],
  },
  {
    title: "Tote Cuero Export Gran Capacidad",
    handle: "tote-cuero-export-gran-capacidad",
    description:
      "Bolso tote de cuero genuino de calidad exportación. Versátil para hombro, crossbody o mano. Gran capacidad y durabilidad.",
    category: "tote-bags",
    sku_prefix: "WB-803",
    source_url: "https://www.womenbag.com/product_detail/803.html",
    dimensions: "38×16×26 cm",
    material: "Cuero vacuno genuino",
    cny_price: 138,
    colors: ["Negro", "Marrón", "Gris", "Chocolate"],
  },
  {
    title: "Bolso Tote Cuero Casual Gran Capacidad",
    handle: "bolso-tote-cuero-casual-gran-capacidad",
    description:
      "Bolso tote casual de cuero genuino con gran capacidad. Perfecto para viajes cortos, compras y uso diario. Muy espacioso.",
    category: "tote-bags",
    sku_prefix: "WB-801",
    source_url: "https://www.womenbag.com/product_detail/801.html",
    dimensions: "52×13×35 cm",
    material: "Cuero vacuno genuino",
    cny_price: 165,
    colors: ["Negro", "Café", "Gris Oscuro"],
  },

  // ── BOLSOS DE HOMBRO (8) ──────────────────────────────────────────────────
  {
    title: "Bolso Hobo Cuero Hombro Crossbody 2026",
    handle: "bolso-hobo-cuero-hombro-crossbody-2026",
    description:
      "Bolso hobo de cuero genuino. Diseño 2026, cómodo y elegante para uso diario en hombro o crossbody.",
    category: "bolsos-hombro",
    sku_prefix: "WB-814",
    source_url: "https://www.womenbag.com/product_detail/814.html",
    dimensions: "28×13×21 cm",
    material: "Cuero vacuno genuino",
    cny_price: 115,
    colors: ["Negro", "Café"],
  },
  {
    title: "Boston Bag Bowling Gran Capacidad",
    handle: "boston-bag-bowling-gran-capacidad",
    description:
      "Bolso Boston tipo bowling de cuero genuino. Gran capacidad, perfecto para trabajo y salidas. Diseño primavera/verano 2026.",
    category: "bolsos-hombro",
    sku_prefix: "WB-813",
    source_url: "https://www.womenbag.com/product_detail/813.html",
    dimensions: "35×12×23 cm",
    material: "Cuero vacuno genuino",
    cny_price: 155,
    colors: ["Negro", "Albaricoque", "Café", "Vino"],
  },
  {
    title: "Bolso Almohada Vintage Hombro",
    handle: "bolso-almohada-vintage-hombro",
    description:
      "Bolso almohada de estilo vintage para hombro. Diseño atemporal con gran capacidad, disponible en múltiples colores clásicos.",
    category: "bolsos-hombro",
    sku_prefix: "WB-811",
    source_url: "https://www.womenbag.com/product_detail/811.html",
    dimensions: "31×12×20 cm",
    material: "Cuero vacuno genuino",
    cny_price: 148,
    colors: ["Negro", "Marrón", "Blanco", "Gris"],
  },
  {
    title: "Cartera Retro Hombro Gran Capacidad",
    handle: "cartera-retro-hombro-gran-capacidad",
    description:
      "Cartera retro de cuero genuino primera capa para hombro. Gran capacidad y diseño versátil para trabajo y paseos.",
    category: "bolsos-hombro",
    sku_prefix: "WB-810",
    source_url: "https://www.womenbag.com/product_detail/810.html",
    dimensions: "30×11×24 cm",
    material: "Cuero vacuno primera capa",
    cny_price: 145,
    colors: ["Negro", "Café"],
  },
  {
    title: "Bolso Coreano Axila Gran Capacidad",
    handle: "bolso-coreano-axila-gran-capacidad",
    description:
      "Bolso de estilo coreano con gran capacidad. Diseño moderno para llevar en axila o hombro, perfecto para cualquier outfit.",
    category: "bolsos-hombro",
    sku_prefix: "WB-809",
    source_url: "https://www.womenbag.com/product_detail/809.html",
    dimensions: "31×12×24 cm",
    material: "Cuero vacuno genuino",
    cny_price: 145,
    colors: ["Negro", "Café", "Gris", "Vino"],
  },
  {
    title: "Boston Bag Cuero Premium",
    handle: "boston-bag-cuero-premium",
    description:
      "Bolso Boston de cuero genuino premium. Clásico y elegante, perfecto para trabajo y ocasiones especiales.",
    category: "bolsos-hombro",
    sku_prefix: "WB-807",
    source_url: "https://www.womenbag.com/product_detail/807.html",
    dimensions: "32×17×21 cm",
    material: "Cuero vacuno genuino",
    cny_price: 155,
    colors: ["Negro", "Café"],
  },
  {
    title: "Cartera Retro Commute Cuero Vegetal",
    handle: "cartera-retro-commute-cuero-vegetal",
    description:
      "Cartera retro de cuero vegetal curtido para uso diario. Diseño de lujo casual, perfecta para ir al trabajo.",
    category: "bolsos-hombro",
    sku_prefix: "WB-800",
    source_url: "https://www.womenbag.com/product_detail/800.html",
    dimensions: "30×12×23 cm",
    material: "Cuero vegetal curtido",
    cny_price: 145,
    colors: ["Negro", "Café"],
  },
  {
    title: "Bolso Hobo Cuero Vintage Casual",
    handle: "bolso-hobo-cuero-vintage-casual",
    description:
      "Bolso hobo de cuero vintage casual. Estilo relajado y atemporal, cómodo y espacioso para uso diario.",
    category: "bolsos-hombro",
    sku_prefix: "WB-799",
    source_url: "https://www.womenbag.com/product_detail/799.html",
    dimensions: "30×12×23 cm",
    material: "Cuero vacuno genuino",
    cny_price: 135,
    colors: ["Negro", "Café"],
  },

  // ── BUCKET BAGS (3) ───────────────────────────────────────────────────────
  {
    title: "Bucket Bag Trenzado Cuero Hombro Crossbody",
    handle: "bucket-bag-trenzado-cuero-hombro-crossbody",
    description:
      "Bolso cubeta de cuero trenzado, ligero y elegante. Versátil para hombro o crossbody, ideal para el día a día.",
    category: "bucket-bags",
    sku_prefix: "WB-3315",
    source_url: "https://www.womenbag.com/product_detail/823.html",
    dimensions: "21×11×19 cm",
    material: "Cuero vacuno genuino",
    cny_price: 125,
    colors: ["Negro", "Café", "Gris"],
  },
  {
    title: "Bucket Bag Coreano Minimalista",
    handle: "bucket-bag-coreano-minimalista",
    description:
      "Bolso cubeta de estilo coreano minimalista. Diseño simple y moderno, ideal para jóvenes con estilo urbano.",
    category: "bucket-bags",
    sku_prefix: "WB-3316",
    source_url: "https://www.womenbag.com/product_detail/820.html",
    dimensions: "19×7×19 cm",
    material: "Cuero vacuno genuino",
    cny_price: 125,
    colors: ["Café", "Gris"],
  },
  {
    title: "Bucket Bag Crossbody Commute",
    handle: "bucket-bag-crossbody-commute",
    description:
      "Bolso cubeta de cuero para uso diario en el trabajo. Gran capacidad y diseño urbano, perfecto para commute diario.",
    category: "bucket-bags",
    sku_prefix: "WB-3296",
    source_url: "https://www.womenbag.com/product_detail/802.html",
    dimensions: "35×26×15 cm",
    material: "Cuero vacuno genuino",
    cny_price: 145,
    colors: ["Negro", "Café"],
  },

  // ── MOCHILAS (1) ──────────────────────────────────────────────────────────
  {
    title: "Mochila de Cuero Grande 3 en 1",
    handle: "mochila-cuero-grande-3-en-1",
    description:
      "Mochila de cuero genuino con 3 formas de uso: mochila, bolso de hombro o crossbody. Gran capacidad, cuero oil-wax de primera calidad.",
    category: "mochilas",
    sku_prefix: "WB-3289",
    source_url: "https://www.womenbag.com/product_detail/822.html",
    dimensions: "32×11×27 cm",
    material: "Cuero vacuno oil-wax",
    cny_price: 135,
    colors: ["Negro", "Café", "Marrón"],
  },
]

// ─── Seed principal ──────────────────────────────────────────────────────────
export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  const regionService = container.resolve(Modules.REGION)
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)
  const storeService = container.resolve(Modules.STORE)
  const productService = container.resolve(Modules.PRODUCT)
  const pricingService = container.resolve(Modules.PRICING)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
  const inventoryService = container.resolve(Modules.INVENTORY)

  logger.info("=== Morelune Perú — Seed iniciado ===")
  logger.info(`  Tipo de cambio: 1 CNY = S/ ${CNY_TO_PEN} × ${MARKUP} = precio venta`)

  // 1. Eliminar productos existentes
  logger.info("\nEliminando productos existentes...")
  const existingProducts = await productService.listProducts({}, { take: 500 })
  if (existingProducts.length > 0) {
    await productService.deleteProducts(existingProducts.map((p) => p.id))
    logger.info(`  → ${existingProducts.length} productos eliminados`)
  }

  // 2. Eliminar categorías existentes
  logger.info("Eliminando categorías existentes...")
  const existingCats = await productService.listProductCategories({}, { take: 200 })
  if (existingCats.length > 0) {
    await productService.deleteProductCategories(existingCats.map((c) => c.id))
    logger.info(`  → ${existingCats.length} categorías eliminadas`)
  }

  // 3. Región Perú (reusar existente si "pe" ya está asignado)
  logger.info("Configurando región Perú...")
  const allRegions = await regionService.listRegions({}, { relations: ["countries"] })
  let peruRegion = allRegions.find(
    (r) => r.countries?.some((c: any) => c.iso_2 === "pe") || r.name === "Perú"
  )
  if (!peruRegion) {
    ;[peruRegion] = await regionService.createRegions([
      { name: "Perú", currency_code: "pen", countries: ["pe"] },
    ])
  }

  // 4. Canal de ventas — reusar el canal existente vinculado a la publishable key
  logger.info("Configurando canal de ventas...")
  const allChannels = await salesChannelService.listSalesChannels({})
  // Usar el canal ya existente (tiene la publishable key vinculada).
  // Solo crear uno nuevo si no existe ninguno.
  let defaultSalesChannel = allChannels[0]
  if (!defaultSalesChannel) {
    ;[defaultSalesChannel] = await salesChannelService.createSalesChannels([
      {
        name: "Tienda Online",
        description: "Canal principal de ventas BagsStore Perú",
        is_disabled: false,
      },
    ])
  }
  logger.info(`  → Usando canal: "${defaultSalesChannel.name}" (${defaultSalesChannel.id})`)

  // 5. Actualizar nombre de la tienda
  const [store] = await storeService.listStores()
  if (store) {
    await storeService.updateStores(store.id, {
      name: "Morelune Perú",
      default_sales_channel_id: defaultSalesChannel.id,
    })
  }

  // 6. Stock Location — reusar o crear
  logger.info("Configurando stock location...")
  const existingLocations = await stockLocationService.listStockLocations({})
  let stockLocation = existingLocations[0]
  if (!stockLocation) {
    ;[stockLocation] = await stockLocationService.createStockLocations([
      { name: "Lima - Principal", address: { city: "Lima", country_code: "pe" } },
    ])
    logger.info(`  → Stock location creado: ${stockLocation.id}`)
  } else {
    logger.info(`  → Usando stock location existente: ${stockLocation.id}`)
  }

  // Linkear sales channel → stock location
  await remoteLink.create({
    [Modules.SALES_CHANNEL]: { sales_channel_id: defaultSalesChannel.id },
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
  })
  logger.info(`  → Sales channel vinculado al stock location`)

  // 7. Crear categorías nuevas
  logger.info("\nCreando categorías...")
  const createdCats = await productService.createProductCategories(
    CATEGORIES.map((c) => ({ ...c, is_active: true }))
  )
  const categoryMap: Record<string, string> = {}
  for (const cat of createdCats) {
    categoryMap[cat.handle] = cat.id
  }
  logger.info(`  → ${createdCats.length} categorías creadas`)

  // 7. Crear 30 productos con precios
  logger.info("\nCreando 30 productos...")
  let created = 0

  for (const p of PRODUCTS) {
    const penPrice = toPEN(p.cny_price)
    const amountCents = toCents(penPrice)

    // Crear producto con variantes de color
    const [product] = await productService.createProducts([
      {
        title: p.title,
        handle: p.handle,
        description: p.description,
        thumbnail: img(p.sku_prefix),
        images: [{ url: img(p.sku_prefix) }],
        status: "published" as const,
        category_ids: [categoryMap[p.category]],
        options: [{ title: "Color", values: p.colors }],
        variants: p.colors.map((color, idx) => ({
          title: color,
          sku: `${p.sku_prefix}-${color
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "")
            .substring(0, 4)}-${String(idx + 1).padStart(2, "0")}`,
          options: { Color: color },
          manage_inventory: true,
        })),
        metadata: {
          material: p.material,
          dimensiones: p.dimensions,
          fuente: p.source_url,
          precio_cny: p.cny_price,
          precio_pen_costo: Math.round(p.cny_price * CNY_TO_PEN),
          precio_pen_venta: penPrice,
        },
      },
    ])

    // Precio e inventario por variante
    for (const variant of product.variants) {
      // Precio
      const [priceSet] = await pricingService.createPriceSets([{}])
      await pricingService.addPrices([
        {
          priceSetId: priceSet.id,
          prices: [{ currency_code: "pen", amount: amountCents }],
        },
      ])
      await remoteLink.create({
        [Modules.PRODUCT]: { variant_id: variant.id },
        [Modules.PRICING]: { price_set_id: priceSet.id },
      })

      // Inventory item + nivel de stock
      const [inventoryItem] = await inventoryService.createInventoryItems([
        { sku: variant.sku, title: variant.title || p.title },
      ])
      await inventoryService.createInventoryLevels([
        {
          inventory_item_id: inventoryItem.id,
          location_id: stockLocation.id,
          stocked_quantity: 100,
        },
      ])
      await remoteLink.create({
        [Modules.PRODUCT]: { variant_id: variant.id },
        [Modules.INVENTORY]: { inventory_item_id: inventoryItem.id },
      })
    }

    created++
    logger.info(
      `  [${String(created).padStart(2, "0")}/30] ${p.title} — ¥${p.cny_price} → S/ ${penPrice}`
    )
  }

  // Resumen final
  logger.info("\n=== Seed completado exitosamente ===")
  logger.info(`  Región:     ${peruRegion.name} (PEN)`)
  logger.info(`  Canal:      ${defaultSalesChannel.name}`)
  logger.info(`  Categorías: ${createdCats.length}`)
  logger.info(
    `              ${CATEGORIES.map((c) => c.name).join(" | ")}`
  )
  logger.info(`  Productos:  ${created}/30`)
  logger.info("\nDistribución por categoría:")
  for (const cat of CATEGORIES) {
    const count = PRODUCTS.filter((p) => p.category === cat.handle).length
    logger.info(`  ${cat.name}: ${count} productos`)
  }
  logger.info("\nPróximos pasos:")
  logger.info("  1. Sube imágenes a los productos desde el admin panel")
  logger.info("  2. Ajusta el stock de inventario por variante")
  logger.info("  3. Verifica los precios en /admin/products")
}

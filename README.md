# BagsStore Perú — E-commerce de Carteras y Bolsos

Stack: **Next.js 14** (storefront) + **Medusa.js v2** (backend) + **Culqi** (pagos Perú)

## Estructura

```
bags/
├── backend/          → API Medusa v2 + Panel Admin
│   ├── src/
│   │   ├── modules/culqi/    → Pasarela de pagos Culqi (nativa Perú)
│   │   └── scripts/seed.ts   → Datos iniciales (categorías, productos)
│   ├── medusa-config.ts
│   └── Dockerfile
├── storefront/       → Tienda Next.js 14 con SSR/ISR
│   ├── src/
│   │   ├── app/              → Rutas (home, tienda, categoría, checkout)
│   │   ├── components/       → UI components
│   │   └── lib/              → Medusa client, cart store
│   └── Dockerfile
├── nginx/            → Reverse proxy + SSL
├── docker-compose.yml
├── deploy.sh         → Script de deploy VPS
└── .env.production.template
```

## Desarrollo local

### 1. Configurar variables de entorno

```bash
# Backend
cp backend/.env.template backend/.env

# Storefront
cp storefront/.env.template storefront/.env.local
```

### 2. Levantar con Docker Compose (recomendado)

```bash
cp .env.production.template .env
# Editar .env con tus valores de desarrollo

docker compose up postgres redis   # Solo BD en desarrollo
```

### 3. Instalar dependencias y arrancar

```bash
# Backend
cd backend && npm install
npm run dev   # http://localhost:9000
              # Admin: http://localhost:9000/app

# Storefront (en otra terminal)
cd storefront && npm install
npm run dev   # http://localhost:3000
```

### 4. Seed inicial

```bash
cd backend
npm run seed
```

## Deploy en VPS

### Requisitos del servidor

- Ubuntu 22.04 o Debian 12
- Docker + Docker Compose instalados
- Dominio apuntando al VPS (registros A para `tudominio.com` y `api.tudominio.com`)

### Pasos

```bash
# 1. Clonar en el VPS
git clone <repo> /opt/bags
cd /opt/bags

# 2. Configurar variables de producción
cp .env.production.template .env
nano .env   # Rellenar todos los valores

# 3. Actualizar dominio en nginx
sed -i 's/tudominio.com/tudominio_real.com/g' nginx/conf.d/bags.conf
sed -i 's/tudominio.com/tudominio_real.com/g' deploy.sh

# 4. Primer deploy (obtiene SSL automáticamente)
chmod +x deploy.sh
./deploy.sh primera-vez

# 5. Obtener publishable key de Medusa
# → Ir a https://api.tudominio.com/app
# → Settings → API Keys → crear nueva clave
# → Actualizar MEDUSA_PUBLISHABLE_KEY en .env
# → ./deploy.sh actualizar
```

### Actualizar código

```bash
./deploy.sh actualizar
```

## Pasarela de Pagos — Culqi

1. Registrarse en [culqi.com](https://culqi.com)
2. Obtener claves en el Dashboard de Culqi
3. Añadir `CULQI_PUBLIC_KEY` y `CULQI_SECRET_KEY` en `.env`
4. Configurar webhook en Culqi apuntando a `https://api.tudominio.com/hooks/payment/culqi_culqi`

**Métodos aceptados:** Visa, Mastercard, Amex, Yape, Plin, Diners

## SEO — Checklist

- [x] Metadata dinámica por producto/categoría
- [x] Schema.org Product + Organization + WebSite
- [x] Sitemap.xml dinámico (`/sitemap.xml`)
- [x] Robots.txt (`/robots.txt`)
- [x] Open Graph tags
- [x] URLs canónicas
- [x] SSR/ISR para páginas indexables
- [x] Breadcrumbs con schema
- [x] Imágenes con alt optimizado
- [ ] Google Search Console → verificar dominio y enviar sitemap
- [ ] Google Analytics → añadir `GA_ID` en `.env`
- [ ] Core Web Vitals → verificar con PageSpeed Insights

## Gestión de Productos (Admin Panel)

URL: `https://api.tudominio.com/app`

- **Productos** → Crear, editar, variantes (color, talla), imágenes
- **Inventario** → Stock por variante, alertas de stock bajo
- **Pedidos** → Gestión completa, cambio de estado, notas
- **Clientes** → Lista y detalles
- **Descuentos** → Cupones de descuento
- **Colecciones** → Agrupar productos por temporada/campaña

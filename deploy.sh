#!/bin/bash
# ─────────────────────────────────────────────────────────────
# deploy.sh — Script de deploy para VPS
# Uso: ./deploy.sh [primera-vez|actualizar|ssl]
# ─────────────────────────────────────────────────────────────

set -e

DOMAIN="tudominio.com"
API_DOMAIN="api.tudominio.com"
EMAIL="tu@email.com"   # Para Let's Encrypt

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

check_env() {
  if [ ! -f .env ]; then
    error "No existe .env. Copia .env.production.template a .env y completa los valores."
  fi
  log "Archivo .env encontrado"
}

primera_vez() {
  log "=== PRIMER DEPLOY ==="

  check_env

  # 1. Levantar solo postgres y redis primero
  log "Levantando base de datos..."
  docker compose up -d postgres redis
  sleep 10

  # 2. Levantar nginx temporal en HTTP para obtener SSL
  log "Configurando SSL con Let's Encrypt..."
  docker compose up -d nginx

  # 3. Obtener certificado para el storefront
  docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

  # 4. Obtener certificado para la API
  docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $API_DOMAIN

  log "Certificados SSL obtenidos"

  # 5. Build y levantar todo
  log "Construyendo imágenes Docker..."
  docker compose build backend storefront

  log "Levantando todos los servicios..."
  docker compose up -d

  # 6. Esperar que el backend esté listo
  log "Esperando que el backend esté listo..."
  for i in $(seq 1 30); do
    if docker compose exec -T backend curl -sf http://localhost:9000/health > /dev/null 2>&1; then
      break
    fi
    echo -n "."
    sleep 3
  done
  echo ""

  # 7. Ejecutar migraciones
  log "Ejecutando migraciones de base de datos..."
  docker compose exec backend npx medusa db:migrate

  # 8. Seed inicial
  log "Cargando datos iniciales..."
  docker compose exec backend npm run seed || warn "Seed falló (puede que ya existan datos)"

  log "=== DEPLOY COMPLETADO ==="
  log "Storefront: https://$DOMAIN"
  log "Admin Panel: https://$API_DOMAIN/app"
  warn "Recuerda obtener la MEDUSA_PUBLISHABLE_KEY del admin panel y actualizar .env"
}

actualizar() {
  log "=== ACTUALIZANDO PRODUCCIÓN ==="
  check_env

  log "Haciendo pull de cambios..."
  git pull origin main

  log "Reconstruyendo imágenes..."
  docker compose build backend storefront

  log "Reiniciando servicios con zero-downtime..."
  docker compose up -d --no-deps backend
  sleep 10
  docker compose exec backend npx medusa db:migrate || true
  docker compose up -d --no-deps storefront

  log "Actualizando nginx..."
  docker compose exec nginx nginx -s reload

  log "=== ACTUALIZACIÓN COMPLETADA ==="
}

ssl_renovar() {
  log "Renovando certificados SSL..."
  docker compose run --rm certbot renew
  docker compose exec nginx nginx -s reload
  log "SSL renovado"
}

status() {
  docker compose ps
  echo ""
  log "Uso de recursos:"
  docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
}

case "${1:-}" in
  "primera-vez") primera_vez ;;
  "actualizar")  actualizar ;;
  "ssl")         ssl_renovar ;;
  "status")      status ;;
  *)
    echo "Uso: ./deploy.sh [primera-vez|actualizar|ssl|status]"
    echo ""
    echo "  primera-vez  → Primer deploy completo con SSL"
    echo "  actualizar   → Actualizar código en producción"
    echo "  ssl          → Renovar certificados SSL"
    echo "  status       → Ver estado de los servicios"
    ;;
esac

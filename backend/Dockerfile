FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++

# Instalar dependencias
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy \
    REDIS_URL=redis://localhost:6379 \
    STORE_CORS=http://localhost:3000 \
    ADMIN_CORS=http://localhost:9000 \
    AUTH_CORS=http://localhost:9000 \
    JWT_SECRET=buildsecret \
    COOKIE_SECRET=buildsecret

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Producción
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 medusa

COPY --from=builder --chown=medusa:nodejs /app/.medusa ./.medusa
COPY --from=builder --chown=medusa:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=medusa:nodejs /app/package.json ./

RUN mkdir -p uploads && chown medusa:nodejs uploads

USER medusa

EXPOSE 9000

CMD ["node_modules/.bin/medusa", "start"]

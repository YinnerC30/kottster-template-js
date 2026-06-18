# ─── Stage 1: Builder ───────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build client (Vite) + server bundle
RUN npm run build

# ─── Stage 2: Production image ───────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache tini

WORKDIR /app

# Copy only production dependencies manifest, then install prod deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Copy schema file needed at runtime
COPY kottster-app.json ./kottster-app.json

EXPOSE 5480

# App server port (used by @kottster/server at runtime)
ENV PORT=5480
ENV NODE_ENV=production

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server/server.cjs"]

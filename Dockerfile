FROM node:20-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production \
    PORT=3456 \
    JAMFRUIT_SAFE_MODE=true \
    ENABLE_INTERNAL_SCHEDULER=false \
    ENABLE_YOUTUBE_PUBLISHING=false \
    ENABLE_AI_GENERATION=false \
    ENABLE_DATABASE_WRITES=false

WORKDIR /app
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node
EXPOSE 3456

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3456/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "safe-server.js"]

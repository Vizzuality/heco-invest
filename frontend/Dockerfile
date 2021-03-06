FROM node:16.14-alpine3.15

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

ARG TRANSIFEX_TOKEN
ENV TX_TOKEN $TRANSIFEX_TOKEN

ARG NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_FRONTEND_URL $NEXT_PUBLIC_FRONTEND_URL

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL $NEXT_PUBLIC_BACKEND_URL

ARG NEXT_PUBLIC_GOOGLE_ANALYTICS
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS $NEXT_PUBLIC_GOOGLE_ANALYTICS

ARG NEXT_PUBLIC_PROXY_BACKEND
ENV NEXT_PUBLIC_PROXY_BACKEND $NEXT_PUBLIC_PROXY_BACKEND

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY $NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

ARG NEXT_PUBLIC_MAPBOX_API_TOKEN
ENV NEXT_PUBLIC_MAPBOX_API_TOKEN $NEXT_PUBLIC_MAPBOX_API_TOKEN

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat curl bash
WORKDIR /app
RUN chown nextjs:nextjs /app

RUN corepack enable

USER nextjs

COPY --chown=nextjs:nextjs . .

RUN yarn install --immutable

RUN curl -o- https://raw.githubusercontent.com/transifex/cli/v1.0.3/install.sh | bash
RUN ./tx pull -f

RUN yarn build

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["./entrypoint.sh"]

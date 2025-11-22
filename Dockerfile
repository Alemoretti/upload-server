FROM node:20.18 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine3.21 AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

RUN chown -R 1000:1000 /usr/src/app

USER 1000

ENV PORT=3333
ENV NODE_ENV=development
ENV DATABASE_URL=postgresql://docker:docker@localhost:5433/upload
ENV CLOUDFLARE_ACCOUNT_ID="801191639b0b3b2e56f7c7a455a3321f"
ENV CLOUDFLARE_ACCESS_KEY_ID="a7b380c8b1a0be338579f0db978155c3"
ENV CLOUDFLARE_SECRET_ACCESS_KEY="c72b901eefa5e0658719cc88d815760c0903d06c2a7b5d9ca22c3da5d081cbcf"
ENV CLOUDFLARE_BUCKET="upload-server"
ENV CLOUDFLARE_PUBLIC_URL="https://pub-433d836c219e471fade1051a83b13aea.r2.dev"

EXPOSE 3333

CMD ["node", "dist/server.mjs"]
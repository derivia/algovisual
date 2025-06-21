FROM node:22-alpine AS builder
WORKDIR /usr/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
FROM alpine:latest
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./dist

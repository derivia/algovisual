FROM node:22.12.0-alpine
RUN npm install -g pnpm

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]

FROM node:current-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD sh -c "npm run dev"

FROM node:16-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

from base as dev
CMD ["npm", "run", "start:dev"]

FROM base as builder
RUN npm run build

FROM node:16-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /usr/src/app/disc ./dist

CMD ["node", "dist/main"]
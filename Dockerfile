FROM node:16-alpine as base

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
ENV DOCKER=true

FROM base as production

WORKDIR /app

COPY --from=base ./app/build ./build

ENV NODE_ENV='prod'
ENV NODE_PATH=./build/src


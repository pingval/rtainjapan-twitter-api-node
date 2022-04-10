FROM node:14 AS packages

RUN mkdir /packages
COPY ./package*.json /packages

WORKDIR /packages
RUN npm install

COPY ./prisma ./prisma
RUN npx prisma generate

FROM node:14

RUN mkdir /app

COPY --from=packages /packages/node_modules /app/node_modules
COPY ./package.json /app
COPY ./tsconfig*.json /app

COPY ./bin /app/bin
COPY ./config /app/config
COPY ./src /app/src

WORKDIR /app
RUN npm run build

CMD [ "npm", "start" ]
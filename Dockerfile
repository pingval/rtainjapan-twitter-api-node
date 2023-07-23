FROM node:16 AS packages

RUN mkdir /packages
COPY ./package*.json /packages

WORKDIR /packages
RUN npm install

FROM node:16

RUN mkdir /app

COPY . /app
COPY --from=packages /packages/node_modules /app/node_modules

WORKDIR /app
RUN npm run build

CMD [ "npm", "start" ]
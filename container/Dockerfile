FROM node:21-alpine3.18

USER root

WORKDIR /usr/src/app

COPY ./codes/package*.json ./

RUN npm install

COPY ./codes/ .

RUN npm install -g typescript

RUN tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]

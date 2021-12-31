FROM node:15

WORKDIR /urs/src/app

COPY . .

EXPOSE 3000

RUN npm i mysql

ENTRYPOINT [ "node", "index.js" ]
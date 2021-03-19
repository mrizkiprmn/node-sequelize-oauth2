FROM node:lts-alpine

WORKDIR /home/rizkipermana/Documents/oauth2-api

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8888

CMD [ "node", "server.js" ]
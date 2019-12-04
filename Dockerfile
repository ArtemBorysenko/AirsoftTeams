FROM node:11.15.0

COPY package*.json ./

RUN npm install

COPY . .

CMD node app.js

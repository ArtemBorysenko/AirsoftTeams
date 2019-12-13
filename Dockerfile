FROM node:11.15.0

COPY package*.json ./

RUN npm install

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD npm run deploy

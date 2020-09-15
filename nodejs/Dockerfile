FROM node:13.8-alpine

WORKDIR /mongo-api

COPY package*.json ./

RUN npm install --production

USER mongo-api

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]


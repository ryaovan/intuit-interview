FROM node:13.8-alpine

WORKDIR /mongo-api

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]


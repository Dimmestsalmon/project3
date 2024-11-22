FROM node:16

WORKDIR /my-server

COPY package.json .

RUN npm install && npm install pg

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
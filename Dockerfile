FROM node:lts-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run client-build

EXPOSE 5000
CMD ["node", "server.js"]
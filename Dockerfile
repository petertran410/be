FROM node:18

WORKDIR /usr/share/node_BE

COPY package.json /usr/share/node_BE

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

CMD ["node", "src/server.js"]
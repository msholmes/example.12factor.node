FROM node
MAINTAINER Mark Holmes (mark@acturus.net)

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install
#RUN yarn install --production

COPY src ./

EXPOSE 3000

CMD ["node", "server.js"]

FROM node:14.4.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json /home/node/app
COPY src/database /home/node/app

USER node

RUN yarn install && yarn seed-container

COPY --chown=node:node . .

EXPOSE 3333

CMD [ "yarn", "dev:debug" ]

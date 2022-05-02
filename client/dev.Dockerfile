FROM node:16

WORKDIR /usr/srv/app

COPY --chown=node:node . .

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

USER node

CMD ["npm", "start"]
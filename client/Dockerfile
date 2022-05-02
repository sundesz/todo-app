FROM node:16 as base

WORKDIR /usr/srv/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json

FROM base as prod
COPY --chown=node:node . .
# RUN npm ci --only=production
RUN npm ci
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
USER node
CMD ["npm", "start"]
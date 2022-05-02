FROM node:16 as base

WORKDIR /usr/src/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json

# FROM base as test
# COPY --chown=node:node . .
# # RUN npm ci
# # USER node
# # ENV CI=true NODE_ENV=test
# # CMD ["npm", "run", "test"]

# # FROM base as build
# # RUN npm ci --only=production
# # RUN npm install typescript
# # RUN npm run build

FROM base as prod
COPY --chown=node:node . .
RUN npm ci
USER node
ENV NODE_ENV=production
CMD ["npm", "run", "dev"]


# ## https://simplernerd.com/docker-typescript-production/


# These doesn't work because of following error
# Step 11/18 : COPY --from=ts-compiler /usr/srv/app/build .
# ERROR: Service 'server' failed to build : COPY failed: stat usr/srv/app/build: file does not exist


# ## Typescript Compiler
# FROM node:16 as ts-compiler
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY tsconfig*.json ./
# RUN npm install
# COPY . .
# RUN npm run build


# ## Typescript Remover
# FROM node:16 as ts-remover
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY --from=ts-compiler /usr/srv/app/build .
# RUN npm ci --only=production


# ## Distroless Production
# FROM node:16
# WORKDIR /usr/src/app
# COPY --from=ts-remover /usr/srv/app/ .
# USER node
# ENV NODE_ENV=production
# CMD ["npm", "start"]

FROM node:14 AS base

  WORKDIR /app/src
  RUN chown node:node /app
  RUN chown node:node /app/src
  USER node:node
  COPY --chown=node:node api ./
  EXPOSE 3000

FROM base as dev

  CMD [ "npm", "run", "start:dev" ]
FROM node:14 AS base

  WORKDIR /app/src
  RUN chown node:node /app
  RUN chown node:node /app/src
  USER node:node
  COPY --chown=node:node frontend ./
  EXPOSE 3001

FROM base as dev

  CMD [ "npm", "run", "dev" ]
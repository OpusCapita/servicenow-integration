FROM node:8-alpine
MAINTAINER stefantuebben

# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.

ENV NODE_PATH=/home/node/servicenow-integration/node_modules

WORKDIR /home/node/servicenow-integration

RUN chown -R node:node .
COPY --chown=node:node . .

RUN apk add --no-cache curl

USER node

RUN node install && npm cache clean --force

EXPOSE 3016
CMD [ "npm", "start" ]
HEALTHCHECK --interval=15s --timeout=3s --retries=12 \
  CMD curl --silent --fail http://localhost:3016/api/health/check || exit 1

FROM node:8-stretch-slim
MAINTAINER denic 

RUN apt-get update
RUN apt-get install curl

ENV NODE_PATH=/home/node/servicenow-integration/node_modules

WORKDIR /home/node/servicenow-integration

RUN chown -R node:node /home/node 
COPY --chown=node:node . .

USER node

RUN npm install && npm cache clean --force

EXPOSE 3016
CMD [ "npm", "start" ]
HEALTHCHECK --interval=15s --timeout=3s --retries=12 \
  CMD curl --silent --fail http://localhost:3016/api/health/check || exit 1

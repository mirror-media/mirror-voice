# Docker for stage environment
FROM node:10.15.1-alpine AS stage

ENV NODE_SOURCE /usr/src
WORKDIR $NODE_SOURCE

COPY . .

EXPOSE 80

CMD ["yarn", "start"]



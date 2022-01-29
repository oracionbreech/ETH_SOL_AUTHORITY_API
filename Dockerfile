FROM node:14-alpine
RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh
WORKDIR /usr/src/app
COPY . .
EXPOSE 5000
RUN yarn
RUN chown -R node /usr/src/app
USER node
RUN yarn build
CMD ["yarn", "start"]
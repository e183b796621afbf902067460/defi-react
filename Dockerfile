FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./yarn.lock /app/yarn.lock
COPY ./public /app/public
COPY ./src /app/src

RUN npm install --silent

CMD ["npm", "start"]
FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . /app/

ENV PORT=5000

EXPOSE 5000

CMD [ "yarn", "start" ]
FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "yarn build && yarn start"]
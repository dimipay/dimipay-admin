FROM node:lts

WORKDIR /usr/src/app

RUN git clone https://github.com/dimipay/dimipay-admin
RUN yarn install
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
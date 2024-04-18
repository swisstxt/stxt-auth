FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set strict-ssl false && npm clean-install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

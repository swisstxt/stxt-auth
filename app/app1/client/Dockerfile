FROM node:20

COPY package*.json ./

RUN npm config set strict-ssl false && npm clean-install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

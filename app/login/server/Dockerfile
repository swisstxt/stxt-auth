FROM node:20
#WORKDIR src
RUN pwd > log.txt
RUN ls -la
COPY package*.json ./
RUN npm config set strict-ssl false && npm install
COPY . .
EXPOSE 3000
CMD [ "node", "src/app.js"]
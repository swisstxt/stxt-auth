FROM node:iron-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# Build the React app for production
CMD ["npm", "run", "start"]

FROM node:20-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# Run the app in development
CMD ["npm", "run", "start"]

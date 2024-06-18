FROM node:20
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm config set strict-ssl false && npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "HOST=0.0.0.0 CHOKIDAR_USEPOLLING=true DANGEROUSLY_DISABLE_HOST_CHECK=true npm start"]
# Build
FROM node:20 as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm config set strict-ssl false && npm install
COPY . .
RUN npm run build

# Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
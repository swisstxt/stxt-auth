FROM node:20

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --silent

COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
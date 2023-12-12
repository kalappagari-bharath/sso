# Stage 1: Build the Angular application
FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Use a smaller base image for the runtime
FROM nginx:alpine

COPY --from=builder /app/dist/microsoft-login /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

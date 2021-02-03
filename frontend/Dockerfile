FROM node:12.20.0 AS builder

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli
RUN npm install

RUN ng build

FROM nginx:latest

COPY --from=builder /app/dist/angular8-demo /usr/share/nginx/html
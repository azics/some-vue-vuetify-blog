FROM node as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run start_api

RUN npm run dev

EXPOSE 5173
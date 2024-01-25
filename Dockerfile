FROM node as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

EXPOSE 5173

CMD ["sh", "-c", "npm run start_api && npm run dev"]

# Stage 1: Build Vue.js app
FROM node as vue_builder

WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the Vue.js app
RUN npm run build

# Stage 2: Build Node.js backend
FROM node as node_builder

WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the server code
COPY server .

# Stage 3: Combine Vue.js app and Node.js backend
FROM node

WORKDIR /app

# Copy the Vue.js app from the first stage
COPY --from=vue_builder /app/dist ./public

# Copy the Node.js backend from the second stage
COPY --from=node_builder /app .

# Expose the port your app will run on
EXPOSE 80

# Start the Node.js app
CMD ["npm", "start"]

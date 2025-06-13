FROM node:20.12.0-alpine as development

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /home/node/app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy app source
COPY . .

# Build app
RUN pnpm build

# Expose port from .env
EXPOSE 4433

# Start app
CMD ["pnpm", "run", "dev"]

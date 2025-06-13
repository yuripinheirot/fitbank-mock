FROM node:20.12.0-alpine as development

# Create app directory
WORKDIR /home/node/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build app
RUN npm run build

# Expose port from .env
EXPOSE 4444

# Start app
CMD ["npm", "start"]

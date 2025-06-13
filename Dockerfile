FROM node:20.12.0-alpine as development

# Create app directory
WORKDIR /home/node/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose ports
EXPOSE 4444
EXPOSE 9222

# Start app in development mode
CMD ["npm", "start"]

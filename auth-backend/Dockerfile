FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app/backend

COPY package*.json .
# Install dependencies
RUN npm install 
# Copy the rest of all the application code from path /usr/src/app/backend
COPY . .
# Build the application
RUN npm run build
# Expose the port the app runs on
EXPOSE 4000
# Start the application
CMD [ "npm","start" ]

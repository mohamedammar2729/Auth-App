FROM node:22-alpine
# Set the working directory
# This is where the application code will be copied to inside the container
WORKDIR /usr/src/app/frontend 

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","start" ]

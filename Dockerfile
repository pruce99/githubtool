FROM node:latest

RUN mkdir -p /git/src/app

WORKDIR /git/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
# Copy app source code
COPY . .



EXPOSE 3000



CMD [ "npm","start" ]
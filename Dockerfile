FROM node:12
MAINTAINER chriscn

# Create app directory
WORKDIR /usr/src/app

# Expose volume

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production
VOLUME ["/usr/src/app/config/"]

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app/app.js" ]

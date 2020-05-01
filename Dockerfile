FROM node:12

# Adding source files into container
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

VOLUME ["/usr/src/app/config"]

COPY . .

# Open Port 80
EXPOSE 8182

# Run Node.js
CMD ["node", "app/app.js"]

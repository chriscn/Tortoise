FROM hypriot/rpi-iojs:1.4.1

# Adding source files into container
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

# Open Port 80
EXPOSE 8182

# Run Node.js
CMD ["node", "app/app.js"]

# version node image
FROM node:18.18.2

WORKDIR /app

# copy the package.json and package-lock.json (if present)
COPY ./app/package*.json ./

RUN npm install

COPY ./app .

# Expose port 3000
EXPOSE 3000

# Default command to start the application
CMD ["node", "app.js"]

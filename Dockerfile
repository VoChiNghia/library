# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable for Redis host
ENV REDIS_HOST localhost

# Set the environment variable for Redis port
ENV REDIS_PORT 6379

# Expose the port on which the Node.js application will run
EXPOSE 5000

# Start the Node.js application
CMD ["node", "index.js"]
# Use an official Node.js runtime as the base image
FROM node:16

ENV PORT=5000 \
    MONGODB_URL=mongodb://localhost:27017/library_managerment \
    MONGODB_CLUSTER_URL=mongodb+srv://nghiakg11432:nghiakg11234@cluster0.lnyi9zu.mongodb.net/ \
    JWT_SECRET=mysecret \
    MP=cnasalbzbkcrkxco \
    HOST_REDIS=redis-10528.c292.ap-southeast-1-1.ec2.cloud.redislabs.com \
    PORT_REDIS=10528 \
    PASSWORD_REDIS=tJlMYJtTvcCIGSTGawC8ntYK3MCaiMn6 \
    SWAGGER_URL=https://library-management-2.onrender.com 
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 5000

# Start the Node.js application
CMD ["node", "index.js"]
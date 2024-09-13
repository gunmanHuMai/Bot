# Use an appropriate Node.js base image
FROM node:22.6.0-slim

# Set the working directory
WORKDIR /bot

# Copy all files from the host to the container
COPY . .

# Install Java and Node.js dependencies
RUN apt update -y && \
    apt install openjdk-17-jdk -y && \
    npm install -g npm@10.8.3 \
    npm install \
    npm install --global typescript@5.6.2
    

# Ensure TypeScript binaries have execution permissions
RUN chmod +x ./node_modules/.bin/tsc

# Run the TypeScript compiler and start the application
CMD [ "npm", "run", "start" ]

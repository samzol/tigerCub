# Part 1Build image for Nodejs
# Create image based on the official Node 10 image from dockerhub
FROM node:10.15

# Create a directory where our app will be placed
RUN mkdir /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

COPY package*.json ./

# Copy all files
COPY . .

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

CMD ["npm","start"]


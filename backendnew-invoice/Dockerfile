FROM node:14-alpine

# For handling Kernel signals properly
RUN apk add --no-cache tini

# Create the working directory, including the node_modules folder for the sake of assigning ownership in the next command
RUN mkdir -p /usr/src/apps/node_modules

# Change ownership of the working directory to the node:node user:group
# RUN chown -R node:node /usr/src/apps

# Set the user to use when running this image
# USER node

# Set the default working directory for the app
WORKDIR /usr/src/apps

# Copy package.json, package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force


# Bundle app source
COPY . ./

# Display directory structure
RUN ls -l

# Expose API port
EXPOSE 5200

ENTRYPOINT ["/sbin/tini", "--"]

# Run the web service on container startup
CMD [ "npm", "run", "dev","--host","0.0.0.0"]

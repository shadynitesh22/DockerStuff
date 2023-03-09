# Build Frontend

FROM node:14-alpine AS client_build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

RUN npm install jquery --save

# Install dependencies
RUN npm install --force

COPY . .

EXPOSE 4200
# Build the application

ENTRYPOINT ["/bin/sh", "docker.sh"]



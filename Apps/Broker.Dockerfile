# --------------- BUILD STAGE --------------- #
FROM node:lts as build-stage

# Move to root directory
WORKDIR /apps

# Copy all necessary files
COPY ./Common ./Common
COPY ./Broker ./Broker

# Install common app
WORKDIR /apps/Common

# Install packages
RUN npm install

# Install service
WORKDIR /apps/Broker

# Install packages
RUN npm install

# Build the app
RUN npm run build



# --------------- RUN STAGE --------------- #
FROM node:lts-alpine as run-stage

# Install Bash and cURL
# RUN apk add --no-cache bash
# RUN apk add --no-cache curl

# Move to root directory
WORKDIR /apps

# Only copy compiled files to build runnable service
COPY --from=build-stage ./apps/Broker/dist ./

# Install common app
WORKDIR /apps/Common

# Only install production-related packages
RUN npm install --production

# Install service
WORKDIR /apps/Broker

# Only install production-related packages
RUN npm install --production

# Copy environment variables file inside service
COPY ./Broker/.env.production ./.env.production

# Set the STOPSIGNAL
STOPSIGNAL SIGTERM

# Expose necessary port to talk with service
EXPOSE 8000

# Set environment variables
ENV ENV=production

# Define command to run when launching the image
CMD ["node", "./src/index.js"]
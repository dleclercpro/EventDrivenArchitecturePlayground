# --------------- BUILD STAGE --------------- #
FROM node:lts as build-stage

# Move to root directory
WORKDIR /apps

# Copy all necessary files
COPY ./CommonApp ./CommonApp
COPY ./DeliveryApp ./DeliveryApp

# Install common app
WORKDIR /apps/CommonApp

# Only install production-related packages
RUN npm i --only-prod

# Install service
WORKDIR /apps/DeliveryApp

# Only install production-related packages
RUN npm i --only-prod

# Build the app
RUN npm run build



# --------------- RUN STAGE --------------- #
FROM node:lts-alpine as run-stage

# Move to root directory
WORKDIR /apps

# Only copy compiled files to build runnable service
COPY --from=build-stage ./apps/DeliveryApp/dist ./

# Install common app
WORKDIR /apps/CommonApp

# Only install production-related packages
RUN npm i --only-prod

# Install service
WORKDIR /apps/DeliveryApp

# Only install production-related packages
RUN npm i --only-prod

# Copy environment variables file inside service
COPY ./DeliveryApp/.env.production ./.env.production

# Expose necessary port to talk with service
EXPOSE 3003

# Define command to run when launching the image
CMD ["npm", "run", "start:prod"]
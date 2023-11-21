# --------------- BUILD STAGE --------------- #
FROM node:lts as build-stage

# Move to root directory
WORKDIR /apps

# Copy all necessary files
COPY ./CommonApp ./CommonApp
COPY ./OrderApp ./OrderApp

# Install common app
WORKDIR /apps/CommonApp

# Install packages
RUN npm install

# Install service
WORKDIR /apps/OrderApp

# Install packages
RUN npm install

# Build the app
RUN npm run build



# --------------- RUN STAGE --------------- #
FROM node:lts-alpine as run-stage

# Move to root directory
WORKDIR /apps

# Only copy compiled files to build runnable service
COPY --from=build-stage ./apps/OrderApp/dist ./

# Install common app
WORKDIR /apps/CommonApp

# Only install production-related packages
RUN npm install --production

# Install service
WORKDIR /apps/OrderApp

# Only install production-related packages
RUN npm install --production

# Copy environment variables file inside service
COPY ./OrderApp/.env.production ./.env.production

# Expose necessary port to talk with service
EXPOSE 3001

# Define command to run when launching the image
CMD ["npm", "run", "start:prod"]
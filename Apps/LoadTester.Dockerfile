FROM node:latest

# Install Artillery
RUN npm install -g artillery

# Set work directory
WORKDIR /usr/src/app

# Copy test script into the container
COPY ./LoadTester/scenarios.yml .

# Set the default command to run Artillery
CMD ["artillery", "run", "scenarios.yml"]
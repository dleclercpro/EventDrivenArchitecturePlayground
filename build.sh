#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change the current directory to the apps directory
cd "$dir/Apps"

# Define constant image details
user="dleclercpro"
app="eda-playground"
release="v1.0.0"

# Build app images
docker build -t $user/$app-broker:$release -f BrokerApp.Dockerfile .
docker build -t $user/$app-order:$release -f OrderApp.Dockerfile .
docker build -t $user/$app-payment:$release -f PaymentApp.Dockerfile .
docker build -t $user/$app-delivery:$release -f DeliveryApp.Dockerfile .

# Push app images to Dockerhub
docker push $user/$app-broker:$release
docker push $user/$app-order:$release
docker push $user/$app-payment:$release
docker push $user/$app-delivery:$release
#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change the current directory to the apps directory
cd "$dir/../Apps"

# Define constant image details
user="dleclercpro"
app="eda-playground"
release="v2.0.0"

# Build app images
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-broker:$release -f Broker.Dockerfile . --push
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-order:$release -f Order.Dockerfile . --push
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-payment:$release -f Payment.Dockerfile . --push
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-delivery:$release -f Delivery.Dockerfile . --push
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-prometheus:$release -f Prometheus.Dockerfile . --push
docker buildx build --platform linux/amd64,linux/arm64 -t $user/$app-grafana:$release -f Grafana.Dockerfile . --push
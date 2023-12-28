#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change the current directory to the apps directory
cd "$dir/../Apps"

# Define constant image details
user="dleclercpro"
app="eda-playground"
release="latest"

# Build app images
docker build -t $user/$app-broker:$release -f Broker.Dockerfile .
docker build -t $user/$app-order:$release -f Order.Dockerfile .
docker build -t $user/$app-payment:$release -f Payment.Dockerfile .
docker build -t $user/$app-delivery:$release -f Delivery.Dockerfile .
docker build -t $user/$app-prometheus:$release -f Prometheus.Dockerfile .
docker build -t $user/$app-grafana:$release -f Grafana.Dockerfile .
#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get K8s directories
namespaces="${dir}/../Resources/Namespaces"
ingresses="${dir}/../Resources/Ingresses"
services="${dir}/../Resources/Services"
deployments="${dir}/../Resources/Deployments"
daemonsets="${dir}/../Resources/DaemonSets"

# Create namespaces
kubectl apply -f $namespaces/App.ns.yml
kubectl apply -f $namespaces/Monitoring.ns.yml

# Create service for each monitoring deployment
kubectl apply -f $services/NodeExporter.service.yml
kubectl apply -f $services/CAdvisor.service.yml
kubectl apply -f $services/Prometheus.service.yml
kubectl apply -f $services/Grafana.service.yml

# Create service for each app deployment
kubectl apply -f $services/Broker.service.yml
kubectl apply -f $services/Order.service.yml
kubectl apply -f $services/Payment.service.yml
kubectl apply -f $services/Delivery.service.yml

# Create monitoring daemon sets
kubectl apply -f $daemonsets/NodeExporter.ds.yml
kubectl apply -f $daemonsets/CAdvisor.ds.yml

# Creating monitoring deployments
kubectl apply -f $deployments/Prometheus.deployment.yml
kubectl apply -f $deployments/Grafana.deployment.yml

# Create app deployments
kubectl apply -f $deployments/Broker.deployment.yml
kubectl apply -f $deployments/Order.deployment.yml
kubectl apply -f $deployments/Payment.deployment.yml
kubectl apply -f $deployments/Delivery.deployment.yml
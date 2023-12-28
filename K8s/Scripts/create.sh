#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get K8s resources root directory
resources="${dir}/../Resources"

# List directories by K8s resource type
namespaces="${resources}/Namespaces"
clusterRoles="${resources}/ClusterRoles"
clusterRoleBindings="${resources}/ClusterRoleBindings"
daemonSets="${resources}/DaemonSets"
ingresses="${resources}/Ingresses"
services="${resources}/Services"
deployments="${resources}/Deployments"

# Create namespaces
kubectl apply -f $namespaces/App.ns.yml
kubectl apply -f $namespaces/Monitoring.ns.yml

# Create cluster roles
kubectl apply -f $clusterRoles/Prometheus.role.yml

# Create cluster role bindings
kubectl apply -f $clusterRoleBindings/Prometheus.binding.yml

# NOTE: services need to be created BEFORE the resources they target
# Create service for each monitoring deployment
kubectl apply -f $services/NodeExporter.service.yml
kubectl apply -f $services/CAdvisor.service.yml
kubectl apply -f $services/Prometheus.service.yml
kubectl apply -f $services/Grafana.service.yml

# NOTE: services need to be created BEFORE the resources they target
# Create service for each app deployment
kubectl apply -f $services/Broker.service.yml
kubectl apply -f $services/Order.service.yml
kubectl apply -f $services/Payment.service.yml
kubectl apply -f $services/Delivery.service.yml

# Create monitoring daemon sets
kubectl apply -f $daemonSets/NodeExporter.ds.yml
kubectl apply -f $daemonSets/CAdvisor.ds.yml

# Creating monitoring deployments
kubectl apply -f $deployments/Prometheus.deployment.yml
kubectl apply -f $deployments/Grafana.deployment.yml

# Create app deployments
kubectl apply -f $deployments/Broker.deployment.yml
kubectl apply -f $deployments/Order.deployment.yml
kubectl apply -f $deployments/Payment.deployment.yml
kubectl apply -f $deployments/Delivery.deployment.yml
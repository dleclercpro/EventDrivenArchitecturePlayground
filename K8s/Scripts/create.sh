#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get K8s resources root directory
resources="${dir}/../Resources"
grafanaResources="${dir}/../../Apps/Grafana"

# List directories by K8s resource type
namespaces="${resources}/Namespaces"
configMaps="${resources}/ConfigMaps"
clusterRoles="${resources}/ClusterRoles"
clusterRoleBindings="${resources}/ClusterRoleBindings"
daemonSets="${resources}/DaemonSets"
ingresses="${resources}/Ingresses"
services="${resources}/Services"
deployments="${resources}/Deployments"

# Data
GRAFANA_DASHBOARD="${grafanaResources}/dashboard.json"



# Create namespaces
kubectl apply -f $namespaces/App.namespace.yml
kubectl apply -f $namespaces/Monitoring.namespace.yml

# Create static config maps
kubectl apply -f $configMaps/DataSources.configmap.yml
kubectl apply -f $configMaps/DashboardProviders.configmap.yml

# Generate dynamic config maps
(
    kubectl create configmap grafana-dashboard -n monitoring --from-file=dashboard.json="$GRAFANA_DASHBOARD" --dry-run=client -o yaml |
    kubectl apply -f -
)

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
kubectl apply -f $daemonSets/NodeExporter.daemonset.yml
kubectl apply -f $daemonSets/CAdvisor.daemonset.yml

# Creating monitoring deployments
kubectl apply -f $deployments/Prometheus.deployment.yml
kubectl apply -f $deployments/Grafana.deployment.yml

# Create app deployments
kubectl apply -f $deployments/Broker.deployment.yml
kubectl apply -f $deployments/Order.deployment.yml
kubectl apply -f $deployments/Payment.deployment.yml
kubectl apply -f $deployments/Delivery.deployment.yml
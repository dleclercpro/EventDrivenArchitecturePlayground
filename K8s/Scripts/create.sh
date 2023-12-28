#!/bin/bash

# Get the directory containing the script
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get K8s resources root directory
RESOURCES="${DIR}/../Resources"
GRAFANA_DIR="${DIR}/../../Apps/Grafana"

# List directories by K8s resource type
NAMESPACES="${RESOURCES}/Namespaces"
CONFIG_MAPS="${RESOURCES}/ConfigMaps"
CLUSTER_ROLES="${RESOURCES}/ClusterRoles"
CLUSTER_ROLE_BINDINGS="${RESOURCES}/ClusterRoleBindings"
DAEMON_SETS="${RESOURCES}/DaemonSets"
INGRESSES="${RESOURCES}/Ingresses"
SERVICES="${RESOURCES}/Services"
DEPLOYMENTS="${RESOURCES}/Deployments"

# List filepaths
GRAFANA_DASHBOARD_FILEPATH="${GRAFANA_DIR}/dashboard.json"



# Create namespaces
kubectl apply -f $NAMESPACES/App.namespace.yml
kubectl apply -f $NAMESPACES/Monitoring.namespace.yml

# Create static config maps
kubectl apply -f $CONFIG_MAPS/DataSources.configmap.yml
kubectl apply -f $CONFIG_MAPS/DashboardProviders.configmap.yml

# Generate dynamic config maps
(
    kubectl create configmap -n monitoring grafana-dashboard --from-file=dashboard.json="$GRAFANA_DASHBOARD_FILEPATH" --dry-run=client -o yaml |
    kubectl apply -f -
)

# Create cluster roles
kubectl apply -f $CLUSTER_ROLES/Prometheus.role.yml

# Create cluster role bindings
kubectl apply -f $CLUSTER_ROLE_BINDINGS/Prometheus.binding.yml

# NOTE: services need to be created BEFORE the resources they target
# Create service for each monitoring deployment
kubectl apply -f $SERVICES/NodeExporter.service.yml
kubectl apply -f $SERVICES/CAdvisor.service.yml
kubectl apply -f $SERVICES/Prometheus.service.yml
kubectl apply -f $SERVICES/Grafana.service.yml

# NOTE: services need to be created BEFORE the resources they target
# Create service for each app deployment
kubectl apply -f $SERVICES/Broker.service.yml
kubectl apply -f $SERVICES/Order.service.yml
kubectl apply -f $SERVICES/Payment.service.yml
kubectl apply -f $SERVICES/Delivery.service.yml

# Create monitoring daemon sets
kubectl apply -f $DAEMON_SETS/NodeExporter.daemonset.yml
kubectl apply -f $DAEMON_SETS/CAdvisor.daemonset.yml

# Creating monitoring deployments
kubectl apply -f $DEPLOYMENTS/Prometheus.deployment.yml
kubectl apply -f $DEPLOYMENTS/Grafana.deployment.yml

# Create app deployments
kubectl apply -f $DEPLOYMENTS/Broker.deployment.yml
kubectl apply -f $DEPLOYMENTS/Order.deployment.yml
kubectl apply -f $DEPLOYMENTS/Payment.deployment.yml
kubectl apply -f $DEPLOYMENTS/Delivery.deployment.yml
#!/bin/bash

# Delete app deployments
kubectl delete deployment broker
kubectl delete deployment order
kubectl delete deployment payment
kubectl delete deployment delivery

# Delete monitoring deployments
kubectl delete deployment -n monitoring prometheus
kubectl delete deployment -n monitoring grafana

# Delete monitoring daemon sets
kubectl delete daemonset -n monitoring cadvisor
kubectl delete daemonset -n monitoring node-exporter

# Delete app services
kubectl delete service broker
kubectl delete service order
kubectl delete service payment
kubectl delete service delivery

# Delete monitoring services
kubectl delete service -n monitoring prometheus
kubectl delete service -n monitoring grafana
kubectl delete service -n monitoring cadvisor
kubectl delete service -n monitoring node-exporter

# Delete cluster role bindings
kubectl delete clusterrolebinding prometheus

# Delete cluster roles
kubectl delete clusterrole prometheus

# Delete config maps
kubectl delete configmap -n monitoring grafana-dashboard
kubectl delete configmap -n monitoring grafana-dashboard-providers
kubectl delete configmap -n monitoring grafana-datasources

# Delete namespaces
# kubectl delete namespace app
# kubectl delete namespace monitoring
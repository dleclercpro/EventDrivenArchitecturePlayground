#!/bin/bash

# Delete app deployments
kubectl delete deployment broker-deployment
kubectl delete deployment order-deployment
kubectl delete deployment payment-deployment
kubectl delete deployment delivery-deployment

# Delete monitoring deployments
kubectl delete deployment -n monitoring prometheus-deployment
kubectl delete deployment -n monitoring grafana-deployment

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

# Delete namespaces
# kubectl delete namespace app
# kubectl delete namespace monitoring
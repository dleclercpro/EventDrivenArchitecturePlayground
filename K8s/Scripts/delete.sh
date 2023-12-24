#!/bin/bash

# Delete service for each deployment
kubectl delete service broker
kubectl delete service order
kubectl delete service payment
kubectl delete service delivery

# Delete each deployment
kubectl delete deployment broker-deployment
kubectl delete deployment order-deployment
kubectl delete deployment payment-deployment
kubectl delete deployment delivery-deployment
#!/bin/bash

# Expose broker app
kubectl port-forward service/broker 8080:8000
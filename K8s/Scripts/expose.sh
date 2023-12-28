#!/bin/bash

# Expose broker app
kubectl port-forward service/broker 8000:80
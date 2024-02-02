# Define constant image details
user="dleclercpro"
app="sweets"
release="latest"

# Upload local images to Minikube image registry
minikube image load $user/$app-broker:$release
minikube image load $user/$app-order:$release
minikube image load $user/$app-payment:$release
minikube image load $user/$app-delivery:$release
minikube image load $user/$app-prometheus:$release
minikube image load $user/$app-grafana:$release
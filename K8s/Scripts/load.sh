# Define constant image details
user="dleclercpro"
app="eda-playground"
release="v2.0.0"

# Upload local images to Minikube image registry
minikube image load $user/$app-broker:$release
minikube image load $user/$app-order:$release
minikube image load $user/$app-payment:$release
minikube image load $user/$app-delivery:$release
minikube image load $user/$app-prometheus:$release
minikube image load $user/$app-grafana:$release
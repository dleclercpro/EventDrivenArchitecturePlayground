# Kubernetes Basics

## Concepts
### Pod
A ```pod``` represents a set of (isolated) running containers on a node, which share a common network and storage space.

### Workload
A ```workload``` is an application that runs using a Kubernetes cluster.

### Workload Resource
A ```workload resource``` is representation of an app's infrastructure in terms of pods. Based on its type, it is coupled with specific behaviors. Here is a non-exhaustive list of built-in workload resources, with their use case:

- ```Deployment```: stateless application where every pod is interchangeable
- ```StatefulSet```: stateful application, where pods are unique and cannot be interchanged
- ```Job```: task that needs to be executed once
- ```CronJob```: task that needs to be executed on a periodic basis

### Kubelet
A ```kubelet``` is an agent that manages containers as part of pods on a node within a K8s cluster. Every single node within said cluster has a ```kubelet```.

### Controller
A ```controller`````` process, a.k.a. control loop, that watches over and acts upon a specific aspect of the cluster state. It does so by tracking the state of at least one resource type, and ensures the latter's state is brought (closer) to the desired state, in case there is any difference between the two.

Example: the built-in ```Job``` controller is designed to run a pod, or many pods, to carry out a task, and then stops. The desired state for a tracked ```Job``` resource is its completion.

## Commands
### List pods
```
kubectl get pods
```

### Display information about a pod
```
kubectl describe pod <POD_NAME>
```

### Deploy a pod
```
kubectl apply -f <POD_YAML_FILEPATH>
```

### Delete a pod
```
kubectl delete pod <POD_NAME>
```

### Scale a deployment
```
kubectl scale deployment <DEPLOYMENT_NAME> --replicas=<NUMBER_OF_REPLICAS>
```

### Display information about deployment rollout
```
kubectl rollout status deployment/<DEPLOYMENT_NAME>
```
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
A ```controller``` process, a.k.a. control loop, that watches over and acts upon a specific aspect of the cluster state. It does so by tracking the state of at least one resource type, and ensures the latter's state is brought (closer) to the desired state, in case there is any difference between the two.

Example: the built-in ```Job``` controller is designed to run a pod, or many pods, to carry out a task, and then stops. The desired state for a tracked ```Job``` resource is its completion.

### Service
A ```service``` is an abstraction of a logical set of pods, which can be used to communicate with said pods on a fixed cluster-specific IP address. A service load balances traffic to each pod which it encompasses.

## Networking
Container pods use networking to communicate between each other via loopback (i.e. by addressing ```localhost```).

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
kubectl scale deployment/<DEPLOYMENT_NAME> --replicas=<NUMBER_OF_REPLICAS>
```

### Automatically scale a deployment
In order for the ```autoscale``` command to work, you need to have horizontal pod scaling enabled in the target cluster.

```
kubectl autoscale deployment/<DEPLOYMENT_NAME> --min=<MIN_REPLICAS> --max=<MAX_REPLICAS> --cpu-percent=<CPU_USAGE_THRESHOLD>
```

### Display information about deployment rollout
```
kubectl rollout status deployment/<DEPLOYMENT_NAME>
```

### Display deployment rollout details [of a given revision]
```
kubectl rollout history deployment/<DEPLOYMENT_NAME> [--revision=<REVISION_NUMBER>]
```

### Rollback deployment [to a given revision]
```
kubectl rollout undo deployment/<DEPLOYMENT_NAME> [--to-revision=<REVISION_NUMBER>]
```

### Forward local machine port to service port
```
kubectl port-forward service/<SERVICE_NAME> <LOCAL_MACHINE_PORT>:<SERVICE_PORT>
```

### Start a bash terminal inside a pod container
```
kubectl exec -it <POD_NAME> -- /bin/sh
```
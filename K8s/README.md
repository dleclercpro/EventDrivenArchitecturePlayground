# Kubernetes Basics

## Concepts
### Pod
A ```Pod``` represents a set of (isolated) running containers on a node, which share a common network and storage space.

### Workload
A ```Workload``` is an application that runs using a Kubernetes cluster.

### Workload Resource
A ```Workload Resource``` is representation of an app's infrastructure in terms of pods. Based on its type, it is coupled with specific behaviors. Here is a non-exhaustive list of built-in workload resources, with their use case:

- ```Deployment```: stateless application where every pod is interchangeable
- ```StatefulSet```: stateful application, where pods are unique and cannot be interchanged
- ```Job```: task that needs to be executed once
- ```CronJob```: task that needs to be executed on a periodic basis

### Kubelet
A ```Kubelet``` is an agent that manages containers as part of pods on a node within a K8s cluster. Every single node within said cluster has a ```Kubelet```.

### Controller
A ```Controller``` process, a.k.a. control loop, that watches over and acts upon a specific aspect of the cluster state. It does so by tracking the state of at least one resource type, and ensures the latter's state is brought (closer) to the desired state, in case there is any difference between the two.

Example: the built-in ```Job``` controller is designed to run a pod, or many pods, to carry out a task, and then stops. The desired state for a tracked ```Job``` resource is its completion.

### Service
A ```Service``` is a network abstraction used for <b>internal</b> access to a given set of pods within a cluster. A ```Service``` uses simple load balancing (e.g. round-robin, client IP) to forward the traffic to each pod which it is responsible for.

### Ingress
An ```Ingress``` is a network abstraction used for <b>external</b> access to services within a cluster. An ```Ingress``` provides more advanced routing and load balancing options than a ```Service```.

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
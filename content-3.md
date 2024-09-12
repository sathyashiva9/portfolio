# Scale from and to 0 nodes using the Cluster autoscaler

1. Go to the ASG of the Nodegroup and add the following tags:
```
key=k8s.io/cluster-autoscaler/node-template/label/ng 
value=Ecg-Analysis

key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/ignoredaemonsetsutilization
value=true

key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/scaledownunneededtime
value=10m0s
```


2. Go to the launch template of the Nodegroup and add the tags.
```
key=k8s.io/cluster-autoscaler/node-template/label/ng 
value=Ecg-Analysis

key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/ignoredaemonsetsutilization
value=true

key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/scaledownunneededtime
value=10m0s
```

## About the tags:

```
key=k8s.io/cluster-autoscaler/node-template/label/ng 
value=Ecg-Analysis
```
Here the k8s.io/cluster-autoscaler/node-template/label/ng is the label used in the nodeSelector. This can be seen using the command ```kubectl describe pod <podname>``` [ Node-Selectors: ng=Ecg-Analysis].

```
key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/ignoredaemonsetsutilization
value=true
```
Here the above tag is added for ignoring the daemonsetsutilization.

```
key=k8s.io/cluster-autoscaler/node-template/autoscaling-options/scaledownunneededtime
value=10m0s
```
Add the above tag to change the default termination time which is 10m.





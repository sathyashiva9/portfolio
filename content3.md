# Scale from and to 0 nodes using the Cluster autoscaler

1. Create the nodegroup using the following command:

``` 
eksctl create nodegroup --cluster=qa-cluster --name=ECG-ANALYSIS-GPU-QA --node-type=g4dn.xlarge --nodes=0 --nodes-min=0 --nodes-max=1 --node-volume-size=50 --node-volume-type=gp3 --ssh-access --ssh-public-key=QA_KEY_20221215 --managed --asg-access --external-dns-access --full-ecr-access --appmesh-access --alb-ingress-access --node-labels="ng=Ecg-Analysis-Gpu-Test,type=OnDemand,environment=QA,k8s.amazonaws.com/accelerator=nvidia-tesla-t4"
```

2. Go to the ASG of the Nodegroup and add the following tags:

```
key=k8s.io/cluster-autoscaler/node-template/label/ng 
value=Ecg-Analysis-Gpu-Test

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
Here the k8s.io/cluster-autoscaler/node-template/label/ng is the label used in the nodeSelector. This can be seen using the command ```kubectl describe pod <podname>``` [ Node-Selectors: ng=Ecg-Analysis-Gpu-Test].

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

[Link here](https://docs.google.com/document/d/1Pj9CqVFExueQHvNu2WUQd4L3zOap32f_-NYpgd2Eb_M/edit?addon_store)



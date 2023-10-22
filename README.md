# My First Kubernetes Deployment

## About

This repository holds the artifacts I developed to deploy a realistic kubernetes instance that supports a trivial, original application.

## How to Use

1. Install minikube, docker, cilium cli, and make
2. Run `make start-cluster && make deploy`
3. Run `make ingress-ip`
4. Copy and paste the output of step 3 into a web browser and append the suffix `/ideas`
5. ???
6. When done run `make delete-cluster`

## To do list

- [x] Start a local kubernetes cluster.
  - Installed and setup `minikube`, `docker`, and `kubectl`. I started the local cluster with `minikube config set driver docker && minikube start`
- [x] Write a trivial application server
- [x] Dockerize the application
- [x] Deploy the application in kubernetes cluster
- [x] Deploy a load balancer in the cluster
- [ ] Deploy a PV in the cluster
- [ ] Deploy a PVC in the cluster

## Troubleshooting

1. Ran into an error where the Tasker App wouldn't start in Kubernetes because of an ImagePullError. I tried setting the `imagePullPolicy` to `Never` to try and force it to look locally but with no success. My solution was to run `eval $(minikube docker-env)` and then rebuild the image in the same shell. Apparently this sets some necessary env variables for docker + minikube.

2. Problem: I go to the ingress ip and it doesn't load my app. In checking the description of the ingress resource, I noticed that the registered backend path had no associated pod IP. Something was wrong with how my ingress was connection to my service and the service was connecting to my pod. I think the issue was not keeping them all in the same namespace. I also explicitly defined some selector labels just in case that would help.

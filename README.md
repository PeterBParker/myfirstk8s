# My First Kubernetes Deployment

## About

This repository holds the artifacts I developed to deploy a realistic kubernetes instance that supports a trivial, original application.

## To do list

- [x] Start a local kubernetes cluster.
  - Installed and setup `minikube`, `docker`, and `kubectl`. I started the local cluster with `minikube config set driver docker && minikube start`
- [x] Write a trivial application server
- [x] Dockerize the application
- [x] Deploy the application in kubernetes cluster
- [ ] Deploy a load balancer in the cluster
- [ ] Deploy a PVC in the cluster
- [ ] Deploy a Network Policy Provider

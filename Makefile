.PHONY: docker
docker:
	docker build -t tasker:1.0.0 .

.PHONY: deploy
deploy: docker
	kubectl apply -f ./k8s/pv.yaml
	kubectl apply -f ./k8s/pvc.yaml
	kubectl apply -f ./k8s/pod.yaml
	kubectl apply -f ./k8s/service.yaml
	kubectl apply -f ./k8s/ingress.yaml
	
.PHONY: destroy
destroy:
	kubectl delete pod tasker-app
	kubectl delete service tasker-app
	kubectl delete ingress minimal-ingress
	kubectl delete pv my-harddrive
	kubectl delete pvc pv-claim

.PHONY: delete-cluster
delete-cluster:
	minikube delete

.PHONY: start-cluster
start-cluster:
	minikube start --network-plugin=cni --cni=false
	cilium install --version 1.14.3     --set kubeProxyReplacement=true     --set ingressController.enabled=true     --set ingressController.loadbalancerMode=dedicated --set ingressController.default=true

.PHONY: ingress-ip
ingress-ip:
	minikube service cilium-ingress-minimal-ingress --url
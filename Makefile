.PHONY: docker
docker:
	docker build -t local:tasker-app .

.PHONY: deploy
deploy: docker
	kubectl apply -f ./k8s/deployment.yaml
	kubectl apply -f ./k8s/service.yaml

.PHONY: destroy
destroy:
	kubectl delete deployment tasker-app-deployment
	kubectl delete service tasker-app

.PHONY: delete-cluster
delete-cluster:
	minikube delete

.PHONY: start-cluster
start-cluster:
	minikube start --network-plugin=cni --cni=false
	cilium install
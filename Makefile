all:
	docker build -t nsfilho/rocketchat-client:latest ./

push:
	docker push nsfilho/rocketchat-client:latest
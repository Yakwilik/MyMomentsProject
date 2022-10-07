.PHONY: docker_run

docker_run:
	docker run -it -p "8001:8000" -v "${PWD}:/project/" --rm webproject /bin/bash

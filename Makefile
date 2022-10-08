PP=POSTGRES_PASSWORD
PU=POSTGRES_USER

USER=qwerty
PWSRD=password

DBNAME=POSTGRES_DB
NAME=postgres

NET=network
net=host

DBCONTNAME=postgres



.PHONY: docker_run docker_build all run_postgres run_server

all: run_postgres docker_build docker_run

docker_run:
	docker run -it --network=host -v "${PWD}:/project/" --env-file MyMoments/.env --rm webproject

run_server:
	python3 MyMoments/manage.py runserver 0.0.0.0:8000

docker_build:
	 docker build -t webproject .

run_postgres:
	docker run --rm -e $(PP)=$(PWSRD) -d -e $(PU)=$(USER) -e $(DBNAME)=$(postgres) --$(NET)=$(net)  $(DBCONTNAME)



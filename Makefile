.PHONY: compose-build compose-up compose-log build-up migrate connect-db inspect-volume compose-down

all:  build-up compose-log


compose-build:
	docker-compose build

compose-up:
	docker-compose up -d

compose-log:

build-up:
	docker-compose up -d --build

migrate:
	docker-compose exec web python3 manage.py migrate --noinput

connect-db:
	docker-compose exec db psql --username=hello_django --dbname=hello_django_dev

inspect-volume:
	docker volume inspect mymomentsproject_postgres_data

compose-down:
	docker-compose down -v

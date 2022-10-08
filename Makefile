.PHONY: compose-build compose-up compose-log build-up migrate connect-db inspect-volume compose-down manage

all:  build-up compose-log


compose-build:
	docker-compose build

compose-up:
	docker-compose up -d

compose-log:
	docker-compose logs -f
build-up:
	docker-compose up -d --build

migrate:
	docker-compose exec web python3 manage.py migrate --noinput

connect-db:
	docker-compose exec db psql --username=hello_django --dbname=hello_django_dev

inspect-volume:
	docker volume inspect mymomentsproject_postgres_data

manage:
	docker-compose exec web python3 manage.py $(filter-out $@,$(MAKECMDGOALS))

%:
	@:

compose-down:
	docker-compose down -v

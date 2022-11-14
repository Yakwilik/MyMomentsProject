FROM postgres:12.0-alpine
COPY ./configs/postgres/pg-setup.sql /docker-entrypoint-initdb.d/

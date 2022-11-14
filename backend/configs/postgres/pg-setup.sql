CREATE DATABASE hello_django_dev;
CREATE USER hello_django WITH PASSWORD 'hello_django_password';
ALTER ROLE hello_django SET client_encoding TO 'utf8';
ALTER ROLE hello_django SET default_transaction_isolation TO 'read committed';
ALTER ROLE hello_django SET timezone TO 'Europe/Moscow';
GRANT ALL PRIVILEGES ON DATABASE hello_django_dev TO hello_django;

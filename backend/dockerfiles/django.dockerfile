FROM python:3.8

RUN apt-get update

WORKDIR /project
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./configs/pip/requirements.txt /tmp/
COPY ./configs/uwsgi/uwsgi.ini /etc/

RUN mkdir /sock
RUN chmod -R 777 /sock

RUN python3 -m ensurepip --upgrade
RUN pip3 install pip -U

RUN pip install -Ur /tmp/requirements.txt
RUN apt-get install make





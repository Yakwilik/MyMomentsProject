FROM python:3.8

RUN apt-get update

WORKDIR /project
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python3 -m ensurepip --upgrade

RUN pip3 install pip -U


RUN pip3 install django

RUN pip3 install postgres

RUN pip3 install Pillow

RUN pip3 install djangorestframework

RUN apt-get install make




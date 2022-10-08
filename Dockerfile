FROM alpine

RUN apk update && apk add socat

WORKDIR /project/MyMoments
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache mysql-client

RUN apk add --no-cache python3

RUN python3 -m ensurepip --upgrade

RUN pip3 install pip -U


RUN pip3 install django

RUN pip3 install postgres
RUN apk add make




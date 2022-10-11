FROM nginx:alpine

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD ./configs/nginx/uwsgi_params /etc/nginx/
ADD ./configs/nginx/django.nginx /etc/nginx/conf.d/default.conf
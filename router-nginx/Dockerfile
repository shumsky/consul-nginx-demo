FROM nginx

ADD nginx.ctmpl /tmp/nginx.ctmpl
ADD https://releases.hashicorp.com/consul-template/0.16.0/consul-template_0.16.0_linux_amd64.zip /tmp/

RUN apt-get update && apt-get install -y unzip
RUN unzip /tmp/consul-template_0.16.0_linux_amd64.zip -d /usr/local/bin

EXPOSE 80

CMD ["consul-template", "-consul", "consul:8500", "-template", "/tmp/nginx.ctmpl:/tmp/nginx.conf", "-exec", "nginx -c /tmp/nginx.conf -g 'daemon off;'"]

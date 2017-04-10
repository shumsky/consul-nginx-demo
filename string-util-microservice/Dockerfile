FROM node
RUN mkdir /opt/string-util-microservice
WORKDIR /opt/string-util-microservice
ADD package.json /opt/string-util-microservice/
ADD app.js /opt/string-util-microservice/
ADD https://releases.hashicorp.com/envconsul/0.6.2/envconsul_0.6.2_linux_amd64.tgz /tmp/
RUN tar -xf /tmp/envconsul_0.6.2_linux_amd64.tgz -C /usr/local/bin && rm /tmp/envconsul_0.6.2_linux_amd64.tgz
RUN npm install
EXPOSE 3002
CMD ["envconsul", "-consul", "consul:8500", "-prefix", "config/ping-pong", "node", "app.js"]

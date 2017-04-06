FROM java
RUN mkdir /opt/capitalizer-microservice
ADD target/capitalizer-microservice-1.0.0.jar /opt/capitalizer-microservice/
ADD https://releases.hashicorp.com/envconsul/0.6.2/envconsul_0.6.2_linux_amd64.tgz /tmp/
RUN tar -xf /tmp/envconsul_0.6.2_linux_amd64.tgz -C /usr/local/bin && rm /tmp/envconsul_0.6.2_linux_amd64.tgz
WORKDIR /opt/capitalizer-microservice
CMD ["envconsul", "-consul", "consul:8500", "-prefix", "config/consul-demo", "java", "-jar", "capitalizer-microservice-1.0.0.jar"]

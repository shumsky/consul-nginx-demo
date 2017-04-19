FROM java
RUN mkdir /opt/candidate-microservice
ADD build/libs/candidate-microservice.jar /opt/candidate-microservice/
ADD https://releases.hashicorp.com/envconsul/0.6.2/envconsul_0.6.2_linux_amd64.tgz /tmp/
RUN tar -xf /tmp/envconsul_0.6.2_linux_amd64.tgz -C /usr/local/bin && rm /tmp/envconsul_0.6.2_linux_amd64.tgz
WORKDIR /opt/candidate-microservice
CMD ["envconsul", "-consul", "consul:8500", "-prefix", "config/consul-demo", "java", "-jar", "candidate-microservice.jar"]

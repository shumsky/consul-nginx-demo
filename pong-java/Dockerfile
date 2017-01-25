FROM java
RUN mkdir /opt/pong-java
ADD target/pong-java-1.0.0.jar /opt/pong-java/
ADD https://releases.hashicorp.com/envconsul/0.6.2/envconsul_0.6.2_linux_amd64.tgz /tmp/
RUN tar -xf /tmp/envconsul_0.6.2_linux_amd64.tgz -C /usr/local/bin && rm /tmp/envconsul_0.6.2_linux_amd64.tgz
WORKDIR /opt/pong-java
CMD ["envconsul", "-consul", "consul:8500", "-prefix", "config/ping-pong", "java", "-jar", "pong-java-1.0.0.jar"]

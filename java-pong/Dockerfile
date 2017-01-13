FROM java
RUN mkdir /opt/java-pong
ADD target/java-pong-1.0.0.jar /opt/java-pong/
WORKDIR /opt/java-pong
CMD ["java", "-jar", "java-pong-1.0.0.jar"]

FROM java
RUN mkdir /opt/pong-java
ADD target/pong-java-1.0.0.jar /opt/pong-java/
WORKDIR /opt/pong-java
CMD ["java", "-jar", "pong-java-1.0.0.jar"]

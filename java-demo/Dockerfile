FROM java
RUN mkdir /opt/java-demo
ADD target/java-demo-1.0.0.jar /opt/java-demo/
WORKDIR /opt/java-demo
CMD ["java", "-jar", "java-demo-1.0.0.jar"]

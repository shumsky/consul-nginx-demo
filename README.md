# consul-nginx-demo

This simple project demonstrates usage of client-side service registration and server-side service discovery patterns using Consul and nginx. 
The project includes:
- two microservices written in Java and Node.js
- a router microservice built on nginx and consul-template 

![Flow](diagram.png)
 
## How to run
```
gradle clean build
docker-compose build
docker-compose up
curl http://localhost:8080/find
```

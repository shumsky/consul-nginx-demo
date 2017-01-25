package com.thomascook.servicediscovery;

import io.github.tcdl.msb.api.MessageTemplate;
import io.github.tcdl.msb.api.MsbContext;
import io.github.tcdl.msb.api.ObjectFactory;
import io.github.tcdl.msb.api.ResponderOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@SpringBootApplication
@EnableDiscoveryClient
public class JavaPong {

    @Autowired
    private MsbContext msbContext;

    @Value("${NAMESPACE:consul:demo}")
    public String namespace;

    @PostConstruct
    public void init() {
        ObjectFactory objectFactory = msbContext.getObjectFactory();

        objectFactory.createResponderServer(
                namespace,
                new ResponderOptions.Builder().withMessageTemplate(new MessageTemplate()).build(),
                (request, responder) -> responder.getResponder().send("pong"), String.class).listen();
    }

    @PreDestroy
    public void shutdown() {
        msbContext.shutdown();
    }

    public static void main(String[] args) {
        SpringApplication.run(JavaPong.class, args);
    }
}

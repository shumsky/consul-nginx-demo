package com.thomascook.servicediscovery;

import io.github.tcdl.msb.api.MessageTemplate;
import io.github.tcdl.msb.api.MsbContext;
import io.github.tcdl.msb.api.ObjectFactory;
import io.github.tcdl.msb.api.ResponderOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class JavaDemo {

    @Autowired
    private MsbContext msbContext;

    @PostConstruct
    public void init() {
        ObjectFactory objectFactory = msbContext.getObjectFactory();

        objectFactory.createResponderServer(
                "service:discovery:demo",
                new ResponderOptions.Builder().withMessageTemplate(new MessageTemplate()).build(),
                (request, responder) -> {
                    responder.getResponder().send("hello back");
                }, String.class).listen();
    }

    public static void main(String[] args) {
        SpringApplication.run(JavaDemo.class, args);
    }
}

package io.github.shumsky.consuldemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CopyOnWriteArrayList;

@SpringBootApplication
@EnableDiscoveryClient
@RestController("/capitalize")
public class Capitalizer {

    @GetMapping(produces = "text/plain")
    public String capitalize(@RequestParam("text") String text) {
        return text.toUpperCase();
    }

    public static void main(String[] args) {
        SpringApplication.run(Capitalizer.class, args);
    }
}

package io.github.shumsky.consuldemo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableDiscoveryClient
@ConfigurationProperties
@RestController
public class JobCandidate {

    private String candidateName;

    @PostConstruct
    private void init() {
        int a = 0;
    }

    @GetMapping("/about")
    public String info() {
        return "Hello. My name is " + candidateName + ". I want to develop awesome microservices!";
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public static void main(String[] args) {
        SpringApplication.run(JobCandidate.class, args);
    }
}

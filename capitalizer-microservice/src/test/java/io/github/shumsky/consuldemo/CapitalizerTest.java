package io.github.shumsky.consuldemo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestClientException;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Capitalizer.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CapitalizerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testCapitalize() {
        String capitalized = restTemplate.getForObject("/capitalize?text={text}", String.class, "it works!");
        assert capitalized.equals("IT WORKS!");
    }

    @Test
    public void testCapitalizeBadRequest() {
        ResponseEntity<String> response = restTemplate.getForEntity("/capitalize", String.class);
        assert response.getStatusCode() == HttpStatus.BAD_REQUEST;
    }
}

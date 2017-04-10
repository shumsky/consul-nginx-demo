package io.github.shumsky.consuldemo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobCandidate.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JobCandidateTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testAbout() {
        String response = restTemplate.getForObject("/about", String.class);
        assert response.contains("JUnit");
    }
}

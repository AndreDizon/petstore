package com.example.petstore;

import com.example.petstore.model.Pet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PetControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testListPets() {
        ResponseEntity<Pet[]> res = restTemplate.getForEntity("/api/pets", Pet[].class);
        assertThat(res.getStatusCode().is2xxSuccessful()).isTrue();
    }
}

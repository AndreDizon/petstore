package com.example.petstore.controller;

import com.example.petstore.model.Pet;
import com.example.petstore.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "https://petstore-frontend-qe2r.onrender.com"})
public class PetController {
    private static final Logger log = LoggerFactory.getLogger(PetController.class);
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> listPets() {
        return petService.listPets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPet(@PathVariable("id") Long id) {
        return petService.getPet(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPet(@RequestBody java.util.Map<String, Object> body) {
        log.info("Create pet request body: {}", body);
        try {
            // extract fields defensively to avoid Jackson binding issues
            String name = body.get("name") != null ? String.valueOf(body.get("name")) : null;
            String species = body.get("species") != null ? String.valueOf(body.get("species")) : null;
            Object priceObj = body.get("price");
            java.math.BigDecimal price = null;
            if (priceObj instanceof Number) {
                price = java.math.BigDecimal.valueOf(((Number) priceObj).doubleValue());
            } else if (priceObj instanceof String) {
                try {
                    price = new java.math.BigDecimal((String) priceObj);
                } catch (NumberFormatException nfe) {
                    // will fall through and return bad request below
                }
            }
            String imageUrl = body.get("imageUrl") != null ? String.valueOf(body.get("imageUrl")) : null;

            if (name == null || species == null || price == null) {
                return ResponseEntity.badRequest().body(java.util.Map.of("message", "name, species and price are required"));
            }

            Pet pet = new Pet(name, species, price);
            pet.setImageUrl(imageUrl);
            Pet created = petService.createPet(pet);
            return ResponseEntity.created(URI.create("/api/pets/" + created.getId())).body(created);
        } catch (Exception ex) {
            log.error("Error creating pet from body={}", body, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(java.util.Map.of("message", "internal error"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable("id") Long id) {
        try {
            // return 404 if pet doesn't exist to avoid server-side exceptions
            return petService.getPet(id)
                    .map(p -> {
                        petService.deletePet(id);
                        return ResponseEntity.<Void>noContent().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception ex) {
            // log full exception for easier diagnosis (will appear in container logs)
            log.error("Error deleting pet id={}", id, ex);
            return ResponseEntity.<Void>status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable("id") Long id, @RequestBody Pet pet) {
        return petService.updatePet(id, pet)
                .map(p -> ResponseEntity.ok(p))
                .orElse(ResponseEntity.notFound().build());
    }
}

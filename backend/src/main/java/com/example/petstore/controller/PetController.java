package com.example.petstore.controller;

import com.example.petstore.model.Pet;
import com.example.petstore.service.PetService;
import com.example.petstore.controller.dto.PetDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.math.BigDecimal;
import org.springframework.util.MultiValueMap;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/pets")
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
    public ResponseEntity<?> createPet(@jakarta.validation.Valid @org.springframework.web.bind.annotation.RequestBody PetDto dto) {
        log.info("Create pet DTO: {}", dto);
        try {
            Pet pet = new Pet(dto.getName(), dto.getSpecies(), dto.getPrice());
            pet.setImageUrl(dto.getImageUrl());
            Pet created = petService.createPet(pet);
            return ResponseEntity.created(URI.create("/api/pets/" + created.getId())).body(created);
        } catch (Exception ex) {
            log.error("Error creating pet from dto={}", dto, ex);
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

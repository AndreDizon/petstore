package com.example.petstore.service;

import com.example.petstore.model.Pet;
import com.example.petstore.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> listPets() {
        return petRepository.findAll();
    }

    public Optional<Pet> getPet(Long id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
        pet.setId(null);
        return petRepository.save(pet);
    }

    public Optional<Pet> updatePet(Long id, Pet incoming) {
        return petRepository.findById(id).map(existing -> {
            if (incoming.getName() != null) existing.setName(incoming.getName());
            if (incoming.getSpecies() != null) existing.setSpecies(incoming.getSpecies());
            if (incoming.getPrice() != null) existing.setPrice(incoming.getPrice());
            if (incoming.getImageUrl() != null) existing.setImageUrl(incoming.getImageUrl());
            return petRepository.save(existing);
        });
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}

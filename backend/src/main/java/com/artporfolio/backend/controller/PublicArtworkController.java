package com.artporfolio.backend.controller;

import com.artporfolio.backend.model.Artwork;
import com.artporfolio.backend.repository.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artworks")
public class PublicArtworkController {

    @Autowired
    private ArtworkRepository artworkRepository;

    @GetMapping
    public ResponseEntity<?> getAllArtworks() {
        return ResponseEntity.ok(artworkRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtworkById(@PathVariable Long id) {
        return artworkRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

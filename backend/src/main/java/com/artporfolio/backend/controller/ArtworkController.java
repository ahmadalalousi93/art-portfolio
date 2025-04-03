package com.artporfolio.backend.controller;

import com.artporfolio.backend.model.Artwork;
import com.artporfolio.backend.repository.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/secure/artworks")
public class ArtworkController {

    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private ArtworkRepository artworkRepository;

    // ✅ POST - Add Artwork with image
    @PostMapping
    public ResponseEntity<?> addArtwork(@RequestParam("title") String title,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") Double price,
                                        @RequestParam("measurements") String measurements,
                                        @RequestParam("category") String category,
                                        @RequestParam("image") MultipartFile image) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            String filename = StringUtils.cleanPath(image.getOriginalFilename());
            Path filePath = uploadPath.resolve(filename);
            try (InputStream inputStream = image.getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            Artwork artwork = new Artwork(null, title, description, measurements, price, category, "/" + UPLOAD_DIR + "/" + filename);
            artworkRepository.save(artwork);

            return ResponseEntity.ok(artwork);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to save artwork.");
        }
    }

    // ✅ GET - Single artwork (admin use)
    @GetMapping("/{id}")
    public ResponseEntity<?> getArtworkById(@PathVariable Long id) {
        return artworkRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ PUT - Update artwork details
    @PutMapping("/{id}")
    public ResponseEntity<?> updateArtwork(@PathVariable Long id, @RequestBody Artwork updatedArtwork) {
        Optional<Artwork> optional = artworkRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Artwork existing = optional.get();
        existing.setTitle(updatedArtwork.getTitle());
        existing.setDescription(updatedArtwork.getDescription());
        existing.setPrice(updatedArtwork.getPrice());
        existing.setMeasurements(updatedArtwork.getMeasurements());
        existing.setCategory(updatedArtwork.getCategory());
        existing.setImagePath(updatedArtwork.getImagePath());

        artworkRepository.save(existing);
        return ResponseEntity.ok(existing);
    }

    // ✅ DELETE - Delete artwork
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArtwork(@PathVariable Long id) {
        if (!artworkRepository.existsById(id)) return ResponseEntity.notFound().build();

        artworkRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

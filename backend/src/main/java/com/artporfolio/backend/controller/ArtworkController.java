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

@RestController
@RequestMapping("/api/admin/secure/artworks")
public class ArtworkController {

    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private ArtworkRepository artworkRepository;

    @PostMapping
    public ResponseEntity<?> addArtwork(@RequestParam("title") String title,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") Double price,
                                        @RequestParam("measurements") String measurements,
                                        @RequestParam("category") String category,
                                        @RequestParam("image") MultipartFile image) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String filename = StringUtils.cleanPath(image.getOriginalFilename());
            Path filePath = uploadPath.resolve(filename);

            try (InputStream inputStream = image.getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            Artwork artwork = new Artwork();
            artwork.setTitle(title);
            artwork.setDescription(description);
            artwork.setPrice(price);
            artwork.setMeasurements(measurements);
            artwork.setCategory(category);
            artwork.setImagePath("/" + UPLOAD_DIR + "/" + filename);

            artworkRepository.save(artwork);
            return ResponseEntity.ok(artwork);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to save artwork.");
        }
    }
}

package com.artporfolio.backend.repository;

import com.artporfolio.backend.model.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
}

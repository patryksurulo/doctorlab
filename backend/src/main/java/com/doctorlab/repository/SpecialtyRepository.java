package com.doctorlab.repository;

import com.doctorlab.models.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecialtyRepository  extends JpaRepository<Specialty, Long> {
    Optional<Specialty> findByName(String name);

}

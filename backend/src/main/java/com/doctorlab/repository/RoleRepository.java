package com.doctorlab.repository;

import java.util.Optional;

import com.doctorlab.models.ERole;
import com.doctorlab.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);

}

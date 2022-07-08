package com.doctorlab.repository;

import java.util.List;
import java.util.Optional;

import com.doctorlab.models.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doctorlab.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  List<User> findUsersByRoles_Name(ERole roles_name);
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}

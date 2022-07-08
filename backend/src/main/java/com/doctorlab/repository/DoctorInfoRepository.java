package com.doctorlab.repository;

import com.doctorlab.models.DoctorInfo;
import com.doctorlab.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorInfoRepository extends JpaRepository<DoctorInfo, Long> {
    Optional<DoctorInfo> findByUser(User user);
}

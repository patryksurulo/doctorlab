package com.doctorlab.repository;

import com.doctorlab.models.Appointment;
import com.doctorlab.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAppointmentsByDoctor(User doctor);
    List<Appointment> findAppointmentsByPatient(User patient);
}

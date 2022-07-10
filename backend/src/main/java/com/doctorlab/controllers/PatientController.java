package com.doctorlab.controllers;

import com.doctorlab.models.DoctorInfo;
import com.doctorlab.models.ERole;
import com.doctorlab.models.User;
import com.doctorlab.payload.response.DoctorInfoResponse;
import com.doctorlab.repository.DoctorInfoRepository;
import com.doctorlab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/patient")
public class PatientController {

  @Autowired
  UserRepository userRepository;

  @Autowired
  DoctorInfoRepository doctorInfoRepository;

  public PatientController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @GetMapping("/make-an-appointment")
  @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
  public List<DoctorInfoResponse> makeAnAppointmentAccess() {
//    User user = identity.getCurrent();
    List<User> users = userRepository.findUsersByRoles_Name(ERole.ROLE_DOCTOR);
    List<DoctorInfoResponse> doctorInfoResponseList = new ArrayList<>();

    for (User user : users){
      Optional<DoctorInfo> doctorInfoOptional = doctorInfoRepository.findByUser(user);
      DoctorInfo doctorInfo;
      DoctorInfoResponse doctorInfoResponse = new DoctorInfoResponse();

      if (doctorInfoOptional.isPresent()){
        doctorInfo = doctorInfoOptional.get();
        doctorInfoResponse.setEmail(user.getEmail());
        doctorInfoResponse.setSpecialty(doctorInfo.getSpecialty().getName());
        doctorInfoResponse.setFirstname(user.getFirstname());
        doctorInfoResponse.setLastname(user.getLastname());
        doctorInfoResponse.setUsername(user.getUsername());
      }

      doctorInfoResponseList.add(doctorInfoResponse);
    }

    return doctorInfoResponseList;

  }

  @GetMapping("/my-appointment")
  @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
  public String myAppointmentsAccess() {
    return "My appointments Content.";
  }
}

package com.doctorlab.controllers;

import com.doctorlab.models.ERole;
import com.doctorlab.models.User;
import com.doctorlab.payload.request.DoctorInfoRequest;
import com.doctorlab.payload.response.DoctorInfoResponse;
import com.doctorlab.payload.response.MessageResponse;
import com.doctorlab.repository.DoctorInfoRepository;
import com.doctorlab.repository.SpecialtyRepository;
import com.doctorlab.repository.UserRepository;
import com.doctorlab.security.services.Identity;
import com.doctorlab.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    Identity identity;

    @Autowired
    DoctorInfoRepository doctorInfoRepository;

    @Autowired
    SpecialtyRepository specialtyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DoctorService doctorService;

    public DoctorController(Identity identity) {
        this.identity = identity;
    }

    @PostMapping("/info")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<MessageResponse> saveInfoDoctor(@Valid @RequestBody DoctorInfoRequest doctorInfoRequest){

        User user = identity.getCurrent();

        try{
            doctorService.saveDoctorInfo(user, doctorInfoRequest);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Doctor info failed!"));
        }

        return ResponseEntity.ok(new MessageResponse("Doctor info added successfully!"));
    }

    @GetMapping("/info")
    @PreAuthorize("hasRole('DOCTOR')")
    public DoctorInfoResponse getInfo(){
        User user = identity.getCurrent();

        return doctorService.getDoctorInfoByUser(user);
    }

    @GetMapping()
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public List<DoctorInfoResponse> getAllDoctors() {

        List<User> users = userRepository.findUsersByRoles_Name(ERole.ROLE_DOCTOR);
        List<DoctorInfoResponse> doctorInfoResponseList = new ArrayList<>();

        for (User user : users){

            DoctorInfoResponse doctorInfoResponse = doctorService.getDoctorInfoByUser(user);

            doctorInfoResponseList.add(doctorInfoResponse);
        }

        return doctorInfoResponseList;
    }
}

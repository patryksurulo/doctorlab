package com.doctorlab.controllers;

import com.doctorlab.models.Specialty;
import com.doctorlab.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/specialties")
public class SpecialtyController {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @GetMapping
    public List<Specialty> getSpecialties(){
        return specialtyRepository.findAll();
    }
}

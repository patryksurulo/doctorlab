package com.doctorlab.services;

import com.doctorlab.models.DoctorInfo;
import com.doctorlab.models.Specialty;
import com.doctorlab.models.User;
import com.doctorlab.payload.request.DoctorInfoRequest;
import com.doctorlab.payload.response.DoctorInfoResponse;
import com.doctorlab.repository.DoctorInfoRepository;
import com.doctorlab.repository.SpecialtyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorInfoRepository doctorInfoRepository;
    private final SpecialtyRepository specialtyRepository;

    public DoctorService(DoctorInfoRepository doctorInfoRepository, SpecialtyRepository specialtyRepository) {
        this.doctorInfoRepository = doctorInfoRepository;
        this.specialtyRepository = specialtyRepository;
    }

    public DoctorInfoResponse getDoctorInfoByUser(User user){
        Optional<DoctorInfo> doctorInfoOptional = doctorInfoRepository.findByUser(user);
        DoctorInfo doctorInfo;
        DoctorInfoResponse doctorInfoResponse = new DoctorInfoResponse();

        if (doctorInfoOptional.isPresent()){
            doctorInfo = doctorInfoOptional.get();
            doctorInfoResponse.setEmail(user.getEmail());
            doctorInfoResponse.setSpecialty(doctorInfo.getSpecialty().getName());
            doctorInfoResponse.setPrice(doctorInfo.getPrice());
            doctorInfoResponse.setFirstname(user.getFirstname());
            doctorInfoResponse.setLastname(user.getLastname());
            doctorInfoResponse.setUsername(user.getUsername());
        }

        return doctorInfoResponse;
    }

    public void saveDoctorInfo(User user, DoctorInfoRequest doctorInfoRequest){
        Optional<DoctorInfo> doctorInfoOptional = doctorInfoRepository.findByUser(user);
        DoctorInfo doctorInfo = new DoctorInfo();

        if(doctorInfoOptional.isPresent()){
            doctorInfo = doctorInfoOptional.get();
        }

        Optional<Specialty> specialty = specialtyRepository.findByName(doctorInfoRequest.getSpecialty());
        specialty.ifPresent(doctorInfo::setSpecialty);
        doctorInfo.setPrice(doctorInfoRequest.getPrice());

        doctorInfo.setUser(user);

        doctorInfoRepository.save(doctorInfo);
    }
}
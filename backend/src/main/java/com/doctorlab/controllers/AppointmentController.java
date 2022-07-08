package com.doctorlab.controllers;

import com.doctorlab.models.Appointment;
import com.doctorlab.models.User;
import com.doctorlab.payload.request.AppointmentRequest;
import com.doctorlab.payload.response.AppointmentResponse;
import com.doctorlab.payload.response.BusyAppointment;
import com.doctorlab.payload.response.MessageResponse;
import com.doctorlab.repository.AppointmentRepository;
import com.doctorlab.repository.UserRepository;
import com.doctorlab.security.services.Identity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final Identity identity;

    public AppointmentController(AppointmentRepository appointmentRepository, UserRepository userRepository, Identity identity) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.identity = identity;
    }

    @GetMapping("/doctors")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public List<BusyAppointment> getBusyAppointmentsByDoctor(@Valid @RequestParam String username){
        Optional<User> userOptional = userRepository.findByUsername(username);
        User user = new User();
        if(userOptional.isPresent()){
            user = userOptional.get();
        }
        List<Appointment> appointments = appointmentRepository.findAppointmentsByDoctor(user);
        List<BusyAppointment> busyAppointments = new ArrayList<>();
        for (Appointment appointment : appointments){
            BusyAppointment busyAppointment = new BusyAppointment(appointment.getDateTime());
            busyAppointments.add(busyAppointment);
        }

        return busyAppointments;
    }

    @PostMapping()
    public ResponseEntity<?> makeAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();
        Optional<User> doctorOpt = userRepository.findByUsername(appointmentRequest.getDoctorUsername());
        List<Appointment> appointments;

        if(doctorOpt.isPresent()){
            appointment.setDoctor(doctorOpt.get());
            appointment.setDateTime(appointmentRequest.getAppointmentDate());
            appointment.setPatient(identity.getCurrent());
            appointment.setPaid(false);
            appointments = appointmentRepository.findAppointmentsByDoctor(doctorOpt.get());
        }else {
            return ResponseEntity.badRequest().body("Doctor's username does not exist");
        }

        if(appointmentRequest.getAppointmentDate() == null){
            return ResponseEntity.badRequest().body("Appointment date cannot be empty");
        }

        for (Appointment appoint : appointments){
            if (appoint.getDateTime().equals(appointmentRequest.getAppointmentDate())){
                return ResponseEntity.badRequest().body("The appointment is busy");
            }
        }


        try{
            appointmentRepository.save(appointment);
        }catch (IllegalArgumentException e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("An appointment cannot be made");
        }


        return ResponseEntity.ok(new MessageResponse("You have an appointment"));

    }

    @GetMapping("/patients")
    @PreAuthorize("hasRole('PATIENT')")
    public List<AppointmentResponse> getAppointmentsByCurrentAuthUser(){
        List<Appointment> appointments = appointmentRepository.findAppointmentsByPatient(identity.getCurrent());

        List<AppointmentResponse> responseList = new ArrayList<>();

        for (Appointment appointment : appointments){
            AppointmentResponse response = new AppointmentResponse();
            response.setAppointmentId(appointment.getId());
            response.setDateTime(appointment.getDateTime());
            response.setDoctorFirstname(appointment.getDoctor().getFirstname());
            response.setDoctorLastname(appointment.getDoctor().getLastname());
            response.setPrice(appointment.getDoctor().getDoctorInfo().getPrice());
            response.setPaid(appointment.isPaid());
            responseList.add(response);
        }

        return responseList;
    }
}

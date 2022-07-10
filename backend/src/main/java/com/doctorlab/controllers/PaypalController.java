package com.doctorlab.controllers;

import com.doctorlab.models.Appointment;
import com.doctorlab.payload.request.AppointmentPaymentRequest;
import com.doctorlab.repository.AppointmentRepository;
import com.doctorlab.services.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PaypalController {
    @Autowired
    PaypalService service;

    @Autowired
    AppointmentRepository appointmentRepository;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

//    @GetMapping("/")
//    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
//    public String home() {
//        return "home";
//    }

    @PostMapping("/pay")
    @PreAuthorize("hasRole('PATIENT')")
    public String payment(@Valid @RequestBody AppointmentPaymentRequest appPayReq) {
        try {
            Payment payment = service.createPayment(appPayReq.getPrice(), appPayReq.getCurrency(), appPayReq.getMethod(),
                    appPayReq.getIntent(), appPayReq.getDescription(), "http://localhost:8081/" + CANCEL_URL,
                    "http://localhost:8081/" + SUCCESS_URL + "?appointmentId=" + appPayReq.getAppointmentId());
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    return "redirect:"+link.getHref();
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
        }
        return "redirect:/";
    }

    @GetMapping(value = CANCEL_URL)
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public String cancelPay() {
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam Long appointmentId) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
                if (appointmentOpt.isPresent()){
                    Appointment appointment = appointmentOpt.get();
                    appointment.setPaid(true);
                    appointmentRepository.save(appointment);
                }
                return "successful";
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return "redirect:/";
    }
}

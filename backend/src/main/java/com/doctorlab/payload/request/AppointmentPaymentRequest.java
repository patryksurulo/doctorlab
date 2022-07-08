package com.doctorlab.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppointmentPaymentRequest {
    private Long appointmentId;
    private double price;
    private String currency;
    private String method;
    private String intent;
    private String description;
}

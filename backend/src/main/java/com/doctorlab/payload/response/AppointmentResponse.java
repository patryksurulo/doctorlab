package com.doctorlab.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponse {
    private Long appointmentId;
    private String doctorFirstname;
    private String doctorLastname;
    private BigDecimal price;
    private LocalDateTime dateTime;
    private boolean isPaid;
}

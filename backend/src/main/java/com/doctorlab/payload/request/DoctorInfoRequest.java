package com.doctorlab.payload.request;

import java.math.BigDecimal;

public class DoctorInfoRequest {

    private String specialty;
    private BigDecimal price;

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

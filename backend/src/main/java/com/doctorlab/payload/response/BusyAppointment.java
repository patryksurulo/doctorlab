package com.doctorlab.payload.response;

import java.time.LocalDateTime;

public class BusyAppointment {

    private LocalDateTime dateTime;

    public BusyAppointment(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}

import AppointmentDatetimePicker from "./AppointmentDatetimePicker";
import AppointmentService from "../services/appointment-service";
import React, { useState, EventBus } from 'react';



const DoctorCard = ({ firstname, lastname, specialty, price, username }) => {
    const [selectedTime, setSelectedTime] = useState({ value: '', label: '' });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);

    const makeAppointment = () => {
        let date = selectedDate.toISOString().split('T')[0];
        AppointmentService.makeAppointment(username, date + "T" + selectedTime.value).then(
            (response) => {
                setMessage(response.data.message);
                setSuccess(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(error.response.data);
                setSuccess(false);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                  }
            }
        );
    }

    return (
        <div className="list-group mt-5">
            <div className="list-group-item flex-column align-items-start list-group-item-primary">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{firstname} {lastname}</h5>
                    <small className="text-muted">{specialty}</small>
                </div>
                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small className="text-muted">{price}$</small>

                <AppointmentDatetimePicker username={username} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <button onClick={makeAppointment} type="button" className="btn btn-outline-primary">Make an appointment</button>

                {success && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}

                {success === false && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
            </div>


        </div>
    );
}

export default DoctorCard;
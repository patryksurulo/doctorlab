import { useState } from "react";
import UserService from "../services/user.service";
import PaymentForm from "./PaymentForm";

const MyAppointmentRow = ({appointment}) => {

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <tr>
            <th scope="row">{appointment.appointmentId}</th>
            <td>{appointment.doctorFirstname}</td>
            <td>{appointment.doctorLastname}</td>
            <td>{appointment.price}</td>
            <td>{appointment.dateTime.toString().replace('T', ' | ')}</td>
            <td>{appointment.paid ? "Yes" : "No"}</td>
            <td>{appointment.paid ? null : <button onClick={toggleForm} type="button" class="btn btn-primary">Pay</button>}</td>
            <td>{showForm ? <PaymentForm price={appointment.price} appointmentId={appointment.appointmentId}/> : null}</td>
        </tr>
    );
}

export default MyAppointmentRow;
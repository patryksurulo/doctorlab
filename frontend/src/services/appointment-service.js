import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/appointments";

const getBusyAppointmentsByDoctor = (username) => {
  return axios.get(API_URL + "/doctors", { params: { username: username }, headers: authHeader() }
  );
};

const makeAppointment = (doctorUsername, appointmentDate) => {
  return axios.post(API_URL, {doctorUsername: doctorUsername, appointmentDate: appointmentDate}, {headers: authHeader()})
}

const getAppointmentsByCurrentAuthUser = () => {
  return axios.get(API_URL + "/patients", {headers: authHeader()});
}

const AppointmentService = {
    getBusyAppointmentsByDoctor,
    makeAppointment,
    getAppointmentsByCurrentAuthUser
};

export default AppointmentService;

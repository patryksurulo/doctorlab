import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/patient/";


const getMakingAppointmentBoard = () => {
  return axios.get(API_URL + "make-an-appointment", { headers: authHeader() });
};

const getMyAppointmentsBoard = () => {
  return axios.get(API_URL + "my-appointments", { headers: authHeader() });
};



const PatientService = {
  getMakingAppointmentBoard,
  getMyAppointmentsBoard,
};

export default PatientService;

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getPatientBoard = () => {
  return axios.get(API_URL + "patient", { headers: authHeader() });
};

const getMakingAppointmentBoard = () => {
  return axios.get(API_URL + "make-an-appointment", { headers: authHeader() });
};

const getMyAppointmentsBoard = () => {
  return axios.get(API_URL + "my-appointments", { headers: authHeader() });
};

const getDoctorBoard = () => {
  return axios.get(API_URL + "doctor", { headers: authHeader() });
};

const getCreatingDoctorBoard = () => {
  return axios.get(API_URL + "creating-doctor", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getPatientBoard,
  getDoctorBoard,
  getAdminBoard,
  getMakingAppointmentBoard,
  getMyAppointmentsBoard,
  getCreatingDoctorBoard
};

export default UserService;

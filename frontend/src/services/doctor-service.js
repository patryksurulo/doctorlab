import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/doctors/";

const setDoctorInfo = (specialty, price) => {
  return axios.post(API_URL + "info", {specialty, price}, {headers: authHeader()}
  );
};

const getDoctorInfo = async () => {
  return await axios.get(API_URL + "info", {headers: authHeader()})
}

const getAllDoctors = () => {
  return axios.get(API_URL, {headers: authHeader()})
}


const DoctorService = {
    setDoctorInfo,
    getDoctorInfo,
    getAllDoctors
};

export default DoctorService;

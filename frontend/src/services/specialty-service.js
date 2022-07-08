import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/specialties/";

const getSpecialties = () => {
  return axios.get(API_URL, { headers: authHeader() });
};


const SpecialtyService = {
  getSpecialties
};

export default SpecialtyService;

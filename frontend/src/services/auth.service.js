import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, firstname, lastname, email, password, roles) => {
  return axios.post(API_URL + "signup", {
    username,
    firstname,
    lastname,
    email,
    password,
    roles
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isDoctorRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user){
    return user.roles.includes("ROLE_DOCTOR");
  }

  return false;
};

const isAdminRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user){
    return user.roles.includes("ROLE_ADMIN");
  }

  return false;
};

const getInfoCurrentUser = () => {
  return axios.get(API_URL + "info", {headers: authHeader()})
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isDoctorRole,
  isAdminRole,
  getInfoCurrentUser
};

export default AuthService;

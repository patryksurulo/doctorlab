import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardPatient from "./components/BoardPatient";
import BoardDoctor from "./components/BoardDoctor";
import BoardAdmin from "./components/BoardAdmin";
import MakingAppointmentBoard from "./components/MakingAppointmentBoard";
import MyAppointmentsBoard from "./components/MyAppointmentsBoard";
import CreatingDoctorBoard from "./components/CreatingDoctorBoard";
import SuccessPayment from "./components/SuccessPayment";

import EventBus from "./common/EventBus";
import CancelPayment from "./components/CancelPayment";

const App = () => {
  const [showDoctorBoard, setShowDoctorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showPatientBoard, setShowPatientBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowDoctorBoard(user.roles.includes("ROLE_DOCTOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowPatientBoard(user.roles.includes("ROLE_PATIENT"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowDoctorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          DoctorLab
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showPatientBoard && (
            <li className="nav-item">
              <Link to={"/make-an-appointment"} className="nav-link">
                Make an appointment
              </Link>
            </li>
          )}

          {showPatientBoard && (
            <li className="nav-item">
              <Link to={"/my-appointments"} className="nav-link">
                My appointments
              </Link>
            </li>
          )}

          {showDoctorBoard && (
            <li className="nav-item">
              <Link to={"/doctor"} className="nav-link">
                Doctor Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          ) &&
            <li className="nav-item">
              <Link to={"/creating-doctor"} className="nav-link">
                Creating doctor Board
              </Link>
            </li>

          }
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patient" element={<BoardPatient />} />
          <Route path="/doctor" element={<BoardDoctor />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/make-an-appointment" element={<MakingAppointmentBoard />} />
          <Route path="/my-appointments" element={<MyAppointmentsBoard />} />
          <Route path="/creating-doctor" element={<CreatingDoctorBoard />} />
          <Route path="/pay/success" element={<SuccessPayment />} />
          <Route path="/pay/cancel" element={<CancelPayment />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import DoctorService from "../services/doctor-service";
import EventBus from "../common/EventBus";
import Select from "react-select";
import SpecialtyService from "../services/specialty-service";
import DoctorCard from "./DoctorCard";

const MakingAppointmentBoard = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialtyOption, setSelectedSpecialtyOption] = useState({});
  const [specialties, setSpecialties] = useState(null);
  const [doctorsSpecialty, setDoctorsSpecialty] = useState([]);
  const [successful, setSuccessful] = useState(undefined);

  const doctorsSpecialtyFilter = (specialty) => {

    let doctorFiltred = doctors.filter(doctor => doctor.specialty === specialty);

    setDoctorsSpecialty(doctorFiltred);

  }

  useEffect(() => {
    doctorsSpecialtyFilter(selectedSpecialtyOption.label);

    DoctorService.getAllDoctors().then(
      (response) => {
        setDoctors(response.data);
        setSuccessful(true);

      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setDoctors(_content);
        setSuccessful(false);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    SpecialtyService.getSpecialties().then(
      (response) => {
        let data = response.data.map((specialty) => {
          return {
            value: specialty.id,
            label: specialty.name
          }
        });
        setSpecialties(data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setSpecialties(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );


  }, [selectedSpecialtyOption]);

  return (
    <div className="container">
      {successful && (
        <Form ref={form}>

          <div>
            <div className="form-group">
              <label htmlFor="specialty">Specialty</label>
              <Select
                defaultValue={selectedSpecialtyOption}
                onChange={setSelectedSpecialtyOption}
                options={specialties}
              />
            </div>
          </div>


          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      )}

      {successful && doctorsSpecialty.map(doctor => {
        return <DoctorCard
          firstname={doctor.firstname}
          lastname={doctor.lastname}
          specialty={doctor.specialty}
          price={doctor.price}
          key={doctor.username}
          username={doctor.username} />
      }
      
      )}

      {successful === false && (
        <div class="alert alert-danger" role="alert">
          {doctors}
        </div>
      )}

    </div>
  );
};

export default MakingAppointmentBoard;

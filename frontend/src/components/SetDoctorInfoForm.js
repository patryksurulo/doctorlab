import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import DoctorService from "../services/doctor-service";
import Select from "react-select";
import SpecialtyService from "../services/specialty-service";
import EventBus from "../common/EventBus";
import Input from "react-validation/build/input";

const SetDoctorInfoForm = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [currentDoctorInfo, setCurrentDoctorInfo] = useState();
  const [selectedSpecialtyOption, setSelectedSpecialtyOption] = useState();
  const [specialties, setSpecialties] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [inputPrice, setInputPrice] = useState(0);

  const onChangePrice = (e) => {
    const price = e.target.value;
    setInputPrice(price);
  };



  useEffect(() => {
    
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
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    DoctorService.getDoctorInfo().then(
      (response) => {
        let data = response.data;
        let specialtyResponse = {
          value: 1,
          label: data.specialty
        }

        let priceResponse = data.price;

        

        setCurrentDoctorInfo(data);
        setInputPrice(priceResponse);
        setSelectedSpecialtyOption(specialtyResponse);
        


      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    

  }, []);



  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();



    if (checkBtn.current.context._errors.length === 0) {
      DoctorService.setDoctorInfo(selectedSpecialtyOption.label, inputPrice).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <Select
                  value={selectedSpecialtyOption}
                  onChange={setSelectedSpecialtyOption}
                  options={specialties}

                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <Input className="form-control" onChange={onChangePrice} value={inputPrice} />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Set Info</button>
              </div>
              <div>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default SetDoctorInfoForm;

import React, { useState, useEffect } from "react";

import AppointmentService from "../services/appointment-service";
import EventBus from "../common/EventBus";
import MyAppointmentRow from "./MyAppointmentRow";

const MyAppointmentsBoard = () => {
  const [successful, setSuccessful] = useState(undefined);
  const [content, setContent] = useState(null);

  useEffect(() => {
    AppointmentService.getAppointmentsByCurrentAuthUser().then(
      (response) => {
        setContent(response.data);
        setSuccessful(true);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        setSuccessful(false);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (

    <div className="container">
      {successful && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Price</th>
              <th scope="col">Datetime</th>
              <th scope="col">Paid</th>
            </tr>
          </thead>
          <tbody>
            {content.map(appointment => <MyAppointmentRow appointment={appointment} />)}
          </tbody>
        </table>)}

      {successful === false && (
        <div class="alert alert-danger" role="alert">
          {content}
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsBoard;

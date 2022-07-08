import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Register from "./Register";
import AuthService from "../services/auth.service";

const CreatingDoctorBoard = () => {
  const [content, setContent] = useState("");
  const isAdminRole = AuthService.isAdminRole();

  useEffect(() => {
    UserService.getCreatingDoctorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

      {isAdminRole === true ? <Register roles={["doctor"]}/> : null}
    </div>
  );
};

export default CreatingDoctorBoard;

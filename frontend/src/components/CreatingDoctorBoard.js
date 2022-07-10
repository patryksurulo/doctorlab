
import Register from "./Register";
import AuthService from "../services/auth.service";

const CreatingDoctorBoard = () => {

  const isAdminRole = AuthService.isAdminRole();

  return (
    <div className="container">
      {isAdminRole === true ? <Register roles={["doctor"]}/> : null}
    </div>
  );
};

export default CreatingDoctorBoard;

import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import DoctorService from "../services/doctor-service";

const Profile = () => {
  const [currentInfoUser, setCurrentInfoUser] = useState({});
  const [currentInfoDoctor, setCurrentInfoDoctor] = useState({});

  useEffect(() => {
    AuthService.getInfoCurrentUser().then(
      (response) => {
        setCurrentInfoUser(response.data);
        console.log(response);
      }
    );

    if(AuthService.isDoctorRole()){
      DoctorService.getDoctorInfo().then(
        (response) => {
            setCurrentInfoDoctor(response.data);
            console.log(response.data);
        }
      );
    }
  }, []);

  return (
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h6 class="f-w-600">{currentInfoUser.firstname} {currentInfoUser.lastname}</h6>
                    <p>{currentInfoDoctor.specialty}</p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Firstname</p>
                        <h6 class="text-muted f-w-400">{currentInfoUser.firstname}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Lastname</p>
                        <h6 class="text-muted f-w-400">{currentInfoUser.lastname}</h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">{currentInfoUser.email}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Username</p>
                        <h6 class="text-muted f-w-400">{currentInfoUser.username}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

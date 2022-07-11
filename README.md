# DoctorLab
## Overview
The application is used to make appointments with doctors.
## Features
- There are three roles: admin. doctor, patient
- Patient registration is possible for everyone
- A doctor's account can only be created by the admin.
- The doctor can set the price for the appointment and his specialization.
- Logging in is done using the JWT token.
- The patient can make an appointment with a specific doctor at a specific time.
- The application shows only the available hours of the day.
- The patient can pay for an appointment.
- The patient can see his appointments.
## How to run
First, open the backend folder with Intellij. Then configure the /src/main/resources/application.properties file to connect to the database. After starting the project, you should see the table in the database. Then use the init data.txt file to inject the data into the tables.
Now go to the frontend folder and type in the terminal


```
npm install
# or
yarn install
```

and then run the project


```
npm start
# or
yarn start
```
## Accounts
To log in to the admin account:

```
username: admin
password: admin
```

To log in to the example created accounts, enter the username from the database (if you supplied the data with the init data.txt file) and enter the password doctor (the password is the same for doctors and patients accounts).

Example (doctor):
```
username: jank
password: doctor
```

Example (patient):
```
username: patient1
password: doctor
```

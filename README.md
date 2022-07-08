# DoctorLab
## Overview
The application is used to make appointments with doctors.
## Features
- Patient registration is possible for everyone
- A doctor's account can only be created by the admin.
- Logging in is done using the JWT token.
- The patient can make an appointment with a specific doctor at a specific time.
- The application shows only the available hours of the day.
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

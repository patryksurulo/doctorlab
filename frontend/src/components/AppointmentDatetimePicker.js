import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import AppointmentService from '../services/appointment-service';
import EventBus from "../common/EventBus";

const AppointmentDatetimePicker = ({username, selectedTime, setSelectedTime, selectedDate, setSelectedDate}) => {
    
    
    const [freeTimes, setFreeTimes] = useState({value: '', label: ''});
    const [busyDatetimeByDoctor, setBusyDatetimeByDoctor] = useState([]);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getBusyTimesForSelectedData = (date) => {
        const filteredDatetime = busyDatetimeByDoctor.filter(e => e.dateTime.includes(date));

        const result = filteredDatetime.map(e => {
            return e.dateTime.split('T')[1];
        });
        return result;
    }

    const allTimesOptions = () => {
        let list = [];
        for(let i = 7; i < 10; i++){
            list.push({value: '0'+ i + ':00:00', label: '0'+ i + ':00'});
        }
        for(let i = 10; i < 17; i++){
            list.push({value: i + ':00:00', label: i + ':00'});
        }

        return list;
    }
    
    useEffect(() =>{
        setFreeTimes([{value: '', label: ''}, {value: '', label: ''}]);
        
        AppointmentService.getBusyAppointmentsByDoctor(username).then(
            (response) => {
                
                 
                setBusyDatetimeByDoctor(response.data);

                let busyTimes = getBusyTimesForSelectedData(selectedDate.toISOString().split('T')[0]);
                
                let result = allTimesOptions().filter(val => !busyTimes.includes(val.value));
                setFreeTimes(result);
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
        
        
                if (error.response && error.response.status === 401) {
                  EventBus.dispatch("logout");
                }
              }
        );
    }, [selectedDate,username]);

    



    return (
        <div>
            <DatePicker filterDate={isWeekday} selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} />
            <Select
                  defaultValue={selectedTime}
                  onChange={setSelectedTime}
                  options={freeTimes}

                />
        </div>
    );
}

export default AppointmentDatetimePicker;
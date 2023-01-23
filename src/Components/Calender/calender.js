import React from "react";
import Calendar from "react-calendar";
import './calender.css';
// import 'react-calendar/dist/Calendar.css';


const CalenderEL = () => {

    return (
        <div className='calendar-main'>
            <div className="calender-header">
                <h1>Please Select An Available Date Below</h1>
            </div>
            <div className="calender-container">
                <Calendar minDate={new Date()} 
                        maxDate={new Date(2030, 12, 31)} 
                        className='react-calender'
                        nextAriaLabel="Go to next month"
                        prevAriaLabel="Go to prev month"
                        
                        />
            </div>
        </div>
    )
}

export default CalenderEL;

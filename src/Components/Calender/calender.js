import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Clock from "react-clock";
import { Link, useLocation, useParams } from "react-router-dom";
import './calender.css';
import Aos from "aos";
import 'react-clock/dist/Clock.css';
import { timePool } from "../../Data/data";

const CalenderEL = () => {

    const location = useParams();

    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        window.scrollTo(0,0);
        Aos.init({ duration: 1500 })
    }, [])

    console.log(location)

    const timeTable = timePool.map(times => {
        return <div className="time-cards">
            <h2 style={{color: 'lightgray'}} className="time-card-h2">Time: {times.time}.00</h2>
            <h2 style={times.available ? {color: '#13d313'} : {color: '#ff0000e8'}} className="time-card-h2">{times.available ? 'Available' : 'Booked'}</h2>
            <button disabled={!times.available} className="select-time-link">Select</button>
        </div>
    })


    return (
        <div className='calendar-main'>
            <div data-aos = "zoom-in-down" className="calender-main-container" style={selectedDate ? {display: 'none'} : {display: 'flex'}}>
                <h1 className="calender-main-h1">Please Select An Available Date Below</h1>
                <div className="calender-container">
                    <Calendar minDate={new Date()} 
                            maxDate={new Date(2030, 12, 31)} 
                            className='react-calender'
                            nextAriaLabel="Go to next month"
                            prevAriaLabel="Go to prev month"
                            onClickDay={(value) => setSelectedDate(value.toDateString())}
                            />
                </div>
            </div>

            <div className={selectedDate ? "clock-main" : "clock-main-off"}>
                <h2 className="calender-main-h1">Selected Date: {selectedDate}</h2>
                <h2 className="calender-main-h1">Please Select An Available Time Below</h2>
                <div className="clock-container">
                    {timeTable}
                </div>
            </div>
        </div>
    )
}

export default CalenderEL;

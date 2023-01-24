import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Link, useLocation, useParams } from "react-router-dom";
import './calender.css';
import Aos from "aos";
import 'react-clock/dist/Clock.css';
import { timePool } from "../../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faBicycle, faPalette, faQuestion, faCircleLeft } from '@fortawesome/free-solid-svg-icons';

const CalenderEL = () => {

    const location = useParams();

    const [selectedDate, setSelectedDate] = useState('');

    const [selectedTime, setSelectedTime] = useState('');

    const [make, setMake] = useState('');

    const [model, setModel] = useState('');

    const [color, setColor] = useState('');

    const [issue, setIssue] = useState('');

    const [additionalCost, setAdditionalCost] = useState('');

    const [initDate, setInitDate] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 1500 })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedDate])

    const timeTable = timePool.map(times => {
        return <div className="time-cards">
            <h2 style={{color: 'lightgray'}} className="time-card-h2">Time: {times.time}.00</h2>
            <div className={times.available ? "time-card-available" : 'time-card-booked'}>{times.available ? 'Available' : 'Booked'}</div>
            <button disabled={!times.available}
                    className="select-time-link"
                    onClick={() => setSelectedTime(times.time)}
                    >Select</button>
        </div>
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const backBtnHandler = () => {
        if (selectedDate && !selectedTime) {
            setSelectedDate('');
        }
        else if (selectedDate && selectedTime) {
            setSelectedTime('')
        }
    }

    return (
        <div className='calendar-main'>
            <div className="go-back-btn-container" onClick={ backBtnHandler }>
                <FontAwesomeIcon icon={faCircleLeft} className="go-back-arrow"/>
            </div>
            <div data-aos = "zoom-in-down" className="calender-main-container" style={selectedDate ? {display: 'none'} : {display: 'flex'}}>
                <h1 className="calender-main-h1">Please Select An Available Date Below</h1>
                <div className="calender-container">
                    <Calendar minDate={new Date()}
                                maxDate={new Date(2030, 12, 31)} 
                                className='react-calender'
                                nextAriaLabel="Go to next month"
                                prevAriaLabel="Go to prev month"
                                onClickDay={(value) => {
                                    setSelectedDate(value.toDateString());
                                    setInitDate(value);
                                }}
                            />
                </div>
            </div>

            <div className={selectedDate && !selectedTime ? "clock-main" : "clock-main-off"}>
                <h2 className="calender-main-h1">Selected Date: {selectedDate}</h2>
                <h2 className="calender-main-h1">Please Select An Available Time Below</h2>
                <div className="clock-container">
                    {timeTable}
                </div>
            </div>

            <div className={selectedDate && selectedTime ? "details-form-main" : 'details-form-main-off'}>
                <h1 className="details-form-h1">Please Tell us about your bike</h1>
                <form className="details-form-container">
                    <div className="input-container">
                        <FontAwesomeIcon icon={faBicycle} className="input-container-icon"/>
                        <input type="text"
                               className="form-input"
                               placeholder="Bike Make"
                               onChange={(e) => setMake(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <FontAwesomeIcon icon={faBicycle} className="input-container-icon"/>
                        <input type="text"
                               className="form-input"
                               placeholder="Bike Model"
                               onChange={(e) => setModel(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <FontAwesomeIcon icon={faPalette} className="input-container-icon"/>
                        <input type="text"
                               className="form-input"
                               placeholder="Bike Colour"
                               onChange={(e) => setColor(e.target.value)} />
                    </div>

                    <div className="textarea-container">
                        <FontAwesomeIcon icon={faQuestion} className="input-container-icon"/>
                        <textarea type="text"
                                  rows="10"
                                  className="form-textarea"
                                  placeholder="Issue/Problem"
                                  onChange={(e) => setIssue(e.target.value)} />
                    </div>

                    <div className="input-container-select-main">
                        <p className="input-container-select-p">If your bike needs parts, how much extra are you willing to spend without us calling you (This is for parts only)</p>
                        <div className="select-div">
                            <select defaultValue="Please select an option"
                                    className="input-container-select"
                                    onChange={(e) => setAdditionalCost(e.target.value)}>
                                <option disabled>Please select an option</option>
                                <option value='£25'>£25</option>
                                <option value='£50'>£50</option>
                                <option value='£75'>£75</option>
                                <option value='£100'>£100</option>
                                <option value='£125'>£125</option>
                                <option value='£150'>£150</option>
                            </select>
                            <FontAwesomeIcon icon={ faAnglesDown } className='select-icon'/>


                        </div>
                    </div>

                    <div className="input-form-btn-container">
                        <button className="input-form-btn"
                                onClick={ handleSubmit }
                            >Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CalenderEL;

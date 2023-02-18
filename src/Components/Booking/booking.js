import React, { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";
import './booking.css';
import Aos from "aos";
import 'react-clock/dist/Clock.css';
import { timePool } from "../../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faBicycle, faPalette, faQuestion, faSignature, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/logo.png';
import { LoggedInUsers } from "../../App";

const Booking = () => {

    const params = useParams();
    const loggedInUser = useContext(LoggedInUsers);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [additionalCost, setAdditionalCost] = useState('0');
    const [detailsFormFinalValidation, setDetailsFormFinalValidation] = useState(true);
    const [disappearDetailsForm, setDisappearDetailsForm] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);
    const [phone, setPhone] = useState('');
    const [formFinalValidationBtn, setFormFinalValidationBtn] = useState(true);

    const [bookedDate, setBookedDate] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 1500 })

        fetch('https://cyclefixserver.onrender.com/query-available-date', {
            method: "POST"
        }).then(res => res.json()).then(data => setBookedDate(data.data)).catch(err => console.log(err));

        if (loggedInUser){
            if (loggedInUser.hasOwnProperty('_id')){
                setFirstName(loggedInUser.firstName);
                setLastName(loggedInUser.lastName);
                setEmail(loggedInUser.email);
            }
            else if (loggedInUser.hasOwnProperty('iss')) {
                setFirstName(loggedInUser.given_name);
                setLastName(loggedInUser.family_name);
                setEmail(loggedInUser.email);
            }
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedDate])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (email){
                const check1 = email.indexOf('@');
                const check2 = email.indexOf('.com');
                if (check1 > 0 && check2 > 0){
                    email.slice(check1+1, check2) ? setEmailValidity(true) : setEmailValidity(false);
                }
                else {
                    setEmailValidity(false);
                }
            }
        }, [1200])

        return () => clearTimeout(timer)
    }, [ email ])

    useEffect(() => {
        if (make && model && color){
            setDetailsFormFinalValidation(false)
        }
        else {
            setDetailsFormFinalValidation(true);
        }
    }, [make, model, color, additionalInfo, additionalCost])

    useEffect(() => {
        if (firstName && lastName && emailValidity && phone) {
            setFormFinalValidationBtn(false)
        }
        else {
            setFormFinalValidationBtn(true);
        }
    }, [firstName, lastName, emailValidity, phone])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedDate, selectedTime, disappearDetailsForm])

    const timeTable = timePool.map(times => {
        return <div key={times.time} className="time-cards">
            <h2 style={{color: 'lightgray'}} className="time-card-h2">Time: {times.time}.00</h2>
            <div className={times.available ? "time-card-available" : 'time-card-booked'}>{times.available ? 'Available' : 'Booked'}</div>
            <button disabled={!times.available}
                    className="select-time-link"
                    onClick={() => setSelectedTime(`${times.time}.00`)}
                    >Select</button>
        </div>
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisappearDetailsForm(true);
    }

    const backBtnHandler = () => {
        if (selectedDate && !selectedTime) {
            setSelectedDate('');
        }
        else if (selectedDate && selectedTime && !disappearDetailsForm) {
            setSelectedTime('');

        }
        else if (selectedDate && selectedTime && disappearDetailsForm){
            setDisappearDetailsForm(false);
        }
    }

    const processToPayment = async () => {
        const totalPrice = parseInt(params.packagePrice) + parseInt(additionalCost);
        const due = totalPrice - 25;

        const data = {
            service: params.serviceId,
            packagePrice: params.packagePrice,
            additionalCost,
            totalPrice,
            due,
            deposit: 25,
            date: selectedDate,
            firstName,
            lastName,
            email,
            phone,
            bikeDetails: {
                make, model, color, additionalInfo
            }
        }

        sessionStorage.setItem('userData', JSON.stringify(data));
        window.location.replace('/payment')
    }

    return (
        <div className='calendar-main'>
            <div className="go-back-btn-container" onClick={ backBtnHandler } style={!selectedDate && !selectedTime ? {display: 'none'} : {display:'flex'}}>
                <p className="go-back-btn">Go back</p>
            </div>
            <div className="calender-main-container" style={selectedDate ? {display: 'none'} : {display: 'flex'}}>
                <h1 className="calender-main-h1">{params.serviceId || 'Not Available'}</h1>
                <h1 className="calender-main-h1">Please Select An Available Date Below</h1>
                <div className="calender-container">
                    <Calendar minDate={new Date()}
                                maxDate={new Date(2030, 12, 31)} 
                                className='react-calender'
                                nextAriaLabel="Go to next month"
                                prevAriaLabel="Go to prev month"
                                showNeighboringMonth={false}
                                tileClassName={({date}) => date.getDay() === 0 ? 'sunday' : null}
                                tileDisabled={({date, view}) => {
                                    if (date.getDay() === 0){
                                        return date.getDate();
                                    }
                                    if (bookedDate[date.getMonth()]){
                                        return bookedDate[date.getMonth()].includes(date.getDate())
                                    }
                                }}
                                onClickDay={(value) => {
                                    setSelectedDate(value.toDateString());
                                }}
                            />
                </div>
            </div>

            <div className={selectedDate && !disappearDetailsForm ? "details-form-main" : 'details-form-main-off'}>
                <h1 className="details-form-h1">Please tell us about your bike</h1>
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
                                  placeholder="Additional Info"
                                  maxLength='300'
                                  onChange={(e) => setAdditionalInfo(e.target.value)} />
                    </div>

                    <div className="input-container-select-main">
                        <p className="input-container-select-p">If your bike needs parts, how much extra are you willing to spend without us calling you (This is for parts only)</p>
                        <div className="select-div">
                            <select defaultValue="Please select an option"
                                    className="input-container-select"
                                    onChange={(e) => setAdditionalCost(e.target.value)}>
                                <option disabled>Please select an option</option>
                                <option value={25}>£25</option>
                                <option value={50}>£50</option>
                                <option value={75}>£75</option>
                                <option value={100}>£100</option>
                                <option value={125}>£125</option>
                                <option value={150}>£150</option>
                            </select>
                            <FontAwesomeIcon icon={ faAnglesDown } className='select-icon'/>
                        </div>
                    </div>

                    <div className="input-form-btn-container">
                        <button disabled={detailsFormFinalValidation} className="input-form-btn"
                                onClick={ handleSubmit }
                            >Next</button>
                    </div>
                </form>
            </div>

            <div className={selectedDate && disappearDetailsForm ? "user-input-main" : "user-input-main-off"}>
                <div className="booking-information-main">
                    <div className="logo-container">
                        <img src={logo} className="logo" alt="cycle fix logo"/>
                    </div>
                    <div className="booking-information-details">
                        <h2 className="booking-information-details-h2">Date</h2>
                        <p>{selectedDate}</p>
                    </div>
                    <div className="booking-information-details">
                        <h2 className="booking-information-details-h2">Time</h2>
                        <p>Please bring your bike in the shop around 9 AM</p>
                    </div>
                    <div className="booking-information-details">
                        <h2 className="booking-information-details-h2">Descrption</h2>
                        <div className="booking-details">
                            <p>Make: {make}</p>
                            <p>Model: {model}</p>
                            <p>Color: {color}</p>
                            <p>additional info: {additionalInfo}</p>
                            <p>Total price: £{parseInt(additionalCost) + parseInt(params.packagePrice)}</p>
                            <p>Deposit: £25</p>
                            <p>You need to pay just the deposit to make a booking</p>
                        </div>
                    </div>
                </div>

                <form className="user-input-form">
                    <div className="user-input-container">
                        <FontAwesomeIcon icon={faSignature} className="user-input-icon"/>
                        <input type="text"
                               className="user-input"
                               placeholder="First name"
                               value={firstName ? firstName : ''}
                               onChange={(e) => setFirstName(e.target.value)}
                               />
                    </div>
                    <div className="user-input-container">
                        <FontAwesomeIcon icon={faSignature} className="user-input-icon"/>
                        <input type="text"
                               className="user-input"
                               placeholder="Last name"
                               value={lastName ? lastName : ''}
                               onChange={(e) => setLastName(e.target.value)}
                               />
                    </div>
                    <div className="user-input-container" style={!emailValidity ? {backgroundColor: '#ff00004f', border: '1px solid #ff00004f'} : null}>
                        <FontAwesomeIcon icon={faAt} className="user-input-icon"/>
                        <input type="email"
                               className="user-input"
                               placeholder="Email"
                               value={email ? email : ''}
                               onChange={(e) => setEmail(e.target.value)}
                               />
                    </div>
                    <div className="user-input-container">
                        <FontAwesomeIcon icon={faPhone} className="user-input-icon"/>
                        <input type="number"
                               className="user-input"
                               placeholder="Phone number"
                               onChange={(e) => setPhone(e.target.value)}
                               />
                    </div>
                    <div className="user-input-container-btn">
                        <input disabled={formFinalValidationBtn} type="button" onClick={ processToPayment } value="Go to payment" className="user-input-submit-btn"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Booking;

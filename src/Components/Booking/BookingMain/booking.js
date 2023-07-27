import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import './booking.css';
import Aos from "aos";
import AuthContext from "../../Others/AuthContext/authContext";
import SelectDate from "../SelectDate/selectDate";
import SelectBikeDetails from "../SelectBikeDetails/selectBikeDetails";
import SelectUserInformation from "../SelectUserInfomation/selectUserInformation";
import { emailValidation } from "../../Others/HelperFunction/helperFunction";

const Booking = () => {
    const params = useParams();
    const context = useContext(AuthContext);

    const [selectedDate, setSelectedDate] = useState('');

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
    const [phone, setPhoneNumber] = useState('');
    const [formFinalValidationBtn, setFormFinalValidationBtn] = useState(true);

    const [bookedDate, setBookedDate] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 1500 })

        fetch('https://cyclefixserver.onrender.com/query-available-date').then(res => res.json()).then(data => setBookedDate(data.data)).catch(err => console.log(err));

        if (context.loggedInUser){
            if (context.loggedInUser.hasOwnProperty('_id') && !firstName && !lastName && !email){
                setFirstName(context.loggedInUser.firstName);
                setLastName(context.loggedInUser.lastName);
                setEmail(context.loggedInUser.email);
            }
            else if (context.loggedInUser.hasOwnProperty('iss') && !firstName && !lastName && !email) {
                setFirstName(context.loggedInUser.given_name);
                setLastName(context.loggedInUser.family_name);
                setEmail(context.loggedInUser.email);
            }
        }
    }, []);

    //this hook scrool to the top when selecting date
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedDate, selectedDate, disappearDetailsForm])

    //this hook validate email from user input
    useEffect(() => {
        const timer = emailValidation(email, setEmailValidity);
        return () => clearTimeout(timer)
    }, [ email ])

    //this hook toggle bike details form button enable/disable
    useEffect(() => {
        if (make && model && color){
            setDetailsFormFinalValidation(false)
        }
        else {
            setDetailsFormFinalValidation(true);
        }
    }, [make, model, color])

    //this hook toggle the last form button enable/disable
    useEffect(() => {
        if (firstName && lastName && emailValidity && phone) {
            setFormFinalValidationBtn(false)
        }
        else {
            setFormFinalValidationBtn(true);
        }
    }, [firstName, lastName, emailValidity, phone])

    //first form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisappearDetailsForm(true);
    }

    //this method switch between forms
    const backBtnHandler = () => {
        if (selectedDate && !disappearDetailsForm) {
            setSelectedDate('');
        }
        else if (selectedDate && disappearDetailsForm) {
            setDisappearDetailsForm(false);
        }
    }

    //this method store payment information to the storage and navigate to the payment page
    const processToPayment = () => {
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
            <div className="go-back-btn-container" onClick={ backBtnHandler } style={!selectedDate ? {display: 'none'} : {display:'flex'}}>
                <p className="go-back-btn">Go back</p>
            </div>
            
            <SelectDate selectedDate={selectedDate}
                        serviceId={params.serviceId}
                        bookedDate={bookedDate}
                        changeSelectedDate={setSelectedDate}/>

            <SelectBikeDetails selectedDate={selectedDate}
                               disappearDetailsForm={disappearDetailsForm}
                               changeMake={setMake}
                               changeModel={setModel}
                               changeColor={setColor}
                               changeAdditionalInfo={setAdditionalInfo}
                               changeAdditionalCost={setAdditionalCost}
                               finalValidation={detailsFormFinalValidation}
                               formSubmitHandler={handleSubmit}/>

            <SelectUserInformation selectedDate={selectedDate}
                                   disappearDetailsForm={disappearDetailsForm}
                                   make={make}
                                   model={model}
                                   color={color}
                                   additionalInfo={additionalInfo}
                                   additionalCost={additionalCost}
                                   packagePrice={params.packagePrice}
                                   firstName={firstName}
                                   lastName={lastName}
                                   changeFirstName={setFirstName}
                                   changeLastName={setLastName}
                                   email={email}
                                   emailValidity={emailValidity}
                                   changeEmail={setEmail}
                                   changePhoneNumber={setPhoneNumber}
                                   finalValidation={formFinalValidationBtn}
                                   submitHandler={processToPayment} />
        </div>
    )
}

export default Booking;

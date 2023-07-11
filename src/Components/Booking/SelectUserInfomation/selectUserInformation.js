import React from 'react';
import './selectUserInformation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../Assets/logo.png';


function SelectUserInformation({ selectedDate, disappearDetailsForm, make, model, color, emailValidity,
                                 additionalInfo, additionalCost, packagePrice, firstName, changeFirstName,
                                 lastName, changeLastName, email, changeEmail, changePhoneNumber, finalValidation, submitHandler }) {


    return (
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
                        <p>Total price: £{parseInt(additionalCost) + parseInt(packagePrice)}</p>
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
                            onChange={(e) => changeFirstName(e.target.value)}
                            />
                </div>
                <div className="user-input-container">
                    <FontAwesomeIcon icon={faSignature} className="user-input-icon"/>
                    <input type="text"
                            className="user-input"
                            placeholder="Last name"
                            value={lastName ? lastName : ''}
                            onChange={(e) => changeLastName(e.target.value)}
                            />
                </div>
                <div className="user-input-container" style={!emailValidity ? {backgroundColor: '#ff00004f', border: '1px solid #ff00004f'} : null}>
                    <FontAwesomeIcon icon={faAt} className="user-input-icon"/>
                    <input type="email"
                            className="user-input"
                            placeholder="Email"
                            value={email ? email : ''}
                            onChange={(e) => changeEmail(e.target.value)}
                            />
                </div>
                <div className="user-input-container">
                    <FontAwesomeIcon icon={faPhone} className="user-input-icon"/>
                    <input type="number"
                            className="user-input"
                            placeholder="Phone number"
                            onChange={(e) => changePhoneNumber(e.target.value)}
                            />
                </div>
                <div className="user-input-container-btn">
                    <input disabled={finalValidation} type="button" onClick={ submitHandler } value="Go to payment" className="user-input-submit-btn"/>
                </div>
            </form>
        </div>
    )
}

export default SelectUserInformation;

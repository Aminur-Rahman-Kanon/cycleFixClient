import React, { useState, useEffect } from 'react';
import styles from './xiaomiBookingForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignature, faAt, faCalendar } from '@fortawesome/free-solid-svg-icons';

function XiaomiBookingForm ({ displayForm, toggleSpinner, toggleModal,
                              toggleBackdrop, toggleDisplayForm, selectedCard, changeStatus }) {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');
    
    const [date, setDate] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        if (name && email && phone && date) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [ name, email, phone, date ])

    //form submit handler
    const bookService = async (e, query) => {
        e.preventDefault();
        toggleSpinner(true);

        await fetch('https://cyclefixserver.onrender.com/book-xiaomi-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service: query.service, price: query.price, name, email, phone, date
            })
        }).then(res => res.json()).then(data => {
            toggleSpinner(false);
            changeStatus(data.status);
            toggleModal(true);
            toggleBackdrop(true);
        }).catch(err => {
            toggleSpinner(false);
            changeStatus('error');
            toggleModal(true);
            toggleBackdrop(true);
        })
    }

    return (
        <div className={styles.bookingFormMain} style={displayForm ? {display: 'flex'} : {display: 'none'}}>
            <form className={styles.bookingFormContainer}>
                <h2 className={styles.bookingFormHeader}>Please fill up the following information</h2>
                <div className={styles.bookingInputContainer}>
                    <input type="text"
                        data-testid="name"
                        className={styles.bookingInput}
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.bookingInputIcon}/>
                </div>
                <div className={styles.bookingInputContainer}>
                    <input type="email"
                        data-testid="email"
                        className={styles.bookingInput}
                        placeholder="Your email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    <FontAwesomeIcon icon={faAt} className={styles.bookingInputIcon}/>
                </div>
                <div className={styles.bookingInputContainer}>
                    <input type="number"
                        data-testid="phone"
                        className={styles.bookingInput}
                        placeholder="Your phone number"
                        onChange={(e) => setPhone(e.target.value)}/>
                    <FontAwesomeIcon icon={faPhone} className={styles.bookingInputIcon}/>
                </div>
                <div className={styles.bookingInputContainer}>
                    <input type="text"
                        data-testid="date"
                        className={styles.bookingInput}
                        placeholder="Approximate date"
                        onChange={(e) => setDate(e.target.value)}/>
                    <FontAwesomeIcon icon={faCalendar} className={styles.bookingInputIcon}/>
                </div>
                
                <div className={styles.bookingBtns}>
                    <button disabled={ btnDisable } className={styles.requestBtn} onClick={(e) => bookService(e, selectedCard)}>Request</button>
                    <span className={styles.requestBtn} onClick={() => toggleDisplayForm(false)}>Close</span>
                </div>
            </form>
        </div>
    )
}

export default XiaomiBookingForm;

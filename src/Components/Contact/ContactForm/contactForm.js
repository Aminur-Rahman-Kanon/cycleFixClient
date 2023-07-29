import React, { useState, useEffect } from 'react';
import styles from './contactForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faAt, faPhone, faSignature, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { emailValidation } from '../../Others/HelperFunction/helperFunction';

function ContactForm ({ formRef, loggedInUser, changeStatusMessage, toggleBackdrop, toggleModal, toggleSpinner }) {

    const [name, setName] = useState('')

    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidty] = useState(true);

    const [message, setMessage] = useState('');

    const [finalValidation, setFinalValidation] = useState(false);

    //this hook auto set the name email to the local variable
    //if params contains contact then scroll the form to the view
    useEffect(() => {
        if (loggedInUser) {
            if (loggedInUser.hasOwnProperty('iss')){
                setName(`${loggedInUser.given_name} ${loggedInUser.family_name}`);
                setEmail(loggedInUser.email)
            }
            else if (loggedInUser.hasOwnProperty('_id')) {
                setName(`${loggedInUser.firstName} ${loggedInUser.lastName}`)
                setEmail(loggedInUser.email)
            }
        }
    }, [])

    //this hook validate email from user input
    useEffect(() => {    
        const timerId = emailValidation(email, setEmailValidty);

        return () => clearTimeout(timerId);
    }, [email]);

    //this hook toggle the form button enable/disable based on validation
    useEffect(() => {
        if (name && phone && emailValidity && message) {
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [name, phone, emailValidity, message] );

    //form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        toggleSpinner(true);

        fetch('https://cyclefixserver.onrender.com/contact-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, phone, email, message
            })
        }).then(res => res.json())
        .then(data => {
            toggleSpinner(false);
            changeStatusMessage(data.status);
            toggleModal(true);
            toggleBackdrop(true);
        }).catch(err => {
            toggleSpinner(false);
            changeStatusMessage('error');
            toggleModal(true);
            toggleBackdrop(true);
        })
    }

    return (
        <div className={styles.contactFormMain} ref={ formRef }>
            <div className={styles.contactForm}>
                <h1 className={styles.contactFormH1}>Contact Cycle Fix London</h1>
                <div className={styles.contactFormHeader}>
                    <h3 className={styles.contactFormH3}>If you have any questions or queries please get in touch on 0207 820 0028 or send us a message below. We’ll get back to you as soon as possible.</h3>
                </div>
                <div className={styles.contactFormHeaderMain}>
                    <div className={styles.contactFormHeaderContainer}>
                        <div className={styles.contactFormHeaderItemContainer}>
                            <div className={styles.contactFormHeaderItems}>
                                <a href="https://www.google.com/maps/dir/51.5047424,-0.1245184/51.4865153,-0.1115455/@51.4958316,-0.1274317,15z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0" className={styles.contactFormHeaderItem} target="_blank">
                                    <FontAwesomeIcon icon={faMapPin} className={styles.contactFormHeaderItemIcon} />
                                    <div className={styles.contactFormHeaderP}>
                                        <p className={styles.contactFromHeaderP}>338 Kennington Road, London</p>
                                        <p className={styles.contactFromHeaderP}>SE11 4LD</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.contactFormHeaderItems}>
                                <a href="mailto:info@cyclefixlondon.co.uk" className={styles.contactFormHeaderItem}>
                                    <FontAwesomeIcon icon={faAt} className={styles.contactFormHeaderItemIcon} />
                                    <div className={styles.contactFormHeaderP}>
                                        <p className={styles.contactFromHeaderP}>info@cyclefixlondon.co.uk</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.contactFormHeaderItems}>
                                <a href="tel:+442078200028" className={styles.contactFormHeaderItem}>
                                    <FontAwesomeIcon icon={faPhone} className={styles.contactFormHeaderItemIcon} />
                                    <div className={styles.contactFormHeaderP}>
                                        <p className={styles.contactFromHeaderP}>0207 820 0028</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contactFormContainer}>
                        <form className={styles.formMain}>
                            <div className={styles.formInputContainer}>
                                <FontAwesomeIcon icon={ faSignature } className={styles.addressIcon}/>
                                <input type="text"
                                    data-testid="name"
                                    className={styles.formInput}
                                    placeholder="Your Name"
                                    value={name ? name : ''}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={styles.formInputContainer}>
                                <FontAwesomeIcon icon={ faPhone } className={styles.addressIcon}/>
                                <input type="number"
                                    data-testid="phone"
                                    className={styles.formInput}
                                    placeholder="Your Phone"
                                    onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className={ emailValidity ? styles.formInputContainer : `${styles.formInputContainer} ${styles.wrongInput}`}>
                                <FontAwesomeIcon icon={ faAt } className={styles.addressIcon}/>
                                <input type="email"
                                    data-testid="email"
                                    className={styles.formInput}
                                    placeholder="Your Email"
                                    value={email ? email : ''}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={styles.formTextAreaContainer}>
                                <FontAwesomeIcon icon={ faEnvelope } className={styles.addressIcon}/>
                                <textarea className={styles.formInputTextarea}
                                            data-testid="message"
                                            rows="10"
                                            placeholder="Message"
                                            onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <button className={styles.formBtn}
                                    disabled={!finalValidation}
                                    onClick={ handleSubmit }
                                    >Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;

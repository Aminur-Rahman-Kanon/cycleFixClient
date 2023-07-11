import React, { useState, useEffect } from "react";
import styles from './registrationForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { emailValidation } from "../../Others/HelperFunction/helperFunction";
import { Link } from "react-router-dom";
import Modal from "../../Others/Modal/modal";

const RegistrationForm = ({ context, toggleSpinner }) => {

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [user, setUser] = useState('');

    const [password, setPassword] = useState('')
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [reTypePassword, setRetypePassword] = useState('');
    
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [termsCondition, setTermsCondition] = useState(false);

    const [finalValidation, setFinalValidation] = useState(false);

    const [userExist, setUserExist] = useState(false);

    const [error, setError] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    //this hook validate email from user input
    useEffect(() => {
        const timer = emailValidation(email, setEmailValidity);
        return () => clearTimeout(timer);
    }, [email])

    //this hook validate password on user input
    useEffect(() => {
        const timer = setTimeout(() => {
            if (password && reTypePassword){
                if (password === reTypePassword){
                    setPasswordMatch(true);
                    setPasswordValidity(true);
                }
                else {
                    setPasswordMatch(false);
                    setPasswordValidity(false);
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [password, reTypePassword])

    //this hook toggle submit button enable/disable based on form validation
    useEffect(() => {
        if (firstName && lastName && emailValidity && user && passwordValidity && termsCondition) {
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [firstName, lastName, emailValidity, user, passwordValidity, termsCondition])

    //form submit handler
    const formHandleSubmit = (e) => {
        e.preventDefault();
        toggleSpinner(true);
        fetch('https://cyclefixserver.onrender.com/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName, lastName, email, user, password
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'user created') {
                toggleSpinner(false);
                setStatus(data.status);
                context.setBackdrop(true);
                setModal(true);
            }
            else if(data.status === 'user exist') {
                toggleSpinner(false);
                setUserExist(true);
            }
        }).catch(err => {
            toggleSpinner(false);
            setError(true);
            context.setBackdrop(true);
            setModal(true);
        })
    }

    //display message handler
    let displayMsg = null;

    if (status === 'user created'){
        displayMsg = <div className={styles.displayMsgMain}>
            <h2>User created</h2>
            <p>Thank you !</p>
            <div className={styles.displayMsgBtns}>
                <button className={styles.displayMsgBtn} onClick={() => window.location.assign('/login')}>Log in</button>
                <button className={styles.displayMsgBtn} onClick={() => window.location.assign('/')}>No thanks !</button>
            </div>
        </div>
    }
    
    if (error){
        displayMsg = <div className={styles.displayMsgMain}>
            <h2>Something went wrong !</h2>
            <p>Please try again</p>
            <div className={styles.displayMsgBtns}>
                <button className={styles.displayMsgBtn} onClick={() => {
                    context.setBackdrop(false);
                    setModal(false);
                    setError(false);
                }}>Try again</button>
            </div>
        </div>
    }

    return (
        <>
        <Modal switch={modal} >
            {displayMsg}
        </Modal>
        <form className={styles.registrationForm}>
            <div className={styles.registrationFormNames}>
                <div className={styles.registrationFormName}>
                    <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                    <input type="text"
                            className={styles.registrationFormInput}
                            placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }} />
                </div>
                <div className={styles.registrationFormName}>
                    <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                    <input type="text"
                            className={styles.registrationFormInput}
                            placeholder="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }} />
                </div>
            </div>

            <div className={emailValidity ? styles.registrationFormInputContainer : `${styles.registrationFormInputContainer} ${styles.wrongInput}`} style={userExist ? {backgroundColor: '#f82c2c73'}: null}>
                <FontAwesomeIcon icon={ faAt } className={styles.registrationFormIcon}/>
                <input type="Email"
                        className={styles.registrationFormInput}
                        placeholder="Email address"
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }} />
                <p className={styles.userExist} style={userExist ? {display: 'block'} : {display: 'none'}}>User exist !</p>
            </div>

            <div className={styles.registrationFormInputContainer}>
                <FontAwesomeIcon icon={faUser} className={styles.registrationFormIcon}/>

                <select className={styles.registrationFormSelect}
                        defaultValue="Please Select"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}>
                    <option className={styles.registrationFormOption} disabled>Please Select</option>
                    <option className={styles.registrationFormOption}>Male</option>
                    <option className={styles.registrationFormOption}>Female</option>
                </select>
            </div>

            <div className={styles.registrationFormInputContainer}>
                <FontAwesomeIcon icon={faLock} className={styles.registrationFormIcon} />
                <input type="password"
                        className={styles.registrationFormInput}
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
            </div>

            <div className={passwordMatch ? styles.registrationFormInputContainer : `${styles.registrationFormInputContainer} ${styles.wrongInput}`}
                    style={{margin: '25px'}}>
                <FontAwesomeIcon icon={faLock} className={styles.registrationFormIcon} />
                <input type="password"
                        className={styles.registrationFormInput}
                        placeholder=" Retype Password"
                        onChange={(e) => {
                            setRetypePassword(e.target.value);
                        }} />
                <p className={styles.reTypePasswordP} style={passwordMatch ? {display: 'none'} : {display:'block'}}>Password doesn't match</p>
            </div>

            <div className={styles.registrationFormRadioContainer}>
                <input type="radio"
                        id='terms'
                        className={styles.registrationRadioBtn}
                        value={true}
                        onClick={(e) => setTermsCondition(e.target.value)} />
                <label htmlFor='terms' className={styles.registrationFormP}>I agree all statements in Terms of Service</label>
            </div>

            <button className={styles.registrationBtn} disabled={!finalValidation} onClick={ formHandleSubmit }>
                Register
            </button>

            <div className={styles.registrationFormLoginContainer}>
                <p>Have already an account ?</p> <Link to="/login" className={styles.registrationLink}>Login</Link>
            </div>
        </form>
        </>
    )
}

export default RegistrationForm;

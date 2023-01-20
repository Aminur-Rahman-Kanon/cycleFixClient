import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import Spinner from '../Others/Spinner/spinner';
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';

let target = null;

const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [firstNameValidity, setFirstNameValidity] = useState(true);

    const [lastName, setLastName] = useState('');
    const [lastNameValidity, setLastNameValidity] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [user, setUser] = useState('');
    const [userValidity, setUserValidity] = useState('');

    const [password, setPassword] = useState('')
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [reTypePassword, setRetypePassword] = useState('');
    
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [termsCondition, setTermsCondition] = useState(false);

    const [finalValidation, setFinalValidation] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [userExist, setUserExist] = useState(false);

    const [error, setError] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);


    useEffect(() => {

        switch(target) {
            case 'firstName':
                firstName.length > 0 ? setFirstNameValidity(true) : setFirstNameValidity(false);
                break;

            case 'lastName':
                lastName.length > 0 ? setLastNameValidity(true) : setLastNameValidity(false);
                break;

            case 'email':
                const check1 = email.includes('@');
                const check2 = email.includes('.com');
                const check1Index = email.indexOf('@');
                const check2Index = email.indexOf('.com');

                let domain = null;
                if (check1, check2) {
                    domain = email.slice(check1Index+1, check2Index)
                }
                domain ? setEmailValidity(true) : setEmailValidity(false);
                if (userExist){
                    setUserExist(false);
                }
                break;

            case 'user':
                user.length > 0 ? setUserValidity(true) : setUserValidity(false);
                break;

            default:
                break;
        }

    }, [firstName, lastName, email, user, password, reTypePassword, termsCondition])

    useEffect(() => {
        const id = setTimeout(() => {
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
        }, 1000)

        return () => clearTimeout(id);
    }, [password, reTypePassword])

    useEffect(() => {
        if ((firstName && firstNameValidity) && (lastName && lastNameValidity) && (email && emailValidity) && (user && userValidity)
            && passwordValidity && termsCondition) {
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [firstNameValidity, lastNameValidity, emailValidity, userValidity, passwordValidity, termsCondition])

    const formHandleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);
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
                setSpinner(false);
                setStatus(data.status);
                setBackdrop(true);
                setModal(true);
            }
            else {
                setSpinner(false);
                setUserExist(true);
            }
        }).catch(err => {
            setSpinner(false);
            setError(true);
            setBackdrop(true);
            setModal(true);
        })
    }

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
                    setBackdrop(false);
                    setModal(false);
                    setError(false);
                }}>Try again</button>
            </div>
        </div>
    }

    return (
        <div className={styles.registrationMain}>
            <Backdrop backdrop={backdrop} toggleBackdrop={null}/>
            <Spinner switch={spinner} />
            <Modal switch={modal} >
                {displayMsg}
            </Modal>
            <div className={styles.RegistrationBg}>

            </div>

            <div className={styles.registrationContainer}>
                <h1 className={styles.registrationFormH1}>Sign Up</h1>
                <form className={styles.registrationForm}>
                    <div className={styles.registrationFormNames}>
                        <div className={ firstNameValidity ? styles.registrationFormName : `${styles.registrationFormName} ${styles.wrongInput}`}>
                            <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                            <input type="text"
                                    className={styles.registrationFormInput}
                                    placeholder="First Name"
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        target = 'firstName'
                                    }} />
                        </div>
                        <div className={ lastNameValidity ? styles.registrationFormName : `${styles.registrationFormName} ${styles.wrongInput}`}>
                            <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                            <input type="text"
                                    className={styles.registrationFormInput}
                                    placeholder="Last Name"
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        target = 'lastName';
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
                                target = "email"
                               }} />
                        <p className={styles.userExist} style={userExist ? {display: 'block'} : {display: 'none'}}>User exist !</p>
                    </div>

                    <div className={styles.registrationFormInputContainer}>
                        <FontAwesomeIcon icon={faUser} className={styles.registrationFormIcon}/>

                        <select className={styles.registrationFormSelect}
                                defaultValue="Please Select"
                                onChange={(e) => {
                                    setUser(e.target.value);
                                    target = 'user'
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
                                    target = "password";
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
                                    target = 'password';
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
                        Sign Up
                    </button>

                    <div className={styles.registrationFormLoginContainer}>
                        <p>Have already an account ?</p> <Link to="/login" className={styles.registrationLink}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;

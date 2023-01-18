import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';

const Registration = () => {

    return (
        <div className={styles.registrationMain}>
            <div className={styles.RegistrationBg}>

            </div>

            <div className={styles.registrationContainer}>
                <h1 className={styles.registrationFormH1}>Sign Up</h1>
                <form className={styles.registrationForm}>
                    <div className={styles.registrationFormNames}>
                        <div className={styles.registrationFormName}>
                            <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                            <input type="text"
                                    className={styles.registrationFormInput}
                                    placeholder="First Name" />
                        </div>
                        <div className={styles.registrationFormName}>
                            <FontAwesomeIcon icon={faSignature} className={styles.registrationFormIcon} />
                            <input type="text"
                                    className={styles.registrationFormInput}
                                    placeholder="Last Name" />
                        </div>
                    </div>

                    <div className={styles.registrationFormInputContainer}>
                        <FontAwesomeIcon icon={ faAt } className={styles.registrationFormIcon}/>
                        <input type="Email"
                               className={styles.registrationFormInput}
                               placeholder="Email address" />
                    </div>

                    <div className={styles.registrationFormInputContainer}>
                        <FontAwesomeIcon icon={faUser} className={styles.registrationFormIcon}/>

                        <select className={styles.registrationFormSelect} defaultValue="Please Select">
                            <option className={styles.registrationFormOption} disabled>
                                Please Select
                            </option>

                            <option className={styles.registrationFormOption}>Male</option>
                            <option className={styles.registrationFormOption}>Female</option>
                        </select>
                    </div>

                    <div className={styles.registrationFormInputContainer}>
                        <FontAwesomeIcon icon={faLock} className={styles.registrationFormIcon} />
                        <input type="password"
                                className={styles.registrationFormInput}
                                placeholder="Password" />
                    </div>

                    <div className={styles.registrationFormInputContainer}>
                        <FontAwesomeIcon icon={faLock} className={styles.registrationFormIcon} />
                        <input type="password"
                                className={styles.registrationFormInput}
                                placeholder=" Retype Password" />
                    </div>

                    <div className={styles.registrationFormRadioContainer}>
                        <input type="radio" className={styles.registrationRadioBtn} />
                        <p className={styles.registrationFormP}>I agree all statements in Terms of Service</p>
                    </div>

                    <button className={styles.registrationBtn}>
                        Sign Up
                    </button>

                    <div className={styles.registrationFormLoginContainer}>
                        <p>Have already an account ?</p> <Link to="#" className={styles.registrationLink}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;

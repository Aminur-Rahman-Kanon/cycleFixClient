import React, { useEffect, useState } from "react";
import styles from './forgotPassword.module.css';
import logo from '../../Assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../Others/Spinner/spinner";
import Modal from "../Others/Modal/modal";
import Backdrop from "../Backdrop/backdrop";
import { emailValidation } from "../Others/HelperFunction/helperFunction";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [status, setStatus] = useState('');
    
    //this hook validate email from user inputs
    useEffect(() => {
        const timer = emailValidation(email, setBtnDisable)
        
        return () => clearTimeout(timer);
    }, [email]);

    //form submit handler
    const submitFormHandler = async (e) => {
        e.preventDefault();
        setSpinner(true);

        await fetch('https://cyclefixserver.onrender.com/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json()).then(data => {
            if (data.status === 'user not found') {
                setSpinner(false);
                setUserNotFound(true);
            }
            else {
                setSpinner(false);
                setStatus(data.status);
                setBackdrop(true);
                setModal(true);
            }
        })
    }

    //display status message handler
    let displayStatus = null;

    if (status === 'success'){
        displayStatus = <div className={styles.displayStatusContainer}>
            <h2 className={styles.statusHeader}>An email has been sent to:</h2>
            <p className={styles.statusP}>{email}</p>
            <p className={styles.statusP}>Please follow the instructions that has been sent to your email</p>
            <button className={styles.statusBtn} onClick={() => window.location.href = '/'}>Ok</button>
        </div>
    }
    else {
        displayStatus = <div className={styles.displayStatusContainer}>
            <h2 className={styles.statusHeader}>Something went wrong</h2>
            <p className={styles.statusP}>Please ensure you are registered and try again</p>
            <button className={styles.statusBtn} onClick={() => {
                setModal(false);
                setBackdrop(false);
                setStatus('');
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Spinner spinner={spinner}/>
        <Backdrop backdrop={backdrop}/>
        <Modal switch={modal}>
            {displayStatus}
        </Modal>

        <div className={styles.forgotPasswordMain}>
            <form className={styles.forgotPasswordContainer}>
                <img src={ logo } alt="forgot password" className={styles.logo}/> 
                <p className={styles.instruction}>Enter the email address associated with your account and we’ll send you a link to reset your password.</p>
                <div className={styles.inputContainer}>
                        <input type="email"
                            className={styles.input}
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}/>
                        <FontAwesomeIcon icon={ faEnvelope } className={styles.inputIcon}/>
                        <p className={styles.user} style={userNotFound ? {display: 'block'} : {display: 'none'}}>User not found</p>
                </div>

                <button disabled={!btnDisable}
                        className={styles.submitBtn}
                        onClick={ submitFormHandler }
                        >Send password reset link</button>
            </form>
        </div>
        </>
    )
}

export default ForgotPassword;

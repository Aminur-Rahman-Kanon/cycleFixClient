import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';

let target = null;

const Login = () => {

    const [username, setusername] = useState('')
    const [usernameValidation, setusernameValidation] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(true);

    const [finalValidation, setFinalValidation] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [error, setError] = useState(false);

    console.log(finalValidation);

    useEffect(() => {
        switch(target){
            case 'username':
                username.length > 0 ? setusernameValidation(true) : setusernameValidation(false);
                break;

            case 'password':
                password.length > 0 ? setPasswordValidation(true) : setPasswordValidation(false);
                break;

            default:
                break;
        }
    }, [ username, password ])

    useEffect(() => {
        if ( ( username && usernameValidation) && ( password && passwordValidation ) ){
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [ username, password ])

    const closeError = () => {
        setModal(false);
        setBackdrop(false);
        setError(false);
    }

    let displayMsg = null;

    if (error){
        displayMsg = <div className={styles.errorMsg}>
            <h2 className={styles.errorMsgH2}>Something went wrong</h2>
            <p className={styles.errorMsgP}>Please try again</p>
            <button className={styles.errorMsgBtn} onClick={ closeError }>
                Try again
            </button>
        </div>
    }
    
    return (
        <>
        <Backdrop backdrop={backdrop} />
        <Modal switch={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.loginMain}>
            <div className={styles.loginBg}>

            </div>

            <div className={styles.loginContainer}>
                <form className={styles.loginForm}>
                    <h1 className={styles.loginH1}>Login</h1>
                    <div className={ usernameValidation ? styles.loginInputContainer : `${styles.loginInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faUser} className={usernameValidation ? styles.loginInputIcon : `${styles.loginInputIcon} ${styles.wrongInputIcon}`}/>
                        <input type="text"
                            className={styles.loginInput}
                            placeholder="username"
                            onChange={(e) => {
                                setusername(e.target.value);
                                target = 'username'
                            }}/>
                    </div>

                    <div className={ passwordValidation ? styles.loginInputContainer : `${styles.loginInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faLock} className={ passwordValidation ? styles.loginInputIcon : `${styles.loginInputIcon} ${styles.wrongInputIcon}`} />
                        <input type="password"
                            className={styles.loginInput}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                target = 'password';
                            }} />
                    </div>

                    <button className={finalValidation ? styles.loginBtn : `${styles.loginBtn} ${styles.loginBtnDisable}`} disabled={!finalValidation}>
                        Login
                    </button>

                    <div className={styles.loginAdditional}>
                        <Link to="#" className={styles.loginAdditionalLink}>Create Account</Link>
                        <Link to="#" className={styles.loginAdditionalLink}>Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;
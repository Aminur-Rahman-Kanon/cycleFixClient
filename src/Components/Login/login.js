import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';
import Spinner from '../Others/Spinner/spinner';
import jwtDecode from 'jwt-decode';

let target = null;

const Login = () => {

    const [email, setemail] = useState('');
    const [emailValidation, setemailValidation] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(true);

    const [finalValidation, setFinalValidation] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [error, setError] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "257327674926-u5bnbok1l36c70662j162rk5044krqsu.apps.googleusercontent.com",
            callback: handleGoogleLogin
        })

        google.accounts.id.renderButton(
            document.getElementById('google-btn'),
            {
                theme: 'outline', size: 'large'
            }
        );

        google.accounts.id.prompt();
    }, [])

    useEffect(() => {
        switch(target){
            case 'email':
                email.length > 0 ? setemailValidation(true) : setemailValidation(false);
                break;

            case 'password':
                password.length > 0 ? setPasswordValidation(true) : setPasswordValidation(false);
                break;

            default:
                break;
        }
    }, [ email, password ])

    useEffect(() => {
        if ( ( email && emailValidation) && ( password && passwordValidation ) ){
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [ email, password ])

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

    const handleSubmit = (e) => {
        e.preventDefault();

        setSpinner(true);

        fetch('https://cyclefixserver.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(data => {
            setSpinner(false);

            if (data.status === 'success'){
                sessionStorage.setItem('loggedInUser', JSON.stringify(data.data));
                window.location.assign('/');
            }
            else {
                setErrorMsg(data.status);
            }
        }).catch(err => setError(true));
    }

    const handleGoogleLogin = (response) => {
        const user = jwtDecode(response.credential);
        console.log(user);
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.assign('/');
    }

    
    return (
        <>
        <Backdrop backdrop={backdrop} />
        <Modal switch={modal}>
            {displayMsg}
        </Modal>
        <Spinner switch={ spinner } />
        <div className={styles.loginMain}>
            <div className={styles.loginBg}>

            </div>

            <div className={styles.loginContainer}>
                <form className={styles.loginForm}>
                    <h1 className={styles.loginH1}>Login</h1>
                    <div className={ emailValidation ? styles.loginInputContainer : `${styles.loginInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faUser} className={emailValidation ? styles.loginInputIcon : `${styles.loginInputIcon} ${styles.wrongInputIcon}`}/>
                        <input type="text"
                            className={styles.loginInput}
                            placeholder="email"
                            onChange={(e) => {
                                setemail(e.target.value);
                                target = 'email'
                            }}/>
                        <p className={styles.errorMsg} style={errorMsg === 'user not found' ? {display: 'block'} : {display: 'none'}} >User not found</p>
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
                        <p className={styles.errorMsg} style={errorMsg === 'bad password' ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                    </div>

                    <button className={finalValidation ? styles.loginBtn : `${styles.loginBtn} ${styles.loginBtnDisable}`} disabled={!finalValidation}
                            onClick={ handleSubmit }>
                        Login
                    </button>

                    <div className={styles.loginAdditional}>
                        <Link to="#" className={styles.loginAdditionalLink}>Create Account</Link>
                        <Link to="#" className={styles.loginAdditionalLink}>Forgot Password</Link>
                    </div>

                    <div id="google-btn" className={styles.googleBtn}>

                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;
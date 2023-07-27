import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';
import Spinner from '../Others/Spinner/spinner';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet-async';
import AuthContext from '../Others/AuthContext/authContext';
import { emailValidation } from '../Others/HelperFunction/helperFunction';

let target = null;

const Login = () => {

    const navigate = useNavigate();

    const context = useContext(AuthContext);

    const [email, setemail] = useState('');
    const [emailValidity, setemailValidity] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(true);

    const [finalValidation, setFinalValidation] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [error, setError] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [spinner, setSpinner] = useState(false);

    //if user is logged in then redirect to homepage
    //initialize google client object and render a login prompt on componentOnMount
    useEffect(() => {
        if(context.loggedInUser) {
            return navigate('/');
        }
        /* global google */
        // google.accounts.id.initialize({
        //     client_id: "257327674926-u5bnbok1l36c70662j162rk5044krqsu.apps.googleusercontent.com",
        //     callback: handleGoogleLogin
        // })

        // google.accounts.id.renderButton(
        //     document.getElementById('google-btn'),
        //     {
        //         theme: 'outline', size: 'large'
        //     }
        // );

        // google.accounts.id.prompt();
    }, [])

    //this hooik validate email from user inputs
    useEffect(() => {
        const timer = emailValidation(email, setemailValidity);
        return () => clearTimeout(timer);
    }, [email])

    //this hook toggle submit button enable/disable based on form validation
    useEffect(() => {
        if ( ( email && emailValidity) && ( password && passwordValidation ) ){
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [ email, password ])

    const closeModal = () => {
        setModal(false);
        setBackdrop(false);
        setError(false);
    }

    //display status message handler
    let displayMsg = null;
    if (error){
        displayMsg = <div className={styles.errorMsg}>
            <h2 className={styles.errorMsgH2}>Something went wrong</h2>
            <p className={styles.errorMsgP}>Please try again</p>
            <button className={styles.errorMsgBtn} onClick={ closeModal }>
                Try again
            </button>
        </div>
    }

    //form submit handler
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
        }).catch(err => {
            setSpinner(false);
            setError(true);
            setModal(true);
            setBackdrop(true);
        });
    }

    //google login submit handler
    const handleGoogleLogin = (response) => {
        const user = jwtDecode(response.credential);
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        return navigate('/');
    }

    return (
        <>
        <Helmet>
            <title>Cycle fix login</title>
            <meta name="description" content="cycle fix login"/>
            <link rel="canonical" href="/login"/>
        </Helmet>
        <Backdrop backdrop={backdrop} />
        <Modal modal={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.loginMain}>
            <div className={styles.loginBg}>

            </div>

            <div className={styles.loginContainer}>
                <Spinner spinner={ spinner } />
                <form className={styles.loginForm}>
                    <h1 className={styles.loginH1}>Login</h1>
                    <div className={ emailValidity ? styles.loginInputContainer : `${styles.loginInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faUser} className={emailValidity ? styles.loginInputIcon : `${styles.loginInputIcon} ${styles.wrongInputIcon}`}/>
                        <input type="text"
                            data-testid="email"
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
                            data-testid="password"
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
                        <Link to="/register" className={styles.loginAdditionalLink}>Create Account</Link>
                        <Link to="/reset-password" className={styles.loginAdditionalLink}>Forgot Password</Link>
                    </div>
                    
                    <div className={styles.googleBtnContainer}>
                        <div id="google-btn" className={styles.googleBtn}></div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;
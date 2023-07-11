import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './registration.module.css';
import Spinner from '../../Others/Spinner/spinner';
import { Helmet } from 'react-helmet-async';
import AuthContext from '../../Others/AuthContext/authContext';
import RegistrationForm from '../RegistrationForm/registrationForm';


const Registration = () => {

    const navigate = useNavigate();

    const context = useContext(AuthContext);

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (context.loggedInUser){
            return navigate('/');
        }
    }, []);

    return (
        <>
        <Helmet>
            <title>Cycle fix registration</title>
            <meta name="description" content="cycle fix registration"/>
            <link rel="canonical" href="/register"/>
        </Helmet>
        <Spinner spinner={spinner} />
        <div className={styles.registrationMain}>
            <div className={styles.RegistrationBg}>

            </div>

            <div className={styles.registrationContainer}>
                <h1 className={styles.registrationFormH1}>Registration</h1>
                <RegistrationForm context={context} toggleSpinner={setSpinner}/>
            </div>
        </div>
        </>
    )
}

export default Registration;

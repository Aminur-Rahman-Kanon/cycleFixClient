import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './loginBar.module.css';
import { useLocation } from 'react-router-dom';
import male from '../../../Assets/male.png';
import female from '../../../Assets/female.png';
import AuthContext from "../../Others/AuthContext/authContext";

const LoginBar = () => {

    const location = useLocation().pathname;

    const context = useContext(AuthContext);

    //logout handler
    const logout = () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.assign('/');
    }

    let displayContainer = <div className={styles.loginBarMain}>
        <div className={styles.loginBarItems}>
            <a href="/login" className={location === '/login' ? styles.active : styles.inActive}>
                <FontAwesomeIcon icon={faCircleUser} className={styles.loginBarIcon} data-testid="login-icon" />
                <p className={styles.loginBarItemsP}>Login</p>
            </a>
        </div>

        <div className={styles.loginBarItems}>
            <a href="/register" className={location === '/register' ? styles.active : styles.inActive}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.loginBarIcon} data-testid="register-icon" />
                <p className={styles.loginBarItemsP}>Register</p>
            </a>
        </div>
    </div>

    if (context.loggedInUser) {
        if (context.loggedInUser.hasOwnProperty('_id')) {
            displayContainer = <div className={styles.loginBarMain}>
                <div className={styles.profileMain}>
                    <img src={context.loggedInUser.user === 'Male' ? male : female}
                         alt={context.loggedInUser.user === 'Male' ? 'male user' : 'female user'}
                         className={styles.avatar}/>
                         
                    <div className={styles.logoutContainer}>
                        <p style={{margin: '2px'}}>{context.loggedInUser.firstName} {context.loggedInUser.lastName}</p>
                        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        }
        else if (context.loggedInUser.hasOwnProperty('iss')) {
            displayContainer = <div className={styles.loginBarMain}>
                <div className={styles.profileMain}>
                    <img src={context.loggedInUser.picture} alt="cycle fix user" className={styles.avatar}/>
                    <div className={styles.logoutContainer}>
                        <p style={{margin: '2px'}}>{context.loggedInUser.given_name} {context.loggedInUser.family_name}</p>
                        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        }
    }

    return (
        displayContainer
    )
}


export default LoginBar;

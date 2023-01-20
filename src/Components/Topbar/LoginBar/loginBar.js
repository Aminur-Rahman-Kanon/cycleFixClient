import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './loginBar.module.css';
import { NavLink } from 'react-router-dom';
import male from '../../../Assets/male.png';
import female from '../../../Assets/female.png';
import { LoggedInUsers } from "../../../App";

const LoginBar = () => {

    const loggedInUser = useContext( LoggedInUsers );

    const logout = () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.assign('/');
    }

    let displayContainer = <div className={styles.loginBarMain}>
        <div className={styles.loginBarItems}>
            <NavLink to="/login" className={({isActive}) => isActive ? styles.active : styles.inActive}>
                <FontAwesomeIcon icon={faCircleUser} className={styles.loginBarIcon}/>
                <p className={styles.loginBarItemsP}>Login</p>
            </NavLink>
        </div>

        <div className={styles.loginBarItems}>
            <NavLink to="/register" className={({isActive}) => isActive ? styles.active : styles.inActive}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.loginBarIcon}/>
                <p className={styles.loginBarItemsP}>Register</p>
            </NavLink>
        </div>
    </div>

    if (loggedInUser) {
        if (loggedInUser.hasOwnProperty('_id')) {
            displayContainer = <div className={styles.loginBarMain}>
                <div className={styles.profileMain}>
                    <img src={loggedInUser.user === 'Male' ? male : female} className={styles.avatar}/>
                    <div className={styles.logoutContainer}>
                        <p style={{margin: '2px'}}>{loggedInUser.firstName} {loggedInUser.lastName}</p>
                        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        }
        else if (loggedInUser.hasOwnProperty('iss')) {
            displayContainer = <div className={styles.loginBarMain}>
                <div className={styles.profileMain}>
                    <img src={loggedInUser.picture} className={styles.avatar}/>
                    <div className={styles.logoutContainer}>
                        <p style={{margin: '2px'}}>{loggedInUser.given_name} {loggedInUser.family_name}</p>
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

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './loginBar.module.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const LoginBar = (props) => {

    return (
        <div className={styles.loginBarMain}>
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
    )
}

const mapStateToProps = state => {
    return {
        sideDrawer: state.sideDrawer
    }
}

export default connect ( mapStateToProps ) (LoginBar);
